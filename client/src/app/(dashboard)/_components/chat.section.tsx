'use client'

import { setAllUsers } from '@/redux/chatsSlice'
import { useAppDispatch } from '@/redux/hooks'
import { IUser } from '@/utils/types'
import { useEffect } from 'react'
type Props={
    allUsers:IUser[]
}

const ChatSection = ({allUsers}:Props) => {
    const dispatch=useAppDispatch()
    useEffect(()=>{
        console.log({allUsers})
        dispatch(setAllUsers(allUsers))
    },[])


  return (
    <div>ChatSection</div>
  )
}

export default ChatSection