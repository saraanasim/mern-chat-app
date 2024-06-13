
type Props = {
    name: string | null
}

export const ChatTyping = ({ name }: Props) => {

    if (!name?.length) return null
    return (
        <div className='w-full flex justify-start items-center font-bold'>
            <p className='text-black'>{name} is typing ...</p>

        </div>
    )
}
