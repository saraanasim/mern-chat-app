import { Heading } from "@/ui/heading"
import { SectionItem } from "@/ui/section-item"
import { tempPeople } from "@/utils/constants"

const GroupsSection = () => {

  const RenderGroups = () => {
    if (!tempPeople.length) return null
    return tempPeople.map((each) => (
      <SectionItem
        {...each}
      />
    ))
  }

  return (
    <div className="md:col-span-3 flex flex-col border border-gray-300 p-4 rounded-lg">
      <Heading text="Groups" />
      <div className="max-h-screen max-w-screen overflow-auto flex md:flex-col gap-4">
        <RenderGroups />
      </div>
    </div>
  )
}

export { GroupsSection }
