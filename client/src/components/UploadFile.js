import React, { useState, useContext } from "react";
import { ResultContext } from "../contexts.js/ResultContext";
import { Dropzone } from "./Dropzone";
import axios from "axios";

const UploadFile = () => {
    const [inputKey, setInputKey] = useState(Date.now());
    const [fileDetails, setFileDetails] = useState([]);
    const { updateResult } = useContext(ResultContext);
    //new state
    const [selectedFiles, setSelectedFiles] = useState([]);

    //new function
    const onChangeHandler = (files) => {
        let flag = 1;
        let fileType = /text.*/;
        [...files].forEach((file) => {
            if (!file.type.match(fileType)) {
                alert("Invalid file type !");
                flag = 0;
            }
            const currentFileDetails = {
                // for display purpose
                name: file.name,
                type: file.type || "n/a",
                size: file.size,
                lastModifiedDate: file.lastModifiedDate
                    ? file.lastModifiedDate.toLocaleDateString()
                    : "n/a",
            };
            flag &&
                setFileDetails((prevArray) => [
                    ...prevArray,
                    currentFileDetails,
                ]);
        });
        flag && setSelectedFiles((prevArray) => [...prevArray, ...files]);
    };
    const onClickHandler = () => {
        const uploadData = new FormData();
        selectedFiles.forEach((file) => {
            uploadData.append("file", file);
        });
        axios
            .post("http://localhost:4000/upload", uploadData, {
                // receive two parameter endpoint url ,form data
            })
            .then((res) => {
                // then print response status
                console.log(res, "received from server");
                updateResult(res.data);
                setSelectedFiles([]);
                setFileDetails([]);
            });
    };

    return (
        <div>
            <h5>Upload a log file (.txt)</h5>
            <Dropzone
                onChangeHandler={onChangeHandler}
                fileDetails={fileDetails}
            />
            <input
                key={inputKey}
                type="file"
                accept=".txt"
                multiple
                onChange={(e) => {
                    setInputKey(Date.now());
                    onChangeHandler(e.target.files);
                }}
                id="myFileInput"
            />
            <label id="myFileLabel" htmlFor="myFileInput">
                Choose file
            </label>
            <span id="myFileName">
                {selectedFiles.length > 0
                    ? selectedFiles.length + " file(s) chosen"
                    : "No file chosen"}
            </span>
            <button
                disabled={selectedFiles.length < 1}
                onClick={onClickHandler}
            >
                Upload
            </button>
        </div>
    );
};

export default UploadFile;
