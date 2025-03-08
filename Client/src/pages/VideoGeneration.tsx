import  { useState } from 'react'
import Sidebar from './sidebar'
import { Maximize2 } from 'lucide-react';
import { BASE_URL } from '../config/constant';


const VideoGeneration = () => {

  const [prompt, setPrompt] = useState('');
  const [VideoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVideoResult = async (requestId: string) => {
    const delay = 20000; // 20 seconds delay
  
    while (true) {
      try {
        const statusResponse = await fetch(`${BASE_URL}/api/check-video/${requestId}`);
        const statusData = await statusResponse.json();
  
        if (statusData.status === "COMPLETED") {
          // Fetch the final video URL
          const response = await fetch(`${BASE_URL}/api/get-video/${requestId}`);
          const data = await response.json();
  
          if (data.videoUrl && data.videoUrl.video && data.videoUrl.video.url) {
            setVideoUrl(data.videoUrl.video.url);
          } else {
            setError("No video URL found.");
          }
          
        } else if (statusData.status === "FAILED") {
          setError("Video generation failed.");
          return;
        }
  
        console.log("Video generation still in progress...");
        await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before next attempt
      } catch (err) {
        console.error("Error fetching video status. Retrying...");
      }
    }
  };
  

  const handleGenerate = async () => {
    if (!prompt) {
      setError('Please enter a prompt.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/gen-video`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (data) {
        fetchVideoResult(data.requestId);
      } else {
        setError(data.error || 'Failed to generate image.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <> 
     {/* <Navbar /> */}
   
    <div className="min-h-screen bg-[#0B0B0F] text-white p-8">
    <div className="flex gap-6">
      <Sidebar />
      <div className="flex-1">
        <div className="bg-[#1A1A1F] rounded-lg p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 flex items-center bg-[#0B0B0F] rounded-lg px-4 py-2">
              <span className="text-gray-400 mr-2">🖼</span>
              <input
                type="text"
                placeholder="Type a prompt ..."
                className="bg-transparent flex-1 outline-none text-gray-300"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Maximize2 className="w-5 h-5 text-gray-400" />
            </div>
            <button
              className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg flex items-center gap-2"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate'}
            </button>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          {VideoUrl ? (
            <div className="mt-10 text-center w-full h-full m-auto">
              <video src={VideoUrl} controls   autoPlay  className="rounded-lg mx-auto" />
            </div>
          ) : (
            <div className="mt-8 text-center text-gray-400 border border-gray-800 rounded-lg p-8">
             Please type a prompt above to create your first image set.
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  </>
  )
}

export default VideoGeneration
