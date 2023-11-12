import Image from "next/image";
import spinner from "~/assets/spinner.svg";

export function IsWaitingMintNft() {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <Image src={spinner} width={400} height={400} alt="NFT is being minted" />
  );
}
