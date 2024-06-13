import { setCurrentMessages } from '@/redux/chatsSlice';
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
  const [isTyping, setIsTyping] = useState<string|null>(null);
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

    socketRef.current?.on("typing", (userName:string) => {
      console.log('IS typing')
      setIsTyping(userName)
    })
    socketRef.current?.on("stop typing", () => {
      console.log('stopped typing')

      setIsTyping(null)
    })

    socketRef.current?.emit("setup", activeUser)
    socketRef.current?.on("connected", () => {
      setSocketConnected(true)
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
    <div className=' min-h-screen max-h-screen overflow-auto flex flex-col'>
      <ChatHeader />
      <Messages />
      <ChatTyping name={isTyping} />
      <div className='border-[1px] border-[#aabac8] px-6 py-3 w-[360px] sm:w-[400px] md:w-[350px] h-[50px] lg:w-[400px] rounded-t-[10px]'>

        <form onKeyDown={(e) => onSendMessage(e)} onSubmit={(e) => e.preventDefault()}>
          <input onChange={handleTyping} className='focus:outline-0 w-[100%] bg-[#f8f9fa]' type="text" name="message" placeholder="Enter message" value={message} />
        </form>
      </div>
    </div>
  );
};
