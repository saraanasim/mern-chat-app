import React from 'react'
import { Avatar } from './avatar'

type Props = {
    src: string
    alt: string
    name: string
    desc: string
}

const SectionItem = ({ name, desc, ...avatarProps }: Props) => {

    return (
        <div className='flex flex-col md:flex-row gap-4'>
            <Avatar {...avatarProps} />
            <div className='flex flex-col'>
                <p className='font-bold'>{name}</p>
                <p className='hidden md:block text-gray-600'>{desc}</p>
            </div>
        </div>
    )
}

export { SectionItem }