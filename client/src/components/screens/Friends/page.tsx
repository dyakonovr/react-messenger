import { FriendsHeader, FriendsList } from "./components";

function FriendsPage() {
  return (
    <div className="flex flex-col gap-5 p-[30px]">
      <FriendsHeader />
      <FriendsList />
    </div>
  );
}

export default FriendsPage;
