import { FileSearchIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { ScanResultType } from "../../electron/api/ScanService";
import Folder from "./Folder";
import { Accordion } from "./ui/accordion";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const FoldersCard = () => {
  const [scanResult, setScanResult] = useState<ScanResultType | null>(null);

  const handleScan = async () => {
    const result = await window.ipcRenderer.invoke("scanFolder");
    setScanResult(result);
  };

  return (
    <Card className="w-1/2 h-[92.5vh]">
      <CardHeader className="flex flex-col items-center gap-3">
        <CardTitle className="text-2xl font-semibold">Musiques</CardTitle>
        <div>
          <Button onClick={handleScan} variant="secondary" size="lg">
            <FileSearchIcon size={8} className="size-8" />
            Scanner les musiques
          </Button>{" "}
        </div>
      </CardHeader>
      <CardContent className="overflow-y-scroll">
        {scanResult && (
          <section className="w-8/12">
            <Accordion multiple>
              <h2>Dossiers</h2>
              {scanResult.folders.length === 0 && <p>Pas de fichier trouvé</p>}
              {scanResult.folders.map((folder) => (
                <Folder key={folder} folder={folder} />
              ))}
            </Accordion>
          </section>
        )}
      </CardContent>
    </Card>
  );
};

export default FoldersCard;
