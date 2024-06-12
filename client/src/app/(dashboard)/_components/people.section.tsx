import { Heading } from "@/ui/heading"
import { RenderPeople } from "@/ui/people-list"

const PeopleSection = () => {

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
