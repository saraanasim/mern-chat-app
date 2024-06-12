import { useAppSelector } from '@/redux/hooks'
import { selectActiveUser } from '@/redux/selectors/activeUser.selectors'
import { selectActiveChat } from '@/redux/selectors/chatsSlice.selectors'

export const ChatHeader = () => {
    const activeChat = useAppSelector(selectActiveChat)

    if (!activeChat) return null
    return (
        <div className='w-full bg-black h-16 flex justify-center items-center font-bold'>
            <p className='text-white'>{activeChat.chatName}</p>

        </div>
    )
}
