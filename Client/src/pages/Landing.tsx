import { useNavigate } from "react-router-dom";



const Landing = () => {

const navigate = useNavigate();

const handleClick = () => {

  navigate('/Dashboard')

}
//   return (
//     <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-[10%] left-[20%] w-44 h-16 bg-gradient-to-r from-[#1a1a1a] to-[#222] rounded-full blur-2xl opacity-50"></div>
//         <div className="absolute top-[30%] right-[25%] w-44 h-16 bg-gradient-to-r from-[#1a1a1a] to-[#222] rounded-full blur-2xl opacity-50"></div>
//         <div className="absolute bottom-[20%] left-[10%] w-44 h-16 bg-gradient-to-r from-[#1a1a1a] to-[#222] rounded-full blur-2xl opacity-50"></div>
//       </div>

//       {/* Creator badge */}
//       {/* <div className="relative mb-6">
//         <div className="bg-[#1a1a1a]/80 backdrop-blur-md rounded-full px-4 py-1 text-sm text-gray-400 shadow-md">
//           Built for Innovators
//         </div>
//       </div> */}

//       {/* Main content */}
//       <div className="relative text-center max-w-3xl mx-auto">
//         {/* Heading */}
//         <h1 className="text-6xl font-bold mb-2 tracking-tight" style={{ fontFamily: "Inter, sans-serif" }}>
//           <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 shadow-lg">
//             AI SaaS Platform
//           </span>
//         </h1>

//         {/* Gradient Subtitle */}
//         <div
//           className="text-5xl mb-6 bg-gradient-to-r from-[#BAC4FF] via-[#FFB9C6] to-[#FFB9C6] text-transparent bg-clip-text font-semibold"
//           style={{ fontFamily: "Pacifico, cursive" }}
//         >
//           Powering Your Creativity.
//         </div>

//         {/* Email Input */}
//         {/* <div className="flex gap-2 mb-6 w-full max-w-md mx-auto px-4">
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="flex-1 px-5 py-3 rounded-full bg-[#1a1a1a]/50 border border-gray-800 focus:outline-none focus:border-purple-500 text-gray-300"
//           />
//           <button className="px-6 py-3 bg-gradient-to-r from-[#6C3BFF] to-[#5D32E3] hover:opacity-90 rounded-full transition-all shadow-md">
//             Get Early Access
//           </button>
//         </div> */}

//         {/* Tagline */}
//         <p className="text-gray-400 text-lg mb-14">
//           AI-powered text, image, audio, and video generation – all in one platform.
//         </p>

//         {/* Feature Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
//           {[
//             {
//               title: "Text Generation",
//               text: "Create engaging blog posts, ads, and content effortlessly.",
//             },
//             {
//               title: "Image Generation",
//               text: "Generate stunning AI-powered visuals in seconds.",
//             },
//             {
//               title: "Music Genration",
//               text: "Generate stunning AI music",
//             },
//             {
//               title: "Video Generation",
//               text: "Transform ideas into AI-generated videos seamlessly.",
//             },
//           ].map((feature, index) => (
//             <div
//               key={index}
//               className="bg-gradient-to-b from-[#1a1a1a]/80 to-[#1a1a1a]/40 backdrop-blur-lg p-6 rounded-xl border border-gray-800/20 shadow-lg"
//             >
//               <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
//               <p className="text-gray-400">{feature.text}</p>
//             </div>
//           ))}
//         </div>
//         <button className="bg-gradient-to-b from-[#1a1a1a]/80 to-[#1a1a1a]/40 p-4 mt-8 rounded" onClick={()=>handleClick()}>Get Started</button>
//       </div>
//     </div>
//   );
// };

// export default Landing;


return (
  <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
    {/* Aura Effect */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[300px] h-[150px] bg-purple-500 opacity-30 blur-3xl rounded-full animate-pulse"></div>
    </div>

    <div className="relative text-center max-w-3xl mx-auto">
      {/* AI SaaS Platform with Aura Effect */}
      <h1 className="text-7xl font-bold mb-4 tracking-tight relative z-10 text-center">
        <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#A66CFF] via-[#F3A683] to-[#FFB6C1] shadow-xl px-8 py-4 rounded-lg inline-block"
            style={{ fontFamily: "'Monotype Corsiva', 'Pacifico', cursive" }}>
          AI Nexus
        </span>
      </h1>

      {/* AI SaaS Platform with Aura Effect */}
      {/* <h2 className="text-5xl font-bold mb-4 tracking-tight relative z-10 text-center">
        <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#A66CFF] via-[#F3A683] to-[#FFB6C1] shadow-xl px-8 py-4 rounded-lg inline-block"
            style={{ fontFamily: "'STZhongsong', 'Pacifico', cursive" }}>
          The All-in-One SaaS Platform
        </span>
      </h2> */}

      {/* Bigger Box for Powering Creativity */}
      <div className="text-5xl mb-6 px-6 py-3 rounded-lg bg-gradient-to-r from-[#BAC4FF] via-[#FFB9C6] to-[#FFB9C6] text-transparent bg-clip-text font-semibold shadow-md"
            style={{ fontFamily: "'Monotype Corsiva', 'Pacifico', cursive" }}>
        Powering Your Creativity.
      </div>

      {/* Tagline */}
      <p className="text-gray-400 text-lg mb-14">
        AI-powered text, image, audio, and video generation – all in one platform.
      </p>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {[
          { title: "Text Generation", text: "Create engaging blog posts, ads, and content effortlessly." },
          { title: "Image Generation", text: "Generate stunning AI-powered visuals in seconds." },
          { title: "Music Generation", text: "Generate AI-powered music tracks effortlessly." },
          { title: "Video Generation", text: "Transform ideas into AI-generated videos seamlessly." },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-[#1a1a1a]/80 to-[#1a1a1a]/40 backdrop-blur-lg p-6 rounded-xl border border-gray-800/20 shadow-lg transition-all duration-300 hover:scale-105 hover:border-purple-500"
          >
            <h3 className="text-xl font-semibold mb-3 text-purple-400">{feature.title}</h3>
            <p className="text-gray-400">{feature.text}</p>
          </div>
        ))}
      </div>

      {/* Get Started Button with Hover Effect */}
      <button
        className="bg-gradient-to-r from-purple-700 to-purple-00 px-5 py-2 mt-8 rounded-lg text-white text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-110 hover:bg-purple-500"
        style={{ fontFamily: "'Sitka Small', serif" }}
        onClick={handleClick}
      >
        Get Started
      </button>
    </div>
  </div>
);
};

export default Landing;



// return (
//   <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
//     {/* Background Particles */}
//     <div className="absolute inset-0 overflow-hidden">
//       <div className="absolute top-[10%] left-[20%] w-44 h-16 bg-purple-700 rounded-full blur-2xl opacity-50 animate-pulse"></div>
//       <div className="absolute top-[30%] right-[25%] w-44 h-16 bg-blue-600 rounded-full blur-2xl opacity-50 animate-pulse"></div>
//       <div className="absolute bottom-[20%] left-[10%] w-44 h-16 bg-pink-600 rounded-full blur-2xl opacity-50 animate-pulse"></div>
//     </div>

//     {/* Main content */}
//     <div className="relative text-center max-w-3xl mx-auto">
//       {/* Heading */}
//       <h1 className="text-6xl font-bold mb-2 tracking-tight hover:text-purple-400 transition-all duration-300">
//         AI SaaS Platform
//       </h1>

//       {/* Gradient Subtitle */}
//       <div className="text-5xl mb-6 bg-gradient-to-r from-[#BAC4FF] via-[#FFB9C6] to-[#FFB9C6] text-transparent bg-clip-text font-semibold">
//         Powering Your Creativity.
//       </div>

//       {/* Tagline */}
//       <p className="text-gray-400 text-lg mb-14">
//         AI-powered text, image, audio, and video generation – all in one platform.
//       </p>

//       {/* Feature Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
//         {["Text Generation", "Image Generation", "Music Generation", "Video Generation"].map((feature, index) => (
//           <div
//             key={index}
//             className="bg-gradient-to-b from-[#1a1a1a]/80 to-[#1a1a1a]/40 backdrop-blur-lg p-6 rounded-xl border border-gray-800/20 shadow-lg hover:scale-105 transition-all duration-300 hover:border-purple-500 hover:shadow-purple-500/50"
//           >
//             <h3 className="text-xl font-semibold mb-3 text-purple-300">{feature}</h3>
//             <p className="text-gray-400">AI-powered {feature.toLowerCase()} in seconds.</p>
//           </div>
//         ))}
//       </div>

//       {/* Get Started Button with Effects */}
//       <button
//         className="relative mt-10 px-6 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-500 hover:to-purple-600 transition-all duration-300 ease-in-out shadow-lg shadow-purple-500/50 hover:shadow-xl hover:scale-105 active:scale-95"
//         onClick={handleClick}
//       >
//         Get Started
//         <span className="absolute inset-0 rounded-lg animate-pulse bg-purple-600 opacity-20"></span>
//       </button>
//     </div>
//   </div>
// );
// };

// export default Landing;
