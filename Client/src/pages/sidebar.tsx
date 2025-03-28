import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { title: "Generate Now", path: "/Dashboard", icon: "", hideArrow: true, noBorder: true },
    { title: "Text Generation", path: "/TextGeneration", icon: "✎" },
    { title: "Code Generation", path: "/codeGeneration", icon: "⚡" },
    { title: "Image Generation", path: "/ImageGeneration", icon: "👤" },
    { title: "Music Generation", path: "/MusicGeneration", icon: "✨" },
    { title: "Video Generation", path: "/videoGeneration", icon: "📐" },
  ];

  return (
    <div className="w-60 py-4 space-y-6">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`rounded-lg p-3 cursor-pointer transition-all ${
            location.pathname === item.path
              ? "bg-purple-600 shadow-md"  // Highlight selected item
              : item.noBorder
              ? "bg-[#1A1A1F] hover:bg-purple-700"
              : "bg-[#1A1A1F] border border-purple-600 hover:bg-purple-700"
          }`}
          onClick={() => navigate(item.path)}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-xs">{item.icon}</span>
              <span className="text-white text-lg">{item.title}</span>
            </div>
            {!item.hideArrow && <span className="text-gray-400">▼</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
