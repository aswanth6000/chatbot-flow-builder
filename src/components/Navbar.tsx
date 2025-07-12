import { Bot } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-4 py-4 border-b bg-white shadow-sm">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <Bot className="w-5 h-5" />
        Chatbot Flow Builder
      </h2>
    </nav>
  );
};

export default Navbar;
