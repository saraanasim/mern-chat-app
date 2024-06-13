import { MessageApi } from '@/lib/api/messages.api';
import { setChatMessages, setCurrentMessages } from '@/redux/chatsSlice';
import { useAppSelector } from '@/redux/hooks';
import { selectActiveUser } from '@/redux/selectors/activeUser.selectors';
import { selectActiveChat, selectChatLoading } from '@/redux/selectors/chatsSlice.selectors';
import { ChatHeader } from '@/ui/chat-header';
import { Messages } from '@/ui/messages';
import { Spinner } from '@/ui/spinner';
import { ChatTyping } from '@/ui/typing';
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
    socketRef.current = io(process.env.NEXT_PUBLIC_SERVER_URL as string)

    socketRef.current?.on("typing", (userName: string) => {
      console.log('IS typing')
      setIsTyping(userName)
    })
    socketRef.current?.on("stop typing", () => {
      console.log('stopped typing')

      setIsTyping(null)
    })

    socketRef.current?.emit("setup", activeUser)
    socketRef.current?.on("connected", async () => {
      setSocketConnected(true)
      if (activeChat) {
        const chatMessages = await MessageApi.fetchMessages({ chatId: activeChat._id })
        console.log({ chatMessages })
        dispatch(setChatMessages(chatMessages))
      }
    })

    const fetchMessagesFunc = async () => {
      if (activeChat) {
        socketRef.current?.emit("join room", activeChat._id)
      }
      return
    }
    fetchMessagesFunc()

    socketRef.current?.on("message recieved", (newMessageRecieved) => {
      console.log({ newMessageRecieved })
      dispatch(setCurrentMessages(newMessageRecieved))
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
        <ChatTyping name={isTyping} />
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
