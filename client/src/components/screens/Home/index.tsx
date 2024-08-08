import HomePage from "./page";
import { DialogsDataProvider } from "./providers/DialogsDataProvider";
import { SelectedChatProvider } from "./providers/SelectedChatProvider";

function Home() {
  return (
    <DialogsDataProvider>
      <SelectedChatProvider>
        <HomePage />
      </SelectedChatProvider>
    </DialogsDataProvider>
  );
}

export default Home;
