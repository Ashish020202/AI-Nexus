import { Maximize2 } from 'lucide-react';
import { useState } from 'react';
import { BASE_URL } from '../config/constant';
import Sidebar from './sidebar';

const ImageGenerationUI = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImageResult = async (requestId: string) => {
    let attempts = 0;
    const maxAttempts = 10;
  
    while (attempts < maxAttempts) {
      try {
        const response = await fetch(`${BASE_URL}/api/result/${requestId}`);
        const data = await response.json();
  
        if (data.images && data.images.length > 0) {
          setImageUrl(data.images[0].url);
          return;
        }
  
        if (data.status !== "completed") {
          await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait 3 seconds before retrying
          attempts++;
        } else {
          setError("Image generation failed.");
          return;
        }
      } catch (err) {
        setError("Error fetching image result.");
        return;
      }
    }
  
    setError("Image generation is taking too long. Please try again later.");
  };

  const handleGenerate = async () => {
    if (!prompt) {
      setError('Please enter a prompt.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/gen-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (data) {
        fetchImageResult(data.requestId);
      } else {
        setError(data.error || 'Failed to generate image.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'generated-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
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
                className="bg-purple-600 text-gray-200 px-4 py-2 rounded-lg flex items-center gap-2"
                onClick={handleGenerate}
                disabled={loading}
              >
                {loading ? 'Generating...' : 'Generate'}
              </button>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            {imageUrl ? (
              <div className="mt-10 text-center w-3/4 h-full m-auto">
                <img src={imageUrl} alt="Generated" className="rounded-lg mx-auto" />
                
                {/* Download Button */}
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={handleDownload}
                >
                  Download Image
                </button>
              </div>
            ) : (
              <div className="mt-8 text-center text-gray-300 border border-gray-800 rounded-lg p-8">
               Please type a prompt above to create your first image set.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerationUI;
