import React from "react";
import Barcode from "react-barcode";

function EAN13Barcode({ digits }) {
  // Add leading zeros to the digits string until it is 13 characters long
  while (digits.length < 13) {
    digits = "0" + digits;
  }

  return (
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
  );
}

export default EAN13Barcode;
