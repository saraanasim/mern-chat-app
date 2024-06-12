'use client'

import { setAllGroups, setAllUsers } from '@/redux/chatsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { IGroup, IUser } from '@/utils/types'
import { useEffect } from 'react'
import { PersonalChat } from './personal-chat'
import { setActiveUser } from '@/redux/activeUserSlice'
import { selectActiveChat } from '@/redux/selectors/chatsSlice.selectors'
type Props = {
  allUsers: IUser[],
  allGroups: IGroup[]
  activeUser: IUser
}

const ChatSection = ({ allUsers, allGroups,activeUser }: Props) => {
  const dispatch = useAppDispatch()
  const activeChat = useAppSelector(selectActiveChat)

  useEffect(() => {
    dispatch(setAllUsers(allUsers))
    dispatch(setAllGroups(allGroups))
    dispatch(setActiveUser(activeUser))
  }, [])


  return (
    <div>
     {activeChat && <PersonalChat />}
    </div>
  )
}

export default ChatSection