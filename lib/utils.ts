import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { APIDeploy, Deployment, Environments, Sites } from "./types";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

/**
 * Sorts deployment data by environment and transforms into a simplified format
 * @param {Array<APIDeploy>} deploys
 * @returns {Environments} Sorted deployments grouped by environment
 */
export const deploysFormatter = (deploys: Array<APIDeploy>): Environments => {
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
};

/**
 * Sorts deployment data by site / environment and transforms into a simplified format
 * @param {Array<Array<APIDeploy>>} deploys
 * @returns {Sites} Sorted deployments grouped by site / environment
 */
export const sortFormatDeploys = (deploys: Array<Array<APIDeploy>>): Sites => {
  return deploys.flat().reduce((acc, item) => {
    const siteKey = item.site as keyof Sites;
    const envKey = item.env as keyof Environments;

    // Create the site if it does not exist
    if (!acc[siteKey]) {
      acc[siteKey] = {};
    }

    // Create the env if it does not exist
    if (!acc[siteKey]![envKey]) {
      acc[siteKey]![envKey] = [];
    }

    // Add the entry to the appropriate site and environment
    acc[siteKey]![envKey]!.push({
      date: item.createdAt,
      user: item.name,
      branch: item.branch,
    });

    return acc;
  }, {} as Sites);
};
