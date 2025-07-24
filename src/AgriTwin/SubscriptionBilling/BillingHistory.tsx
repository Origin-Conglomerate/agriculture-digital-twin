import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
const BillingHistory = () => {
    const history = [
      {
        date: '2024-04-01',
        amount: 299,
        status: 'Paid',
        plan: 'Professional'
      },
      {
        date: '2024-03-01',
        amount: 299,
        status: 'Paid',
        plan: 'Professional'
      }
    ];
  
    return (
      <div className="space-y-4">
        {history.map((item, index) => (
          <div 
            key={index}
            className="flex justify-between items-center p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg"
          >
            <div className="flex gap-4 items-center">
              <Calendar className="text-green-600 dark:text-blue-400" />
              <div>
                <p className="font-medium text-green-800 dark:text-blue-300">
                  {new Date(item.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-green-600 dark:text-blue-200">
                  {item.plan} Plan
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <p className="font-bold text-green-800 dark:text-blue-300">
              ₹{item.amount}
              </p>
              <Badge 
                variant={item.status === 'Paid' ? 'success' : 'destructive'}
                className="bg-green-100 dark:bg-blue-900"
              >
                {item.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    );
  };

export default BillingHistory;