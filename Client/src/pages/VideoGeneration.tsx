import { Maximize2 } from "lucide-react";
import { useState, useEffect } from "react";
import { BASE_URL } from "../config/constant";
import Sidebar from "./sidebar";

interface VideoSession {
  id: string;
  prompt: string;
  videoUrl: string | null;
  timestamp: number;
  status: 'completed' | 'failed' | 'in_progress';
}

const VideoGeneration = () => {
  const [prompt, setPrompt] = useState(() => {
    return localStorage.getItem('videoGenPrompt') || '';
  });
  const [videoUrl, setVideoUrl] = useState<string | null>(() => {
    return localStorage.getItem('videoGenUrl');
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string>(() => {
    return localStorage.getItem('currentSessionId') || '';
  });
  const [sessionHistory, setSessionHistory] = useState<VideoSession[]>(() => {
    const history = localStorage.getItem('videoGenHistory');
    return history ? JSON.parse(history) : [];
  });

  // Save prompt to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('videoGenPrompt', prompt);
  }, [prompt]);

  // Save videoUrl to localStorage whenever it changes
  useEffect(() => {
    if (videoUrl) {
      localStorage.setItem('videoGenUrl', videoUrl);
      // Update session history
      const updatedHistory = sessionHistory.map(session => 
        session.id === currentSessionId 
          ? { ...session, videoUrl, status: 'completed' as const }
          : session
      );
      setSessionHistory(updatedHistory);
      localStorage.setItem('videoGenHistory', JSON.stringify(updatedHistory));
    } else {
      localStorage.removeItem('videoGenUrl');
    }
  }, [videoUrl, currentSessionId, sessionHistory]);

  // Save session history whenever it changes
  useEffect(() => {
    localStorage.setItem('videoGenHistory', JSON.stringify(sessionHistory));
  }, [sessionHistory]);

  // Clear current session
  const clearSession = () => {
    localStorage.removeItem('videoGenPrompt');
    localStorage.removeItem('videoGenUrl');
    localStorage.removeItem('currentSessionId');
    setPrompt('');
    setVideoUrl(null);
    setError(null);
    setCurrentSessionId('');
  };

  // Load a previous session
  const loadSession = (sessionId: string) => {
    const session = sessionHistory.find(s => s.id === sessionId);
    if (session) {
      setPrompt(session.prompt);
      setVideoUrl(session.videoUrl);
      setCurrentSessionId(sessionId);
      localStorage.setItem('currentSessionId', sessionId);
    }
  };

  const fetchVideoResult = async (requestId: string) => {
    setIsPolling(true);
    const delay = 20000; // 20 seconds delay

    // Create new session
    const newSessionId = Date.now().toString();
    setCurrentSessionId(newSessionId);
    localStorage.setItem('currentSessionId', newSessionId);
    
    const newSession: VideoSession = {
      id: newSessionId,
      prompt,
      videoUrl: null,
      timestamp: Date.now(),
      status: 'in_progress'
    };
    
    setSessionHistory(prev => [...prev, newSession]);

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
            // Update session status to failed
            setSessionHistory(prev => 
              prev.map(session => 
                session.id === newSessionId 
                  ? { ...session, status: 'failed' as const }
                  : session
              )
            );
          }
          setIsPolling(false);
          return;
        } else if (statusData.status === "FAILED") {
          setError("Video generation failed.");
          // Update session status to failed
          setSessionHistory(prev => 
            prev.map(session => 
              session.id === newSessionId 
                ? { ...session, status: 'failed' as const }
                : session
            )
          );
          setIsPolling(false);
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
    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      return;
    }

    setError(null);
    setLoading(true);
    setVideoUrl(null);

    try {
      const response = await fetch(`${BASE_URL}/api/gen-video`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (data?.requestId) {
        fetchVideoResult(data.requestId);
      } else {
        setError(data?.error || "Failed to generate video.");
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
            {/* Session History */}
            {sessionHistory.length > 0 && (
              <div className="mb-4 p-4 bg-black rounded-md border border-purple-600">
                <h3 className="text-purple-400 mb-2">Recent Sessions</h3>
                <div className="space-y-2">
                  {sessionHistory.slice(-5).reverse().map((session) => (
                    <div 
                      key={session.id}
                      className={`p-2 rounded cursor-pointer hover:bg-purple-900/20 ${
                        session.id === currentSessionId ? 'bg-purple-900/30' : ''
                      }`}
                      onClick={() => loadSession(session.id)}
                    >
                      <p className="text-sm truncate">{session.prompt}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(session.timestamp).toLocaleString()} - {session.status}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Input Field and Generate Button */}
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
                className="bg-purple-600 text-gray-100 px-4 py-2 rounded-lg disabled:opacity-50"
                onClick={handleGenerate}
                disabled={loading || isPolling}
              >
                {loading ? "Generating..." : isPolling ? "Processing..." : "Generate Video"}
              </button>
              <button
                className="bg-gray-600 text-gray-200 px-4 py-2 rounded-lg flex items-center gap-2"
                onClick={clearSession}
              >
                Clear
              </button>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            {/* Loading Spinner */}
            {(loading || isPolling) && (
              <div className="mt-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-600 border-t-transparent"></div>
                <p className="mt-2 text-gray-400">Generating your masterpiece...</p>
              </div>
            )}

            {/* Generated Video Box */}
            {videoUrl && !loading && !isPolling ? (
              <div className="mt-10 text-center w-full m-auto">
                <video src={videoUrl} controls autoPlay className="rounded-lg w-full max-w-3xl mx-auto shadow-lg" />

                {/* Download Button */}
                <a
                  href={videoUrl}
                  download="generated-video.mp4"
                  className="mt-6 inline-block bg-green-600 text-white px-5 py-3 rounded-lg text-lg font-semibold hover:bg-green-500 transition"
                >
                  Download Video ⬇
                </a>
              </div>
            ) : !loading && !isPolling ? (
              <div className="mt-8 text-center text-gray-400 border border-gray-800 rounded-lg p-6 bg-[#121218]">
                <p className="text-lg">Enter a prompt above to create your first video.</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGeneration;
