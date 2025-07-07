"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Deployment } from "@/lib/types";

interface FullCardProps {
  readonly deploys: Array<Deployment>;
  readonly env: string;
}

export const FullCard = ({ deploys, env }: FullCardProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{env}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label={isExpanded ? "Collapse history" : "Expand history"}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {deploys.map((deployment, index) => (
              <li
                key={index}
                className={`bg-muted p-2 rounded-md text-sm ${index > 0 && !isExpanded && "hidden"}`}
              >
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
    </div>
  );
};
