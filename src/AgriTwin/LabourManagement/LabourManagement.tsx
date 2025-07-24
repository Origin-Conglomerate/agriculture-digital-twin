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
  Users,
  TrendingUp,
  AlertCircle,
  IndianRupee,
  Loader2,
  Sparkles,
  Clock,
  Calculator,
  PieChartIcon,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useSelector } from "react-redux"
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
interface Labour {
  id: string
  name: string
  role: string
  hoursWorked: number
  wage: number
  date: string
  task: string
  status: 'active' | 'inactive' | 'on leave'
}

interface LabourFormProps {
  onSubmit: (labour: Labour) => void
  loading: boolean
  initialLabour?: Labour
}

interface LabourAnalyticsProps {
  labourData: Labour[]
}

interface AIInsights {
  prediction: string
  alerts: string[]
  recommendations: string[]
}

// Dummy data generator
const generateDummyLabourData = (count: number): Labour[] => {
  const roles = ['Field Worker', 'Harvester', 'Irrigation Specialist', 'Supervisor', 'Equipment Operator']
  const tasks = ['Plowing', 'Planting', 'Irrigation', 'Harvesting', 'Pruning', 'Fertilizing']
  const statuses: ('active' | 'inactive' | 'on leave')[] = ['active', 'inactive', 'on leave']
  
  return Array.from({ length: count }, (_, i) => ({
    id: `lab-${1000 + i}`,
    name: `Worker ${i + 1}`,
    role: roles[Math.floor(Math.random() * roles.length)],
    hoursWorked: 4 + Math.floor(Math.random() * 8),
    wage: 200 + Math.floor(Math.random() * 800),
    date: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
    task: tasks[Math.floor(Math.random() * tasks.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)]
  }))
}

// LabourAnalytics Component
const LabourAnalytics: React.FC<LabourAnalyticsProps> = ({ labourData }) => {
  if (!labourData || labourData.length === 0) {
    return (
      <div className="text-center py-10 border rounded-md bg-gray-50 dark:bg-gray-800">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No Labour data available
        </p>
      </div>
    )
  }

  const totalWages = labourData.reduce((sum, labour) => sum + labour.wage, 0)
  const totalHours = labourData.reduce((sum, labour) => sum + labour.hoursWorked, 0)
  const activeWorkers = labourData.filter(labour => labour.status === 'active').length

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-green-700 dark:text-blue-200">Total Wages</p>
            <IndianRupee className="text-green-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-green-800 dark:text-blue-300 flex items-center">
            <IndianRupee className="mr-1" />
            {totalWages.toFixed(2)}
          </h3>
        </CardContent>
      </Card>

      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-green-700 dark:text-blue-200">Active Workers</p>
            <Users className="text-green-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-green-800 dark:text-blue-300 flex items-center">
            {activeWorkers}
          </h3>
        </CardContent>
      </Card>

      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-green-700 dark:text-blue-200">Total Hours</p>
            <Clock className="text-green-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-green-800 dark:text-blue-300 flex items-center">
            {totalHours}
          </h3>
        </CardContent>
      </Card>
    </div>
  )
}

// LabourForm Component
const LabourForm: React.FC<LabourFormProps> = ({ onSubmit, loading, initialLabour }) => {
  const [labour, setLabour] = useState<Labour>(
    initialLabour || {
      id: '',
      name: '',
      role: '',
      hoursWorked: 8,
      wage: 300,
      date: new Date().toISOString(),
      task: '',
      status: 'active'
    }
  )

  useEffect(() => {
    if (initialLabour) {
      setLabour(initialLabour)
    }
  }, [initialLabour])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(labour)
    if (!initialLabour) {
      setLabour({
        id: '',
        name: '',
        role: '',
        hoursWorked: 8,
        wage: 300,
        date: new Date().toISOString(),
        task: '',
        status: 'active'
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Worker Name"
        value={labour.name}
        onChange={(e) => setLabour({ ...labour, name: e.target.value })}
        className="bg-white/80 dark:bg-gray-800/80"
        required
      />
      <Input
        placeholder="Role"
        value={labour.role}
        onChange={(e) => setLabour({ ...labour, role: e.target.value })}
        className="bg-white/80 dark:bg-gray-800/80"
        required
      />
      <Input
        type="number"
        placeholder="Hours Worked"
        value={labour.hoursWorked}
        onChange={(e) => setLabour({ ...labour, hoursWorked: Number(e.target.value) })}
        className="bg-white/80 dark:bg-gray-800/80"
        required
        min="1"
        max="24"
      />
      <Input
        type="number"
        placeholder="Wage"
        value={labour.wage}
        onChange={(e) => setLabour({ ...labour, wage: Number(e.target.value) })}
        className="bg-white/80 dark:bg-gray-800/80"
        required
        min="0"
      />
      <Input
        placeholder="Task"
        value={labour.task}
        onChange={(e) => setLabour({ ...labour, task: e.target.value })}
        className="bg-white/80 dark:bg-gray-800/80"
        required
      />
      <Input
        type="date"
        value={labour.date.split('T')[0]}
        onChange={(e) => setLabour({ ...labour, date: new Date(e.target.value).toISOString() })}
        className="bg-white/80 dark:bg-gray-800/80"
        required
      />
      <div className="flex items-center space-x-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status:</label>
        <select
          value={labour.status}
          onChange={(e) => setLabour({ ...labour, status: e.target.value as 'active' | 'inactive' | 'on leave' })}
          className="bg-white/80 dark:bg-gray-800/80 border rounded-md px-3 py-2"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="on leave">On Leave</option>
        </select>
      </div>
      <Button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {initialLabour ? "Updating..." : "Adding..."}
          </>
        ) : initialLabour ? (
          "Update Worker"
        ) : (
          "Add Worker"
        )}
      </Button>
    </form>
  )
}

// Main LabourManagement Component
export default function LabourManagement() {
  const [labourData, setLabourData] = useState<Labour[]>([])
  const [activeTab, setActiveTab] = useState("overview")
  const [isAdding, setIsAdding] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [editingLabour, setEditingLabour] = useState<Labour | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [aiInsights, setAIInsights] = useState<AIInsights | null>(null)

  // Generate dummy data on component mount
  useEffect(() => {
    setLabourData(generateDummyLabourData(15))
    
    setAIInsights({
      prediction: "Based on current labour patterns, we predict a 20% increase in labour needs next harvest season.",
      alerts: [
        "High overtime hours detected for 3 workers",
        "Potential shortage of harvest workers next month",
      ],
      recommendations: [
        "Consider hiring seasonal workers for upcoming harvest",
        "Implement shift rotation to reduce overtime costs"
      ]
    })
  }, [])

  // Add labour
  const handleAddLabour = (newLabour: Labour) => {
    setIsAdding(true)
    setTimeout(() => {
      const labourWithId = {
        ...newLabour,
        id: `lab-${1000 + labourData.length}`
      }
      setLabourData(prev => [...prev, labourWithId])
      toast({
        title: "Success",
        description: "Worker added successfully",
      })
      setOpenAddDialog(false)
      setIsAdding(false)
    }, 500)
  }

  // Update labour
  const handleUpdateLabour = (updatedLabour: Labour) => {
    if (!editingLabour?.id) return

    setIsUpdating(true)
    setTimeout(() => {
      setLabourData(prev => prev.map(labour => labour.id === editingLabour.id ? updatedLabour : labour))
      toast({
        title: "Success",
        description: "Worker updated successfully",
      })
      setEditingLabour(null)
      setIsUpdating(false)
    }, 500)
  }

  // Delete labour
  const handleDeleteLabour = (labourId: string) => {
    setTimeout(() => {
      setLabourData(prev => prev.filter(labour => labour.id !== labourId))
      toast({
        title: "Success",
        description: "Worker removed successfully",
      })
    }, 300)
  }

  // Filter labour based on selected date
  const filteredLabour = selectedDate
    ? labourData.filter((labour) => {
      const labourDate = new Date(labour.date)
      return (
        labourDate.getFullYear() === selectedDate.getFullYear() &&
        labourDate.getMonth() === selectedDate.getMonth() &&
        labourDate.getDate() === selectedDate.getDate()
      )
    })
    : labourData

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
              <Users className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-blue-400" />
              Labour Management
            </CardTitle>
            <CardDescription className="text-sm md:text-base text-green-700 dark:text-blue-200">
              AI-powered workforce tracking and optimization
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
              value="workers"
              className={cn(
                "flex items-center justify-center gap-1 text-xs md:text-sm px-2 py-1 transition-all duration-300",
                activeTab === "workers" ? "bg-green-200 dark:bg-blue-900" : ""
              )}
            >
              <Users className="w-4 h-4" /> Workers
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
                <LabourAnalytics labourData={labourData} />
              </TabsContent>

              <TabsContent value="workers">
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
                            Add Worker
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
                          <DialogHeader>
                            <DialogTitle>Add New Worker</DialogTitle>
                          </DialogHeader>
                          <LabourForm onSubmit={handleAddLabour} loading={isAdding} />
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
                      {filteredLabour.length === 0 ? (
                        <div className="text-center py-10 border rounded-md bg-gray-50 dark:bg-gray-800">
                          <p className="text-gray-500 dark:text-gray-400 text-lg">
                            No worker data available
                          </p>
                          <p className="text-gray-400 dark:text-gray-500 mt-2">
                            Click the "Add Worker" button to add a new worker.
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
                                Role
                              </TableHead>
                              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Hours
                              </TableHead>
                              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Wage
                              </TableHead>
                              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Task
                              </TableHead>
                              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </TableHead>
                              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredLabour.map((labour) => (
                              <TableRow
                                key={labour.id}
                                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                              >
                                <TableCell className="px-4 py-3 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {labour.name}
                                  </div>
                                </TableCell>
                                <TableCell className="px-4 py-3 whitespace-nowrap">
                                  <div className="text-sm text-gray-500 dark:text-gray-300">
                                    {labour.role}
                                  </div>
                                </TableCell>
                                <TableCell className="px-4 py-3 whitespace-nowrap">
                                  <div className="text-sm text-gray-500 dark:text-gray-300">
                                    {labour.hoursWorked}
                                  </div>
                                </TableCell>
                                <TableCell className="px-4 py-3 whitespace-nowrap">
                                  <div className="text-sm text-gray-500 dark:text-gray-300">
                                    <IndianRupee className="inline mr-1 h-4 w-4" />
                                    {labour.wage.toFixed(2)}
                                  </div>
                                </TableCell>
                                <TableCell className="px-4 py-3 whitespace-nowrap">
                                  <div className="text-sm text-gray-500 dark:text-gray-300">
                                    {labour.task}
                                  </div>
                                </TableCell>
                                <TableCell className="px-4 py-3 whitespace-nowrap">
                                  <Badge
                                    variant="outline"
                                    className={cn(
                                      "text-xs",
                                      labour.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                      labour.status === 'on leave' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                    )}
                                  >
                                    {labour.status.charAt(0).toUpperCase() + labour.status.slice(1)}
                                  </Badge>
                                </TableCell>
                                <TableCell className="px-4 py-3 whitespace-nowrap">
                                  <div className="flex space-x-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                      onClick={() => setEditingLabour(labour)}
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      className="text-white hover:bg-red-700 transition-colors duration-200"
                                      onClick={() => handleDeleteLabour(labour.id)}
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
                    {labourData && labourData.length > 0 ? (
                      <LabourChart labourData={labourData} />
                    ) : (
                      <div className="text-center py-10 border rounded-md bg-gray-50 dark:bg-gray-800">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                          No labour data available for analysis
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

        {/* Edit Labour Dialog */}
        <Dialog open={!!editingLabour} onOpenChange={(open) => !open && setEditingLabour(null)}>
          <DialogContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
            <DialogHeader>
              <DialogTitle>Edit Worker</DialogTitle>
            </DialogHeader>
            <LabourForm
              onSubmit={handleUpdateLabour}
              loading={isUpdating}
              initialLabour={editingLabour || undefined}
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}