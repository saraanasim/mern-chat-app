import { useAppSelector } from '@/redux/hooks'
import { selectActiveUser } from '@/redux/selectors/activeUser.selectors'
import { mergeClasses } from '@/utils/helpers'
import { SocketMessage } from '@/utils/types'
import React from 'react'

export const MessageItem = (socketMessage: SocketMessage) => {
  const activeUser = useAppSelector(selectActiveUser)
  const isSender=activeUser._id===socketMessage.sender._id

  return (
    <div className={
      mergeClasses(
        'flex flex-col w-full justify-center p-4 bg-green-300/30',
       isSender ? 'items-start' : 'items-end'
       )}>
      <p className='font-bold'>{socketMessage.sender.name}</p>
      <p className='text-lg'>{socketMessage.message}</p>
    </div>
  )
}
