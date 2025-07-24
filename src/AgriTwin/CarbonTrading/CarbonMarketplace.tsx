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


export default function CarbonMarketplace ()  {
    const [marketData, setMarketData] = useState({
      sellers: [
        { id: 1, name: "Farm A", credits: 100, price: 25, rating: 4.5 },
        { id: 2, name: "Farm B", credits: 75, price: 28, rating: 4.2 },
        { id: 3, name: "Farm C", credits: 150, price: 22, rating: 4.8 }
      ],
      buyers: [
        { id: 1, name: "Company X", demand: 200, maxPrice: 30, rating: 4.6 },
        { id: 2, name: "Company Y", demand: 150, maxPrice: 27, rating: 4.3 },
        { id: 3, name: "Company Z", demand: 100, maxPrice: 32, rating: 4.7 }
      ]
    });
  
    const [tradeAmount, setTradeAmount] = useState('');
    const [selectedParty, setSelectedParty] = useState('');
  
    return (
        <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                                    Carbon Marketplace
                                </h3>
      <Card className="w-full max-w-[92vw] bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
        <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-4 rounded-t-xl">
          <CardTitle className="text-green-800 dark:text-blue-300">Carbon Marketplace</CardTitle>
          <CardDescription className="text-green-600 dark:text-blue-200">
            Connect with carbon credit buyers and sellers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">Available Sellers</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Seller</TableHead>
                  <TableHead>Available Credits</TableHead>
                  <TableHead>Price/Credit</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {marketData.sellers.map((seller) => (
                  <TableRow key={seller.id}>
                    <TableCell>{seller.name}</TableCell>
                    <TableCell>{seller.credits}</TableCell>
                    <TableCell>₹{seller.price}</TableCell>
                    <TableCell>{seller.rating}⭐</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-50 dark:border-blue-400 dark:text-blue-400"
                        onClick={() => setSelectedParty(seller.id)}
                      >
                        Buy
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
  
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">Active Buyers</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Demand</TableHead>
                  <TableHead>Max Price</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {marketData.buyers.map((buyer) => (
                  <TableRow key={buyer.id}>
                    <TableCell>{buyer.name}</TableCell>
                    <TableCell>{buyer.demand}</TableCell>
                    <TableCell>₹{buyer.maxPrice}</TableCell>
                    <TableCell>{buyer.rating}⭐</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-50 dark:border-blue-400 dark:text-blue-400"
                        onClick={() => setSelectedParty(buyer.id)}
                      >
                        Sell
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
  
          {selectedParty && (
            <div className="space-y-4 p-4 bg-green-50 dark:bg-blue-900/30 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                Initialize Trade
              </h3>
              <div className="space-y-2">
                <Label className="text-green-700 dark:text-blue-200">Amount of Credits</Label>
                <Input
                  type="number"
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(e.target.value)}
                  className="border-green-200 dark:border-blue-900"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  className="bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Confirm Trade
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setSelectedParty('')}
                  className="border-green-600 text-green-600 hover:bg-green-50 dark:border-blue-400 dark:text-blue-400"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      </div>
    );
  };
  