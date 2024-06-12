import { Avatar } from './avatar'

type Props = {
    name: string
    pic: string
    desc: string
}

const SectionItem = ({ name, pic, desc }: Props) => {

    return (
        <div className='flex flex-col md:flex-row gap-4'>
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
