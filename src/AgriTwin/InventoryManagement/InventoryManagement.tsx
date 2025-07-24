"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  PlusCircle,
  Warehouse,
  TrendingUp,
  AlertCircle,
  Package,
  Loader2,
  Sparkles,
  ClipboardList,
  Calculator,
  PieChartIcon,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

import { Calendar } from "@/components/ui/calendar"

// Helper functions for date formatting
const formatDate = (date: Date | undefined): string => {
  if (!date) return ""
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
}

const formatDisplayDate = (dateString: string): string => {
  if (!dateString) return ""
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

// Interfaces
interface InventoryItem {
  id: string
  name: string
  category: string
  quantity: number
  unit: string
  price: number
  supplier: string
  lastUpdated: string
  threshold: number
}

interface InventoryFormProps {
  onSubmit: (item: InventoryItem) => Promise<void>
  loading: boolean
  initialItem?: InventoryItem
}

interface InventoryAnalyticsProps {
  items: InventoryItem[]
}

interface AIInsights {
  prediction: string
  alerts: string[]
  recommendations: string[]
}

// Dummy data generator
const generateDummyItems = (count: number): InventoryItem[] => {
  const categories = ['Seeds', 'Fertilizers', 'Pesticides', 'Equipment', 'Tools', 'Animal Feed']
  const units = ['kg', 'g', 'L', 'pieces', 'bags', 'boxes']
  const suppliers = ['AgroSupplies Inc.', 'FarmTech Ltd.', 'GreenHarvest Co.', 'NatureGrow', 'OrganicSolutions']
  
  return Array.from({ length: count }, (_, i) => ({
    id: `item-${i + 1}`,
    name: `Item ${i + 1}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    quantity: Math.floor(Math.random() * 100) + 1,
    unit: units[Math.floor(Math.random() * units.length)],
    price: parseFloat((Math.random() * 100 + 5).toFixed(2)),
    supplier: suppliers[Math.floor(Math.random() * suppliers.length)],
    lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
    threshold: Math.floor(Math.random() * 20) + 5
  }))
}

// InventoryAnalytics Component
const InventoryAnalytics: React.FC<InventoryAnalyticsProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-10 border rounded-md bg-gray-50 dark:bg-gray-800">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No inventory data available
        </p>
      </div>
    )
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalValue = items.reduce((sum, item) => sum + (item.quantity * item.price), 0)
  const lowStockItems = items.filter(item => item.quantity < item.threshold).length

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-green-700 dark:text-blue-200">Total Items</p>
            <Package className="text-green-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-green-800 dark:text-blue-300">
            {totalItems}
          </h3>
        </CardContent>
      </Card>

      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-green-700 dark:text-blue-200">Inventory Value</p>
            <Calculator className="text-green-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-green-800 dark:text-blue-300">
            ${totalValue.toFixed(2)}
          </h3>
        </CardContent>
      </Card>

      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-green-700 dark:text-blue-200">Low Stock Items</p>
            <AlertCircle className="text-green-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-green-800 dark:text-blue-300">
            {lowStockItems}
          </h3>
        </CardContent>
      </Card>
    </div>
  )
}

// InventoryForm Component
const InventoryForm: React.FC<InventoryFormProps> = ({ onSubmit, loading, initialItem }) => {
  const [item, setItem] = useState<InventoryItem>(
    initialItem || {
      id: '',
      name: '',
      category: '',
      quantity: 0,
      unit: 'kg',
      price: 0,
      supplier: '',
      lastUpdated: new Date().toISOString(),
      threshold: 10
    }
  )

  useEffect(() => {
    if (initialItem) {
      setItem(initialItem)
    }
  }, [initialItem])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await onSubmit(item)
      if (!initialItem) {
        // Reset form if not editing
        setItem({
          id: '',
          name: '',
          category: '',
          quantity: 0,
          unit: 'kg',
          price: 0,
          supplier: '',
          lastUpdated: new Date().toISOString(),
          threshold: 10
        })
      }
    } catch (error) {
      console.error("Error submitting item:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Item Name</label>
          <Input
            placeholder="Item Name"
            value={item.name}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
            className="bg-white/80 dark:bg-gray-800/80"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
          <Input
            placeholder="Category"
            value={item.category}
            onChange={(e) => setItem({ ...item, category: e.target.value })}
            className="bg-white/80 dark:bg-gray-800/80"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity</label>
          <Input
            type="number"
            placeholder="Quantity"
            value={item.quantity}
            onChange={(e) => setItem({ ...item, quantity: parseInt(e.target.value) || 0 })}
            className="bg-white/80 dark:bg-gray-800/80"
            required
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unit</label>
          <Input
            placeholder="Unit (kg, L, etc.)"
            value={item.unit}
            onChange={(e) => setItem({ ...item, unit: e.target.value })}
            className="bg-white/80 dark:bg-gray-800/80"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price per Unit</label>
          <Input
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) => setItem({ ...item, price: parseFloat(e.target.value) || 0 })}
            className="bg-white/80 dark:bg-gray-800/80"
            required
            min="0"
            step="0.01"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Supplier</label>
          <Input
            placeholder="Supplier"
            value={item.supplier}
            onChange={(e) => setItem({ ...item, supplier: e.target.value })}
            className="bg-white/80 dark:bg-gray-800/80"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Low Stock Threshold</label>
          <Input
            type="number"
            placeholder="Threshold"
            value={item.threshold}
            onChange={(e) => setItem({ ...item, threshold: parseInt(e.target.value) || 0 })}
            className="bg-white/80 dark:bg-gray-800/80"
            required
            min="1"
          />
        </div>
      </div>
      
      <Button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {initialItem ? "Updating..." : "Adding..."}
          </>
        ) : initialItem ? (
          "Update Item"
        ) : (
          "Add Item"
        )}
      </Button>
    </form>
  )
}

// Main InventoryManagement Component
export default function InventoryManagement() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [activeTab, setActiveTab] = useState("overview")
  const [isAdding, setIsAdding] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [aiInsights, setAIInsights] = useState<AIInsights | null>(null)

  // Generate dummy data on component mount
  useEffect(() => {
    setItems(generateDummyItems(15))
    
    const generateInsights = () => {
      setAIInsights({
        prediction: "Based on current inventory levels, we predict you'll need to restock seeds and fertilizers within 2 weeks.",
        alerts: [
          "Low stock alert for organic fertilizer (3kg remaining)",
          "Pesticide stock will last only 10 days at current usage rate"
        ],
        recommendations: [
          "Consider bulk purchasing seeds during the current seasonal discount",
          "Implement just-in-time inventory for perishable items"
        ]
      })
    }

    generateInsights()
    const interval = setInterval(generateInsights, 10000)
    return () => clearInterval(interval)
  }, [])

  // Simulate adding an item
  const handleAddItem = async (newItem: InventoryItem) => {
    setIsAdding(true)
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const itemWithId = {
        ...newItem,
        id: `item-${Date.now()}`,
        lastUpdated: new Date().toISOString()
      }
      
      setItems(prev => [...prev, itemWithId])
      toast({
        title: "Success",
        description: "Item added successfully",
      })
      setOpenAddDialog(false)
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to add item",
        variant: "destructive",
      })
    } finally {
      setIsAdding(false)
    }
  }

  // Simulate updating an item
  const handleUpdateItem = async (updatedItem: InventoryItem) => {
    if (!editingItem?.id) return

    setIsUpdating(true)
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setItems(prev => prev.map(item => 
        item.id === editingItem.id ? {
          ...updatedItem,
          lastUpdated: new Date().toISOString()
        } : item
      ))
      toast({
        title: "Success",
        description: "Item updated successfully",
      })
      setEditingItem(null)
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update item",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  // Simulate deleting an item
  const handleDeleteItem = async (itemId: string) => {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300))
      
      setItems(prev => prev.filter(item => item.id !== itemId))
      toast({
        title: "Success",
        description: "Item deleted successfully",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      })
    }
  }

  // Filter items based on selected date
  const filteredItems = selectedDate
    ? items.filter((item) => {
        const itemDate = new Date(item.lastUpdated)
        return (
          itemDate.getFullYear() === selectedDate.getFullYear() &&
          itemDate.getMonth() === selectedDate.getMonth() &&
          itemDate.getDate() === selectedDate.getDate()
        )
      })
    : items

  // Clear date filter
  const clearDateFilter = () => {
    setSelectedDate(undefined)
    setCalendarOpen(false)
  }

  return (
    <Card className="w-full max-w-[89vw] bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
          <div className="flex flex-col">
            <CardTitle className="text-lg md:text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
              <Warehouse className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-blue-400" />
              Farm Inventory Management
            </CardTitle>
            <CardDescription className="text-sm md:text-base text-green-700 dark:text-blue-200">
              AI-powered inventory tracking and optimization
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="min-w-fit whitespace-nowrap bg-white/30 dark:bg-black/30 px-3 py-1 text-xs md:text-sm">
              AI-Powered
            </Badge>
            <Badge variant="outline" className="min-w-fit whitespace-nowrap bg-white/30 dark:bg-black/30 px-3 py-1 text-xs md:text-sm">
              Real-time
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full bg-green-50 dark:bg-gray-800 p-2 rounded-lg">
            <TabsTrigger
              value="overview"
              className={cn(
                "flex items-center justify-center gap-1 text-xs md:text-sm px-2 py-1 transition-all duration-300",
                activeTab === "overview" ? "bg-green-200 dark:bg-blue-900" : ""
              )}
            >
              <PieChartIcon className="w-4 h-4" /> Overview
            </TabsTrigger>
            <TabsTrigger
              value="inventory"
              className={cn(
                "flex items-center justify-center gap-1 text-xs md:text-sm px-2 py-1 transition-all duration-300",
                activeTab === "inventory" ? "bg-green-200 dark:bg-blue-900" : ""
              )}
            >
              <ClipboardList className="w-4 h-4" /> Inventory
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className={cn(
                "flex items-center justify-center gap-1 text-xs md:text-sm px-2 py-1 transition-all duration-300",
                activeTab === "analytics" ? "bg-green-200 dark:bg-blue-900" : ""
              )}
            >
              <TrendingUp className="w-4 h-4" /> Analytics
            </TabsTrigger>
            <TabsTrigger
              value="ai-insights"
              className={cn(
                "flex items-center justify-center gap-1 text-xs md:text-sm px-2 py-1 transition-all duration-300",
                activeTab === "ai-insights" ? "bg-green-200 dark:bg-blue-900" : ""
              )}
            >
              <Sparkles className="w-4 h-4" /> AI Insights
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <TabsContent value="overview" className="space-y-4">
                <InventoryAnalytics items={items} />
              </TabsContent>

              <TabsContent value="inventory">
                {isAdding ? (
                  <div className="flex justify-center items-center p-8">
                    <Loader2 className="animate-spin h-8 w-8" />
                  </div>
                ) : error ? (
                  <div className="text-red-500 p-4 text-center">{error}</div>
                ) : (
                  <div className="bg-white/50 dark:bg-gray-900/50 rounded-lg p-4 md:p-6 space-y-4 md:space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                      <Dialog open={calendarOpen} onOpenChange={setCalendarOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="bg-white/80 dark:bg-gray-800/80 w-full md:w-auto">
                            {selectedDate ? `Filtering by: ${formatDisplayDate(formatDate(selectedDate))}` : "Select Specific Date"}
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl h-auto">
                          <DialogHeader>
                            <DialogTitle>Select Date</DialogTitle>
                          </DialogHeader>
                          <div className="p-4">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={(date) => {
                                setSelectedDate(date)
                                setCalendarOpen(false)
                              }}
                              className="rounded-md border"
                              disabled={{ after: new Date() }}
                            />
                          </div>
                          <div className="mt-4 flex justify-end gap-2">
                            <Button variant="ghost" onClick={clearDateFilter}>
                              Clear Date
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
                        <DialogTrigger asChild>
                          <Button className="bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700 w-full md:w-auto">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Item
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
                          <DialogHeader>
                            <DialogTitle>Add New Inventory Item</DialogTitle>
                          </DialogHeader>
                          <InventoryForm onSubmit={handleAddItem} loading={isAdding} />
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
                      {filteredItems.length === 0 ? (
                        <div className="text-center py-10 border rounded-md bg-gray-50 dark:bg-gray-800">
                          <p className="text-gray-500 dark:text-gray-400 text-lg">
                            No inventory data available
                          </p>
                          <p className="text-gray-400 dark:text-gray-500 mt-2">
                            Click the "Add Item" button to add inventory items.
                          </p>
                        </div>
                      ) : (
                        <Table className="min-w-full">
                          <TableHeader className="bg-gray-50 dark:bg-gray-800">
                            <TableRow>
                              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                              </TableHead>
                              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                              </TableHead>
                              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Quantity
                              </TableHead>
                              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                              </TableHead>
                              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </TableHead>
                              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Last Updated
                              </TableHead>
                              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredItems.map((item) => (
                              <TableRow
                                key={item.id}
                                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                              >
                                <TableCell className="px-4 py-3 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {item.name}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {item.supplier}
                                  </div>
                                </TableCell>
                                <TableCell className="px-4 py-3 whitespace-nowrap">
                                  <div className="text-sm text-gray-500 dark:text-gray-300">
                                    {item.category}
                                  </div>
                                </TableCell>
                                <TableCell className="px-4 py-3 whitespace-nowrap">
                                  <div className="text-sm text-gray-500 dark:text-gray-300">
                                    {item.quantity} {item.unit}
                                  </div>
                                </TableCell>
                                <TableCell className="px-4 py-3 whitespace-nowrap">
                                  <div className="text-sm text-gray-500 dark:text-gray-300">
                                    ${item.price.toFixed(2)}
                                  </div>
                                </TableCell>
                                <TableCell className="px-4 py-3 whitespace-nowrap">
                                  <Badge 
                                    variant={item.quantity < item.threshold ? "destructive" : "default"}
                                    className={cn(
                                      "text-xs",
                                      item.quantity < item.threshold ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
                                      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                    )}
                                  >
                                    {item.quantity < item.threshold ? "Low Stock" : "In Stock"}
                                  </Badge>
                                </TableCell>
                                <TableCell className="px-4 py-3 whitespace-nowrap">
                                  <div className="text-sm text-gray-500 dark:text-gray-300">
                                    {formatDisplayDate(item.lastUpdated)}
                                  </div>
                                </TableCell>
                                <TableCell className="px-4 py-3 whitespace-nowrap">
                                  <div className="flex space-x-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                      onClick={() => setEditingItem(item)}
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      className="text-white hover:bg-red-700 transition-colors duration-200"
                                      onClick={() => handleDeleteItem(item.id)}
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* <TabsContent value="analytics">
                <Card className="bg-white/50 dark:bg-gray-900/50 shadow-none border-none">
                  <CardContent className="p-4">
                    {items && items.length > 0 ? (
                      <InventoryChart items={items} />
                    ) : (
                      <div className="text-center py-10 border rounded-md bg-gray-50 dark:bg-gray-800">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                          No inventory data available for analysis
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent> */}

              <TabsContent value="ai-insights">
                <Card className="bg-white/50 dark:bg-gray-900/50">
                  <CardContent className="p-4 space-y-4">
                    {aiInsights && (
                      <>
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">AI Prediction</h3>
                          <p className="text-green-700 dark:text-blue-200">{aiInsights.prediction}</p>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">Alerts</h3>
                          {aiInsights.alerts.map((alert, index) => (
                            <div key={index} className="flex items-center gap-2 text-green-700 dark:text-blue-200">
                              <AlertCircle className="w-4 h-4" />
                              {alert}
                            </div>
                          ))}
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">Recommendations</h3>
                          {aiInsights.recommendations.map((recommendation, index) => (
                            <div key={index} className="flex items-center gap-2 text-green-700 dark:text-blue-200">
                              <Sparkles className="w-4 h-4" />
                              {recommendation}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>

        {/* Edit Item Dialog */}
        <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
          <DialogContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
            <DialogHeader>
              <DialogTitle>Edit Inventory Item</DialogTitle>
            </DialogHeader>
            <InventoryForm
              onSubmit={handleUpdateItem}
              loading={isUpdating}
              initialItem={editingItem || undefined}
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}