import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SupplyChainMap = () => {
  return (
    <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-green-800 dark:text-blue-300">
          Supply Chain Network
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Add a map visualization here */}
        <div className="h-[400px] bg-green-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <p className="text-green-700 dark:text-blue-200">Map Visualization</p>
        </div>
      </CardContent>
    </Card>
  );
};