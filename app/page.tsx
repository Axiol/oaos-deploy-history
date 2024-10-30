"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

// Mock data for deployments
const mockDeployments = {
  PRD: [
    { date: "2024-10-30", user: "Alice", branch: "main" },
    { date: "2024-10-25", user: "Bob", branch: "hotfix-123" },
    { date: "2024-10-20", user: "Charlie", branch: "feature-456" },
    { date: "2024-10-15", user: "David", branch: "main" },
    { date: "2024-10-10", user: "Eve", branch: "release-2.0" },
  ],
  UAT: [
    { date: "2024-10-29", user: "Frank", branch: "develop" },
    { date: "2024-10-24", user: "Grace", branch: "feature-789" },
    { date: "2024-10-19", user: "Henry", branch: "bugfix-101" },
    { date: "2024-10-14", user: "Ivy", branch: "develop" },
    { date: "2024-10-09", user: "Jack", branch: "feature-202" },
  ],
  U1AT: [
    { date: "2024-10-28", user: "Kelly", branch: "test-303" },
    { date: "2024-10-23", user: "Liam", branch: "feature-404" },
    { date: "2024-10-18", user: "Mia", branch: "develop" },
    { date: "2024-10-13", user: "Noah", branch: "test-505" },
    { date: "2024-10-08", user: "Olivia", branch: "feature-606" },
  ],
  U2AT: [
    { date: "2024-10-27", user: "Paul", branch: "test-707" },
    { date: "2024-10-22", user: "Quinn", branch: "feature-808" },
    { date: "2024-10-17", user: "Rachel", branch: "develop" },
    { date: "2024-10-12", user: "Sam", branch: "test-909" },
    { date: "2024-10-07", user: "Tom", branch: "feature-1010" },
  ],
  U3AT: [
    { date: "2024-10-26", user: "Uma", branch: "test-1111" },
    { date: "2024-10-21", user: "Victor", branch: "feature-1212" },
    { date: "2024-10-16", user: "Wendy", branch: "develop" },
    { date: "2024-10-11", user: "Xander", branch: "test-1313" },
    { date: "2024-10-06", user: "Yara", branch: "feature-1414" },
  ],
};

type Environment = "PRD" | "UAT" | "U1AT" | "U2AT" | "U3AT";

export default function Component() {
  const [expandedEnvs, setExpandedEnvs] = useState<
    Record<Environment, boolean>
  >({
    PRD: false,
    UAT: false,
    U1AT: false,
    U2AT: false,
    U3AT: false,
  });

  const toggleExpand = (env: Environment) => {
    setExpandedEnvs((prev) => ({ ...prev, [env]: !prev[env] }));
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Deployment History
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {(Object.keys(mockDeployments) as Environment[]).map((env) => (
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
                {mockDeployments[env]
                  .slice(0, expandedEnvs[env] ? 5 : 1)
                  .map((deployment, index) => (
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
}
