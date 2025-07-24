import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

const Payment = () => {
    return (
      <Card className="bg-white/50 dark:bg-gray-900/50 border-green-100/50 dark:border-blue-900/30">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <CreditCard className="text-green-600 dark:text-blue-400" />
              <div>
                <p className="font-medium text-green-800 dark:text-blue-300">
                  Visa ending in 4242
                </p>
                <p className="text-sm text-green-600 dark:text-blue-200">
                  Expires 12/24
                </p>
              </div>
            </div>
            <Button variant="outline" className="hover:bg-green-100 dark:hover:bg-blue-900">
              Update
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  export default Payment;