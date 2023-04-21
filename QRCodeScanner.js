import React, { useState } from 'react';
import QrReader from 'react-qr-reader';

export default function QRCodeScanner() {
  const [qrData, setQrData] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setQrData(data);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      <p>{qrData}</p>
    </div>
  );
}
