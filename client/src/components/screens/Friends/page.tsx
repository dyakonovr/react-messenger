import { UrlParamsProvider } from "@/src/providers/UrlParamProvider/provider";
import { FriendsHeader, FriendsMain } from "./components";

function FriendsPage() {
  return (
    <div className="default-page-offset flex flex-col gap-5">
      <UrlParamsProvider>
        <FriendsHeader />
        <FriendsMain />
      </UrlParamsProvider>
    </div>
  );
}

export default FriendsPage;
