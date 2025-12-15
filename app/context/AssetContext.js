"use client";

import { createContext, useState, useContext } from "react";
import { mockAssets } from "@/lib/mockdata"; // Keep your initial mock data here

const AssetContext = createContext();

export function AssetProvider({ children }) {
  // This state lives outside the pages, so it persists during navigation
  const [assets, setAssets] = useState(mockAssets);

  // The CRUD "Create" Function
  const addAsset = (newAsset) => {
    // Add the new asset to the START of the list
    setAssets((prev) => [newAsset, ...prev]);
  };

  return (
    <AssetContext.Provider value={{ assets, addAsset }}>
      {children}
    </AssetContext.Provider>
  );
}

// Custom hook to make importing easier
export function useAssets() {
  return useContext(AssetContext);
}