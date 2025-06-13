import { Maximize2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { BASE_URL } from '../config/constant';
import Sidebar from './sidebar';

const ImageGenerationUI = () => {
  const [prompt, setPrompt] = useState(() => {
    // Initialize prompt from localStorage if available
    return localStorage.getItem('imageGenPrompt') || '';
  });
  const [imageUrl, setImageUrl] = useState<string | null>(() => {
    // Initialize imageUrl from localStorage if available
    return localStorage.getItem('imageGenUrl');
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(false);

  // Save prompt to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('imageGenPrompt', prompt);
  }, [prompt]);

  // Save imageUrl to localStorage whenever it changes
  useEffect(() => {
    if (imageUrl) {
      localStorage.setItem('imageGenUrl', imageUrl);
    } else {
      localStorage.removeItem('imageGenUrl');
    }
  }, [imageUrl]);

  // Clear session data
  const clearSession = () => {
    localStorage.removeItem('imageGenPrompt');
    localStorage.removeItem('imageGenUrl');
    setPrompt('');
    setImageUrl(null);
    setError(null);
  };

  const fetchImageResult = async (requestId: string) => {
    let attempts = 0;
    const maxAttempts = 10;
    setIsPolling(true);
  
    while (attempts < maxAttempts) {
      try {
        const response = await fetch(`${BASE_URL}/api/result/${requestId}`);
        const data = await response.json();
  
        if (data.images && data.images.length > 0) {
          setImageUrl(data.images[0].url);
          setIsPolling(false);
          return;
        }
  
        if (data.status !== "completed") {
          await new Promise((resolve) => setTimeout(resolve, 3000));
          attempts++;
        } else {
          setError("Image generation failed.");
          setIsPolling(false);
          return;
        }
      } catch (err) {
        setError("Error fetching image result.");
        setIsPolling(false);
        return;
      }
    }
  
    setError("Image generation is taking too long. Please try again later.");
    setIsPolling(false);
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
        await fetchImageResult(data.requestId);
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
          <div className="bg-[#1A1A1F] rounded-lg p-8">
             {/* Input Field and Generate Button in a row */}
            <div className="mb-4 p-4 flex items-center gap-2 bg-black rounded-md border border-purple-600">
                <span className="text-gray-400 mr-2">🖼</span>
                <input
                  type="text"
                  placeholder="Type a prompt ..."
                  className="bg-transparent flex-1 outline-none text-gray-300"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <Maximize2 className="w-5 h-5 text-purple-400" />
              <button
                className="bg-purple-600 text-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
                onClick={handleGenerate}
                disabled={loading || isPolling}
              >
                {loading ? 'Generating...' : isPolling ? 'Processing...' : 'Generate'}
              </button>
              <button
                className="bg-gray-600 text-gray-200 px-4 py-2 rounded-lg flex items-center gap-2"
                onClick={clearSession}
              >
                Clear
              </button>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            {(loading || isPolling) && (
              <div className="mt-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-600 border-t-transparent"></div>
                <p className="mt-2 text-gray-400">Generating your masterpiece...</p>
              </div>
            )}

            {imageUrl && !loading && !isPolling ? (
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
            ) : !loading && !isPolling ? (
              <div className="mt-8 text-center text-gray-300 border border-gray-800 rounded-lg p-8">
               Please type a prompt above to create your first image set.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerationUI;
