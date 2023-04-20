// не работает!
import React, { useState } from "react";
import Barcode from "react-barcode";

function GS1128Barcode() {
  const [text, setText] = useState("");

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <label htmlFor="textInput">Enter Text:</label>
      <input id="textInput" type="text" value={text} onChange={handleInputChange} />
      <br />
      <Barcode value={text} format="GS1-128" />
      <p>{text}</p>
    </div>
  );
}

export default GS1128Barcode;
