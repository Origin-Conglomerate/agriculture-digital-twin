import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1/inventory`;

const useInventoryAnalytics = () => {
    const { tenantId } = useSelector((state) => state.login);
    const [analytics, setAnalytics] = useState({
        lowStock: [],
        predictions: null,
        trends: null,
        tenantId: tenantId,
    });
    const [loading, setLoading] = useState(true); // To track loading state
    const [error, setError] = useState(null); // To track any error
    const [totalItems, setTotalItems] = useState(0); // Track total inventory items count

    useEffect(() => {
        const fetchInventoryAnalytics = async () => {
            setLoading(true); // Set loading to true when fetching
            setError(null); // Clear any previous error
            try {
                const response = await fetch(`${API_BASE_URL}/list?tenantId=${tenantId}`);
                const data = await response.json();
                
                if (data.success) {
                    // Set total items count
                    setTotalItems(data.items.length);
                    
                    // Filter items that are below threshold
                    const lowStockItems = data.items.filter(item => item.quantity <= item.threshold);
                    setAnalytics(prev => ({
                        ...prev,
                        lowStock: lowStockItems
                    }));
                } else {
                    setError("Unable to fetch data. Please try again later.");
                }
            } catch (error) {
                setError("Unable to fetch data. Please try again later.");
                console.error("Error fetching inventory analytics:", error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchInventoryAnalytics();
    }, [tenantId]); // Re-fetch on tenantId change

    return { analytics, loading, error, totalItems };
};

const Overview = () => {
    const { analytics, loading, error, totalItems } = useInventoryAnalytics();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Low Stock Alerts */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Low Stock Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <p className="text-sm text-gray-500">Loading...</p>
                    ) : error ? (
                        <p className="text-sm text-red-500">{error}</p>
                    ) : totalItems === 0 ? (
                        <p className="text-sm text-gray-500">No items available to show alerts</p>
                    ) : analytics.lowStock.length > 0 ? (
                        analytics.lowStock.map((item) => (
                            <div key={item._id} className="flex justify-between items-center mb-2">
                                <span>{item.name}</span>
                                <Badge variant="destructive">
                                    {item.quantity}/{item.threshold}
                                </Badge>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">All items are in stock</p>
                    )}
                </CardContent>
            </Card>

            {/* AI Predictions (Placeholder for now) */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">AI Predictions</CardTitle>
                </CardHeader>
                <CardContent>
                    {totalItems === 0 ? (
                        <p className="text-sm text-gray-500">No inventory items to make predictions</p>
                    ) : (
                        <div className="space-y-2">
                            <p className="text-sm text-green-700 dark:text-blue-200">
                                {analytics.predictions?.nextMonthDemand || "Fetching predictions..."}
                            </p>
                            <p className="text-sm text-green-700 dark:text-blue-200">
                                {analytics.predictions?.reorderSuggestion || "No reorder suggestions yet"}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Overview;
