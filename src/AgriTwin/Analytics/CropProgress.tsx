
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

interface CropProgressProps {
  crop: string;
  stage: string;
  progress: number;
}

export const CropProgress = ({ crop, stage, progress }: CropProgressProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="bg-gradient-to-tr from-green-50 via-yellow-50 to-green-100 dark:from-green-900/50 dark:via-yellow-900/30 dark:to-green-800/50 backdrop-blur-xl shadow-lg border-2 border-green-300/50 dark:border-green-800/50 rounded-2xl hover:scale-[1.02] transition-transform duration-300">
      <CardHeader className="bg-gradient-to-r from-green-200 to-yellow-200 dark:from-green-800 dark:to-yellow-600 p-6 rounded-t-2xl">
        <CardTitle className="text-lg font-semibold text-green-900 dark:text-yellow-300 flex items-center gap-2">
          <Leaf className="h-5 w-5 text-green-700 dark:text-yellow-400" />
          {crop}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="text-base font-medium text-green-800 dark:text-yellow-300">
            {stage}
          </div>
          <div className="relative w-full h-6 bg-gradient-to-r from-green-200 to-yellow-100 dark:from-green-700 dark:to-yellow-600 rounded-full shadow-inner overflow-hidden">
            <motion.div
              className="absolute h-full bg-gradient-to-r from-green-600 to-yellow-500 dark:from-yellow-500 dark:to-green-400 rounded-full shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>
          <div className="flex justify-between text-sm text-green-700 dark:text-yellow-400">
            <span>0%</span>
            <span>{progress}%</span>
            <span>100%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);
