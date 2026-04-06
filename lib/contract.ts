export const COUNTER_ABI = [
  "function count() view returns (uint256)",
  "function visit() external",
  "function getCount() view returns (uint256)",
  "event Visited(address indexed visitor, uint256 newCount)"
];

// Fallback to a placeholder address if not provided in env.
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000";

// Fallback public Sepolia RPC URL
export const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || "https://rpc.sepolia.org";
