import { Heading } from "@/components/heading"
import { SectionItem } from "@/components/section-item"
import { tempPeople } from "@/utils/constants"

const PeopleSection = () => {

  const RenderPeople = () => {
    if (!tempPeople.length) return null
    return tempPeople.map((each) => (
      <SectionItem
        {...each}
      />
    ))
  }

  return (
    <div className="md:col-span-3 flex flex-col">
      <Heading text="People" />
      <div className="max-h-screen max-w-screen overflow-auto flex md:flex-col gap-4">
        <RenderPeople />
      </div>
    </div>
  )
}

export { PeopleSection }
