import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "./ui/field";
import { Input } from "./ui/input";
import { FolderInput } from "./FolderInput";

const RootFolderForm = () => {
  const [rootFolder, setRootFolder] = useState<string>("");
  const handleFolderSelect = (files: FileList | null) => {
    if (files) {
      console.log("Dossier sélectionné :", Array.from(files).map(f => f.name));
      // Traite les fichiers ici (ex: upload, affichage, etc.)
    }
  };
  return (
    <Card>
      <CardContent>
        <form>
          <FieldGroup>
            <FieldSet>
              <Field>
                <FieldLabel>Chemin du dossier</FieldLabel>
                <FolderInput onFolderSelect={handleFolderSelect} />
                <FieldDescription>Séléctionnez le dossier où se trouve vos musiques.</FieldDescription>
              </Field>
            </FieldSet>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default RootFolderForm;
