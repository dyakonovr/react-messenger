import { FriendsList } from "@/src/components/screens/Friends";
import { Typography } from "@/src/components/ui";

function FriendsPage() {
  return (
    <div className="p-[30px]">
      <Typography tag="h1" variant="title">
        Friends
      </Typography>
      <FriendsList />
    </div>
  );
}

export default FriendsPage;
