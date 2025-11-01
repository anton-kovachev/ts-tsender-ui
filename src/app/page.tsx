"use client";

import HomeContent from "@/components/HomeContent";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();
  return (
    <div>
      <main className="p-6">
        {!isConnected && (
          <p className="mb-4 text-center text-lg text-gray-700">
            Please connect your wallet to use the TSender Airdrop Tool.
          </p>
        )}
        {isConnected && <HomeContent />}
      </main>
    </div>
  );
}
