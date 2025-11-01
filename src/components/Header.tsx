import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaGithub } from "react-icons/fa";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      {/* Left side - Title */}
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-gray-900">tsender</h1>
      </div>

      {/* Right side - GitHub link and Connect button */}
      <div className="flex items-center gap-4">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="GitHub Repository"
        >
          <FaGithub size={24} />
        </a>
        <ConnectButton />
      </div>
    </header>
  );
}
