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
  Wallet,
  TrendingUp,
  AlertCircle,
  IndianRupee,
  Loader2,
  Sparkles,
  ReceiptIndianRupee,
  Calculator,
  PieChartIcon,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import ExpenseChart from "../Analytics/ExpenseCharts"
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
interface Expense {
  _id?: string
  title: string
  amount: string
  date: string
}

interface ExpenseFormProps {
  onSubmit: (expense: Expense) => Promise<void>
  loading: boolean
  initialExpense?: Expense
}

interface ExpenseAnalyticsProps {
  expenses: Expense[]
}

interface AIInsights {
  prediction: string
  alerts: string[]
  recommendations: string[]
}

// ExpenseAnalytics Component
const ExpenseAnalytics: React.FC<ExpenseAnalyticsProps> = ({ expenses }) => {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="text-center py-10 border rounded-md bg-gray-50 dark:bg-gray-800">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No Expense data available
        </p>
      </div>
    )
  }

  const totalExpense = expenses.reduce(
    (sum, exp) => sum + Number.parseFloat(exp.amount),
    0
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-green-700 dark:text-blue-200">Total Expenses</p>
            <Wallet className="text-green-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-green-800 dark:text-blue-300 flex items-center">
            <IndianRupee className="mr-1" />
            {totalExpense.toFixed(2)}
          </h3>
        </CardContent>
      </Card>

      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-green-700 dark:text-blue-200">Monthly Average</p>
            <Calculator className="text-green-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-green-800 dark:text-blue-300 flex items-center">
            <IndianRupee className="mr-1" />
            {(totalExpense / (expenses.length || 1)).toFixed(2)}
          </h3>
        </CardContent>
      </Card>

      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-green-700 dark:text-blue-200">AI Forecast</p>
            <Sparkles className="text-green-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-green-800 dark:text-blue-300 flex items-center">
            <IndianRupee className="mr-1" />
            {(totalExpense * 0.85).toFixed(2)}
          </h3>
        </CardContent>
      </Card>
    </div>
  )
}

// ExpenseForm Component
const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit, loading, initialExpense }) => {
  const [expense, setExpense] = useState<Expense>(
    initialExpense
      ? {
          ...initialExpense,
          date: initialExpense.date
        }
      : { title: "", amount: "", date: "" }
  )

  useEffect(() => {
    if (initialExpense) {
      setExpense({
        ...initialExpense,
        date: initialExpense.date
      })
    }
  }, [initialExpense])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await onSubmit(expense)
      if (!initialExpense) {
        setExpense({ title: "", amount: "", date: "" })
      }
    } catch (error) {
      console.error("Error submitting expense:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Expense Title"
        value={expense.title}
        onChange={(e) => setExpense({ ...expense, title: e.target.value })}
        className="bg-white/80 dark:bg-gray-800/80"
        required
      />
      <Input
        type="number"
        placeholder="Amount"
        value={expense.amount}
        onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
        className="bg-white/80 dark:bg-gray-800/80"
        required
        min="0"
        step="0.01"
      />
      <Input
        type="date"
        value={expense.date}
        onChange={(e) => setExpense({ ...expense, date: e.target.value })}
        className="bg-white/80 dark:bg-gray-800/80"
        required
      />
      <Button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {initialExpense ? "Updating..." : "Adding..."}
          </>
        ) : initialExpense ? (
          "Update Expense"
        ) : (
          "Add Expense"
        )}
      </Button>
    </form>
  )
}

// Generate random expenses
const generateDummyExpenses = (count: number): Expense[] => {
  const categories = ["Fertilizer", "Equipment", "Seeds", "Labor", "Transport", "Maintenance", "Utilities"]
  const expenses: Expense[] = []
  
  for (let i = 0; i < count; i++) {
    const daysAgo = Math.floor(Math.random() * 30)
    const date = new Date()
    date.setDate(date.getDate() - daysAgo)
    
    expenses.push({
      _id: `exp-${i}`,
      title: `${categories[Math.floor(Math.random() * categories.length)]} ${Math.floor(Math.random() * 5) + 1}`,
      amount: (Math.random() * 5000 + 100).toFixed(2),
      date: formatDate(date)
    })
  }
  
  return expenses
}

// Main ExpenditureManagement Component
export default function ExpenditureManagement() {
  const [expenses, setExpenses] = useState<Expense[]>(generateDummyExpenses(12))
  const [activeTab, setActiveTab] = useState("overview")
  const [isAdding, setIsAdding] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [aiInsights, setAIInsights] = useState<AIInsights | null>(null)

  // Add expense
  const handleAddExpense = async (newExpense: Expense) => {
    setIsAdding(true)
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const newExpenseWithId = {
        ...newExpense,
        _id: `exp-${Date.now()}`,
        amount: Number.parseFloat(newExpense.amount).toFixed(2)
      }
      
      setExpenses(prev => [...prev, newExpenseWithId])
      toast({
        title: "Success",
        description: "Expense added successfully",
      })
      setOpenAddDialog(false)
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to add expense",
        variant: "destructive",
      })
    } finally {
      setIsAdding(false)
    }
  }

  // Update expense
  const handleUpdateExpense = async (updatedExpense: Expense) => {
    if (!editingExpense?._id) return

    setIsUpdating(true)
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setExpenses(prev => prev.map(exp => 
        exp._id === editingExpense._id ? {
          ...updatedExpense,
          _id: exp._id,
          amount: Number.parseFloat(updatedExpense.amount).toFixed(2)
        } : exp
      ))
      
      toast({
        title: "Success",
        description: "Expense updated successfully",
      })
      setEditingExpense(null)
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update expense",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  // Delete expense
  const handleDeleteExpense = async (expenseId: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))
      
      setExpenses(prev => prev.filter(expense => expense._id !== expenseId))
      toast({
        title: "Success",
        description: "Expense deleted successfully",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete expense",
        variant: "destructive",
      })
    }
  }

  // Filter expenses based on selected date
  const filteredExpenses = selectedDate
    ? expenses.filter((exp) => {
        const expDate = new Date(exp.date)
        return (
          expDate.getFullYear() === selectedDate.getFullYear() &&
          expDate.getMonth() === selectedDate.getMonth() &&
          expDate.getDate() === selectedDate.getDate()
        )
      })
    : expenses

  // Clear date filter
  const clearDateFilter = () => {
    setSelectedDate(undefined)
    setCalendarOpen(false)
  }

  useEffect(() => {
    // Generate AI insights
    const generateInsights = () => {
      setAIInsights({
        prediction: "Based on current spending patterns, we predict a 15% reduction in expenses next month.",
        alerts: [
          "Unusual spending detected in fertilizer category",
          "Potential savings opportunity in equipment maintenance",
        ],
        recommendations: ["Consider bulk purchasing for regular expenses", "Implement automated expense tracking"],
      })
    }

    generateInsights()
    const interval = setInterval(generateInsights, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="w-full max-w-[89vw] bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
          <div className="flex flex-col">
            <CardTitle className="text-lg md:text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
              <Wallet className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-blue-400" />
              Expenditure Management
            </CardTitle>
            <CardDescription className="text-sm md:text-base text-green-700 dark:text-blue-200">
              AI-powered expense tracking and optimization
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
              value="transactions"
              className={cn(
                "flex items-center justify-center gap-1 text-xs md:text-sm px-2 py-1 transition-all duration-300",
                activeTab === "transactions" ? "bg-green-200 dark:bg-blue-900" : ""
              )}
            >
              <ReceiptIndianRupee className="w-4 h-4" /> Transactions
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
                <ExpenseAnalytics expenses={expenses} />
              </TabsContent>

              <TabsContent value="transactions">
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
                            Add Expense
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
                          <DialogHeader>
                            <DialogTitle>Add New Expense</DialogTitle>
                          </DialogHeader>
                          <ExpenseForm onSubmit={handleAddExpense} loading={isAdding} />
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
                      {filteredExpenses.length === 0 ? (
                        <div className="text-center py-10 border rounded-md bg-gray-50 dark:bg-gray-800">
                          <p className="text-gray-500 dark:text-gray-400 text-lg">
                            No Expense data available
                          </p>
                          <p className="text-gray-400 dark:text-gray-500 mt-2">
                            Click the "Add Expense" button to add your expense.
                          </p>
                        </div>
                      ) : (
                        <Table className="min-w-full">
                          <TableHeader className="bg-gray-50 dark:bg-gray-800">
                            <TableRow>
                              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Title
                              </TableHead>
                              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                              </TableHead>
                              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                              </TableHead>
                              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredExpenses.map((expense) => (
                              <TableRow
                                key={expense._id}
                                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                              >
                                <TableCell className="px-4 py-3 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {expense.title}
                                  </div>
                                </TableCell>
                                <TableCell className="px-4 py-3 whitespace-nowrap">
                                  <div className="text-sm text-gray-500 dark:text-gray-300">
                                    <IndianRupee className="inline mr-1 h-4 w-4" />
                                    {Number.parseFloat(expense.amount).toFixed(2)}
                                  </div>
                                </TableCell>
                                <TableCell className="px-4 py-3 whitespace-nowrap">
                                  <div className="text-sm text-gray-500 dark:text-gray-300">
                                    {formatDisplayDate(expense.date)}
                                  </div>
                                </TableCell>
                                <TableCell className="px-4 py-3 whitespace-nowrap">
                                  <div className="flex space-x-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                      onClick={() => setEditingExpense(expense)}
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      className="text-white hover:bg-red-700 transition-colors duration-200"
                                      onClick={() =>
                                        expense._id && handleDeleteExpense(expense._id)
                                      }
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

              <TabsContent value="analytics">
                <Card className="bg-white/50 dark:bg-gray-900/50 shadow-none border-none">
                  <CardContent className="p-4">
                    {expenses && expenses.length > 0 ? (
                      <ExpenseChart expenses={expenses} />
                    ) : (
                      <div className="text-center py-10 border rounded-md bg-gray-50 dark:bg-gray-800">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                          No expense data available for analysis
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

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

        {/* Edit Expense Dialog */}
        <Dialog open={!!editingExpense} onOpenChange={(open) => !open && setEditingExpense(null)}>
          <DialogContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
            <DialogHeader>
              <DialogTitle>Edit Expense</DialogTitle>
            </DialogHeader>
            <ExpenseForm
              onSubmit={handleUpdateExpense}
              loading={isUpdating}
              initialExpense={editingExpense || undefined}
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}