import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
export const BiodiversityMonitor = () => (
  <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-green-100/50 dark:border-blue-900/30">
    <CardHeader>
      <CardTitle className="text-green-900 dark:text-white">Biodiversity Index</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-green-700 dark:text-blue-200">Native Species</span>
          <span className="text-green-900 dark:text-white">85%</span>
        </div>
        <Progress value={85} className="bg-green-100 dark:bg-green-900">
          <div className="bg-green-500 dark:bg-blue-500 h-full transition-all" 
               style={{ width: '85%' }} />
        </Progress>
      </div>
      {/* More biodiversity metrics */}
    </CardContent>
  </Card>
);