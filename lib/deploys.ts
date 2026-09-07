import { APIDeploy, Deployment, Environments, Sites } from "./types";
import { formatTitle, sortFormatDeploys } from "./utils";

const DEPLOY_QUERIES = [
  "site=eq.actus&env=eq.PRD&limit=5&order=id.desc",
  "site=eq.actus&env=eq.UAT&limit=5&order=id.desc",
  "site=eq.actus&env=eq.U1AT&limit=5&order=id.desc",
  "site=eq.actus&env=eq.U2AT&limit=5&order=id.desc",
  "site=eq.actus&env=eq.U3AT&limit=5&order=id.desc",
  "site=eq.entreprise&env=eq.PRD&limit=5&order=id.desc",
  "site=eq.entreprise&env=eq.UAT&limit=5&order=id.desc",
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

/**
 * Normalizes environment keys so the API exposes canonical names
 * (e.g. `p1` -> `PRD`, `u1` -> `UAT`) instead of internal aliases.
 * Deployments landing on the same normalized env are merged and
 * kept sorted by date, most recent first.
 * @param {Sites} sites
 * @returns {Sites} Deployments grouped by site and normalized environment
 */
export const normalizeDeploys = (sites: Sites): Sites => {
  return Object.entries(sites).reduce((acc, [site, envs]) => {
    if (!envs) return acc;

    const normalizedEnvs = (
      Object.entries(envs) as Array<[string, Deployment[] | undefined]>
    ).reduce((envAcc, [env, deploys]) => {
      if (!deploys) return envAcc;

      const envKey = formatTitle(env) as keyof Environments;

      envAcc[envKey] = [...(envAcc[envKey] ?? []), ...deploys].sort(
        (a, b) => b.date.localeCompare(a.date),
      );

      return envAcc;
    }, {} as Environments);

    acc[site as keyof Sites] = normalizedEnvs;

    return acc;
  }, {} as Sites);
};

/**
 * Fetches deployment data and returns it grouped by site and
 * normalized environment, ready to be served as JSON.
 * @returns {Promise<Sites>} Normalized deployments grouped by site / environment
 */
export const getNormalizedDeploys = async (): Promise<Sites> => {
  return normalizeDeploys(await getDeploys());
};
