// переключатель мобильной камеры не работает
import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

function CameraView() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [facingMode, setFacingMode] = useState("environment");

  useEffect(() => {
    let stream;
    const constraints = { video: { facingMode: facingMode } };
    const turnCameraOn = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
        startReading();
      } catch (error) {
        console.error(error);
      }
    };
    const turnCameraOff = () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };
    const startReading = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const intervalId = setInterval(() => {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
        if (qrCode) {
          setQrCodeData(qrCode.data);
        }
      }, 100);
      return intervalId;
    };
    if (cameraOn) {
      turnCameraOn();
    } else {
      turnCameraOff();
    }
    return () => {
      if (stream) {
        turnCameraOff();
      }
    };
  }, [cameraOn, facingMode]);

  const toggleCamera = () => {
    setCameraOn((prev) => !prev);
    setQrCodeData(null);
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />
      <button onClick={toggleCamera}>
        {cameraOn ? "Turn off camera" : "Turn on camera"}
      </button>
      <button onClick={toggleCamera}>Phone Camera</button>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {qrCodeData && <p>QR code data: {qrCodeData}</p>}
    </div>
  );
}

export default CameraView;
