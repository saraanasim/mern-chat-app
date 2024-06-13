import { setCurrentMessages } from '@/redux/chatsSlice';
import { useAppSelector } from '@/redux/hooks';
import { selectActiveUser } from '@/redux/selectors/activeUser.selectors';
import { selectActiveChat, selectChatLoading } from '@/redux/selectors/chatsSlice.selectors';
import { ChatHeader } from '@/ui/chat-header';
import { Messages } from '@/ui/messages';
import { Spinner } from '@/ui/spinner';
import { SocketMessage } from '@/utils/types';
import { randomBytes } from 'crypto';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Socket, io } from 'socket.io-client';

export const Chat = () => {
  const socketRef = useRef<Socket | null>(null);
  const dispatch = useDispatch();
  const activeChat = useAppSelector(selectActiveChat)
  const chatLoading = useAppSelector(selectChatLoading)
  const activeUser = useAppSelector(selectActiveUser)
  const [isTyping, setIsTyping] = useState(false);
  const [typing, setTyping] = useState(false)

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

  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_SERVER_URL as string)

    socketRef.current?.on("typing", () => {
      setIsTyping(true)
    })
    socketRef.current?.on("stop typing", () => setIsTyping(false))

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
      <div className='border-[1px] border-[#aabac8] px-6 py-3 w-[360px] sm:w-[400px] md:w-[350px] h-[50px] lg:w-[400px] rounded-t-[10px]'>

        <form onKeyDown={(e) => onSendMessage(e)} onSubmit={(e) => e.preventDefault()}>
          <input onChange={(e) => {
            setMessage(e.target.value)
            if (!socketConnected) return
            if (!typing) {
              setTyping(true)
              socketRef.current?.emit('typing', activeUser._id)
            }
            let lastTime = new Date().getTime()
            var time = 3000
            setTimeout(() => {
              var timeNow = new Date().getTime()
              var timeDiff = timeNow - lastTime
              if (timeDiff >= time && typing) {
                socketRef.current?.emit("stop typing", activeUser._id)
                setTyping(false)
              }
            }, time)
          }} className='focus:outline-0 w-[100%] bg-[#f8f9fa]' type="text" name="message" placeholder="Enter message" value={message} />
        </form>

      </div>
    </div>
  );
};
