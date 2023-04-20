import React, { useState } from "react";
import Barcode from "react-barcode";

function EAN13Barcode() {
  let [digits, setDigits] = useState("");

  const handleInputChange = (event) => {
    setDigits(event.target.value);
  };

  return (
    <div>
      <label htmlFor="digitsInput">Enter digits:</label>
      <input
        id="digitsInput"
        type="text"
        value={digits}
        onChange={handleInputChange}
      />
      <br />
      <Barcode
        value={digits}
        width={1.5}
        height={50}
        fontSize={14}
        margin={5}
        displayValue={false}
        background="#ffffff"
        lineColor="#000000"
      />
    </div>
  );
}

export default EAN13Barcode;
