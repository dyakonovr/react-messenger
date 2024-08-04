import toast from "react-hot-toast";
import type { ErrorSchema } from "../services/_core/validateTypes";
import { Typography } from "../components/ui";

export function fetchDataErrorToast(error: ErrorSchema) {
  console.error("Fetch Data Error:", error);
  toast.error(() => {
    return (
      <div>
        <Typography variant="regular" tag="h2" className="mb-2">
          {error.error}, (status code: {error.statusCode})
        </Typography>
        <Typography variant="regular" tag="p">
          {error.message}
        </Typography>
      </div>
    );
  });
}
