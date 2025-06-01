import { Maximize2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../config/constant";
import Sidebar from "./sidebar";

const MusicGenerationUI = () => {
  const [prompt, setPrompt] = useState("");
  const [musicUrl, setMusicUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setMusicUrl(null);

    try {
      const response = await fetch(`${BASE_URL}/api/gen-music`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          reference_audio_url:
            "https://fal.media/files/lion/OOTBTSlxKMH_E8H6hoSlb.mpga",
        }),
      });

      if (!response.ok) throw new Error("Failed to generate music.");

      const { requestId } = await response.json();
      let status = "IN_PROGRESS";

      while (status === "IN_PROGRESS") {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const statusResponse = await fetch(
          `${BASE_URL}/api/check-music/${requestId}`
        );
        const statusData = await statusResponse.json();
        status = statusData.status;

        if (status === "FAILED") throw new Error("Music generation failed.");
      }

      if (status !== "COMPLETED") throw new Error("Unexpected status: " + status);

      const resultResponse = await fetch(
        `${BASE_URL}/api/get-music/${requestId}`
      );
      const resultData = await resultResponse.json();

      if (!resultData.audio) throw new Error("Failed to retrieve generated music.");

      // Convert the audio URL to a Blob
    const audioResponse = await fetch(resultData.audio.url);
    const audioBlob = await audioResponse.blob();
    const audioObjectURL = URL.createObjectURL(audioBlob);

      setMusicUrl(audioObjectURL);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (musicUrl) {
      const link = document.createElement("a");
      link.href = musicUrl;
      link.download = "generated-music.mp3";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    if (!audioPlaying || !canvasRef.current || !audioRef.current) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }

    const audio = audioRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!analyserRef.current) {
      const analyser = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioContextRef.current.destination);
      analyser.fftSize = 128; // Higher value = more bars
      analyserRef.current = analyser;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
    }

    const analyser = analyserRef.current;
    let dataArray = dataArrayRef.current;

    if (!dataArray) {
      dataArray = new Uint8Array(analyser.frequencyBinCount);
      dataArrayRef.current = dataArray;
    }

    const draw = () => {
      if (!audioPlaying || !canvasRef.current || !analyserRef.current) return;
      requestAnimationFrame(draw);
    
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
    
      const analyser = analyserRef.current;
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(dataArray);
    
      // Clear and add a slight transparency for smooth fading
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Semi-transparent for smooth fading
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //ctx.fillStyle = "#6B46C1"; // Purple color
    
      const barWidth = (canvas.width / dataArray.length) * 1.5; // Reduce width
      let x = 0;
    
      for (let i = 0; i < dataArray.length; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.7; // Scale height
    
        // 🌈 Gradient effect for each bar
        const gradient = ctx.createLinearGradient(x, canvas.height, x, canvas.height - barHeight);
        gradient.addColorStop(0, "rgba(239, 12, 167, 0.71)");  // Pinkish
        gradient.addColorStop(0.5, "rgba(162, 17, 223, 0.59)"); // Cyan
        gradient.addColorStop(1, "rgba(46, 5, 76, 0.89)");     // Blue

        ctx.fillStyle = gradient;
        
        // ✨ Soft glow effect for better aesthetics
        ctx.shadowBlur = 50;
        ctx.shadowColor = "rgba(12, 16, 16, 0.8)";

        ctx.fillRect(x, canvas.height - barHeight, barWidth - 3, barHeight);
        x += barWidth;
      }
    };

    draw();
  }, [audioPlaying]);

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white p-8">
      <div className="flex gap-6">
        <Sidebar />
        <div className="flex-1">
          <div className="bg-[#1A1A1F] rounded-lg p-4">
            {/* Prompt Input and Generate Button */}
              <div className="mb-4 p-4 flex items-center gap-2 bg-black rounded-md border border-purple-600">
                <span className="text-gray-400 mr-2">🎵</span>
                <input
                  type="text"
                  placeholder="Type a prompt ..."
                  className="bg-black flex-1 p-2 text-white outline-none placeholder-gray-400"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              <Maximize2 className="text-purple-500" size={20} />
              <button
                className="bg-purple-600 text-gray-200bg-purple-600 text-gray-100 px-4 py-2 rounded-lg "
                onClick={handleGenerate}
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Music"}
              </button>
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            {musicUrl ? (
              <div className="mt-6 text-center">
                {/* Audio Player */}
                <audio
                  ref={audioRef}
                  controls
                  className="mx-auto"
                  onPlay={() => setAudioPlaying(true)}
                  onPause={() => setAudioPlaying(false)}
                >
                  <source src={musicUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>

                {/* Download Button */}
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={handleDownload}
                >
                  Download Music
                </button>

                {/* Music Visualizer */}
                <canvas
                  ref={canvasRef}
                  width={300}
                  height={100}
                  className="mt-4 bg-black rounded-lg w-full"
                />
              </div>
            ) : (
              <div className="mt-6 text-center text-gray-400 border border-gray-800 rounded-lg p-8">
                Type a prompt and generate music.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicGenerationUI;
