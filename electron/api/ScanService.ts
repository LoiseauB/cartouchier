import fsSync from "fs";
import fs from "fs/promises";
import path from "path";

export type ScanResultType = {
  folders: string[];
  files: { name: string; path: string }[];
};

export class ScanService {
  constructor(
    private readonly directory: string,
    private readonly audioExtensions: RegExp = /\.(mp3|ogg|wav|m4a|aac|flac)$/i,
  ) {
    this.directory = directory;
  }

  /*
   * Scans the directory to get folders and files
   * @param folder - The folder to scan
   * @returns Promise<ScanResultType> - The folders and files name/path
   */
  async scanFolders(folder?: string): Promise<ScanResultType> {
    const folderPath = path.join(this.directory, folder || "");
    if (!fsSync.existsSync(folderPath))
      throw new Error("Folder does not exist");
    const result: ScanResultType = { folders: [], files: [] };
    const files = await fs.readdir(folderPath, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile() && this.audioExtensions.test(file.name)) {
        const filePath = path.join(folderPath, file.name);
        result.files.push({ name: file.name, path: filePath });
      } else if (file.isDirectory()) {
        result.folders.push(file.name);
      }
    }
    return result ;
  }
}
