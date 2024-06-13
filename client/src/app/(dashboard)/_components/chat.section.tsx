'use client'

import { setActiveUser } from '@/redux/activeUserSlice'
import { setAllGroups, setAllUsers } from '@/redux/chatsSlice'
import { useAppDispatch } from '@/redux/hooks'
import { IGroup, IUser } from '@/utils/types'
import { useEffect } from 'react'
import { Chat } from './chat'

type Props = {
  allUsers: IUser[],
  allGroups: IGroup[]
  activeUser: IUser
}

const ChatSection = ({ allUsers, allGroups, activeUser }: Props) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setAllUsers(allUsers))
    dispatch(setAllGroups(allGroups))
    dispatch(setActiveUser(activeUser))
  }, [])


  return (
    <div className='overflow-auto'>
      <Chat />
    </div>
  )
}

export default ChatSection