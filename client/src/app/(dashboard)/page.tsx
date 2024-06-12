import { AuthApi } from "@/lib/api/auth.api";
import ChatSection from "./_components/chat.section";
import { settlePromises } from "@/utils/helpers";
import { ChatApi } from "@/lib/api/chat.api";

const fetchData = async () => {
  try {
    const [allUsers, allGroups,activeUser] = await settlePromises([
      AuthApi.getAllUsers(),
      ChatApi.fetchAllGroups(),
      AuthApi.validUser()
    ]);
    return { allUsers,allGroups,activeUser };
  } catch (error) {
    console.error(error);
    return { branding: null };
  }
};

export default async function Home() {
  const { allUsers, allGroups,activeUser } = await fetchData()
  return (
    <div className="flex-grow md:col-span-6">
      <ChatSection allUsers={allUsers} allGroups={allGroups} activeUser={activeUser?.user}/>
    </div>
  );
}
