import { useNavigate } from "react-router-dom";



const Landing = () => {

const navigate = useNavigate();

const handleClick = () => {

  navigate('/Dashboard')

}
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-[20%] w-44 h-16 bg-gradient-to-r from-[#1a1a1a] to-[#222] rounded-full blur-2xl opacity-50"></div>
        <div className="absolute top-[30%] right-[25%] w-44 h-16 bg-gradient-to-r from-[#1a1a1a] to-[#222] rounded-full blur-2xl opacity-50"></div>
        <div className="absolute bottom-[20%] left-[10%] w-44 h-16 bg-gradient-to-r from-[#1a1a1a] to-[#222] rounded-full blur-2xl opacity-50"></div>
      </div>

      {/* Creator badge */}
      {/* <div className="relative mb-6">
        <div className="bg-[#1a1a1a]/80 backdrop-blur-md rounded-full px-4 py-1 text-sm text-gray-400 shadow-md">
          Built for Innovators
        </div>
      </div> */}

      {/* Main content */}
      <div className="relative text-center max-w-3xl mx-auto">
        {/* Heading */}
        <h1 className="text-6xl font-bold mb-2 tracking-tight" style={{ fontFamily: "Inter, sans-serif" }}>
          AI SaaS Platform
        </h1>

        {/* Gradient Subtitle */}
        <div
          className="text-5xl mb-6 bg-gradient-to-r from-[#BAC4FF] via-[#FFB9C6] to-[#FFB9C6] text-transparent bg-clip-text font-semibold"
          style={{ fontFamily: "Pacifico, cursive" }}
        >
          Powering Your Creativity.
        </div>

        {/* Email Input */}
        {/* <div className="flex gap-2 mb-6 w-full max-w-md mx-auto px-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-5 py-3 rounded-full bg-[#1a1a1a]/50 border border-gray-800 focus:outline-none focus:border-purple-500 text-gray-300"
          />
          <button className="px-6 py-3 bg-gradient-to-r from-[#6C3BFF] to-[#5D32E3] hover:opacity-90 rounded-full transition-all shadow-md">
            Get Early Access
          </button>
        </div> */}

        {/* Tagline */}
        <p className="text-gray-400 text-lg mb-14">
          AI-powered text, image, audio, and video generation – all in one platform.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {[
            {
              title: "Text Generation",
              text: "Create engaging blog posts, ads, and content effortlessly.",
            },
            {
              title: "Image Generation",
              text: "Generate stunning AI-powered visuals in seconds.",
            },
            {
              title: "Music Genration",
              text: "Generate stunning AI music",
            },
            {
              title: "Video Generation",
              text: "Transform ideas into AI-generated videos seamlessly.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-[#1a1a1a]/80 to-[#1a1a1a]/40 backdrop-blur-lg p-6 rounded-xl border border-gray-800/20 shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.text}</p>
            </div>
          ))}
        </div>
        <button className="bg-gradient-to-b from-[#1a1a1a]/80 to-[#1a1a1a]/40 p-4 mt-8 rounded" onClick={()=>handleClick()}>Get Started</button>
      </div>
    </div>
  );
};

export default Landing;
