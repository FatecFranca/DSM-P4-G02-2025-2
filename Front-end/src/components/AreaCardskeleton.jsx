import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ChartSkeleton = () => {
  const { isDarkMode } = useTheme();

  const bgMain = isDarkMode ? "bg-gray-800" : "bg-white";
  const bgBar = isDarkMode ? "bg-gray-700" : "bg-gray-300";
  const bgLine = isDarkMode ? "bg-gray-700" : "bg-gray-200";
  const bgDot = isDarkMode ? "bg-gray-600" : "bg-gray-400";

  return (
    <div className={`w-full h-[400px] rounded-lg shadow-md p-4 animate-pulse transition-colors ${bgMain}`}>
      <div className={`h-6 rounded w-1/3 mx-auto mb-6 ${bgBar}`}></div>

      <div className="flex justify-center mb-4">
        <div className={`h-4 w-24 rounded ${bgBar}`}></div>
      </div>

      <div className="h-full relative overflow-hidden">
        <div className="absolute w-full h-full flex justify-between pointer-events-none">
          {[...Array(5)].map((_, index) => (
            <div key={index} className={`w-0.5 h-full ${bgLine}`}></div>
          ))}
        </div>
        <div className="absolute h-full w-full flex flex-col justify-between pointer-events-none">
          {[...Array(4)].map((_, index) => (
            <div key={index} className={`w-full h-0.5 ${bgLine}`}></div>
          ))}
        </div>
        <svg
          className="absolute left-0 bottom-0 w-full h-3/4"
          viewBox="0 0 400 240"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isDarkMode ? "#64748b" : "#cbd5e1"} stopOpacity="0.7" />
              <stop offset="100%" stopColor={isDarkMode ? "#64748b" : "#cbd5e1"} stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            d="M0,200 Q50,120 100,160 Q150,200 200,100 Q250,40 300,120 Q350,180 400,80 L400,240 L0,240 Z"
            fill="url(#areaGradient)"
          />
          <path
            d="M0,200 Q50,120 100,160 Q150,200 200,100 Q250,40 300,120 Q350,180 400,80"
            stroke={isDarkMode ? "#94a3b8" : "#64748b"}
            strokeWidth="3"
            fill="none"
          />
          {[{x:0,y:200},{x:50,y:120},{x:100,y:160},{x:150,y:200},{x:200,y:100},{x:250,y:40},{x:300,y:120},{x:350,y:180},{x:400,y:80}].map((dot, i) => (
            <circle key={i} cx={dot.x} cy={dot.y} r="7" fill={bgDot} opacity="0.7" />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default ChartSkeleton;