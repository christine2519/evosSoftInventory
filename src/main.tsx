import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Container } from "@mui/material";
//import {I18next} from "../src/__i18next/I18next.ts";
import "./__i18next/I18next.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Container>
      <App />
    </Container>
  </StrictMode>
);
