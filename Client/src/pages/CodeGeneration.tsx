import axios from "axios";
import { Code } from "lucide-react";
import { useState } from "react";
import { BASE_URL } from "../config/constant";
import Sidebar from "./sidebar";

interface HistoryEntry {
    prompt: string;
    response: string;
    code: string;
    explanation: string;
  }

const CodeGeneration = () => {
  const [message, setMessage] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]); // Store past prompts

  // Add clearSession function
  const clearSession = () => {
    setMessage('');
    setGeneratedText('');
    setGeneratedCode('');
    setExplanation('');
    setError('');
    setHistory([]);
  };

  console.log(history);
  

  const handleTextGeneration = async () => {
    if (!message.trim()) {
      setError("Please enter a prompt.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${BASE_URL}/api/text-gen`, { message });
      const generatedResponse = response.data.message.content[0].text.trim();

      let newCode = "";
      let newExplanation = "";
      // Improved code detection to include Python code blocks
      let isCode = generatedResponse.includes("```") || 
                  generatedResponse.includes("def ") || 
                  generatedResponse.includes("class ") ||
                  generatedResponse.includes("import ") ||
                  generatedResponse.includes("from ");

      if (isCode) {
        // First try to find code blocks with backticks
        const codeMatch = generatedResponse.match(/```(?:python|py)?\n([\s\S]*?)```/);
        if (codeMatch) {
          newCode = codeMatch[1].trim();
          newExplanation = generatedResponse.replace(codeMatch[0], "").trim();
        } else {
          // If no code blocks found, check for Python code patterns
          const pythonCodePattern = /(?:def|class|import|from)[\s\S]*?(?=\n\n|$)/;
          const pythonMatch = generatedResponse.match(pythonCodePattern);
          if (pythonMatch) {
            newCode = pythonMatch[0].trim();
            newExplanation = generatedResponse.replace(pythonMatch[0], "").trim();
          } else {
            newCode = generatedResponse;
          }
        }
      } else {
        newExplanation = generatedResponse;
      }

      setGeneratedCode(newCode);
      setExplanation(newExplanation);
      setGeneratedText(isCode ? "" : generatedResponse);

      // **Fix: Ensure history is always an array**
    setHistory((prevHistory = []) => [
        { prompt: message, response: generatedResponse, code: newCode, explanation: newExplanation },
        ...(Array.isArray(prevHistory) ? prevHistory.slice(0, 9) : []), // Ensure slicing is done correctly
      ]);
      
    } catch (error) {
      setError("Failed to generate text. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white p-8">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="hidden lg:block">
                    <Sidebar />
                </div>

                <div className="flex-1">
                    <div className="bg-[#1A1A1F] rounded-lg p-8">
                        {/* Input Field & Button in One Row */}
                        <div className="mb-4 p-4 flex items-center gap-2 bg-[#0B0B0F] rounded-md border border-purple-600">
                            <span className="text-gray-400 mr-2">💻</span>
                            <input
                                type="text"
                                 placeholder="Enter a prompt..."
                                 className="bg-transparent flex-1 text-white outline-none"
                                 value={message}
                                 onChange={(e) => setMessage(e.target.value)}
                        />
                    <Code className="w-5 h-5 text-purple-500" />
                    <button
                            className="bg-purple-600 text-gray-100 px-4 py-2 rounded-lg"
                            onClick={handleTextGeneration}
                            disabled={loading}
                        >
                        {loading ? "Generating..." : "Generate Code"}
                    </button>
                    <button
                        className="bg-gray-600 text-gray-200 px-4 py-2 rounded-lg flex items-center gap-2"
                        onClick={clearSession}
                    >
                        Clear
                    </button>
                </div>

            {/* Error Message */}
            {error && <p className="text-red-500 mt-2">{error}</p>}

            {/* Loading Spinner */}
            {loading && (
              <div className="mt-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-600 border-t-transparent"></div>
                <p className="mt-2 text-gray-400">Generating your code...</p>
              </div>
            )}

            {/* Generated Text Section */}
            {generatedText && (
              <div className="mt-6 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
                <strong className="text-lg">Generated Text:</strong>
                <p className="mt-3 text-xl leading-relaxed">{generatedText}</p>
              </div>
            )}

            {/* Generated Code Section */}
            {generatedCode && (
            <div className="mt-6 p-6 bg-black text-white-400 rounded-lg shadow-lg relative">
                <strong className="text-lg">Generated Code:</strong>
                
                {/* Copy Button */}
                <button
                className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-md text-sm hover:bg-purple-700 transition"
                onClick={() => navigator.clipboard.writeText(generatedCode)}
                >
                Copy
                </button>

                <pre className="mt-3 p-4 text-sm whitespace-pre-wrap">{generatedCode}</pre>
            </div>
            )}


            {/* Explanation Section */}
            {explanation && (
              <div className="mt-4 p-4 bg-gray-800 text-gray-300 rounded-lg">
                <strong className="text-lg">Explanation:</strong>
                <p className="mt-3">{explanation}</p>
              </div>
            )}

            {/* History Section
            {history.length > 0 && (
              <div className="mt-8 p-6 bg-gray-700 text-white rounded-lg">
                <strong className="text-lg">Prompt History:</strong>
                <ul className="mt-3 space-y-2">
                  {history.map((entry, index) => (
                    <li
                      key={index}
                      className="p-3 bg-gray-800 rounded-md cursor-pointer hover:bg-gray-600"
                      onClick={() => setMessage(entry.prompt)}
                    >
                      {entry.prompt}
                    </li>
                  ))}
                </ul>
              </div>
            )} */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeGeneration;