"use client";

import React, { type ReactNode } from "react";

import { createWeb3Modal } from "@web3modal/wagmi/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { type State, WagmiProvider } from "wagmi";
import { config, getProjectId } from "~/config";

const queryClient = new QueryClient();

createWeb3Modal({
  wagmiConfig: config,
  projectId: getProjectId(),
});

export default function Web3ModalProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
