import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Left Sidebar */}
      <div className="w-60 py-4 space-y-6">
        {/* Model Selection */}
        <div 
          className="bg-[#1A1A1F] rounded-lg p-3 border border-purple-600 cursor-pointer" 
          onClick={() => navigate("/Dashboard")}
        >
          <div className="text-xs text-gray-400 mb-1">Model / Preset</div>
          <div className="flex justify-between items-center">
            <div className="text-white">Generate Now</div>
            <span className="text-gray-400">▼</span>
          </div>
        </div>

        <div 
          className="bg-[#1A1A1F] rounded-lg p-3 border border-purple-600 cursor-pointer" 
          onClick={() => navigate("/TextGeneration")}
        >
          <div className="text-xs text-gray-400 mb-1">Model / Preset</div>
          <div className="flex justify-between items-center">
            <div className="text-white">Text Generation</div>
            <span className="text-gray-400">▼</span>
          </div>
        </div>

        {/* Prompt Enhance */}
        <div 
          className="bg-[#1A1A1F] rounded-lg p-3 border border-purple-600 cursor-pointer" 
          onClick={() => navigate("/codeGeneration")}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-xs">⚡</span>
            </div>
            <span className="text-gray-400">▼</span>
          </div>
          <div className="text-white mt-1">Code Generation</div>
        </div>

        {/* Style */}
        <div 
          className="bg-[#1A1A1F] rounded-lg p-3 3 border border-purple-600 cursor-pointer" 
          onClick={() => navigate("/ImageGeneration")}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-xs">👤</span>
            </div>
            <span className="text-gray-400">▼</span>
          </div>
          <div className="text-white mt-1">Image Generation</div>
        </div>

        {/* Resolution */}
        <div 
          className="bg-[#1A1A1F] rounded-lg 3 border border-purple-600 p-3 cursor-pointer" 
          onClick={() => navigate("/videoGeneration")}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-xs">📐</span>
            </div>
            <span className="text-gray-400">▼</span>
          </div>
          <div className="text-white mt-1">Video Generation</div>
        </div>

        {/* Quality */}
        <div 
          className="bg-[#1A1A1F] rounded-lg 3 border border-purple-600 p-3 cursor-pointer" 
          onClick={() => navigate("/MusicGeneration")}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-xs">✨</span>
            </div>
            <span className="text-gray-400">▼</span>
          </div>
          <div className="text-white mt-1">Music Generation</div>
        </div>

        {/* Samples */}
        {/* <div 
          className="bg-[#1A1A1F] rounded-lg p-3 cursor-pointer" 
          onClick={() => navigate("/email")}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-xs">🎲</span>
            </div>
            <span className="text-gray-400">▼</span>
          </div>
          <div className="text-white mt-1">Automated Email Generation</div>
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
