import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1/inventory`;

const VisualizeInventory = () => {
  const { tenantId } = useSelector((state) => state.login);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInventoryItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/list?tenantId=${tenantId}`);
      const data = await response.json();
      if (data.success) {
        setInventoryItems(data.items);
      } else {
        setError("Failed to fetch inventory data.");
      }
    } catch (error) {
      setError("Error fetching inventory data. Please try again later.");
      console.error("Error fetching inventory data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventoryItems();
    const intervalId = setInterval(fetchInventoryItems, 30000);
    return () => clearInterval(intervalId);
  }, [tenantId]);

  return (
    <Card className="p-4 shadow-md">
      <CardHeader>
        <CardTitle>Inventory Stock Levels</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : inventoryItems.length === 0 ? (
          <p className="text-center text-gray-600">No stocks to show the visualization.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={inventoryItems} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                content={({ payload }) => {
                  if (payload && payload.length) {
                    const { name, quantity, threshold } = payload[0].payload;
                    return (
                      <div className="bg-white shadow-lg p-2 border border-gray-300 rounded">
                        <p className="font-semibold">{name}</p>
                        <p>Quantity: {quantity}</p>
                        <p>Threshold: {threshold}</p>
                        <p>Status: {quantity > threshold ? "In Stock" : "Low Stock"}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="quantity">
                {inventoryItems.map((item, index) => (
                  <Cell key={`bar-${index}`} fill={item.quantity > item.threshold ? "#4CAF50" : "#FF5722"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default VisualizeInventory;
