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
  Download,
  Grid2X2,
  Grid,
  Maximize2,
  PlayCircle,
  PauseCircle,
  Volume2,
  VolumeX,
  RotateCcw,
  Radio,
  MessageSquare,
  UserCircle2,
  BellRing,
  CalendarClock,
  Clock,
  Workflow,
  Info,
  ShieldAlert
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"

import livefeed1 from "@/assets/Surveillance/livefeed1.mp4"
import livefeed2 from "@/assets/Surveillance/livefeed2.mp4"
import livefeed3 from "@/assets/Surveillance/livefeed3.mp4"
import livefeed4 from "@/assets/Surveillance/livefeed2.mp4"

const videos = [
  livefeed1, livefeed2, livefeed4,livefeed3
]

export default function SurveillanceHub() {
  // Preserve existing state management
  const [isExpanded, setIsExpanded] = useState(false)
  const [layout, setLayout] = useState('grid') // 'grid' or 'single'
  const [activeCamera, setActiveCamera] = useState(0)
  const [isIntruderDetected, setIsIntruderDetected] = useState(false)
  const [activeTab, setActiveTab] = useState('live')
  const [isMuted, setIsMuted] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [showTimeline, setShowTimeline] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, time: '10:45 AM', message: 'Motion detected in Camera 2', type: 'warning' },
    { id: 2, time: '10:30 AM', message: 'Person identified: John Doe', type: 'info' },
    { id: 3, time: '10:15 AM', message: 'Vehicle detected in restricted area', type: 'alert' }
  ])
  const [systemStatus, setSystemStatus] = useState({
    cpuUsage: 45,
    memoryUsage: 62,
    storageUsage: 78,
    uptime: '99.9%',
    networkLatency: '24ms',
    activeUsers: 3,
    recordingStatus: 'Active',
    lastBackup: '2024-03-20 09:00 AM'
  })
  const [timelineEvents] = useState([
    { time: '11:00 AM', event: 'Shift change - Team B on duty', camera: 'All' },
    { time: '10:45 AM', event: 'Motion detected in restricted area', camera: 'Camera 2' },
    { time: '10:30 AM', event: 'System backup completed', camera: 'System' },
    { time: '10:15 AM', event: 'Vehicle left premises', camera: 'Camera 4' },
    { time: '10:00 AM', event: 'Access granted: ID #1234', camera: 'Camera 1' }
  ])
  
  const videoRefs = useRef(videos.map(() => React.createRef()))

  // Preserve existing effects
  useEffect(() => {
    const interval = setInterval(() => {
      setIsIntruderDetected(Math.random() < 0.1)
      setSystemStatus(prev => ({
        ...prev,
        cpuUsage: Math.min(100, prev.cpuUsage + (Math.random() * 10 - 5)),
        memoryUsage: Math.min(100, prev.memoryUsage + (Math.random() * 10 - 5)),
        networkLatency: `${Math.floor(20 + Math.random() * 10)}ms`
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const toggleLayout = () => {
    setLayout(prev => prev === 'grid' ? 'single' : 'grid')
  }

  const handleCameraClick = (index: number) => {
    if (layout === 'grid') {
      setLayout('single')
    }
    setActiveCamera(index)
  }

  return (
    <AnimatePresence>
      <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
        <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                <Camera className="text-green-600 dark:text-blue-400" />
                Surveillance Hub
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-blue-200">
                Advanced Multi-Camera Monitoring System
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={`bg-white/30 dark:bg-black/30 ${isIntruderDetected ? 'animate-pulse' : ''}`}>
                {isIntruderDetected ? 'ALERT MODE' : 'SECURE MODE'}
              </Badge>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleLayout}
                className="bg-white/30 dark:bg-black/30"
              >
                {layout === 'grid' ? <Maximize2 className="h-4 w-4" /> : <Grid2X2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Camera Grid */}
          <div className={`relative ${layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : ''}`}>
            {videos.map((video, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`relative ${layout === 'single' && index !== activeCamera ? 'hidden' : ''} 
                  aspect-video rounded-lg overflow-hidden group`}
              >
                <div className="relative w-full h-full">
                  <video
                    ref={videoRefs.current[index]}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted={isMuted}
                    onClick={() => handleCameraClick(index)}
                  >
                    <source src={video} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/20 dark:bg-black/40 group-hover:bg-black/30 transition-all" />
                  
                  {/* Camera Controls Overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-2 left-2 flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-black/50">Camera {index + 1}</Badge>
                      {isIntruderDetected && index === 1 && (
                        <Badge variant="destructive" className="animate-pulse">Motion Detected</Badge>
                      )}
                    </div>
                    
                    <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 bg-black/50 hover:bg-black/70"
                          onClick={() => setIsPaused(!isPaused)}
                        >
                          {isPaused ? 
                            <PlayCircle className="h-4 w-4 text-white" /> : 
                            <PauseCircle className="h-4 w-4 text-white" />
                          }
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 bg-black/50 hover:bg-black/70"
                          onClick={() => setIsMuted(!isMuted)}
                        >
                          {isMuted ? 
                            <VolumeX className="h-4 w-4 text-white" /> : 
                            <Volume2 className="h-4 w-4 text-white" />
                          }
                        </Button>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 bg-black/50 hover:bg-black/70"
                        >
                          <Download className="h-4 w-4 text-white" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 bg-black/50 hover:bg-black/70"
                        >
                          <Maximize2 className="h-4 w-4 text-white" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Advanced Features Section */}
          <Tabs defaultValue="analytics" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-green-50 dark:bg-gray-800">
              <TabsTrigger
                value="analytics"
                className={`flex items-center gap-2 transition-all duration-300`}
              >
                <BarChart className="w-4 h-4" /> Analytics
              </TabsTrigger>
              <TabsTrigger
                value="events"
                className={`flex items-center gap-2 transition-all duration-300`}
              >
                <BellRing className="w-4 h-4" /> Events
              </TabsTrigger>
              <TabsTrigger
                value="timeline"
                className={`flex items-center gap-2 transition-all duration-300`}
              >
                <CalendarClock className="w-4 h-4" /> Timeline
              </TabsTrigger>
              <TabsTrigger
                value="system"
                className={`flex items-center gap-2 transition-all duration-300`}
              >
                <Workflow className="w-4 h-4" /> System
              </TabsTrigger>
            </TabsList>

            <TabsContent value="analytics" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-white/80 dark:bg-gray-800/80 p-4">
                  <h3 className="font-semibold text-green-800 dark:text-blue-300 mb-2">
                    Live Analytics
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>People Detected</span>
                      <span>7</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Vehicles</span>
                      <span>3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Restricted Areas</span>
                      <span className="text-red-500">1 Alert</span>
                    </div>
                  </div>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-800/80 p-4">
                  <h3 className="font-semibold text-green-800 dark:text-blue-300 mb-2">
                    AI Recognition
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Known Faces</span>
                      <span>4/7</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>License Plates</span>
                      <span>2/3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Objects Tracked</span>
                      <span>12</span>
                    </div>
                  </div>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-800/80 p-4">
                  <h3 className="font-semibold text-green-800 dark:text-blue-300 mb-2">
                    System Health
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>CPU Load</span>
                        <span>{systemStatus.cpuUsage.toFixed(1)}%</span>
                      </div>
                      <Progress value={systemStatus.cpuUsage} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Memory</span>
                        <span>{systemStatus.memoryUsage.toFixed(1)}%</span>
                      </div>
                      <Progress value={systemStatus.memoryUsage} className="h-2" />
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="events" className="mt-4">
              <Card className="bg-white/80 dark:bg-gray-800/80 p-4">
                <ScrollArea className="h-[200px]">
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="flex items-center gap-4 p-2 rounded-lg bg-white/50 dark:bg-gray-900/50"
                      >
                        <div className={`p-2 rounded-full 
                          ${notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                            notification.type === 'alert' ? 'bg-red-100 text-red-600' :
                            'bg-blue-100 text-blue-600'}`}
                        >
                          {notification.type === 'warning' ? <AlertTriangle className="h-4 w-4" /> :
                           notification.type === 'alert' ? <ShieldAlert className="h-4 w-4" /> :
                           <Info className="h-4 w-4" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{notification.message}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card>
            </TabsContent>

            <TabsContent value="timeline" className="mt-4">
              <Card className="bg-white/80 dark:bg-gray-800/80 p-4">
                <ScrollArea className="h-[200px]">
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />
                    <div className="space-y-6">
                      {timelineEvents.map((event, index) => (
                        <div key={index} className="relative ml-8">
                          <div className="absolute -left-10 top-1 w-4 h-4 rounded-full bg-green-500 dark:bg-blue-500" />
                          <div>
                            <p className="text-sm font-medium">{event.event}</p>
                            <div className="flex gap-2 text-xs text-gray-500">
                              <Clock className="h-3 w-3" />
                              {event.time}
                              <Camera className="h-3 w-3 ml-2" />
                              {event.camera}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
              </Card>
            </TabsContent>

            <TabsContent value="system" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-white/80 dark:bg-gray-800/80 p-4">
                  <h3 className="font-semibold text-green-800 dark:text-blue-300 mb-4">System Performance</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Storage Usage</span>
                        <span>{systemStatus.storageUsage}%</span>
                      </div>
                      <Progress value={systemStatus.storageUsage} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Network Latency</p>
                        <p className="text-lg">{systemStatus.networkLatency}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">System Uptime</p>
                        <p className="text-lg">{systemStatus.uptime}</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-800/80 p-4">
                  <h3 className="font-semibold text-green-800 dark:text-blue-300 mb-4">System Status</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Recording Status</span>
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        {systemStatus.recordingStatus}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Active Users</span>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                        {systemStatus.activeUsers} Online
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Last Backup</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">{systemStatus.lastBackup}</span>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </AnimatePresence>
  )
}