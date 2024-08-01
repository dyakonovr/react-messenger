import { LoaderSpin, Typography } from "../../ui";

export function ApplicationLoader() {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen flex-col items-center justify-center gap-2 bg-[var(--main-color)] transition-colors">
      <LoaderSpin size="l" className="stroke-white" />
      <Typography variant="subtitle" className="max-w-[600px] text-center text-white">
        Please wait. We remember who you are, set your preferences...
      </Typography>
    </div>
  );
}
