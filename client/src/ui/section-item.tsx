import { useAppDispatch } from '@/redux/hooks'
import { Avatar } from './avatar'
import { resetChat } from '@/redux/chatsSlice'

type Props = {
    id: string
    name: string
    pic: string
    desc: string
    onClick: (id: string) => void
}

const SectionItem = ({ name, pic, desc, id, onClick }: Props) => {
    const dispatch=useAppDispatch()

    const handleClick=()=>{
        dispatch(resetChat())
        onClick(id)
    }

    return (
        <div className='flex flex-col md:flex-row gap-4 cursor-pointer hover:bg-blue-500' onClick={handleClick}>
            <Avatar
                name={name}
                pic={pic}
            />
            <div className='flex flex-col'>
                <p className='font-bold'>{name}</p>
                <p className='hidden md:block text-gray-600'>{desc}</p>
            </div>
        </div>
    )
}

export { SectionItem }
