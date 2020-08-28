import React, { useState, useEffect, useContext } from "react";
import { ResultContext } from "../contexts.js/ResultContext";

const UploadFile = () => {
  const [content, setContent] = useState("");
  const [sorted, setSorted] = useState([]);
  const { results, updateResult } = useContext(ResultContext);

  useEffect(() => {
    let users = {};
    content &&
      content.forEach((line) => {
        const [username, words] = line.substr(1).split("> ");
        const count = words.match(/\s/g).length;
        users[username] = (users[username] || 0) + count;
      });
    console.log(users);
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
    setSorted(sortable);
    return () => {};
  }, [content]);

  const readFile = async (e) => {
    e.preventDefault();
    var fileType = /text.*/;
    if (e.target.files[0] && e.target.files[0].type.match(fileType)) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        setContent(
          e.target.result.split("\n").filter((line) => line[0] === "<")
        );
      };
      reader.readAsText(e.target.files[0]);
    } else {
      alert("Invalid file type !");
    }
  };

  return (
    <div>
      <h5>Upload a log file (.txt)</h5>
      <input type="file" onChange={(e) => readFile(e)} />
      <button
        onClick={() => {
          updateResult(sorted);
        }}
      >
        Upload
      </button>
    </div>
  );
};

export default UploadFile;
