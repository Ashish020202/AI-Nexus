

const sidebar = () => {
  return (
    <div>
        {/* Left Sidebar */}
        <div className="w-60 space-y-4">
          {/* Model Selection */}
          <div className="bg-[#1A1A1F] rounded-lg p-3 border border-purple-600">
            <div className="text-xs text-gray-400 mb-1">Model / Preset</div>
            <div className="flex justify-between items-center">
              <span className="text-white">Text Generation</span>
              <span className="text-gray-400">▼</span>
            </div>
          </div>

          {/* Prompt Enhance */}
          <div className="bg-[#1A1A1F] rounded-lg p-3 border-purple-600">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-xs">⚡</span>
                {/* <span className="text-gray-400 text-sm">Prompt Enhance</span> */}
              </div>
              <span className="text-gray-400">▼</span>
            </div>
            <div className="text-white mt-1">Code Generation</div>
          </div>

          {/* Style */}
          <div className="bg-[#1A1A1F] rounded-lg p-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-xs">👤</span>
                {/* <span className="text-gray-400 text-sm">Style</span> */}
              </div>
              <span className="text-gray-400">▼</span>
            </div>
            <div className="text-white mt-1">Image Generation</div>
          </div>

          {/* Resolution */}
          <div className="bg-[#1A1A1F] rounded-lg p-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-xs">📐</span>
                {/* <span className="text-gray-400 text-sm">Video Generation</span> */}
              </div>
              <span className="text-gray-400">▼</span>
            </div>
            <div className="text-white mt-1">Video Generation</div>
          </div>

          {/* Quality */}
          <div className="bg-[#1A1A1F] rounded-lg p-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-xs">✨</span>
                {/* <span className="text-gray-400 text-sm">Music Generaion</span> */}
              </div>
              <span className="text-gray-400">▼</span>
            </div>
            <div className="text-white mt-1">Music Generaion</div>
          </div>

          {/* Samples */}
          <div className="bg-[#1A1A1F] rounded-lg p-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-xs">🎲</span>
                {/* <span className="text-gray-400 text-sm">Samples</span> */}
              </div>
              <span className="text-gray-400">▼</span>
            </div>
            <div className="text-white mt-1">Automated Email Generation</div>
          </div>
        </div>
    </div>
  )
}

export default sidebar
