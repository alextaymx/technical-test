import React, { useEffect } from "react";

export const Dropzone = ({ onChangeHandler, fileDetails }) => {
    const handleFileSelect = (evt) => {
        evt.stopPropagation();
        evt.preventDefault();

        var files = evt.dataTransfer.files; // FileList object.
        // files is a FileList of File objects. List some properties.
        onChangeHandler(files);
    };

    const handleDragOver = (evt) => {
        if (
            window.File &&
            window.FileReader &&
            window.FileList &&
            window.Blob
        ) {
            // Great success! All the File APIs are supported.
        } else {
            alert("The File APIs are not fully supported in this browser.");
        }
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = "copy"; // Explicitly show this is a copy.
    };
    useEffect(() => {
        console.log("object");
        var dropZone = document.getElementById("drop_zone");
        dropZone.addEventListener("dragover", handleDragOver, false);
        dropZone.addEventListener("drop", handleFileSelect, false);
        return () => {
            dropZone.removeEventListener("dragover", handleDragOver, false);
            dropZone.removeEventListener("drop", handleFileSelect, false);
        };
    }, []); //not sure how to deal with listeners in effect hook

    return (
        <div className="mydrop">
            <div id="drop_zone">Drop files here</div>
            <output id="list">
                <ul>
                    {fileDetails.map((currentDetails, idx) => {
                        return (
                            <li key={idx}>
                                <strong>{currentDetails.name + " ("}</strong>
                                {currentDetails.type + ")"} -{" "}
                                {currentDetails.size +
                                    " bytes, last modified: "}
                                {currentDetails.lastModifiedDate}
                            </li>
                        );
                    })}
                </ul>
            </output>
        </div>
    );
};
