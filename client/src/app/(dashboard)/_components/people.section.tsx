import { Heading } from "@/ui/heading"
import { PeopleList } from "@/ui/people-list"

const PeopleSection = () => {

  return (
    <div className="md:col-span-3 flex flex-col">
      <Heading text="People" />
      <div className="max-h-screen max-w-screen overflow-auto flex md:flex-col gap-4">
        <PeopleList />
      </div>
    </div>
  )
}

export { PeopleSection }
