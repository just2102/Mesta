"use client";

import { Web3Button, useWeb3Modal } from "@web3modal/react";
import {
  useAccount,
  useConnect,
  useEnsName,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";

export default function ConnectWalletBtn() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();
  const { disconnect } = useDisconnect();
  console.log("switch network", switchNetwork);
  return (
    <div>
      <Web3Button balance="show" />
      {error && <div>{error.message}</div>}
    </div>
  );
}
