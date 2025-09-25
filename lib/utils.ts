import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { APIDeploy, Environments, Sites } from "./types";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
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

/**
 * Formats the env name to avoid u1, p1 ...
 * @param {String} env
 * @returns {String} The correct title
 */
export const formatTitle = (env: string): String => {
  if (env === 'p1') {
    return 'PRD'
  }

  if (env === 'u1') {
    return 'UAT'
  }

  return env
}

