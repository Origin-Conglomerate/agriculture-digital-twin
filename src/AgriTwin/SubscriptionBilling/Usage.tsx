import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
const Usage = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white/50 dark:bg-gray-900/50 border-green-100/50 dark:border-blue-900/30">
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-green-600 dark:text-blue-200">Storage Used</p>
              <Progress value={75} className="bg-green-100 dark:bg-blue-900" />
              <p className="text-xs text-green-600 dark:text-blue-200">75% of 100GB</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/50 dark:bg-gray-900/50 border-green-100/50 dark:border-blue-900/30">
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-green-600 dark:text-blue-200">API Calls</p>
              <Progress value={45} className="bg-green-100 dark:bg-blue-900" />
              <p className="text-xs text-green-600 dark:text-blue-200">45,000 of 100,000</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

export default Usage;