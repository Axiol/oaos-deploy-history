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

export type Environment = "PRD" | "UAT" | "U1AT" | "U2AT" | "U3AT";
