import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { useNavigate } from "react-router-dom";

export function Test() {
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const [currentResolution, setCurrentResolution] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const videoNode = videoRef.current;
    const localStorageKey = "videoCurrentTime";
    const sessionStorageKey = "pageReloaded";

    if (videoNode && Hls.isSupported()) {
      const hlsInstance = new Hls();

      hlsInstance.loadSource(
        "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
      );
      hlsInstance.attachMedia(videoNode);

      const savedTime = parseFloat(localStorage.getItem(localStorageKey)) || 0;

      const onManifestParsed = () => {
        videoNode.currentTime = savedTime;
      };

      hlsInstance.on(Hls.Events.MANIFEST_PARSED, onManifestParsed);

      const updateResolution = () => {
        setCurrentResolution({
          width: videoNode.videoWidth,
          height: videoNode.videoHeight,
        });
      };

      videoNode.addEventListener("loadeddata", updateResolution);

      const handleTimeUpdate = () => {
        localStorage.setItem(localStorageKey, videoNode.currentTime);
      };

      videoNode.addEventListener("timeupdate", handleTimeUpdate);

      const intervalId = setInterval(updateResolution, 1000);

      const handleBeforeUnload = () => {
        sessionStorage.setItem(sessionStorageKey, "true");
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        if (hlsInstance) {
          hlsInstance.destroy();
        }
        if (videoNode) {
          videoNode.removeEventListener("loadeddata", updateResolution);
          videoNode.removeEventListener("timeupdate", handleTimeUpdate);
        }
        clearInterval(intervalId);
        if (videoNode) {
          videoNode.src = "";
        }

        const wasReloaded =
          sessionStorage.getItem(sessionStorageKey) === "true";

        wasReloaded
          ? sessionStorage.removeItem(sessionStorageKey)
          : localStorage.removeItem(localStorageKey);

        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        className="min-w-full min-h-full"
        controls
        autoPlay
        muted
        playsInline
        poster="https://bitdash-a.akamaihd.net/content/sintel/poster.png"
      />
      <div className="grid justify-around grid-flow-col align-center">
        <p>
          Current video resolution: {currentResolution.width}x
          {currentResolution.height}
        </p>
        <button onClick={() => navigate("/test")}>Go to Test</button>
      </div>
    </div>
  );
}
