import { defaultWagmiConfig } from "@web3modal/wagmi";
import { type Chain, createPublicClient, http } from "viem";
import { mainnet, sepolia } from "wagmi/chains";
import { walletConnect } from "wagmi/connectors";

export function getProjectId() {
  const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

  if (!projectId) throw new Error("Project ID is not defined");

  return projectId;
}

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, sepolia] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId: getProjectId(),
  metadata,
  connectors: [walletConnect({ projectId: getProjectId() })],
  ssr: false,
});

export function getClient(chain: Chain) {
  return createPublicClient({
    chain,
    transport: http(),
  });
}
