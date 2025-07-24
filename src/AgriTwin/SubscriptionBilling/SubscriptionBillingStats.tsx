import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {Clock,Calendar,DollarSign, IndianRupee} from "lucide-react";
const SubscriptionBillingStats = () =>
{
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/50 dark:bg-gray-900/50 border-green-100/50 dark:border-blue-900/30">
            <CardContent className="p-4">
              <div className="flex gap-4 items-center">
                <Clock className="text-green-600 dark:text-blue-400" />
                <div>
                  <p className="text-sm text-green-600 dark:text-blue-200">Next Payment</p>
                  <p className="font-bold text-green-800 dark:text-blue-300">May 1, 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/50 dark:bg-gray-900/50 border-green-100/50 dark:border-blue-900/30">
            <CardContent className="p-4">
              <div className="flex gap-4 items-center">
                <IndianRupee className="text-green-600 dark:text-blue-400" />
                <div>
                  <p className="text-sm text-green-600 dark:text-blue-200">Amount Due</p>
                  <p className="font-bold text-green-800 dark:text-blue-300"> ₹299.00</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/50 dark:bg-gray-900/50 border-green-100/50 dark:border-blue-900/30">
            <CardContent className="p-4">
              <div className="flex gap-4 items-center">
                <Calendar className="text-green-600 dark:text-blue-400" />
                <div>
                  <p className="text-sm text-green-600 dark:text-blue-200">Plan Started</p>
                  <p className="font-bold text-green-800 dark:text-blue-300">Jan 1, 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
    )
}

export default SubscriptionBillingStats