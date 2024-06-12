import React from 'react'
import { Avatar } from './avatar'
import { IUser } from '@/utils/types'


const SectionItem = ({ name, bio, profilePic }: IUser) => {

    return (
        <div className='flex flex-col md:flex-row gap-4'>
            <Avatar
                name={name}
                profilePic={profilePic}
            />
            <div className='flex flex-col'>
                <p className='font-bold'>{name}</p>
                <p className='hidden md:block text-gray-600'>{bio}</p>
            </div>
        </div>
    )
}

export { SectionItem }