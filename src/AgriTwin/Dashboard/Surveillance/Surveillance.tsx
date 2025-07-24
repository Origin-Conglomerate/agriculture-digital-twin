'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Expand,
  Minimize,
  AlertTriangle,
  Shield,
  Camera,
  Settings,
  BarChart,
  Sparkles,
  ZapIcon,
  Activity,
  Calendar,
  Download
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Link } from 'react-router-dom'
import livefeed1 from "@/assets/Surveillance/livefeed4.mp4"
import livefeed2 from "@/assets/Surveillance/livefeed5.mp4"
import livefeed3 from "@/assets/Surveillance/livefeed6.mp4"

const videos = [
  livefeed1, livefeed2, livefeed3
]

export default function Surveillance() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentFeed, setCurrentFeed] = useState(0)
  const [isIntruderDetected, setIsIntruderDetected] = useState(false)
  const [activeTab, setActiveTab] = useState('feed')
  const [systemStatus, setSystemStatus] = useState({
    cpuUsage: 45,
    memoryUsage: 62,
    storageUsage: 78,
    uptime: '99.9%'
  })
  const videoRefs = useRef(videos.map(() => React.createRef()))

  useEffect(() => {
    const interval = setInterval(() => {
      // setIsIntruderDetected(Math.random() < 0.1)
      // Simulate changing system metrics
      setSystemStatus(prev => ({
        cpuUsage: Math.min(100, prev.cpuUsage + (Math.random() * 10 - 5)),
        memoryUsage: Math.min(100, prev.memoryUsage + (Math.random() * 10 - 5)),
        storageUsage: prev.storageUsage,
        uptime: prev.uptime
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleExpand = () => {
    setIsExpanded(!isExpanded)
    
  }

  const handleFeedChange = (index: number) => {
    setCurrentFeed(index)
  }

  return (
    <AnimatePresence>
      {/* <motion.div
        layout
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="p-4 sm:p-6 md:p-8 lg:p-10"
      > */}
        <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
          <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
            <div className="md:flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                  <Camera className="text-green-600 dark:text-blue-400" />
                  Surveillance System
                </CardTitle>
                <CardDescription className="text-green-700 dark:text-blue-200">
                  AI-powered security monitoring and analytics
                </CardDescription>
              </div>
              <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
                {isIntruderDetected ? 'ALERT MODE' : 'SECURE MODE'}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <Tabs
              defaultValue="feed"
              className="w-full"
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-3 bg-green-50 dark:bg-gray-800">
                <TabsTrigger
                  value="feed"
                  className={`flex items-center gap-2 transition-all duration-300 ${activeTab === 'feed' ? 'bg-green-200 dark:bg-blue-900' : ''
                    }`}
                >
                  <Activity className="w-4 h-4" /> Recorded Feed
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className={`flex items-center gap-2 transition-all duration-300 ${activeTab === 'analytics' ? 'bg-green-200 dark:bg-blue-900' : ''
                    }`}
                >
                  <BarChart className="w-4 h-4" /> Analytics
                </TabsTrigger>
                <TabsTrigger
                  value="system"
                  className={`flex items-center gap-2 transition-all duration-300 ${activeTab === 'system' ? 'bg-green-200 dark:bg-blue-900' : ''
                    }`}
                >
                  <ZapIcon className="w-4 h-4" /> Status 
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 bg-white/50 dark:bg-gray-900/50 rounded-lg"
                >
                  <TabsContent value="feed" className="m-0">
                    <div className="relative">
                      <Carousel className="w-full">
                        <CarouselContent>
                          {videos.map((video, index) => (
                            <CarouselItem key={index}>
                              <div className="relative aspect-video rounded-lg overflow-hidden">
                                <video
                                  ref={videoRefs.current[index]}
                                  className="w-full h-full object-cover"
                                  autoPlay
                                  loop
                                  muted
                                >
                                  <source src={video} type="video/mp4" />
                                </video>
                                <video className="w-full h-full object-cover" muted>
                                  <source src="https://displayed-geological-blacks-going.trycloudflare.com" type="video/mp4" />
                                </video>
                                <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
                              </div>
                            </CarouselItem>
                           ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700" />
                        <CarouselNext className="right-2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700" />
                      </Carousel>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isIntruderDetected ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-red-500/20 pointer-events-none z-10"
                      />

                      <div className="absolute top-2 left-2 z-20 flex flex-wrap gap-2">
                        <Badge
                          variant={isIntruderDetected ? "destructive" : "secondary"}
                          className="text-xs font-bold animate-pulse"
                        >
                          {isIntruderDetected ? "INTRUDER ALERT" : "SECURE"}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-xs font-bold bg-white/80 dark:bg-gray-800/80"
                        >
                          CAMERA {currentFeed + 1}
                        </Badge>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="analytics" className="m-0 p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="bg-white/80 dark:bg-gray-800/80 p-4">
                        <h3 className="font-semibold text-green-800 dark:text-blue-300 mb-2">
                          Detection Statistics
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Motion Events</span>
                            <span>247</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Alerts Triggered</span>
                            <span>12</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>False Positives</span>
                            <span>3</span>
                          </div>
                        </div>
                      </Card>

                      <Card className="bg-white/80 dark:bg-gray-800/80 p-4">
                        <h3 className="font-semibold text-green-800 dark:text-blue-300 mb-2">
                          System Performance
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>CPU Usage</span>
                              <span>{systemStatus.cpuUsage.toFixed(1)}%</span>
                            </div>
                            <Progress value={systemStatus.cpuUsage} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Memory Usage</span>
                              <span>{systemStatus.memoryUsage.toFixed(1)}%</span>
                            </div>
                            <Progress value={systemStatus.memoryUsage} className="h-2" />
                          </div>
                        </div>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="system" className="m-0 p-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card className="bg-white/80 dark:bg-gray-800/80 p-4">
                          <div className="text-sm font-medium text-green-800 dark:text-blue-300">Storage</div>
                          <div className="text-2xl font-bold text-green-900 dark:text-white">
                            {systemStatus.storageUsage}%
                          </div>
                          <Progress value={systemStatus.storageUsage} className="h-2 mt-2" />
                        </Card>
                        <Card className="bg-white/80 dark:bg-gray-800/80 p-4">
                          <div className="text-sm font-medium text-green-800 dark:text-blue-300">Uptime</div>
                          <div className="text-2xl font-bold text-green-900 dark:text-white">
                            {systemStatus.uptime}
                          </div>
                        </Card>
                        <Card className="bg-white/80 dark:bg-gray-800/80 p-4">
                          <div className="text-sm font-medium text-green-800 dark:text-blue-300">Cameras</div>
                          <div className="text-2xl font-bold text-green-900 dark:text-white">
                            {videos.length}
                          </div>
                        </Card>
                        <Card className="bg-white/80 dark:bg-gray-800/80 p-4">
                          <div className="text-sm font-medium text-green-800 dark:text-blue-300">AI Status</div>
                          <div className="text-2xl font-bold text-green-900 dark:text-white">
                            Active
                          </div>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                </motion.div>
              </AnimatePresence>
            </Tabs>

            <div className="mt-6 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                {isIntruderDetected ? (
                  <AlertTriangle className="text-red-500 animate-pulse h-5 w-5" />
                ) : (
                  <Shield className="text-green-500 h-5 w-5" />
                )}
                <span className={`text-sm font-medium ${isIntruderDetected ? 'text-red-500' : 'text-green-500'
                  }`}>
                  {isIntruderDetected ? 'Threat Detected' : 'Area Secure'}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-green-600 dark:text-green-300">
                        <Calendar className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View Schedule</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-green-600 dark:text-green-300">
                        <Download className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download Footage</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-green-600 dark:text-green-300">
                        <Settings className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Settings</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to="surveillancehub">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleExpand}
                        className="bg-green-100 dark:bg-green-800 hover:bg-green-200 dark:hover:bg-green-700 text-green-600 dark:text-green-300"
                      >
                        {isExpanded ? <Minimize className="h-4 w-4" /> : <Expand className="h-4 w-4" />}
                      </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isExpanded ? 'Minimize' : 'Expand'} View</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* Additional Features Section */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Quick Actions */}
              <Card className="bg-white/80 dark:bg-gray-800/80 p-4">
                <h3 className="text-sm font-semibold text-green-800 dark:text-blue-300 mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs bg-white/50 dark:bg-gray-900/50 hover:bg-green-100 dark:hover:bg-blue-900/50"
                  >
                    Lock Down
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs bg-white/50 dark:bg-gray-900/50 hover:bg-green-100 dark:hover:bg-blue-900/50"
                  >
                    Sound Alarm
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs bg-white/50 dark:bg-gray-900/50 hover:bg-green-100 dark:hover:bg-blue-900/50"
                  >
                    Record
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs bg-white/50 dark:bg-gray-900/50 hover:bg-green-100 dark:hover:bg-blue-900/50"
                  >
                    Screenshot
                  </Button>
                </div>
              </Card>

              {/* Recent Events */}
              <Card className="bg-white/80 dark:bg-gray-800/80 p-4">
                <h3 className="text-sm font-semibold text-green-800 dark:text-blue-300 mb-3">Recent Events</h3>
                <div className="space-y-2">
                  {[
                    { time: '10:45 AM', event: 'Motion detected in Zone 2' },
                    { time: '10:30 AM', event: 'Camera 1 started recording' },
                    { time: '10:15 AM', event: 'System check completed' },
                  ].map((event, index) => (
                    <div key={index} className="flex justify-between items-center text-xs">
                      <span className="text-gray-600 dark:text-gray-400">{event.time}</span>
                      <span className="text-green-700 dark:text-blue-300">{event.event}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* AI Analysis */}
              <Card className="bg-white/80 dark:bg-gray-800/80 p-4">
                <h3 className="text-sm font-semibold text-green-800 dark:text-blue-300 mb-3">AI Analysis</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-600 dark:text-gray-400">Object Detection</span>
                    <Badge variant="outline" className="bg-green-100/50 dark:bg-blue-900/50">
                      Active
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-600 dark:text-gray-400">Face Recognition</span>
                    <Badge variant="outline" className="bg-green-100/50 dark:bg-blue-900/50">
                      Enabled
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-600 dark:text-gray-400">Motion Analysis</span>
                    <Badge variant="outline" className="bg-green-100/50 dark:bg-blue-900/50">
                      Running
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>

            {/* Footer Status Bar */}
            <div className="mt-5 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-gray-900/50 p-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-green-500 dark:text-blue-400" />
                <span>AI Processing: Active</span>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <span>Storage: {systemStatus.storageUsage}% Used</span>
                <span>•</span>
                <span>Last Update: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      {/* </motion.div> */}
    </AnimatePresence>
  )
}