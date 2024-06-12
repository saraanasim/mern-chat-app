import { Avatar } from './avatar'

type Props = {
    id: string
    name: string
    pic: string
    desc: string
    onClick: (id: string) => void
}

const SectionItem = ({ name, pic, desc, id, onClick }: Props) => {

    return (
        <div className='flex flex-col md:flex-row gap-4 cursor-pointer hover:bg-blue-500' onClick={() => onClick(id)}>
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
