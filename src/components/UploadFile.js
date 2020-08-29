import React, { useState, useContext } from "react";
import { ResultContext } from "../contexts.js/ResultContext";
import { Dropzone } from "./Dropzone";
const UploadFile = () => {
  const [sorted, setSorted] = useState([]);
  const [fileName, setFilename] = useState("No file chosen");
  const { updateResult } = useContext(ResultContext);
  let fileReader;

  const handleFileRead = (e) => {
    const content = fileReader.result;
    // console.log("read successful! ", content);
    let usersObject = {}; //to count their chat words
    let currentUser = "undefine user";
    content.split(/\s+/g).forEach((word) => {
      word.match(/<\S+>/g)
        ? (currentUser = word.slice(1, -1))
        : (usersObject[currentUser] =
            (usersObject[currentUser] || 0) + (word !== "" && 1));
    });

    let sortable = [];
    for (var user in usersObject) {
      sortable.push({
        id: Math.floor(Math.random() * 100000),
        user,
        count: usersObject[user],
      });
    }
    sortable.sort((a, b) => {
      return b.count - a.count;
    });
    console.log(sortable, "sortable result");
    setSorted(sortable);
    console.log(sorted, "transferred! sorted array is empty now");
  };

  const handleFileChosen = async (file, e = null) => {
    // let file = e.target.files[0];
    setSorted([]);
    let fileType = /text.*/;
    if (file && file.type.match(fileType)) {
      fileReader = new FileReader();
      fileReader.onloadend = handleFileRead;
      fileReader.readAsText(file);
      setFilename(file.name);
      e != null ? (e.target.value = "") : (e = null); //reset value
    } else {
      setFilename("Invalid file type !");
      alert("Invalid file type !");
    }
  };

  return (
    <div>
      <h5>Upload a log file (.txt)</h5>
      <Dropzone handleFileChosen={handleFileChosen} />
      <input
        type="file"
        accept=".txt"
        onChange={(e) => handleFileChosen(e.target.files[0], e)}
        id="myFileInput"
      />
      <label id="myFileLabel" htmlFor="myFileInput">
        Choose file
      </label>
      <span id="myFileName">{fileName}</span>
      <button
        disabled={sorted.length < 1}
        onClick={() => {
          updateResult(sorted);
          setSorted([]);
        }}
      >
        Upload
      </button>
    </div>
  );
};

export default UploadFile;
