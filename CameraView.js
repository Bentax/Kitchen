import React, { useEffect, useRef, useState } from 'react';

function CameraView() {
  const videoRef = useRef(null);
  const [videoEnabled, setVideoEnabled] = useState(true);

  useEffect(() => {
    const constraints = { video: true };

    const successCallback = (stream) => {
      videoRef.current.srcObject = stream;
    };

    const errorCallback = (error) => {
      console.error(error);
    };

    if (videoEnabled) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(successCallback)
        .catch(errorCallback);
    } else {
      videoRef.current.srcObject = null;
    }

    return () => {
      if (videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [videoEnabled]);

  const toggleVideo = () => {
    setVideoEnabled((prev) => !prev);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />
      <button onClick={toggleVideo}>{videoEnabled ? 'Turn off' : 'Turn on'} video</button>
    </div>
  );
}

export default CameraView;
