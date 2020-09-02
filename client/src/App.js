import React from "react";
import "./App.css";
import Results from "./components/Results";
import UploadFile from "./components/UploadFile";
import { ResultContextProvider } from "./contexts.js/ResultContext";

function App() {
  return (
    <>
      <ResultContextProvider>
        <div className="row container">
          <div className="col s6">
            <UploadFile />
          </div>
          <div className="col s6">
            <Results />
          </div>
        </div>
      </ResultContextProvider>
    </>
  );
}

export default App;
