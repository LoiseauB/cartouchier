import { useEffect, useState } from "react";
import { ScanResultType } from "../electron/api/ScanService";
import "./App.css";

function App() {
  const [folderToScan, setFolderToScan] = useState<string>("");
  const [scanResult, setScanResult] = useState<ScanResultType | null>(null);

  const handleScan = async () => {
    const result = await window.ipcRenderer.invoke("scanFolder", folderToScan);
    setScanResult(result);
  };
  
  useEffect(() => {
    handleScan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderToScan]);

  return (
    <>
      <h1>Vite + React</h1>
      <div>
        <button onClick={handleScan}>Scan</button>{" "}
        <button onClick={() => setFolderToScan("")}>reset</button>
      </div>
      {scanResult && (
        <section>
          <h2>Folders</h2>
          {scanResult.folders.length === 0 && <p>No folders found</p>}
          <ul>
            {scanResult.folders.map((folder) => (
              <li>
                <button
                onClick={() => {
                  setFolderToScan((prev) => prev + "/" + folder);
                  handleScan();
                }}
                key={folder}
              >
                🗂️ {folder}
                </button>
              </li>
            ))}
          </ul>
          <h2>Files</h2>
          {scanResult.files.length === 0 && <p>No files found</p>}
          <ul>
            {scanResult.files.map((file) => (
              <li key={file.name}>🎵 {file.name}</li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

export default App;
