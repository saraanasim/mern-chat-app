import React from 'react'
import { MessageItem } from './message-item'
import { SocketMessage } from '@/utils/types'

type Props={
    messages:SocketMessage[]
}

export const Messages = ({messages}:Props) => {
  return (
    <div className='flex flex-col gap-4'>
        {messages.map((each)=><MessageItem {...each}/>)}
    </div>
  )
}
