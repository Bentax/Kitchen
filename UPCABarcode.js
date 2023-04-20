import React, { useState } from "react";
import Barcode from "react-barcode";

function UPCABarcode() {
  const [digits, setDigits] = useState("");

  const handleInputChange = (event) => {
    setDigits(event.target.value);
  };

  return (
    <div>
      <label htmlFor="digitInput">Enter Digits:</label>
      <input
        id="digitInput"
        type="text"
        value={digits}
        onChange={handleInputChange}
      />
      <br />
      <Barcode value={digits} format="upc" width="1.5" height="50" />
      <p>{digits}</p>
    </div>
  );
}
