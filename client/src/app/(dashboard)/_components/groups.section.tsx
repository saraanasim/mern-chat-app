import { GroupsList } from "@/ui/groups-list"
import { Heading } from "@/ui/heading"

const GroupsSection = () => {

  return (
    <div className="md:col-span-3 flex flex-col border border-gray-500 p-4 rounded-lg">
      <Heading text="Groups" />
      <div className="max-h-screen max-w-screen overflow-auto flex md:flex-col gap-4">
        <GroupsList />
      </div>
    </div>
  )
}

export { GroupsSection }
