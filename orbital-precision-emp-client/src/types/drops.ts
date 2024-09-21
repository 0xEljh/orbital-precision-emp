export interface token {
  name: string;
  imageUrl: string;
}

export interface Airdrop {
  id: number;
  title: string;
  description: string;
  token: token;
  project: {
    name: string;
    description: string;
  };
  maxReward: string;
}
