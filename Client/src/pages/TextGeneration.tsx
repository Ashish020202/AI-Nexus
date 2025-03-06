import React from 'react'
import Sidebar from './sidebar'
import axios from 'axios'
import { useState } from 'react'

const TextGeneration = () => {

    const [message, setMessage] = useState('');
    const [generatedText,setgeneratedText]=useState('');
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('');
      

    const handleTextGeneration = async () => {

        if (!message.trim()) {
            setError('Please enter a prompt.');
            return;
          }
          
          
          setLoading(true);
          setError('');

        try {

        const response =await axios.post('http://localhost:5000/api/text-gen',{message})
        
        // setPrompt(response.data)
        setgeneratedText(response.data.content)
         
        console.log("text res",response.data.message.content[0].text);
        // setPrompt(response.data)
        setgeneratedText(response.data.message.content[0].text)
         
       
            
        } catch (error) {

            setError("Failed to generate text. Try again.");
            
        }
        finally {
            setLoading(false);
          }
        
    }


  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white p-8">
    <div className="flex gap-6">
      <Sidebar />
      <div className="flex-1">
        <div className="bg-[#1A1A1F] rounded-lg p-8">
          <div className="mb-4 p-4">
            <input
              type="text"
              placeholder="Enter a prompt..."
              className="bg-[#0B0B0F] w-full p-4 text-white rounded-md mb-2 border border-purple-600"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button
            className="bg-yellow-800 text-gray-300 px-4 py-2 rounded-lg w-full"
            onClick={handleTextGeneration}
            disabled={loading}
          >

            {loading ? 'Generating...' : 'Generate Text'}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}

          {generatedText && (
              <div className="mt-6 p-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg shadow-lg">
                <strong className="text-lg font-bold">Generated Text:</strong>
                <p className="mt-3 text-xl font-semibold leading-relaxed tracking-wide whitespace-pre-line"
                  style={{ fontFamily: "'Dancing Script', cursive" }}>
                  {generatedText}
                </p>
              </div>
            )}
        </div>
      </div>
    </div>
  </div>
  )
}

export default TextGeneration
