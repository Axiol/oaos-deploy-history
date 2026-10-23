import { NextResponse } from "next/server";
import { getDeploys } from "@/lib/deploys";

export const dynamic = "force-dynamic";

/**
 * Returns the deployment history as JSON, grouped by site and
 * environment, mirroring the data shown on the web page.
 */
export const GET = async () => {
  const deploys = await getDeploys();

  return NextResponse.json(deploys);
};
