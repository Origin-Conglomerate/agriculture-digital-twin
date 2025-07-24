import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const TradeOffer = ({ onSubmit }) => {
  return (
    <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <CardTitle className="text-xl font-bold text-green-900 dark:text-white">
          Submit Trade Offer
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="crop">Crop Type</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select crop" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wheat">Wheat</SelectItem>
              <SelectItem value="rice">Rice</SelectItem>
              <SelectItem value="corn">Corn</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity (kg)</Label>
          <Input id="quantity" type="number" className="w-full" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price per kg</Label>
          <Input id="price" type="number" className="w-full" />
        </div>
        <Button 
          className="w-full bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700"
          onClick={onSubmit}
        >
          Submit Offer
        </Button>
      </CardContent>
    </Card>
  );
};