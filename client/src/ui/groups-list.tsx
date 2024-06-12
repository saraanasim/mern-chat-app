'use client'
import { useAppSelector } from "@/redux/hooks"
import { SectionItem } from "./section-item"
import { selectAllGroups } from "@/redux/selectors/chatsSlice.selectors"

export const GroupsList = () => {
  const allGroups = useAppSelector(selectAllGroups)

  const onPersonClick = (userId: string) => {
    // dispatch(setActiveRecipient(userId))
  }
  if (!allGroups.length) return null
  return allGroups.map((each) => (
    <SectionItem
      desc="Default Group"
      name={each.chatName}
      pic={each.photo || ''}
      onClick={onPersonClick}
      id={each._id}
    />
  ))
}
