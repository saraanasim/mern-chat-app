import { useAppSelector } from '@/redux/hooks';
import { selectActiveUser } from '@/redux/selectors/activeUser.selectors';
import { selectActiveChat } from '@/redux/selectors/chatsSlice.selectors';
import { Messages } from '@/ui/messages';
import { SocketMessage } from '@/utils/types';
import { KeyboardEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Socket, io } from 'socket.io-client';

let socket: Socket;
let selectedChatCompare: any;

export const PersonalChat = () => {
  const dispatch = useDispatch();
  // const recepient = useAppSelector(selectRecepient)
  const activeChat = useAppSelector(selectActiveChat)
  const activeUser = useAppSelector(selectActiveUser)
  const [isTyping, setIsTyping] = useState(false);
  const [typing, setTyping] = useState(false)

  const [socketConnected, setSocketConnected] = useState(false);
  const [messages, setMessages] = useState<SocketMessage[]>([]);
  const [message, setMessage] = useState("")

  const onSendMessage = async (e: KeyboardEvent) => {
    if (!activeChat) return

    if ((e.key === "Enter" || e.type === "click") && (message)) {
      setMessage("")
      const messagePayload: SocketMessage = {
        sender: activeUser,
        message,
        chat: activeChat
      }
      socket.emit("stop typing", activeChat._id)
      socket.emit("new message", messagePayload)
    }
  }
  useEffect(() => {
    socket = io(process.env.NEXT_PUBLIC_SERVER_URL as string)
    socket.on("typing", () => setIsTyping(true))
    socket.on("stop typing", () => setIsTyping(false))
  }, [])

  useEffect(() => {
    socket.emit("setup", activeUser)
    socket.on("connected", () => {
      setSocketConnected(true)
    })
  }, [messages, activeUser])
  useEffect(() => {
    const fetchMessagesFunc = async () => {
      if (activeChat) {
        socket.emit("join room", activeChat._id)
      }
      return
    }
    fetchMessagesFunc()
    selectedChatCompare = activeChat

  }, [activeChat])
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      console.log({ newMessageRecieved, selectedChatCompare })
      setMessages([...messages, newMessageRecieved])
    })
  })
  if (!activeChat) return (
    <div>
      Click on Any Chat to Open
    </div>
  )

  return (
    <div>
      <Messages messages={messages} />
      <div className='border-[1px] border-[#aabac8] px-6 py-3 w-[360px] sm:w-[400px] md:w-[350px] h-[50px] lg:w-[400px] rounded-t-[10px]'>

        <form onKeyDown={(e) => onSendMessage(e)} onSubmit={(e) => e.preventDefault()}>
          <input onChange={(e) => {
            setMessage(e.target.value)
            if (!socketConnected) return
            if (!typing) {
              setTyping(true)
              socket.emit('typing', activeUser._id)
            }
            let lastTime = new Date().getTime()
            var time = 3000
            setTimeout(() => {
              var timeNow = new Date().getTime()
              var timeDiff = timeNow - lastTime
              if (timeDiff >= time && typing) {
                socket.emit("stop typing", activeUser._id)
                setTyping(false)
              }
            }, time)
          }} className='focus:outline-0 w-[100%] bg-[#f8f9fa]' type="text" name="message" placeholder="Enter message" value={message} />
        </form>

      </div>
    </div>
  );
};
