import { Button, Typography } from "@/src/components/ui";
import { Plus as PlusIcon, X as DeleteIcon } from "lucide-react";
import Image from "next/image";

function FriendItem() {
  return (
    <div className="flex rounded-2xl bg-[var(--main-color)] p-4 transition-colors">
      <Image
        src="https://avatar.iran.liara.run/public/9"
        width={48}
        height={48}
        alt="User avatar"
        className="mb-auto"
      />
      <Typography variant="regular" tag="p" className="ms-4 font-bold text-white">
        Pink Panda
      </Typography>
      <Button variant="transparent" className="ms-auto border-2 border-white bg-white">
        {1 ? <PlusIcon /> : <DeleteIcon />}
      </Button>
    </div>
  );
}

export default FriendItem;
