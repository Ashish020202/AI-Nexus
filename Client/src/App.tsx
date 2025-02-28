import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <AppRoutes />
      ashsih
    </div>
  );
};

export default App;

























// import { useState } from "react";
// import * as mm from "@magenta/music";

// const model = new mm.MusicRNN(
//   "https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/melody_rnn"
// );
// const player = new mm.SoundFontPlayer(
//   "https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus"
// );

// const MusicGenerator = () => {
//   const [tempo, setTempo] = useState(120);
//   const [selectedMelody, setSelectedMelody] = useState("Happy");
//   const [generatedMelody, setGeneratedMelody] = useState<mm.INoteSequence | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [noteCount, setNoteCount] = useState(50);
//   const [temperature, setTemperature] = useState(1.1);

//   const melodies: { [key: string]: mm.INoteSequence } = {
//     Happy: {
//       notes: [
//         { pitch: 60, startTime: 0, endTime: 0.5 },
//         { pitch: 62, startTime: 0.5, endTime: 1 },
//         { pitch: 64, startTime: 1, endTime: 1.5 },
//       ],
//       totalTime: 1.5,
//     },
//     Sad: {
//       notes: [
//         { pitch: 60, startTime: 0, endTime: 0.5 },
//         { pitch: 58, startTime: 0.5, endTime: 1 },
//         { pitch: 55, startTime: 1, endTime: 1.5 },
//       ],
//       totalTime: 1.5,
//     },
//     Jazz: {
//       notes: [
//         { pitch: 60, startTime: 0, endTime: 0.5 },
//         { pitch: 63, startTime: 0.5, endTime: 1 },
//         { pitch: 67, startTime: 1, endTime: 1.5 },
//       ],
//       totalTime: 1.5,
//     },
//     Classical: {
//       notes: [
//         { pitch: 60, startTime: 0, endTime: 0.5 },
//         { pitch: 65, startTime: 0.5, endTime: 1 },
//         { pitch: 69, startTime: 1, endTime: 1.5 },
//       ],
//       totalTime: 1.5,
//     },
//   };

//   const generateMusic = async () => {
//     const seed = melodies[selectedMelody];
//     const quantizedSeed = mm.sequences.quantizeNoteSequence(seed, 4);
//     await model.initialize();
//     try {
//       const generatedSequence = await model.continueSequence(
//         quantizedSeed,
//         noteCount,
//         temperature
//       );
//       setGeneratedMelody(generatedSequence);
//     } catch (error) {
//       console.error("Error generating melody:", error);
//     }
//   };

//   const playMusic = async () => {
//     if (!generatedMelody) return;
//     setIsPlaying(true);
//     await player.start(generatedMelody);
//     setIsPlaying(false);
//   };

//   return (
//     <div className="flex flex-col items-center gap-4 p-6">
//       <h1 className="text-2xl font-bold">AI Music Generator 🎶</h1>
      
//       <label className="text-lg">Select Melody Type:</label>
//       <select
//         value={selectedMelody}
//         onChange={(e) => setSelectedMelody(e.target.value)}
//         className="p-2 border rounded"
//       >
//         {Object.keys(melodies).map((melody) => (
//           <option key={melody} value={melody}>{melody}</option>
//         ))}
//       </select>
      
//       <label className="text-lg">Number of Notes: {noteCount}</label>
//       <input
//         type="range"
//         min="20"
//         max="100"
//         value={noteCount}
//         onChange={(e) => setNoteCount(Number(e.target.value))}
//         className="w-48"
//       />

//       <label className="text-lg">Temperature: {temperature.toFixed(1)}</label>
//       <input
//         type="range"
//         min="0.5"
//         max="2.0"
//         step="0.1"
//         value={temperature}
//         onChange={(e) => setTemperature(Number(e.target.value))}
//         className="w-48"
//       />
      
//       <label className="text-lg">Tempo: {tempo} BPM</label>
//       <input
//         type="range"
//         min="60"
//         max="180"
//         value={tempo}
//         onChange={(e) => setTempo(Number(e.target.value))}
//         className="w-48"
//       />
      
//       <div className="flex gap-4">
//         <button
//           onClick={generateMusic}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Generate Music 🎼
//         </button>
//         <button
//           onClick={playMusic}
//           disabled={!generatedMelody || isPlaying}
//           className={`px-4 py-2 rounded ${isPlaying ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"} text-white`}
//         >
//           {isPlaying ? "Playing..." : "Play ▶️"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MusicGenerator;


// // import React, { useState } from "react";
// // import axios from "axios";

// // const App = () => {
// //   // States for input fields
// //   const [to, setTo] = useState("");
// //   const [from, setFrom] = useState("");
// //   const [emailType, setEmailType] = useState("");
// //   const [userDetails, setUserDetails] = useState("");
// //   const [responseMessage, setResponseMessage] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   // Function to handle form submission
// //   const handleSubmit = async (e:any) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setResponseMessage("");

// //     // Make API call to the backend
// //     try {
// //       const response = await axios.post("http://localhost:5000/send-ai-email", {
// //         to,
// //         from,
// //         emailType,
// //         userDetails,
// //       });

// //       if (response.data.success) {
// //         setResponseMessage("AI-generated email sent successfully!");
// //       } else {
// //         setResponseMessage("Failed to send email.");
// //       }
// //     } catch (error) {
// //       console.error("Error:", error);
// //       setResponseMessage("Error sending email. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="container max-w-lg mx-auto p-4">
// //       <h1 className="text-2xl font-bold mb-4 text-center">AI Email Generator</h1>

// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         {/* To Input */}
// //         <div className="flex flex-col">
// //           <label htmlFor="to" className="font-semibold">Recipient Email:</label>
// //           <input
// //             id="to"
// //             type="email"
// //             value={to}
// //             onChange={(e) => setTo(e.target.value)}
// //             required
// //             className="border p-2 mt-1"
// //           />
// //         </div>

// //         {/* From Input */}
// //         <div className="flex flex-col">
// //           <label htmlFor="from" className="font-semibold">Sender Email:</label>
// //           <input
// //             id="from"
// //             type="email"
// //             value={from}
// //             onChange={(e) => setFrom(e.target.value)}
// //             required
// //             className="border p-2 mt-1"
// //           />
// //         </div>

// //         {/* Email Type Input */}
// //         <div className="flex flex-col">
// //           <label htmlFor="emailType" className="font-semibold">Email Type:</label>
// //           <input
// //             id="emailType"
// //             type="text"
// //             value={emailType}
// //             onChange={(e) => setEmailType(e.target.value)}
// //             required
// //             className="border p-2 mt-1"
// //           />
// //         </div>

// //         {/* User Details Input */}
// //         <div className="flex flex-col">
// //           <label htmlFor="userDetails" className="font-semibold">User Details:</label>
// //           <textarea
// //             id="userDetails"
// //             value={userDetails}
// //             onChange={(e) => setUserDetails(e.target.value)}
// //             required
// //             className="border p-2 mt-1"
// //           ></textarea>
// //         </div>

// //         {/* Submit Button */}
// //         <button
// //           type="submit"
// //           disabled={loading}
// //           className={`w-full py-2 mt-4 bg-blue-500 text-white font-semibold ${loading && "opacity-50 cursor-not-allowed"}`}
// //         >
// //           {loading ? "Sending..." : "Send Email"}
// //         </button>
// //       </form>

// //       {/* Response Message */}
// //       {responseMessage && (
// //         <div className="mt-4 text-center">
// //           <p className={`${responseMessage.includes("Error") ? "text-red-500" : "text-green-500"}`}>
// //             {responseMessage}
// //           </p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default App;

