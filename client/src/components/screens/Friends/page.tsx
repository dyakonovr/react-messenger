import { FriendsHeader, FriendsList } from "./components";

function FriendsPage() {
  return (
    <div className="default-page-offset flex flex-col gap-5">
      <FriendsHeader />
      <FriendsList />
    </div>
  );
}

export default FriendsPage;
