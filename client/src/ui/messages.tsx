import { useAppSelector } from '@/redux/hooks'
import { selectCurrentMessages } from '@/redux/selectors/chatsSlice.selectors'
import { MessageItem } from './message-item'

export const Messages = () => {
  const currentMessages = useAppSelector(selectCurrentMessages)
  return (
    <div className='overflow-auto max-h-screen flex flex-col gap-4'>
      {currentMessages.map((each) => <MessageItem {...each} />)}
    </div>
  )
}
