import React from "react";
import { getMissions, getProperties } from "@/lib/markdown";
import { PortfolioContainer } from "@/components/PortfolioContainer";

// Server Component (Default page.tsx in next 13+ App router)
export default async function Page() {
  // Load Markdown data server-side
  const missions = getMissions();
  const properties = getProperties();

  return (
    <PortfolioContainer
      missions={missions}
      properties={properties}
    />
  );
}
