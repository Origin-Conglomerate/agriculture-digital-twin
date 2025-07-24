import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


export default function CreditGenerationTracking () {
    const [creditData, setCreditData] = useState({
      totalGenerated: 150,
      pendingVerification: 45,
      verified: 105,
      projectedGeneration: 200
    });
  
    return (
        <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                                    Carbon Credit Generation Tracking
                                </h3>
      <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-blue-300">Credit Generation Tracking</CardTitle>
          <CardDescription className="text-green-600 dark:text-blue-200">
            Monitor your carbon credit generation progress
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-green-700 dark:text-blue-200">Total Generated</Label>
              <div className="text-2xl font-bold text-green-800 dark:text-blue-300">
                {creditData.totalGenerated} credits
              </div>
            </div>
            <div>
              <Label className="text-green-700 dark:text-blue-200">Pending Verification</Label>
              <div className="text-2xl font-bold text-green-800 dark:text-blue-300">
                {creditData.pendingVerification} credits
              </div>
            </div>
          </div>
          <div>
            <Label className="text-green-700 dark:text-blue-200">Verification Progress</Label>
            <Progress 
              value={(creditData.verified / creditData.totalGenerated) * 100} 
              className="bg-green-100 dark:bg-blue-900"
            />
          </div>
          <div>
            <Label className="text-green-700 dark:text-blue-200">Projected Generation</Label>
            <Progress 
              value={(creditData.totalGenerated / creditData.projectedGeneration) * 100}
              className="bg-green-100 dark:bg-blue-900"
            />
          </div>
        </CardContent>
      </Card>
      </div>
    );
  };