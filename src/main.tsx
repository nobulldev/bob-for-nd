import { createRoot } from "react-dom/client";
import { initGA } from "./lib/googleAnalytics.ts";
import App from "./App.tsx";
import "./index.css";

initGA();

createRoot(document.getElementById("root")!).render(<App />);
