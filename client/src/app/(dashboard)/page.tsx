import { AuthApi } from "@/lib/api/auth.api";
import ChatSection from "./_components/chat.section";
import { settlePromises } from "@/utils/helpers";

const fetchData = async () => {
  try {

    const [allUsers] = await settlePromises([
      AuthApi.getAllUsers(),
    ]);

    return { allUsers };
  } catch (error) {
    console.error(error);
    return { branding: null };
  }
};

export default async function Home() {
  const {allUsers}=await fetchData()
  return (
    <div className="flex-grow md:col-span-6">
      <ChatSection allUsers={allUsers}/>
    </div>
  );
}
