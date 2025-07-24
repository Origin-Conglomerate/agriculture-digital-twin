import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface WeatherCardProps {
  title: string;
  description?: string;
  badge?: string;
  className?: string;
  children: React.ReactNode;
}

export const WeatherCard = ({ 
  title, 
  description, 
  badge, 
  className, 
  children 
}: WeatherCardProps) => {
  return (
    <Card className={cn(
      "bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out",
      className
    )}>
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-green-900 dark:text-white">
              {title}
            </CardTitle>
            {description && (
              <CardDescription className="text-green-700 dark:text-blue-200">
                {description}
              </CardDescription>
            )}
          </div>
          {badge && (
            <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
              {badge}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  );
};