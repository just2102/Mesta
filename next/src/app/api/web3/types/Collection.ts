export type CollectionData = {
  coverAsImage: string | undefined | null;
  description: string | undefined | null;
  name: string | undefined;
  maxSupply: number;
  totalSupply: number;
  collectionAddress: `0x${string}` | undefined;
};
