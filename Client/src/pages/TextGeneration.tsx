import axios from "axios";
import { Maximize2 } from "lucide-react";
import { useState, useEffect } from "react";
import { BASE_URL } from "../config/constant";
import Sidebar from "./sidebar";

const TextGeneration = () => {
  const [message, setMessage] = useState(() => {
    const savedMessage = localStorage.getItem('textGenMessage');
    return savedMessage || "";
  });
  const [generatedText, setGeneratedText] = useState(() => {
    const savedText = localStorage.getItem('textGenGeneratedText');
    return savedText || "";
  });
  const [generatedCode, setGeneratedCode] = useState(() => {
    const savedCode = localStorage.getItem('textGenGeneratedCode');
    return savedCode || "";
  });
  const [explanation, setExplanation] = useState(() => {
    const savedExplanation = localStorage.getItem('textGenExplanation');
    return savedExplanation || "";
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copyText, setCopyText] = useState("Copy");
  const [copyCode, setCopyCode] = useState("Copy Code");
  const [copyFull, setCopyFull] = useState("Copy Full Response");

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('textGenMessage', message);
    localStorage.setItem('textGenGeneratedText', generatedText);
    localStorage.setItem('textGenGeneratedCode', generatedCode);
    localStorage.setItem('textGenExplanation', explanation);
  }, [message, generatedText, generatedCode, explanation]);

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

      // Check if response contains code
      const isCode =
        generatedResponse.startsWith("import") ||
        generatedResponse.startsWith("function") ||
        generatedResponse.startsWith("const") ||
        generatedResponse.startsWith("<") ||
        generatedResponse.includes("{") ||
        generatedResponse.includes("}");

      if (isCode) {
        const codeMatch = generatedResponse.match(/```[\s\S]*?```/g);

        if (codeMatch) {
          // Extract code from markdown-style triple backticks
          const extractedCode = codeMatch[0].replace(/```(js|javascript|python|tsx|ts|html|css|json)?\n?/, "").replace(/```$/, "").trim();
          setGeneratedCode(extractedCode);

          // Get explanation by removing the code block from the response
          const explanationText = generatedResponse.replace(codeMatch[0], "").trim();
          setExplanation(explanationText);
        } else {
          setGeneratedCode(generatedResponse);
          setExplanation("");
        }
        setGeneratedText(""); // No need for separate text box
      } else {
        setGeneratedText(generatedResponse);
        setGeneratedCode("");
        setExplanation("");
      }

      // Reset Copy Buttons
      setCopyText("Copy");
      setCopyCode("Copy Code");
      setCopyFull("Copy Full Response");
    } catch (error) {
      setError("Failed to generate text. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    if (type === "text") {
      setCopyText("Copied!");
      setTimeout(() => setCopyText("Copy"), 2000);
    } else if (type === "code") {
      setCopyCode("Copied!");
      setTimeout(() => setCopyCode("Copy Code"), 2000);
    } else {
      setCopyFull("Copied!");
      setTimeout(() => setCopyFull("Copy Full Response"), 2000);
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
            {/* Input Field and Generate Button in a row with 📝 Symbol */}
            <div className="mb-2 p-2 flex items-center gap-2 bg-black rounded-md border border-purple-600">
              <span className="text-purple-400 text-xl">📝</span>
              {/* <Pencil className="text-purple-500" size={20} /> */}
              <input
                type="text"
                placeholder="Enter a prompt..."
                className="bg-transparent flex-1 p-4 text-white outline-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Maximize2 className="w-6 h-6 text-purple-500 cursor-pointer hover:text-white transition" />
              <button
                className="bg-purple-600 text-gray-100 px-4 py-2 rounded-lg"
                onClick={handleTextGeneration}
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Text"}
              </button>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 mt-2">{error}</p>}

            {/* Generated Text Box */}
            {generatedText && (
              <div className="mt-6 p-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg shadow-lg relative">
                <strong className="text-lg">Generated Text:</strong>
                <button
                  className="absolute top-4 right-4 bg-gray-600 px-3 py-1 text-sm rounded-md hover:bg-gray-500"
                  onClick={() => handleCopy(generatedText, "text")}
                >
                  {copyText}
                </button>
                <p className="mt-3 text-xl leading-relaxed whitespace-pre-wrap">{generatedText}</p>
              </div>
            )}

            {/* Generated Code & Explanation Section */}
            {generatedCode && (
              <div className="mt-6 bg-gradient-to-r from-gray-900 to-black text-white rounded-lg shadow-lg p-6">
                <div className="relative">
                  <strong className="text-lg">Generated Code:</strong>
                  <button
                    className="absolute top-4 right-4 bg-gray-700 px-3 py-1 text-sm rounded-md hover:bg-gray-600"
                    onClick={() => handleCopy(generatedCode, "code")}
                  >
                    {copyCode}
                  </button>
                  <pre className="mt-3 p-4 text-sm whitespace-pre-wrap rounded-md bg-black text-green-400 overflow-x-auto">
                    {generatedCode}
                  </pre>
                </div>

                {explanation && (
                  <div className="mt-6 p-4 bg-gray-800 text-gray-300 rounded-lg shadow-lg relative">
                    <strong className="text-lg">Explanation:</strong>
                    <button
                      className="absolute top-4 right-4 bg-gray-600 px-3 py-1 text-sm rounded-md hover:bg-gray-500"
                      onClick={() => handleCopy(`${explanation}\n\n${generatedCode}`, "full")}
                    >
                      {copyFull}
                    </button>
                    <p className="mt-3 text-sm">{explanation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextGeneration;
