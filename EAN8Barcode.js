import React, { useState } from "react";
import Barcode from "react-barcode";

function EAN8Barcode() {
  const [ean8, setEAN8] = useState("");

  const handleInputChange = (event) => {
    setEAN8(event.target.value);
  };

  // Remove any non-digit characters from the input
  const digits = ean8.replace(/\D/g, "");

  return (
    <div>
      <label htmlFor="ean8Input">Enter EAN-8:</label>
      <input id="ean8Input" type="text" value={ean8} onChange={handleInputChange} />
      <br />
      <Barcode value={digits} format="EAN8" />
      <p>{digits}</p>
    </div>
  );
}

export default EAN8Barcode;
