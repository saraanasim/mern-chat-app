import { MessageApi } from '@/lib/api/messages.api';
import { setChatMessages, setCurrentMessages } from '@/redux/chatsSlice';
import { useAppSelector } from '@/redux/hooks';
import { selectActiveUser } from '@/redux/selectors/activeUser.selectors';
import { selectActiveChat, selectChatLoading } from '@/redux/selectors/chatsSlice.selectors';
import { ChatHeader } from '@/ui/chat-header';
import { Messages } from '@/ui/messages';
import { Spinner } from '@/ui/spinner';
import { SocketMessage } from '@/utils/types';
import { randomBytes } from 'crypto';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Socket, io } from 'socket.io-client';

export const Chat = () => {
  const socketRef = useRef<Socket | null>(null);
  const dispatch = useDispatch();
  const activeChat = useAppSelector(selectActiveChat)
  const chatLoading = useAppSelector(selectChatLoading)
  const activeUser = useAppSelector(selectActiveUser)
  const [isTyping, setIsTyping] = useState<string | null>(null);
  const [joinedPerson, setJoinedPerson] = useState<string | null>(null);
  const [leftPerson, setLeftPerson] = useState<string | null>(null);
  const [typing, setTyping] = useState(false)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);



  const [socketConnected, setSocketConnected] = useState(false);
  const [message, setMessage] = useState("")

  const onSendMessage = async (e: KeyboardEvent) => {
    if (!activeChat) return

    if ((e.key === "Enter" || e.type === "click") && (message)) {
      setMessage("")
      const messagePayload: SocketMessage = {
        messageId: randomBytes(10).toString('hex'),
        sender: activeUser,
        message,
        chat: activeChat
      }
      socketRef.current?.emit("stop typing", activeChat._id)
      socketRef.current?.emit("new message", messagePayload)
      dispatch(setCurrentMessages(messagePayload))
      MessageApi.sendMessage({ chatId: activeChat._id, message })
    }
  }

  const handleTyping = (e: ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socketRef.current?.emit('typing', { room: activeChat?._id, user: activeUser.name });
    }

    // Clear the existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set a new timeout
    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current?.emit('stop typing', activeChat?._id);
      setTyping(false);
    }, 3000);
  };

  useEffect(() => {
    if(!activeUser || !activeChat) return
    socketRef.current = io(process.env.NEXT_PUBLIC_SERVER_URL as string)

    socketRef.current?.emit("setup", activeUser)
    socketRef.current?.on("connected", async () => {
      setSocketConnected(true)
      if (activeChat) {
        const chatMessages = await MessageApi.fetchMessages({ chatId: activeChat._id })
        dispatch(setChatMessages(chatMessages))
      }
    })

    if (activeChat && activeUser) {
      socketRef.current?.emit("join room", { room: activeChat?._id, user: activeUser.name })
    }
    socketRef.current?.on("typing", (userName: string) => {
      setIsTyping(userName)
    })
    socketRef.current?.on("stop typing", () => {
      setIsTyping(null)
    })
    socketRef.current?.on("someone joined", (userName: string) => {
      setJoinedPerson(userName)
      setTimeout(() => setJoinedPerson(null), 10000)
    })
    socketRef.current?.on("someone left", (userName: string) => {
      setLeftPerson(userName)
      setTimeout(() => setLeftPerson(null), 10000)
    })

    socketRef.current?.on("message recieved", (newMessageRecieved) => {
      dispatch(setCurrentMessages(newMessageRecieved))
    })

    return (() => {
      socketRef.current?.emit("leave room", { room: activeChat?._id, user: activeUser.name })
    })
  }, [activeUser, activeChat])

  if (chatLoading) return (
    <div className='w-full h-full flex justify-center items-center'>
      <Spinner />
    </div>
  )
  if (!activeChat) return (
    <div>
      Click on Any Chat to Open
    </div>
  )
  return (
    <div className="overflow-auto flex flex-col bg-gray-100">
      <ChatHeader />
      <div className="flex-grow overflow-y-auto p-4">
        <Messages />
      </div>
      <div className="px-4 py-2 bg-white shadow-md">
        {isTyping?.length && <div className='w-full flex justify-start items-center font-bold'>
          <p className='text-black'>{isTyping} is typing ...</p>
        </div>}
        {joinedPerson?.length && <div className='w-full flex justify-start items-center font-bold'>
          <p className='text-black'>{joinedPerson} joined the chat</p>
        </div>}
        {leftPerson?.length && <div className='w-full flex justify-start items-center font-bold'>
          <p className='text-black'>{leftPerson} left the chat</p>
        </div>}

        <div className="mt-2 px-4 py-2 bg-white rounded-t-lg">
          <form
            onKeyDown={(e) => onSendMessage(e)}
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center"
          >
            <input
              onChange={handleTyping}
              className="focus:outline-none w-full bg-gray-50 border border-gray-300 rounded-full py-2 px-4 text-sm text-gray-700 placeholder-gray-400"
              type="text"
              name="message"
              placeholder="Enter message"
              value={message}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
