import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import QRCode from "qrcode.react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ExcelTable2() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const qrCodeRef = useRef(null);
  const handleFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryData = e.target.result;
      const workbook = XLSX.read(binaryData, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const options = { header: 1, dateNF: "mm/dd/yy" };
      const rows = XLSX.utils.sheet_to_json(worksheet, options);
      setData(rows);
      setError("");
    };
    reader.readAsBinaryString(file);
  };
  const handleRowSelect = (rowIndex) => {
    if (selectedRows.includes(rowIndex)) {
      setSelectedRows(selectedRows.filter((row) => row !== rowIndex));
    } else {
      setSelectedRows([...selectedRows, rowIndex]);
    }
  };
  // const generateQrCode = () => {
  //   const qrData = selectedRows.map((rowIndex) => data[rowIndex]).join("\n");
  //   return <QRCode value={qrData} />;
  // };
  // const generateQrCodes = () => {
  //   return selectedRows.map((rowIndex) => {
  //     const qrData = data[rowIndex - 1].join("\n");
  //     return <QRCode key={rowIndex} value={qrData} />;
  //   });
  // };
  const generateQrCodes = () => {
    const qrCodes = [];
    selectedRows.forEach((rowIndex) => {
      const rowData = data[rowIndex - 1];
      const qrData = rowData.slice(1).join("\n");
      qrCodes.push(
        <div key={rowIndex}>
          <h6>{rowData[0]}</h6>
          <QRCode value={qrData} />
        </div>
      );
    });
    return qrCodes;
  };

  const handleSaveAsPNG = () => {
    if (qrCodeRef.current !== null) {
      const canvas = qrCodeRef.current.getElementsByTagName("canvas")[0];
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "qr-code.png";
      downloadLink.href = pngUrl;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };
  return (
    <div className="container p-5 my-5">
      <div className="row">
        <div className="col-12">
          <input
            type="file"
            className="form-control mb-3"
            accept=".xls,.xlsx"
            onChange={handleFile}
          />
          {error && <div className="alert alert-danger">{error}</div>}
          {data.length > 0 && (
            <div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    {data[0] &&
                      data[0].map((cell, i) => <th key={i}>{cell}</th>)}
                    <th>QR Code</th>
                  </tr>
                </thead>
                <tbody>
                  {data.slice(1).map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j}>{cell}</td>
                      ))}
                      <td>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleRowSelect(i + 2)}
                        >
                          {selectedRows.includes(i + 2) ? "Deselect" : "Select"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {selectedRows.length > 0 && (
                <div className="my-3">
                  <h5>Selected Rows:</h5>
                  <pre>
                    {selectedRows
                      .map((rowIndex) => JSON.stringify(data[rowIndex - 1]))
                      .join("\n")}
                  </pre>
                  <h5>QR Code:</h5>

                  <div style={{ maxWidth: "600px", margin: "auto" }}>
                    <div ref={qrCodeRef}>
                      {generateQrCodes().map((qrCode) => qrCode)}
                    </div>

                    <button
                      className="btn btn-primary mt-3"
                      onClick={handleSaveAsPNG}
                    >
                      Save QR as PNG
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
