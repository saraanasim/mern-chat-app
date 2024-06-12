import { AuthApi } from "@/lib/api/auth.api";
import ChatSection from "./_components/chat.section";
import { settlePromises } from "@/utils/helpers";
import { ChatApi } from "@/lib/api/chat.api";

const fetchData = async () => {
  try {
    const [allUsers, allGroups] = await settlePromises([
      AuthApi.getAllUsers(),
      ChatApi.fetchAllGroups(),
    ]);
console.log({allGroups})
    return { allUsers,allGroups };
  } catch (error) {
    console.error(error);
    return { branding: null };
  }
};

export default async function Home() {
  const { allUsers, allGroups } = await fetchData()
  return (
    <div className="flex-grow md:col-span-6">
      <ChatSection allUsers={allUsers} allGroups={allGroups} />
    </div>
  );
}
