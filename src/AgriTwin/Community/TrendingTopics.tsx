import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
  } from "@/components/ui/card";
  import { Badge } from "@/components/ui/badge";
  import { TrendingUp } from 'lucide-react';
  
  export const TrendingTopics = () => {
    return (
      <Card className="w-full max-w-[89vw] bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-lg">
        <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 rounded-t-2xl">
          <CardTitle className="text-xl text-green-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="text-green-600 dark:text-blue-400" />
            Trending Topics
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-green-100 dark:bg-blue-900 text-green-800 dark:text-blue-100">
              #OrganicFarming
            </Badge>
            <Badge className="bg-green-100 dark:bg-blue-900 text-green-800 dark:text-blue-100">
              #SustainableAgriculture
            </Badge>
            <Badge className="bg-green-100 dark:bg-blue-900 text-green-800 dark:text-blue-100">
              #SmartIrrigation
            </Badge>
            <Badge className="bg-green-100 dark:bg-blue-900 text-green-800 dark:text-blue-100">
              #CropInnovation
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  };