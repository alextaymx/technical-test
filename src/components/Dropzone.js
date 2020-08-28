import React, { useEffect } from "react";

export const Dropzone = ({ handleFileChosen }) => {
  const handleFileSelect = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.
    console.log(evt);
    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, file; (file = files[i]); i++) {
      handleFileChosen(file);
      output.push(
        "<li><strong>",
        escape(file.name),
        "</strong> (",
        file.type || "n/a",
        ") - ",
        file.size,
        " bytes, last modified: ",
        file.lastModifiedDate
          ? file.lastModifiedDate.toLocaleDateString()
          : "n/a",
        "</li>"
      );
    }
    document.getElementById("list").innerHTML =
      "<ul>" + output.join("") + "</ul>";
  };

  const handleDragOver = (evt) => {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
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
      <output id="list"></output>
    </div>
  );
};
