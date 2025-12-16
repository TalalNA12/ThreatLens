"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AssetContext = createContext();

export function AssetProvider({ children }) {
  const [assets, setAssets] = useState([]); // Start empty! No more mock data.
  const [loading, setLoading] = useState(true); // To show spinners
  const [error, setError] = useState(null);

  // 1. FETCH: Load assets from MongoDB when the app starts
  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/assets");
      const data = await res.json();
      setAssets(data);
    } catch (err) {
      console.error("Failed to fetch assets:", err);
      setError("Failed to load assets from the server.");
    } finally {
      setLoading(false);
    }
  };

  // 2. ADD: Send new target to the API (triggers OSINT scan)
  const addAsset = async (newAssetData) => {
    try {
      // We return the promise so the Form knows when to stop "Loading..."
      const res = await fetch("/api/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAssetData),
      });

      if (!res.ok) throw new Error("Failed to add asset");

      const savedAsset = await res.json();

      // Update state immediately so we see it in the grid
      setAssets((prev) => [savedAsset, ...prev]);
      return savedAsset; // Return data in case the page needs it
    } catch (err) {
      console.error("Error adding asset:", err);
      throw err; // Throw error so the Form can show an alert
    }
  };

  // 3. DELETE (Optional but good to have)
  const deleteAsset = async (id) => {
    // Optimistic update: Remove from UI immediately
    setAssets((prev) => prev.filter((a) => a._id !== id));
    
    // Then tell DB to delete (You haven't built this API yet, but this is ready for it)
    // await fetch(`/api/assets?id=${id}`, { method: 'DELETE' });
  };

  return (
    <AssetContext.Provider value={{ assets, loading, error, addAsset, deleteAsset, refresh: fetchAssets }}>
      {children}
    </AssetContext.Provider>
  );
}

export function useAsset() {
  return useContext(AssetContext);
}