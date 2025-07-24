import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const OrdersList = () => {
  const orders = [
    { id: "ORD-001", product: "Organic Fertilizer", quantity: 500, status: "In Transit", eta: "2024-03-25" },
    { id: "ORD-002", product: "Seeds Package", quantity: 1000, status: "out for delivery", eta: "2024-03-22" },
    { id: "ORD-003", product: "Pest Control", quantity: 200, status: "dispatched", eta: "2024-03-28" },
    { id: "ORD-004", product: "Irrigation System", quantity: 50, status: "delivered", eta: "2024-04-05" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Transit":
        return "🚚"
      case "out for delivery":
        return "📦"
      case "dispatched":
        return "🚚📦"
      case "delivered":
        return "📦✅"  
      default:
        return "processing"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Sprouting":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "Growing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "Harvested":
        return "bg-brown-100 text-brown-800 dark:bg-brown-900 dark:text-brown-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    }
  }

  // Mobile card view for each order
  const MobileOrderCard = ({ order }) => (
    <div className="p-4 border-b border-green-200 dark:border-green-700 last:border-b-0">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-green-800 dark:text-green-100">{order.id}</span>
        <Badge className={`${getStatusColor(order.status)} text-xs font-semibold px-2 py-1 rounded-full`}>
          {getStatusIcon(order.status)} {order.status}
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-1 text-sm">
        <div className="text-green-600 dark:text-green-300">Product:</div>
        <div className="text-green-700 dark:text-green-200">{order.product}</div>
        <div className="text-green-600 dark:text-green-300">Quantity:</div>
        <div className="text-green-700 dark:text-green-200">{order.quantity}</div>
        <div className="text-green-600 dark:text-green-300">ETA:</div>
        <div className="text-green-700 dark:text-green-200">{order.eta}</div>
      </div>
    </div>
  )

  return (
    <Card className="bg-green-50 dark:bg-green-900 border-2 border-green-200 dark:border-green-700 shadow-lg overflow-hidden">
      <CardHeader className="bg-green-100 dark:bg-green-800 border-b-2 border-green-200 dark:border-green-700">
        <CardTitle className="text-2xl font-bold text-green-800 dark:text-green-100">Farm Orders</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Desktop view - only shown on md screens and up */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-green-200 dark:bg-green-700">
                <TableHead className="text-green-800 dark:text-green-100 font-bold">Order ID</TableHead>
                <TableHead className="text-green-800 dark:text-green-100 font-bold">Product</TableHead>
                <TableHead className="text-green-800 dark:text-green-100 font-bold">Quantity</TableHead>
                <TableHead className="text-green-800 dark:text-green-100 font-bold">Status</TableHead>
                <TableHead className="text-green-800 dark:text-green-100 font-bold">ETA</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow
                  key={order.id}
                  className={index % 2 === 0 ? "bg-green-50 dark:bg-green-800" : "bg-white dark:bg-green-900"}
                >
                  <TableCell className="font-medium text-green-800 dark:text-green-100">{order.id}</TableCell>
                  <TableCell className="text-green-700 dark:text-green-200">{order.product}</TableCell>
                  <TableCell className="text-green-700 dark:text-green-200">{order.quantity}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(order.status)} text-sm font-semibold px-3 py-1 rounded-full`}>
                      {getStatusIcon(order.status)} {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-green-700 dark:text-green-200">{order.eta}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Mobile view - only shown on smaller than md screens */}
        <div className="md:hidden">
          {orders.map((order) => (
            <MobileOrderCard key={order.id} order={order} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}