"use client";

import { useState, useMemo, useEffect, use } from "react";
import InputField from "./UI/InputField";
import { chainsToTSender, tsenderAbi, erc20Abi } from "@/contants";
import {
  useChainId,
  useConfig,
  useWriteContract,
  useReadContracts,
  useAccount,
} from "wagmi";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { calculateTotal } from "@/utils/calculateTotal";
import { formatUnits, parseEther, parseUnits } from "viem";

export default function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState(() => {
    return localStorage.getItem("lastTokenAddress") || "";
  });

  const [recipients, setRecipients] = useState(() => {
    return localStorage.getItem("lastRecipients") || "";
  });

  const [amounts, setAmounts] = useState(() => {
    return localStorage.getItem("lastAmounts") || "";
  });
  const [tSenderAddress, setTSenderAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const chainId = useChainId();
  const config = useConfig();
  const account = useAccount();
  const totalAmountNeeded = useMemo(() => calculateTotal(amounts), [amounts]);
  const { data: hash, isPending, writeContractAsync } = useWriteContract();

  useEffect(() => {
    setTSenderAddress(chainsToTSender[chainId]?.tsender ?? null);
  }, [chainId]);

  const tokenContract = {
    address: tokenAddress as `0x${string}`,
    abi: erc20Abi,
  };

  const { data: tokenData } = useReadContracts({
    config,
    contracts: [
      { ...tokenContract, functionName: "symbol" },
      { ...tokenContract, functionName: "decimals" },
      {
        ...tokenContract,
        functionName: "balanceOf",
        args: [account.address],
      },
    ],
  });

  const tokenSymbol = tokenData ? (tokenData[0].result as string) : "";
  const tokenDecimals = tokenData ? (tokenData[1].result as number) : 18;
  const tokenBalance = tokenData ? (tokenData[2].result as number) : 0;
  console.log("Token Data:", { tokenSymbol, tokenDecimals, tokenBalance });

  useEffect(() => {
    if (tokenAddress) {
      localStorage.setItem("lastTokenAddress", tokenAddress);
    } else {
      localStorage.removeItem("lastTokenAddress");
    }
  }, [tokenAddress]);

  useEffect(() => {
    if (recipients) {
      localStorage.setItem("lastRecipients", recipients);
    } else {
      localStorage.removeItem("lastRecipients");
    }
  }, [recipients]);

  useEffect(() => {
    if (amounts) {
      localStorage.setItem("lastAmounts", amounts);
    } else {
      localStorage.removeItem("lastAmounts");
    }
  }, [amounts]);

  async function handleSubmit() {
    console.log("Submitting airdrop:", { tokenAddress, recipients, amounts });
    setIsLoading(true);
    try {
      const approvedAmount = await getApprovedAmount(tSenderAddress);
      if (approvedAmount < totalAmountNeeded) {
        const txnHash = await writeContractAsync({
          abi: erc20Abi,
          address: tokenAddress as `0x${string}`,
          functionName: "approve",
          args: [
            tSenderAddress as `0x${string}`,
            BigInt(
              parseUnits(totalAmountNeeded.toString(), tokenDecimals ?? 18)
            ),
          ],
        });

        const approvalReceipt = await waitForTransactionReceipt(config, {
          hash: txnHash,
        });

        console.log("Approval Receipt:", approvalReceipt);

        await sendAirdropTokens();
        return;
      } else {
        await sendAirdropTokens();
      }

      console.log("Approved Amount:", approvedAmount);
      console.log("TSender Address:", tSenderAddress);
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function sendAirdropTokens() {
    const txnHash = await writeContractAsync({
      abi: tsenderAbi,
      address: tSenderAddress as `0x${string}`,
      functionName: "airdropERC20",
      args: [
        tokenAddress,
        recipients
          .split(/[,\n]+/)
          .map((addr) => addr.trim())
          .filter((addr) => addr !== ""),
        amounts
          .split(/[,\n]+/)
          .map((amt) => amt.trim())
          .filter((amt) => amt !== "")
          .map((amt) => BigInt(parseEther(amt))),
        BigInt(parseUnits(totalAmountNeeded.toString(), tokenDecimals ?? 18)),
      ],
    });

    const txnReceipt = await waitForTransactionReceipt(config, {
      hash: txnHash,
    });

    setRecipients("");
    setAmounts("");
    alert(
      "Airdrop Successful! Transaction Hash: " + txnReceipt.transactionHash
    );
  }

  async function getApprovedAmount(
    tsenderAddress: string | null
  ): Promise<number> {
    // Placeholder for actual implementation
    if (!tsenderAddress) {
      alert("No address found. Please use a supported network.");
      return 0;
    }

    const response = await readContract(config, {
      abi: erc20Abi,
      address: tokenAddress as `0x${string}`,
      functionName: "allowance",
      args: [account.address, tsenderAddress as `0x${string}`],
    });

    return Number(response);
  }

  return (
    <div>
      <InputField
        label="Token Address"
        placeholder="0x"
        value={tokenAddress}
        large={false}
        type="text"
        onChange={(e) => setTokenAddress(e.target.value)}
      />
      <br />
      <InputField
        label="Recipients"
        placeholder="0x12345, 0x67890, ..."
        value={recipients}
        large={true}
        type="text"
        onChange={(e) => setRecipients(e.target.value)}
      />
      <br />
      <InputField
        label="Amounts"
        placeholder="100, 200, ..."
        value={amounts}
        large={true}
        type="text"
        onChange={(e) => setAmounts(e.target.value)}
      />

      <br />

      <div className="flex flex-col gap-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm">
        <div className="flex justify-between items-center">
          <strong>Token Name: </strong>
          {tokenSymbol}
        </div>
        <div className="flex justify-between items-center">
          <strong>Tokens Balance:</strong>
          {formatUnits(BigInt(tokenBalance ?? 0), tokenDecimals ?? 18)}
        </div>
        <div className="flex justify-between items-center">
          <strong>Tokens Needed </strong>
          {totalAmountNeeded}
        </div>
      </div>
      <br />

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
      >
        {isLoading && (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {isLoading ? "Processing..." : "Send Tokens"}
      </button>
    </div>
  );
}
