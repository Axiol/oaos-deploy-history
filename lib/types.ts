export interface APIDeploy {
  id: number;
  name: string;
  branch: string;
  env: string;
  createdAt: string;
}

export interface Deployment {
  date: string;
  user: string;
  branch: string;
}

export interface Environments {
  PRD: Deployment[];
  UAT: Deployment[];
  U1AT: Deployment[];
  U2AT: Deployment[];
  U3AT: Deployment[];
}

// export type Environment = "PRD" | "UAT" | "U1AT" | "U2AT" | "U3AT";

export enum Environment {
  PRD,
  UAT,
  U1AT,
  U2AT,
  U3AT,
}
