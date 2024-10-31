"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Environment, Environments, Deployment } from "@/lib/types";

interface HistoryProps {
  readonly deploys: Environments;
}

/**
 * Helper function to get enum values in order.
 */
const getOrderedEnvValues = (): Environment[] => {
  return Object.values(Environment).filter(
    (value): value is Environment => typeof value === "string",
  );
}

/**
 * History component displays the deployment history for different environments.
 *
 * @param {Environments} deploys - The deployment data for different environments.
 * @returns {JSX.Element} The rendered History component.
 */
const History = ({ deploys }: HistoryProps): JSX.Element => {
  const [expandedEnvs, setExpandedEnvs] = useState<
    Record<Environment, boolean>
  >(
    Object.fromEntries(
      getOrderedEnvValues().map((env) => [env, false]),
    ) as Record<Environment, boolean>,
  );

  const toggleExpand = (env: Environment) => {
    setExpandedEnvs((prev) => ({ ...prev, [env]: !prev[env] }));
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Deployment History
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {getOrderedEnvValues().map((env) => (
          <Card key={env} className="w-full">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{env}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpand(env)}
                  aria-label={
                    expandedEnvs[env] ? "Collapse history" : "Expand history"
                  }
                >
                  {expandedEnvs[env] ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {/* @ts-expect-error - TS doesn't know that env is a valid key */}
                {deploys[env]
                  ?.slice(0, expandedEnvs[env] ? 5 : 1)
                  .map((deployment: Deployment, index: number) => (
                    <li key={index} className="bg-muted p-2 rounded-md text-sm">
                      <p>
                        <strong>Date:</strong> {deployment.date}
                      </p>
                      <p>
                        <strong>User:</strong> {deployment.user}
                      </p>
                      <p>
                        <strong>Branch:</strong> {deployment.branch}
                      </p>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default History;
