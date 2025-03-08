import { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import Sidebar from './sidebar';
import { BASE_URL } from '../config/constant';

const MusicGenerationUI = () => {
  const [prompt, setPrompt] = useState('');
  const [referenceUrl, setReferenceUrl] = useState('');
  const [musicUrl, setMusicUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
  if (!prompt.trim() || !referenceUrl.trim()) {
    setError("Please enter both a prompt and a reference audio URL.");
    return;
  }

  //ref url = https://fal.media/files/lion/OOTBTSlxKMH_E8H6hoSlb.mpga
  //https://storage.googleapis.com/falserverless/model_tests/diffrythm/rock_en.wav

  setLoading(true);
  setError(null);
  setMusicUrl(null);

  try {
    const response = await fetch(`${BASE_URL}/api/gen-music`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, reference_audio_url: 'https://fal.media/files/lion/OOTBTSlxKMH_E8H6hoSlb.mpga' }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate music.");
    }

    const { requestId } = await response.json();

    // Polling logic to check music generation status
    let status = "IN_PROGRESS";
    while (status === "IN_PROGRESS") {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
      const statusResponse = await fetch(`${BASE_URL}/api/check-music/${requestId}`);
      const statusData = await statusResponse.json();
      status = statusData.status;
      
      console.log("Music generation status:", status);
      
      if (status === "FAILED") {
        throw new Error("Music generation failed.");
      }
    }

    if (status !== "COMPLETED") {
      throw new Error("Unexpected status: " + status);
    }

    // Fetch the generated music URL
    const resultResponse = await fetch(`${BASE_URL}/api/get-music/${requestId}`);
    const resultData = await resultResponse.json();
    
    if (!resultData.audio) {
      throw new Error("Failed to retrieve generated music.");
    }

    setMusicUrl(resultData.audio.url);
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white p-8">
      <div className="flex gap-6">
        <Sidebar />
        <div className="flex-1">
          <div className="bg-[#1A1A1F] rounded-lg p-4">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter a prompt..."
                className="bg-[#0B0B0F] w-full p-2 text-gray-300 rounded-md mb-2"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              {/* <input
                type="text"
                placeholder="Enter a reference audio URL..."
                className="bg-[#0B0B0F] w-full p-2 text-gray-300 rounded-md"
                value={referenceUrl}
                onChange={(e) => setReferenceUrl(e.target.value)}
              /> */}
            </div>
            <button
              className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg w-full"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Music'}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}

            {musicUrl ? (
              <div className="mt-6 text-center">
                <audio controls className="mx-auto">
                  <source src={musicUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ) : (
              <div className="mt-6 text-center text-gray-400 border border-gray-800 rounded-lg p-8">
                Type a prompt and provide a reference audio URL to generate music.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicGenerationUI;
