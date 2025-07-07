import { Fragment } from "react";
import { Sites } from "@/lib/types";
import { FullCard } from "./full-card";

interface HistoryProps {
  readonly deploys: Sites;
}

/**
 * History component displays the deployment history for different environments.
 *
 * @param {Environments} deploys - The deployment data for different environments.
 * @returns {JSX.Element} The rendered History component.
 */
const History = ({ deploys }: HistoryProps): JSX.Element => {
  return (
    <>
      {Object.keys(deploys).map((site) => {
        return (
          <Fragment key={site}>
            <h2 className="text-2xl font-bold">
              {site.charAt(0).toUpperCase() + site.slice(1)}
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* @ts-expect-error - TS doesn't know that env is a valid key */}
              {Object.keys(deploys[site] || {}).map((env) => {
                return (
                  <FullCard
                    key={site + env}
                    env={env}
                    deploys={deploys[site][env]}
                  />
                );
              })}
            </div>
          </Fragment>
        );
      })}
    </>
  );
};

export default History;
