// "use client";

// import { createConfig, configureChains } from "wagmi";
// import { publicProvider } from "wagmi/providers/public";
// import { MetaMaskConnector } from "wagmi/connectors/metaMask";
// import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
// import { arbitrum, mainnet, sepolia, polygon } from "wagmi/chains";
// import { createWeb3Modal } from "@web3modal/wagmi";

// const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
// if (!projectId) {
//   throw new Error("Missing NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID");
// }
// const chains = [mainnet, polygon, arbitrum, sepolia];

// const { publicClient, webSocketPublicClient } = configureChains(chains, [
//   publicProvider(),
// ]);

// export const wagmiConfig = createConfig({
//   autoConnect: true,
//   publicClient,
//   webSocketPublicClient,
//   connectors: [
//     new MetaMaskConnector({ chains }),
//     new WalletConnectConnector({
//       chains,
//       options: {
//         projectId,
//       },
//     }),
//   ],
// });
