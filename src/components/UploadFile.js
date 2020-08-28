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
    let wordCount = content
      .split(/<[^\s>]*>/g)
      .slice(1)
      .map((line) => {
        return line.match(/\b(\w\w*)\b/g).length;
      });
    let username = content
      .split(/[\s|\n]/g)
      .filter((word) => word.match(/<[^\s>]*>/g))
      .map((name) => {
        return name.substr(1, name.length - 2);
      });
    // console.log("username", username, "wordCount", wordCount);
    username.forEach((user, index) => {
      usersObject[user] = (usersObject[user] || 0) + wordCount[index];
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
    setSorted(sortable);
    console.log(sorted, "latest result");
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
        // onChange={(e) => readFile(e)}
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
