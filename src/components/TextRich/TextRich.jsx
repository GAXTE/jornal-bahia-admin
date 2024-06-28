import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const TextRich = ({ value = "", onChange }) => {
  const [text, setText] = useState(value);

  const handleChange = (content) => {
    setText(content);
    if (onChange) {
      onChange(content);
    }
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <div>
      <ReactQuill
        value={text}
        onChange={handleChange}
        modules={modules}
        style={{ maxWidth: "500px", maxHeight: "500px", overflowY: "auto" }}
      />
    </div>
  );
};
