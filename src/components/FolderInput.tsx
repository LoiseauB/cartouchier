import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";

export function FolderInput({
  onFolderSelect,
  placeholder = "Aucun dossier sélectionné",
}: {
  onFolderSelect: (files: FileList | null) => void;
  placeholder?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState<string>("");

  const handleClick = async () => {
    const result = await window.ipcRenderer.invoke("choose-folder");
    if (result) setValue(result);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log("dossier: " + e.target.value);
      onFolderSelect(e.target.files);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="text"
        readOnly
        value={value}
        placeholder={placeholder}
        className="w-full"
      />
      <Button type="button" onClick={handleClick}>
        Parcourir
      </Button>
      <input
        type="file"
        ref={inputRef}
        onChange={handleChange}
        {...{
          webkitdirectory: "",
          directory: "",
        }}
        className="hidden"
      />
    </div>
  );
}
