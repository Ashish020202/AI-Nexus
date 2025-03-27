import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../config/constant';
import Sidebar from './sidebar';

const CodeGeneration = () => {
    const [prompt, setPrompt] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCodeGeneration = async () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`${BASE_URL}/api/text-gen`, { prompt });
            setGeneratedCode(response.data.message.text);
        } catch (error) {
            setError("Failed to generate code. Try again.");
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
                        <div className="mb-4 p-4">
                            <input
                                type="text"
                                placeholder="Enter a prompt..."
                                className="bg-[#0B0B0F] w-full p-4 text-white rounded-md mb-2 border border-purple-600"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                        </div>

                        <button
                            className="bg-yellow-800 text-gray-300 px-4 py-2 rounded-lg w-full"
                            onClick={handleCodeGeneration}
                            disabled={loading}
                        >
                            {loading ? 'Generating...' : 'Generate Code'}
                        </button>

                        {error && <p className="text-red-500 mt-2">{error}</p>}

                        {generatedCode && (
                            <div className="mt-6 p-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg shadow-lg">
                                <strong className="text-lg font-bold">Generated Code:</strong>
                                <pre className="mt-3 text-sm font-mono bg-black p-4 rounded-md overflow-x-auto whitespace-pre-wrap">
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

export default CodeGeneration;



// import axios from "axios";
// import { useState } from "react";
// import { BASE_URL } from "../config/constant";
// import Sidebar from "./sidebar";

// interface HistoryEntry {
//     prompt: string;
//     response: string;
//     code: string;
//     explanation: string;
//   }

// const TextGeneration = () => {
//   const [message, setMessage] = useState("");
//   const [generatedText, setGeneratedText] = useState("");
//   const [generatedCode, setGeneratedCode] = useState("");
//   const [explanation, setExplanation] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [history, setHistory] = useState<HistoryEntry[]>([]); // Store past prompts

//   const handleTextGeneration = async () => {
//     if (!message.trim()) {
//       setError("Please enter a prompt.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const response = await axios.post(`${BASE_URL}/api/text-gen`, { message });
//       const generatedResponse = response.data.message.content[0].text.trim();

//       let newCode = "";
//       let newExplanation = "";
//       let isCode = generatedResponse.includes("{") || generatedResponse.includes("}");

//       if (isCode) {
//         const codeMatch = generatedResponse.match(/```[\s\S]*?```/g);
//         if (codeMatch) {
//           newCode = codeMatch[0].replace(/```(js|javascript|python|tsx|ts|html|css|json)?\n?/, "").replace(/```$/, "").trim();
//           newExplanation = generatedResponse.replace(codeMatch[0], "").trim();
//         } else {
//           newCode = generatedResponse;
//         }
//       } else {
//         newExplanation = generatedResponse;
//       }

//       setGeneratedCode(newCode);
//       setExplanation(newExplanation);
//       setGeneratedText(isCode ? "" : generatedResponse);

//       // **Fix: Ensure history is always an array**
//     setHistory((prevHistory = []) => [
//         { prompt: message, response: generatedResponse, code: newCode, explanation: newExplanation },
//         ...(Array.isArray(prevHistory) ? prevHistory.slice(0, 9) : []), // Ensure slicing is done correctly
//       ]);
      
//     } catch (error) {
//       setError("Failed to generate text. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0B0B0F] text-white p-8">
//       <div className="flex flex-col lg:flex-row gap-6">
//         <div className="hidden lg:block">
//           <Sidebar />
//         </div>

//         <div className="flex-1">
//           <div className="bg-[#1A1A1F] rounded-lg p-8">
            
//             {/* Input & Generate Button */}
//             <div className="mb-4">
//               <input
//                 type="text"
//                 placeholder="Enter a prompt..."
//                 className="bg-[#0B0B0F] w-full p-4 text-white rounded-md mb-2 border border-purple-600"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//               />
//               <button
//                 className="bg-yellow-800 text-gray-300 px-4 py-2 rounded-lg w-full"
//                 onClick={handleTextGeneration}
//                 disabled={loading}
//               >
//                 {loading ? "Generating..." : "Generate Text"}
//               </button>
//             </div>

//             {/* Error Message */}
//             {error && <p className="text-red-500 mt-2">{error}</p>}

//             {/* Generated Text Section */}
//             {generatedText && (
//               <div className="mt-6 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
//                 <strong className="text-lg">Generated Text:</strong>
//                 <p className="mt-3 text-xl leading-relaxed">{generatedText}</p>
//               </div>
//             )}

//             {/* Generated Code Section */}
//             {generatedCode && (
//               <div className="mt-6 p-6 bg-black text-green-400 rounded-lg shadow-lg">
//                 <strong className="text-lg">Generated Code:</strong>
//                 <pre className="mt-3 p-4 text-sm whitespace-pre-wrap">{generatedCode}</pre>
//               </div>
//             )}

//             {/* Explanation Section */}
//             {explanation && (
//               <div className="mt-4 p-4 bg-gray-800 text-gray-300 rounded-lg">
//                 <strong className="text-lg">Explanation:</strong>
//                 <p className="mt-3">{explanation}</p>
//               </div>
//             )}

//             {/* History Section */}
//             {history.length > 0 && (
//               <div className="mt-8 p-6 bg-gray-700 text-white rounded-lg">
//                 <strong className="text-lg">Prompt History:</strong>
//                 <ul className="mt-3 space-y-2">
//                   {history.map((entry, index) => (
//                     <li
//                       key={index}
//                       className="p-3 bg-gray-800 rounded-md cursor-pointer hover:bg-gray-600"
//                       onClick={() => setMessage(entry.prompt)}
//                     >
//                       {entry.prompt}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TextGeneration;