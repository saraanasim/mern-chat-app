'use client'
import { useAppSelector } from "@/redux/hooks"
import { SectionItem } from "./section-item"
import { selectAllUsers } from "@/redux/selectors/chatsSlice.selectors"

export const RenderPeople = () => {
    const allPeople=useAppSelector(selectAllUsers)
    if (!allPeople.length) return null
    return allPeople.map((each) => (
      <SectionItem
        {...each}
      />
    ))
  }
