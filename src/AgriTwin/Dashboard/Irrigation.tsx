'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Droplets,
  Sprout,
  Timer,
  AlertCircle,
  ChevronDown,
  BarChart3,
  Waves,
  CloudRain,
  ThermometerSun,
  Wind,
  Droplet,
  Gauge,
  AlertTriangle,
  ArrowRightCircleIcon,
  Circle
} from 'lucide-react'

const irrigationData = [
  {
    zones: "Zone 1 - Zone 2",
    status: "In Progress",
    volumeIrrigated: 50000,
    totalVolume: 75000,
    lastIrrigation: "23-07-2024",
    soilMoisture: 65,
    efficiency: 89,
    schedule: "Daily",
    alerts: 1,
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    rainfall: 0.2
  },
  {
    zones: "Zone 3 - Zone 4",
    status: "Completed",
    volumeIrrigated: 30000,
    totalVolume: 30000,
    lastIrrigation: "24-07-2024",
    soilMoisture: 78,
    efficiency: 94,
    schedule: "Every 2 days",
    alerts: 0,
    temperature: 26,
    humidity: 70,
    windSpeed: 8,
    rainfall: 0
  },
  {
    zones: "Zone 5 - Zone 6",
    status: "Scheduled",
    volumeIrrigated: 0,
    totalVolume: 45000,
    lastIrrigation: "25-07-2024",
    soilMoisture: 45,
    efficiency: 92,
    schedule: "Weekly",
    alerts: 2,
    temperature: 30,
    humidity: 55,
    windSpeed: 15,
    rainfall: 0
  },
]

export default function IrrigationDashboard() {
  const [selectedZone, setSelectedZone] = useState(0)
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500)
  }, [])

  const getStatusColor = (status) => {
    const colors = {
      'Completed': 'bg-green-500',
      'In Progress': 'bg-blue-500',
      'Scheduled': 'bg-yellow-500'
    }
    return colors[status] || 'bg-gray-500'
  }

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 90) return 'text-green-500'
    if (efficiency >= 75) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-blue-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-blue-100/50 transition-all duration-300 ease-in-out">
      <CardHeader className="bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/50 dark:to-green-900/50 p-6 rounded-t-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-2xl font-bold text-blue-900 dark:text-white flex items-center gap-3">
              <Waves className="text-blue-600 dark:text-blue-400" />
              Irrigation Control
            </CardTitle>
            <CardDescription className="text-blue-700 dark:text-blue-200">
              Real-time monitoring and intelligent water management
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
              Live Data
            </Badge>
            <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
              AI-Enhanced
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <Card className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 border-none shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Droplets className="w-6 h-6 text-blue-500" />
                <Badge variant="outline" className="bg-white/50 dark:bg-gray-800/50">Today</Badge>
              </div>
              <h3 className="text-xl font-bold mt-2">150,000 L</h3>
              <p className="text-sm text-muted-foreground">Total Water Usage</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-none shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Gauge className="w-6 h-6 text-emerald-500" />
                <Badge variant="outline" className="bg-white/50 dark:bg-gray-800/50">Current</Badge>
              </div>
              <h3 className="text-xl font-bold mt-2">91.5%</h3>
              <p className="text-sm text-muted-foreground">System Efficiency</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border-none shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <AlertTriangle className="w-6 h-6 text-yellow-500" />
                <Badge variant="outline" className="bg-white/50 dark:bg-gray-800/50">Alerts</Badge>
              </div>
              <h3 className="text-xl font-bold mt-2">3 Active</h3>
              <p className="text-sm text-muted-foreground">System Alerts</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 border-none shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Timer className="w-6 h-6 text-purple-500" />
                <Badge variant="outline" className="bg-white/50 dark:bg-gray-800/50">Next</Badge>
              </div>
              <h3 className="text-xl font-bold mt-2">2h 15m</h3>
              <p className="text-sm text-muted-foreground">Until Next Cycle</p>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="overview" className="w-full " value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-blue-50 dark:bg-gray-800 h-full">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" /> Overview
            </TabsTrigger>
            <TabsTrigger value="weather" className="flex items-center gap-2">
              <CloudRain className="w-4 h-4" /> Weather
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Gauge className="w-4 h-4" /> Analytics
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Alerts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-4 mt-4">
              {irrigationData.map((zone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 transition-all duration-300 
                    ${selectedZone === index ? 'ring-2 ring-blue-500' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(zone.status)}`} />
                          <h3 className="font-semibold">{zone.zones}</h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline" className={getEfficiencyColor(zone.efficiency)}>
                            {zone.efficiency}% Efficient
                          </Badge>
                          {zone.alerts > 0 && (
                            <Badge   variant="destructive" className="animate-pulse">
                              {zone.alerts} {zone.alerts === 1 ? 'Alert' : 'Alerts'}
                            </Badge>
                          )}
                          <Button className='ml-auto'
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedZone(selectedZone === index ? null : index)}
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 
                              ${selectedZone === index ? 'transform rotate-180' : ''}`} />
                          </Button>
                        </div>
                      </div>

                      <AnimatePresence>
                        {selectedZone === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 pt-4 border-t"
                          >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div>
                                  <p className="text-sm text-muted-foreground mb-2">Water Usage</p>
                                  <Progress
                                    value={(zone.volumeIrrigated / zone.totalVolume) * 100}
                                    className="h-2"
                                  />
                                  <div className="flex justify-between mt-1 text-sm">
                                    <span>{zone.volumeIrrigated.toLocaleString()} L</span>
                                    <span>{zone.totalVolume.toLocaleString()} L</span>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground mb-2">Soil Moisture</p>
                                  <div className="flex items-center gap-2">
                                    <Progress value={zone.soilMoisture} className="h-2" />
                                    <span className="text-sm font-medium">{zone.soilMoisture}%</span>
                                  </div>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <ThermometerSun className="w-4 h-4 text-orange-500" />
                                    <span className="text-sm">{zone.temperature}°C</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Droplet className="w-4 h-4 text-blue-500" />
                                    <span className="text-sm">{zone.humidity}% Humidity</span>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <Wind className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm">{zone.windSpeed} km/h</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <CloudRain className="w-4 h-4 text-blue-500" />
                                    <span className="text-sm">{zone.rainfall} mm</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="weather">
            <Card className="mt-4 bg-white/80 dark:bg-gray-900/80">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
                  {irrigationData.map((zone, index) => (
                    <div key={`weather-${index}`} className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 w-full">
                      <h4 className="font-medium mb-3">{zone.zones}</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Temperature</span>
                          <span className="text-sm font-medium">{zone.temperature}°C</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Humidity</span>
                          <span className="text-sm font-medium">{zone.humidity}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Wind Speed</span>
                          <span className="text-sm font-medium">{zone.windSpeed} km/h</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Rainfall</span>
                          <span className="text-sm font-medium">{zone.rainfall} mm</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="mt-4 bg-white/80 dark:bg-gray-900/80">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Gauge className="w-5 h-5 text-blue-500" />
                      System Performance
                    </h3>
                    {irrigationData.map((zone, index) => (
                      <div key={`analytics-${index}`} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">{zone.zones}</span>
                          <Badge
                            variant="outline"
                            className={getEfficiencyColor(zone.efficiency)}
                          >
                            {zone.efficiency}%
                          </Badge>
                        </div>
                        <Progress
                          value={zone.efficiency}
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Droplets className="w-5 h-5 text-blue-500" />
                      Water Consumption
                    </h3>
                    {irrigationData.map((zone, index) => (
                      <div key={`water-${index}`} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">{zone.zones}</span>
                          <span className="text-sm font-medium">
                            {zone.volumeIrrigated.toLocaleString()} / {zone.totalVolume.toLocaleString()} L
                          </span>
                        </div>
                        <Progress
                          value={(zone.volumeIrrigated / zone.totalVolume) * 100}
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts">
            <Card className="mt-4 bg-white/80 dark:bg-gray-900/80">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {irrigationData.map((zone, index) => (
                    zone.alerts > 0 && (
                      <motion.div
                        key={`alert-${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                            <div>
                              <h4 className="font-medium">{zone.zones}</h4>
                              <p className="text-sm text-muted-foreground">
                                {zone.alerts} active alert{zone.alerts > 1 ? 's' : ''}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">
                            View Details
                          </Button>
                        </div>
                      </motion.div>
                    )
                  ))}
                  {!irrigationData.some(zone => zone.alerts > 0) && (
                    <div className="text-center p-6 text-muted-foreground">
                      <Circle className="w-12 h-12 mx-auto mb-2 text-green-500" />
                      <p>No active alerts</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Gauge className="text-blue-600 dark:text-blue-400" />
            <span className="text-sm text-blue-700 dark:text-blue-200">
              Smart Irrigation v2.0
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="group hover:bg-blue-100 dark:hover:bg-blue-900 transition-all">
              System Settings
              <ArrowRightCircleIcon className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="default" className="bg-blue-500 hover:bg-blue-600 text-white">
              Generate Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}