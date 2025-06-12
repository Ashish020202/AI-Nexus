import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <div>
      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-start px-6 py-8 md:px-12">
        
        {/* Logo */}
        <div className="flex items-center mr-auto">
        <div className="absolute pl-2 flex items-center">
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#A66CFF] via-[#F3A683] to-[#FFB6C1] 
                          shadow-3xl px-13 py-8 rounded-lg inline-block text-4xl tracking-wide font-bold"
                style={{ fontFamily: "'Monotype Corsiva', 'Pacific'" }}> AI Nexus 
          </span>
          </div>
        </div>
        <div> </div>
        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {[
            { title: "Text Generation", path: "/Textgeneration" },
            { title: "Image Generation", path: "/ImageGeneration" },
            { title: "Code Generation", path: "/CodeGeneration" },
            { title: "Music Generation", path: "/Musicgeneration" },
            { title: "Video Generation", path: "/Videogeneration" }
          ].map((item, index) => (
            <button key={index} 
                    onClick={() => navigate(item.path)}
                    className="px-5 py-2 bg-gradient-to-r from-purple-700 to-purple-500 text-white text-lg font-semibold shadow-lg rounded-lg 
                               transition-transform duration-300 hover:scale-105 hover:from-purple-600 hover:to-purple-400"
                    style={{ fontFamily: "Georgia, serif" }}>
              {item.title}
            </button>
          ))}
        </div>

        {/* Launch Button with "Upcoming New" Badge */}
       
          {/* Small badge box (aligned properly) */}
          {/* <div className="absolute -top-4 -left-4 bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md">
            Upcoming New 🚀
          </div> */}

          {/* Main Button */}
          {/* <button className="rounded-full bg-gradient-to-r from-purple-700 to-purple-500 px-8 py-3 text-white text-lg font-semibold 
                             shadow-lg transition-all duration-300 hover:scale-110 hover:from-purple-600 hover:to-purple-400">
            Launch App
          </button> */}
       
      </nav>
    </div>
  );
}

export default Navbar;
