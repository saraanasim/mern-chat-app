'use client'
import { useAppSelector } from "@/redux/hooks"
import { selectAllUsers } from "@/redux/selectors/chatsSlice.selectors"
import { SectionItem } from "./section-item"

export const PeopleList = () => {
  const allPeople = useAppSelector(selectAllUsers)
  if (!allPeople.length) return null
  return allPeople.map((each) => (
    <SectionItem
      desc={each.bio}
      name={each.name}
      pic={each.profilePic}
    />
  ))
}
