'use client'

import { setAllUsers } from '@/redux/chatsSlice'
import { setAllGroups } from '@/redux/groupsSlice'
import { useAppDispatch } from '@/redux/hooks'
import { IGroup, IUser } from '@/utils/types'
import { useEffect } from 'react'
type Props = {
  allUsers: IUser[],
  allGroups: IGroup[]
}

const ChatSection = ({ allUsers, allGroups }: Props) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    console.log({ allUsers })
    dispatch(setAllUsers(allUsers))
    dispatch(setAllGroups(allGroups))
  }, [])


  return (
    <div>ChatSection</div>
  )
}

export default ChatSection