'use client'
import { setActiveChat, setActiveRecipient, setChatLoading } from "@/redux/chatsSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { selectAllUsers } from "@/redux/selectors/chatsSlice.selectors"
import { SectionItem } from "./section-item"
import { ChatApi } from "@/lib/api/chat.api"

export const PeopleList = () => {
  const dispatch = useAppDispatch()

  const allPeople = useAppSelector(selectAllUsers)

  const onPersonClick = async (userId: string) => {
    dispatch(setActiveRecipient(userId));
    //Set loading
    dispatch(setChatLoading(true))

    //Find if there is any chat with current user and reciever
    const existingChat = await ChatApi.fetchExistingChat(userId)
    //IF there is none, create one or fetch one
    if (!existingChat) {
      const newChat = await ChatApi.createNewChat(userId)
      dispatch(setActiveChat(newChat))
    }
    else {
      dispatch(setActiveChat(existingChat))
    }

    dispatch(setChatLoading(false))
  }

  if (!allPeople.length) return null
  return allPeople.map((each) => (
    <SectionItem
      key={each._id}
      id={each._id}
      desc={each.bio}
      name={each.name}
      pic={each.profilePic}
      onClick={onPersonClick}
    />
  ))
}
