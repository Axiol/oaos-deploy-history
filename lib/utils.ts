import { clsx, type ClassValue } from "clsx";
import { warn } from "console";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sorts deployment data by environment and transforms into a simplified format
 * @param {Array<{id: number, name: string, branch: string, env: string, createdAt: string}>} deploys
 * @returns {Object} Sorted deployments grouped by environment
 */
export function deploysFormatter(deploys) {
  // Input validation
  if (!Array.isArray(deploys)) {
    throw new Error("Input must be an array");
  }

  // Initialize result object
  const result = {};

  // Sort deployments by createdAt in descending order (most recent first)
  const sortedDeployments = [...deploys].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  // Group by environment
  sortedDeployments.forEach((deployment) => {
    const { env, name, branch, createdAt } = deployment;

    // Create simplified deployment object
    const simplifiedDeployment = {
      date: new Date(createdAt).toISOString(),
      user: name,
      branch,
    };

    // If environment doesn't exist in result, create array
    if (!result[env]) {
      result[env] = [];
    }

    // Add deployment to appropriate environment array
    result[env].push(simplifiedDeployment);
  });

  return result;
}
