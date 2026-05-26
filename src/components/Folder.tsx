import { FolderIcon, FolderOpenIcon, MusicNoteIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { ScanResultType } from "../../electron/api/ScanService";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const Folder = ({
  folder,
  parentFolder,
}: {
  folder: string;
  parentFolder?: string;
}) => {
  const [scanResult, setScanResult] = useState<ScanResultType | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleScan = async () => {
    const result = await window.ipcRenderer.invoke(
      "scanFolder",
      parentFolder ? `${parentFolder}/${folder}` : folder,
    );
    setScanResult(result);
  };
  return (
    <AccordionItem>
      <AccordionTrigger
        className="flex gap-4 items-center"
        onClick={() => {
          handleScan();
          setIsOpen(!isOpen);
        }}
        key={folder}
      >
        {isOpen ? (
          <FolderOpenIcon size={22} weight="fill" />
        ) : (
          <FolderIcon size={22} weight="fill" />
        )}{" "}
        {folder}
      </AccordionTrigger>
      {scanResult && (
        <AccordionContent className="ps-4">
          {scanResult.folders.map((subFolder) => (
            <Folder
              key={subFolder}
              folder={subFolder}
              parentFolder={parentFolder ? `${parentFolder}/${folder}` : folder}
            />
          ))}
          <h2>Musiques :</h2>
          {scanResult.files.length === 0 && <p>Aucun fichier trouvé</p>}
          <ul>
            {scanResult.files.map((file) => (
              <li key={file.name} className="flex gap-1"><MusicNoteIcon size={12} /> {file.name}</li>
            ))}
          </ul>
        </AccordionContent>
      )}
    </AccordionItem>
  );
};

export default Folder;
