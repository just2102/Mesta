export type IpfsJson = {
  name: string;
  description: string;
  image: string;
  attributes: JsonAttribute[];
};

export type JsonAttribute = {
  trait_type: string;
  value: string;
};
