import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {APIDeploy, Deployment, Environments} from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sorts deployment data by environment and transforms into a simplified format
 * @param {Array<APIDeploy>} deploys
 * @returns {Environments} Sorted deployments grouped by environment
 */
export function deploysFormatter(deploys: Array<APIDeploy>): Environments {
  // Input validation
  if (!Array.isArray(deploys)) {
    throw new Error("Input must be an array");
  }

  // Initialize result object
  const result = {} as Partial<Environments>;

  // Sort deployments by createdAt in descending order (most recent first)
  const sortedDeployments = [...deploys].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  // Group by environment
  sortedDeployments.forEach((deployment) => {
    const { env, name, branch, createdAt } = deployment;

    // Create simplified deployment object
    const simplifiedDeployment = {
      date: new Date(createdAt).toISOString(),
      user: name,
      branch,
    } as Deployment;

    // If environment doesn't exist in result, create array
    // @ts-expect-error - TS doesn't know that env is a valid key
    if (!result[env]) {
      // @ts-expect-error - TS doesn't know that env is a valid key
      result[env] = [];
    }

    // @ts-expect-error - TS doesn't know that env is a valid key
    // Add deployment to appropriate environment array
    result[env].push(simplifiedDeployment);
  });

  return result as Environments;
}
