import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function ExcelReader() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const handleFile = (event) => {
    const file = event.target.files[0];
    const fileType = file.type;

    if (
      fileType === "application/vnd.ms-excel" ||
      fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const binaryData = e.target.result;
        const workbook = XLSX.read(binaryData, { type: "binary" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const options = { header: 1, dateNF: 'm/d/yy' }; // Add dateNF option to parse dates correctly
        const rows = XLSX.utils.sheet_to_json(worksheet, options);
        setData(rows);
        setError('');
      };

      reader.readAsBinaryString(file);
    } else {
      setData([]);
      setError("Invalid file type. Please select an Excel file (.xls or .xlsx)");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFile} />
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            {data[0] && data[0].map((header) => <th key={header}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, index) => (
            <tr key={index}>
              {row.map((cell, index) => (
                <td key={index}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
