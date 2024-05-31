import FriendsPage from "@/src/components/screens/Friends/page";
import UserService from "@/src/services/user";

async function Friends() {
  const allUsers = await UserService.getAll();
  return <FriendsPage users={allUsers} />;
}

export default Friends;
