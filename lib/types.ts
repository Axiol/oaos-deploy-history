export interface APIDeploy {
  id: number;
  name: string;
  branch: string;
  env: string;
  createdAt: string;
  site: string;
}

export interface Deployment {
  date: string;
  user: string;
  branch: string;
}

export interface Environments {
  p1?: Deployment[];
  u1?: Deployment[];
  u1a?: Deployment[];
  u1b?: Deployment[];
  u1c?: Deployment[];
}

export interface Sites {
  actus?: Environments;
  enterprise?: Environments;
  cmsadmin?: Environments;
  accounts?: Environments;
}

// export type Environment = "p1" | "u1" | "u1a" | "u1b" | "u1c";

export enum Environment {
  p1,
  u1,
  u1a,
  u1b,
  u1c,
}
