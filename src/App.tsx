import { FileSearchIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { ScanResultType } from "../electron/api/ScanService";
import Folder from "./components/Folder";
import { ThemeProvider } from "./components/theme-provider";
import { Accordion } from "./components/ui/accordion";
import { Button } from "./components/ui/button";

function App() {
  const [scanResult, setScanResult] = useState<ScanResultType | null>(null);

  const handleScan = async () => {
    const result = await window.ipcRenderer.invoke("scanFolder");
    setScanResult(result);
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <main className="relative flex flex-col mx-auto justify-center items-center gap-6 my-10">
        <div>
          <Button onClick={handleScan} variant="outline" size="lg">
            <FileSearchIcon size={8} className="size-8"/>
            Scan
          </Button>{" "}
        </div>
        {scanResult && (
          <section className="w-8/12">
            <Accordion multiple>
              <h2>Folders</h2>
              {scanResult.folders.length === 0 && <p>No folders found</p>}
              {scanResult.folders.map((folder) => (
                <Folder key={folder} folder={folder} />
              ))}
            </Accordion>
          </section>
        )}
      </main>
    </ThemeProvider>
  );
}

export default App;
