'use client'
import { useAppSelector } from "@/redux/hooks"
import { selectAllGroups } from "@/redux/selectors/groupsSlice.selectors"
import { SectionItem } from "./section-item"

export const GroupsList = () => {
  const allGroups = useAppSelector(selectAllGroups)
  if (!allGroups.length) return null
  return allGroups.map((each) => (
    <SectionItem
      desc="Default Group"
      name={each.chatName}
      pic={each.photo || ''}
    />
  ))
}
