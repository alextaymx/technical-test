import React, { useState, useContext } from "react";
import { ResultContext } from "../contexts.js/ResultContext";

const UploadFile = () => {
  const [fileName, setFilename] = useState("No file chosen");
  const [sorted, setSorted] = useState([]);
  const { updateResult } = useContext(ResultContext);
  let wordCount = [];
  let username = [];

  const readFile = async (e) => {
    e.preventDefault();
    setSorted([]);
    var fileType = /text.*/;
    if (e.target.files[0] && e.target.files[0].type.match(fileType)) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        e.target.result
          .split(/<[^\s>]*>/g)
          .slice(1)
          .forEach((line) => {
            wordCount.push(line.match(/\b(\w\w*)\b/g).length);
          });
        // console.log(e.target.result.split(/<[^\s>]*>/g));
        username = e.target.result
          .split(/[\s|\n]/g)
          .filter((word) => word.match(/<[^\s>]*>/g))
          .map((name) => {
            console.log(name.substr(1, name.length - 2));
            return name.substr(1, name.length - 2);
          });

        console.log("username", username, "wordCount", wordCount);
        let users = {};

        username.forEach((user, index) => {
          // console.log(user.substr(1, user.length - 1));
          users[user] = (users[user] || 0) + wordCount[index];
        });
        var sortable = [];
        for (var user in users) {
          sortable.push({
            id: Math.floor(Math.random() * 100000),
            user,
            count: users[user],
          });
        }
        sortable.sort((b, a) => {
          return a.count - b.count;
        });
        console.log(sortable, "from latest one");
        setSorted(sortable);
        // setContent(
        //   e.target.result.split("\n").filter((line) => line[0] === "<")
        // );
      };
      reader.readAsText(e.target.files[0]);
      setFilename(e.target.files[0].name);
      e.target.value = "";
    } else {
      setFilename("Invalid file type !");
      alert("Invalid file type !");
    }
  };

  return (
    <div>
      <h5>Upload a log file (.txt)</h5>
      <input type="file" onChange={(e) => readFile(e)} id="myFileInput" />
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
