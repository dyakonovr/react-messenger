import { Button, Input, Typography } from "@/src/components/ui";

export function FriendsHeader() {
  return (
    <div className="flex items-center">
      <Typography tag="h1" variant="title">
        Friends
      </Typography>
      <Input placeholder="Start typing..." className="ml-5 mr-7 w-full max-w-[500px]" />
      <Button variant="contained" className="h-fit py-1.5">
        All&nbsp;users
      </Button>
      <Button variant="contained" className="ml-2 h-fit py-1.5">
        Only&nbsp;friends
      </Button>
    </div>
  );
}
