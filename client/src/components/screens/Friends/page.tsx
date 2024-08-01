import { FriendsHeader, FriendsMain } from "./components";

function FriendsPage() {
  return (
    <div className="default-page-offset flex flex-col gap-5">
      <FriendsHeader />
      <FriendsMain />
    </div>
  );
}

export default FriendsPage;
