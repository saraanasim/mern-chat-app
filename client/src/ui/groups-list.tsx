'use client'
import { setActiveChat, setChatLoading } from "@/redux/chatsSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { selectAllGroups } from "@/redux/selectors/chatsSlice.selectors"
import { IChat } from "@/utils/types"
import { SectionItem } from "./section-item"

export const GroupsList = () => {
  const dispatch = useAppDispatch()

  const allGroups = useAppSelector(selectAllGroups)

  const onGroupClick = async (groupId: string) => {
    //Set loading
    dispatch(setChatLoading(true))

    const existingChat = allGroups.find((each) => each._id === groupId)

    dispatch(setActiveChat(existingChat as IChat))

    dispatch(setChatLoading(false))
  }
  if (!allGroups.length) return null
  return allGroups.map((each) => (
    <SectionItem
      desc="Default Group"
      name={each.chatName}
      pic={each.photo || ''}
      onClick={onGroupClick}
      id={each._id}
    />
  ))
}
