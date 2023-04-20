import React, { useState } from "react";
import Barcode from "react-barcode";

function ISBN13Barcode() {
  const [isbn, setIsbn] = useState("");

  const handleInputChange = (event) => {
    setIsbn(event.target.value);
  };

  // Remove any non-digit characters from the input
  const digits = isbn.replace(/\D/g, "");

  // Add dashes to the ISBN string for display purposes
  const formattedIsbn = `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 9)}-${digits.slice(9, 12)}-${digits.slice(12)}`;

  return (
    <div>
      <label htmlFor="isbnInput">Enter ISBN-13:</label>
      <input id="isbnInput" type="text" value={isbn} onChange={handleInputChange} />
      <br />
      <Barcode value={digits} format="EAN13" />
      <p>{formattedIsbn}</p>
    </div>
  );
}

export default ISBN13Barcode;
