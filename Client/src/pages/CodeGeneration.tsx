// import axios from 'axios';
// import { useState } from 'react';
// import { BASE_URL } from '../config/constant';
// import Sidebar from './sidebar';

// const CodeGeneration = () => {
//     const [prompt, setPrompt] = useState('');
//     const [generatedCode, setGeneratedCode] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     const handleCodeGeneration = async () => {
//         if (!prompt.trim()) {
//             setError('Please enter a prompt.');
//             return;
//         }

//         setLoading(true);
//         setError('');

//         try {
//             const response = await axios.post(`${BASE_URL}/api/text-gen`, { prompt });
//             setGeneratedCode(response.data.message.text);
//         } catch (error) {
//             setError("Failed to generate code. Try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-[#0B0B0F] text-white p-8">
//             <div className="flex flex-col lg:flex-row gap-6">
//                 <div className="hidden lg:block">
//                     <Sidebar />
//                 </div>

//                 <div className="flex-1">
//                     <div className="bg-[#1A1A1F] rounded-lg p-8">
//                         <div className="mb-4 p-4">
//                             <input
//                                 type="text"
//                                 placeholder="Enter a prompt..."
//                                 className="bg-[#0B0B0F] w-full p-4 text-white rounded-md mb-2 border border-purple-600"
//                                 value={prompt}
//                                 onChange={(e) => setPrompt(e.target.value)}
//                             />
//                         </div>

//                         <button
//                             className="bg-yellow-800 text-gray-300 px-4 py-2 rounded-lg w-full"
//                             onClick={handleCodeGeneration}
//                             disabled={loading}
//                         >
//                             {loading ? 'Generating...' : 'Generate Code'}
//                         </button>

//                         {error && <p className="text-red-500 mt-2">{error}</p>}

//                         {generatedCode && (
//                             <div className="mt-6 p-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg shadow-lg">
//                                 <strong className="text-lg font-bold">Generated Code:</strong>
//                                 <pre className="mt-3 text-sm font-mono bg-black p-4 rounded-md overflow-x-auto whitespace-pre-wrap">
//                                     {generatedCode}
//                                 </pre>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CodeGeneration;



import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../config/constant";
import Sidebar from "./sidebar";

const TextGeneration = () => {
  const [message, setMessage] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      // Check if the response is likely to be code
      const isCode =
        generatedResponse.startsWith("import") ||
        generatedResponse.startsWith("function") ||
        generatedResponse.startsWith("const") ||
        generatedResponse.startsWith("<") ||
        generatedResponse.includes("{") ||
        generatedResponse.includes("}");

      if (isCode) {
        setGeneratedCode(generatedResponse);
        setGeneratedText(""); // Clear text when code is detected
      } else {
        setGeneratedText(generatedResponse);
        setGeneratedCode(""); // Clear code when text is detected
      }
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
            {/* Input Field */}
            <div className="mb-4 p-4">
              <input
                type="text"
                placeholder="Enter a prompt..."
                className="bg-[#0B0B0F] w-full p-4 text-white rounded-md mb-2 border border-purple-600"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            {/* Generate Button */}
            <button
              className="bg-yellow-800 text-gray-300 px-4 py-2 rounded-lg w-full"
              onClick={handleTextGeneration}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Text"}
            </button>

            {/* Error Message */}
            {error && <p className="text-red-500 mt-2">{error}</p>}

            {/* Generated Text Box */}
            {generatedText && (
              <div className="mt-6 p-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg shadow-lg">
                <strong className="text-lg">Generated Text:</strong>
                <p
                  className="mt-3 text-xl leading-relaxed tracking-wide whitespace-pre-wrap"
                  style={{ fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "500" }}
                >
                  {generatedText.split(" ").map((word, index) => (
                    <span key={index} className={word.length > 6 ? "font-bold" : ""}>
                      {word}{" "}
                    </span>
                  ))}
                </p>
              </div>
            )}

            {/* Generated Code Box */}
            {generatedCode && (
              <div className="mt-6 p-4 bg-black text-green-400 rounded-lg shadow-lg overflow-x-auto">
                <strong className="text-lg">Generated Code:</strong>
                <pre
                  className="mt-3 p-4 text-sm leading-relaxed tracking-wide whitespace-pre-wrap rounded-md"
                  style={{ fontFamily: "Courier New, monospace" }}
                >
                  {generatedCode}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextGeneration;
