import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import loaderAnimation from "../assets/loader.json"; 
export function LoadingPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1; 
      });
    }, 50); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 z-50">
      <Lottie
        animationData={loaderAnimation}
        className="w-48 h-48"
        loop
        autoplay
      />

      <div className="w-3/4 mt-6 h-2 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm">
        Carregando... {progress}%
      </p>
    </div>
  );
}