import type { IFriendsPageUser } from "@/src/types/features/user";
import { FriendsHeader, FriendsList } from "./components";

function FriendsPage({ users }: { users: IFriendsPageUser[] }) {
  return (
    <div className="default-page-offset flex flex-col gap-5">
      <FriendsHeader />
      <FriendsList users={users} />
    </div>
  );
}

export default FriendsPage;
