import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InventoryAnalytics = () => {
  const { tenantId } = useSelector((state) => state.login);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [trends, setTrends] = useState({ reorderSuggestions: [], tenantId: tenantId });

  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/inventory/list?tenantId=${tenantId}`);
        const data = await response.json();
        if (data.success) {
          setInventoryItems(data.items);

          // Generate reorder suggestions dynamically if stock is low
          const reorderSuggestions = data.items
            .filter(item => item.quantity <= item.threshold * 1)
            .map(item => `Order ${item.name} within 5 days if required`);

          setTrends({ reorderSuggestions });
        } else {
          console.error("Failed to fetch inventory items");
        }
      } catch (error) {
        console.error("Error fetching inventory items:", error);
      }
    };

    fetchInventoryItems();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Predictions & Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Reorder Suggestions</h3>
              {trends.reorderSuggestions.length > 0 ? (
                trends.reorderSuggestions.map((suggestion, index) => (
                  <p key={index}>{suggestion}</p>
                ))
              ) : (
                <p>No immediate reorders needed.</p>
              )}
            </div>

            <div>
              <h3 className="font-semibold">Seasonal Insights</h3>
              {trends.reorderSuggestions.length > 0 ? (
                <p>Stocks are low for some items. Reordering is recommended.</p>
              ) : (
                <p>Peak season approaching for pesticides.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryAnalytics;
