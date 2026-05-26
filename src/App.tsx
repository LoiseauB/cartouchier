import { useState } from "react";
import FoldersCard from "./components/FoldersCard";
import RootFolderForm from "./components/RootFolderForm";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";

function App() {
  const [page, setPage] = useState<"app" | "settings">("app");
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <header className="w-full flex justify-center px-2">
        <div className="w-full relative top-0 left-0 border-2 border-t-0 border-foreground/10 min-h-5 p-2">
          <nav>
            <Button
              onClick={() => setPage("app")}
              variant="link"
              className="text-foreground font-semibold text-xl"
            >
              Application
            </Button>
            <Button
              onClick={() => setPage("settings")}
              variant="link"
              className="text-foreground font-semibold text-xl"
            >
              Paramètres
            </Button>
          </nav>
        </div>
      </header>
      <main className="relative flex gap-2 p-2 items-stretch">
        {page === "app" && <FoldersCard />}
        {page === "settings" && (
          <div className="w-full">
            <RootFolderForm />
          </div>
        )}
      </main>
    </ThemeProvider>
  );
}

export default App;
