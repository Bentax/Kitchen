// не работает
import React, { useState } from "react";
import Barcode from "react-barcode";

function EAN128Barcode() {
  const [text, setText] = useState("");

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <label htmlFor="textInput">Enter Text:</label>
      <input id="textInput" type="text" value={text} onChange={handleInputChange} />
      <br />
      <Barcode value={text} format="EAN-128" />
      <p>{text}</p>
    </div>
  );
}

export default EAN128Barcode;
