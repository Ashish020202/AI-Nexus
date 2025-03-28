import { Maximize2 } from "lucide-react";
import { useState } from "react";
import { BASE_URL } from "../config/constant";
import Sidebar from "./sidebar";

const VideoGeneration = () => {
  const [prompt, setPrompt] = useState("");
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
          const response = await fetch(`${BASE_URL}/api/get-video/${requestId}`);
          const data = await response.json();

          if (data.videoUrl?.video?.url) {
            setVideoUrl(data.videoUrl.video.url);
          } else {
            setError("No video URL found.");
          }
          return;
        } else if (statusData.status === "FAILED") {
          setError("Video generation failed.");
          return;
        }

        console.log("Video generation still in progress...");
        await new Promise((resolve) => setTimeout(resolve, delay));
      } catch (err) {
        console.error("Error fetching video status. Retrying...");
      }
    }
  };

  const handleGenerate = async () => {
    if (!prompt) {
      setError("Please enter a prompt.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/gen-video`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (data) {
        fetchVideoResult(data.requestId);
      } else {
        setError(data.error || "Failed to generate video.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white p-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <Sidebar />
        <div className="flex-1">
          <div className="bg-[#1A1A1F] rounded-lg p-8">
            {/* Input Field and Generate Button in a row */}
            <div className="mb-4 p-4 flex items-center gap-2 bg-black rounded-md border border-purple-600">
              <span className="text-purple-400 text-xl">🎥</span>
              <input
                type="text"
                placeholder="Enter a prompt..."
                className="bg-black flex-1 p-2 text-white outline-none placeholder-gray-400"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Maximize2 className="text-purple-500" size={20} />
              <button
                className="bg-purple-600 text-gray-100 px-4 py-2 rounded-lg"
                onClick={handleGenerate}
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Video"}
              </button>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            {/* Generated Video Box */}
            {VideoUrl ? (
              <div className="mt-10 text-center w-full m-auto">
                <video src={VideoUrl} controls autoPlay className="rounded-lg w-full max-w-3xl mx-auto shadow-lg" />

                {/* Download Button */}
                <a
                  href={VideoUrl}
                  download="generated-video.mp4"
                  className="mt-6 inline-block bg-green-600 text-white px-5 py-3 rounded-lg text-lg font-semibold hover:bg-green-500 transition"
                >
                  Download Video ⬇
                </a>
              </div>
            ) : (
              <div className="mt-8 text-center text-gray-400 border border-gray-800 rounded-lg p-6 bg-[#121218]">
                <p className="text-lg">Enter a prompt above to create your first video.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGeneration;
