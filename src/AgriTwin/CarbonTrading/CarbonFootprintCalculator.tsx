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


export default function CarbonFootprintCalculator () {
    const [inputs, setInputs] = useState({
      electricity: '',
      fuel: '',
      waste: '',
      water: '',
      transportation: ''
    });
    const [totalFootprint, setTotalFootprint] = useState(0);
  
    const calculateFootprint = () => {
      // Simplified calculation factors
      const factors = {
        electricity: 0.85, // kg CO2 per kWh
        fuel: 2.31,       // kg CO2 per liter
        waste: 0.5,       // kg CO2 per kg waste
        water: 0.376,     // kg CO2 per cubic meter
        transportation: 0.14 // kg CO2 per km
      };
  
      const total = Object.keys(inputs).reduce((acc, key) => {
        return acc + (parseFloat(inputs[key] || 0) * factors[key]);
      }, 0);
  
      setTotalFootprint(total);
    };
  
    return (
        <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                                    Carbon Credit Calculator
                                </h3>
      <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-blue-300">Carbon Footprint Calculator</CardTitle>
          <CardDescription className="text-green-600 dark:text-blue-200">
            Calculate your carbon emissions based on resource usage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.keys(inputs).map((key) => (
            <div key={key} className="space-y-2">
              <Label className="text-green-700 dark:text-blue-200 capitalize">
                {key} Usage
              </Label>
              <Input
                type="number"
                placeholder={`Enter ${key} usage`}
                value={inputs[key]}
                onChange={(e) => setInputs({ ...inputs, [key]: e.target.value })}
                className="border-green-200 dark:border-blue-900"
              />
            </div>
          ))}
          <Button 
            onClick={calculateFootprint}
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Calculate Footprint
          </Button>
          {totalFootprint > 0 && (
            <Alert className="bg-green-50 dark:bg-blue-900/30 border-green-200 dark:border-blue-800">
              <AlertDescription>
                Your estimated carbon footprint is {totalFootprint.toFixed(2)} kg CO2e
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
      </div>
    );
  };