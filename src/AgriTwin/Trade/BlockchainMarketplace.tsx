import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShieldCheck, Globe, Lock, Verified, Network } from "lucide-react";

export const BlockchainMarketplace = () => {
  const [selectedBuyer, setSelectedBuyer] = useState(null);

  const buyers = [
    {
      id: 1,
      name: "GlobalAgriTech Solutions",
      location: "Singapore",
      blockchainVerified: true,
      complianceScore: 98,
      tradeVolume: 500000,
      specialization: "Sustainable Grains",
      paymentMethods: ["Crypto", "Smart Contract"],
      aiRiskAssessment: {
        creditRating: "A+",
        reputationScore: 9.2,
        complianceRisk: "Low",
      },
    },
    {
      id: 2,
      name: "EcoHarvest Network",
      location: "Netherlands",
      blockchainVerified: true,
      complianceScore: 95,
      tradeVolume: 350000,
      specialization: "Organic Produce",
      paymentMethods: ["Stable Coin", "Tokenized Assets"],
      aiRiskAssessment: {
        creditRating: "A",
        reputationScore: 8.7,
        complianceRisk: "Low",
      },
    },
    {
      id: 3,
      name: "AgriChain Enterprises",
      location: "USA",
      blockchainVerified: true,
      complianceScore: 92,
      tradeVolume: 750000,
      specialization: "Precision Agriculture",
      paymentMethods: ["Crypto Escrow", "Smart Contracts"],
      aiRiskAssessment: {
        creditRating: "A-",
        reputationScore: 8.5,
        complianceRisk: "Medium",
      },
    },
  ];

  return (
    <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-blue-100/50 dark:border-blue-900/30 rounded-2xl">
      <CardHeader className="bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/50 dark:to-green-900/50 p-6 rounded-t-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <CardTitle className="text-lg md:text-xl font-bold text-blue-900 dark:text-white flex items-center gap-2">
          <Network size={24} /> Blockchain Buyers Marketplace
        </CardTitle>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Lock size={16} /> Secure
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Globe size={16} /> Global
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <ScrollArea className="h-80 md:h-96">
            <div className="space-y-4">
              {buyers.map((buyer) => (
                <div
                  key={buyer.id}
                  onClick={() => setSelectedBuyer(buyer)}
                  className={`
                    p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg flex flex-col md:flex-row justify-between items-center cursor-pointer 
                    transition-all duration-300 hover:bg-blue-100/50 dark:hover:bg-blue-900/30
                    ${selectedBuyer?.id === buyer.id ? "ring-2 ring-blue-500" : ""}
                  `}
                >
                  <div className="text-center md:text-left">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-blue-800 dark:text-blue-300">
                        {buyer.name}
                      </h3>
                      {buyer.blockchainVerified && <Verified size={16} className="text-green-600" />}
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-200">
                      {buyer.location} | {buyer.specialization}
                    </p>
                  </div>
                  <Badge variant="secondary">Volume: ₹{buyer.tradeVolume.toLocaleString()}</Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div>
          {selectedBuyer ? (
            <div className="p-4 bg-blue-50 dark:bg-gray-800 rounded-lg space-y-3">
              <h4 className="font-bold text-blue-900 dark:text-blue-200 text-center md:text-left">
                Blockchain Security Profile
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-300">Trade Volume</p>
                  <p className="font-semibold">₹{selectedBuyer.tradeVolume.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300">Compliance Score</p>
                  <p className="font-semibold text-green-700">{selectedBuyer.complianceScore}%</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300">AI Risk Assessment</p>
                  <p className="font-semibold text-blue-700">{selectedBuyer.aiRiskAssessment.creditRating}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300">Payment Methods</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedBuyer.paymentMethods.map((method) => (
                      <Badge key={method} variant="secondary" size="sm">
                        {method}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 text-center">
              <p>Select a buyer to view detailed blockchain profile</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BlockchainMarketplace;
