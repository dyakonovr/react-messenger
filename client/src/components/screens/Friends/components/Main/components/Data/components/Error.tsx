import { Typography } from "@/src/components/ui";

export function FriendsListDataError({ error }: { error: Error }) {
  return (
    <Typography variant="subtitle">Error: {error.message}. Try to reload page</Typography>
  );
}