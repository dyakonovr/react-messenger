import { Typography } from "@/src/components/ui";

export function FriendsListDataError({ error }: { error: Error | null }) {
  if (!error) return null;
  return (
    <Typography variant="subtitle">Error: {error.message}. Try to reload page</Typography>
  );
}
