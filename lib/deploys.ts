import { APIDeploy, Sites } from "./types";
import { sortFormatDeploys } from "./utils";

const DEPLOY_QUERIES = [
  "site=eq.actus&env=eq.p1&limit=5&order=id.desc",
  "site=eq.actus&env=eq.u1&limit=5&order=id.desc",
  "site=eq.actus&env=eq.u1a&limit=5&order=id.desc",
  "site=eq.actus&env=eq.u1b&limit=5&order=id.desc",
  "site=eq.actus&env=eq.u1c&limit=5&order=id.desc",
  "site=eq.entreprise&env=eq.p1&limit=5&order=id.desc",
  "site=eq.entreprise&env=eq.u1&limit=5&order=id.desc",
  "site=eq.cmsadmin&env=eq.p1&limit=5&order=id.desc",
  "site=eq.cmsadmin&env=eq.u1&limit=5&order=id.desc",
];

/**
 * Fetches the raw deployment data from Supabase for every tracked site / environment.
 * @returns {Promise<Array<Array<APIDeploy>>>} One array of deploys per query
 */
export const fetchDeploys = async (): Promise<Array<Array<APIDeploy>>> => {
  const responses = await Promise.all(
    DEPLOY_QUERIES.map((query) =>
      fetch(`${process.env.SUPABASE_BASE_URL}/Deploy?${query}`, {
        headers: {
          apikey: process.env.SUPABASE_ANON_KEY ?? "",
          Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        },
      }),
    ),
  );

  return Promise.all(responses.map((response) => response.json()));
};

/**
 * Fetches deployment data and returns it grouped by site / environment.
 * @returns {Promise<Sites>} Sorted deployments grouped by site / environment
 */
export const getDeploys = async (): Promise<Sites> => {
  return sortFormatDeploys(await fetchDeploys());
};
