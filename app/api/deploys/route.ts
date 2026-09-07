import { NextResponse } from "next/server";
import { getNormalizedDeploys } from "@/lib/deploys";

export const dynamic = "force-dynamic";

/**
 * Returns the deployment history as JSON, grouped by site and normalized
 * environment (e.g. `p1` -> `PRD`), mirroring the data shown on the web page.
 */
export const GET = async () => {
  const deploys = await getNormalizedDeploys();

  return NextResponse.json(deploys);
};
