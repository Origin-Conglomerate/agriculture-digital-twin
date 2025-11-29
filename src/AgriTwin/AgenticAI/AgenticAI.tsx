import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowUp,
  Bot,
  Box,
  CheckCircle,
  Clock,
  Code,
  Cpu,
  Database,
  Download,
  Factory,
  FileText,
  Filter,
  Gauge,
  HardDrive,
  HelpCircle,
  Loader2,
  MessageSquare,
  Package,
  Plus,
  Search,
  Server,
  Settings,
  Shield,
  Sparkles,
  Upload,
  User,
  Users,
  Wifi,
  Zap,
  Droplets,
  Sun,
  Cloud,
  Thermometer,
  Leaf,
  Trees,
  Sprout,
  Tractor,
  Scale,
  Bug,
  Network,
  GitBranch,
  Workflow,
  BrainCircuit,
  Link,
  Share2,
  TrendingUp
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data sources
const dataSources = [
  { name: "Soil Sensors", icon: <Thermometer className="h-4 w-4" />, connected: true },
  { name: "Weather Stations", icon: <Cloud className="h-4 w-4" />, connected: true },
  { name: "Drone Imagery", icon: <Sun className="h-4 w-4" />, connected: true },
  { name: "Satellite Data", icon: <Gauge className="h-4 w-4" />, connected: true },
  { name: "Irrigation System", icon: <Droplets className="h-4 w-4" />, connected: false },
  { name: "Crop Health Sensors", icon: <Leaf className="h-4 w-4" />, connected: true },
  { name: "Harvest Data", icon: <Scale className="h-4 w-4" />, connected: true }
];

// Mock messages
const initialMessages = [
  {
    id: 1,
    sender: 'ai',
    content: 'Hello! I\'m your AI Agronomist. I\'ve been monitoring field conditions. Would you like an overview of today\'s crop health and growth metrics?',
    timestamp: new Date(),
    type: 'greeting'
  },
  {
    id: 2,
    sender: 'ai',
    content: 'Alert: I\'ve detected early signs of fungal infection in Field 3 - Northeast quadrant. Disease risk is 68% based on current humidity levels.',
    timestamp: new Date(),
    type: 'alert',
    urgent: true
  },
  {
    id: 3,
    sender: 'ai',
    content: 'Here\'s today\'s farm snapshot:\n- Soil moisture: 42% (optimal range 35-50%)\n- Crop growth stage: Vegetative (Day 28)\n- Pest pressure: Low (2% leaf damage)\n- Weather forecast: 80% chance of rain tomorrow\n- Water usage: 12,500 gallons (8% above target)',
    timestamp: new Date(),
    type: 'summary'
  }
];

export default function AgenticAI() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [activeDataSource, setActiveDataSource] = useState(null);
  const [agentsDialogOpen, setAgentsDialogOpen] = useState(false);
  const [knowledgeGraphOpen, setKnowledgeGraphOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate proactive AI messages
  useEffect(() => {
    const proactiveTimer = setTimeout(() => {
      const newAlert = {
        id: messages.length + 1,
        sender: 'ai',
        content: 'Predictive Alert: Soil moisture levels in Field 2 will drop below optimal range in 36 hours. Recommend adjusting irrigation schedule.',
        timestamp: new Date(),
        type: 'alert',
        urgent: true
      };
      setMessages(prev => [...prev, newAlert]);
    }, 30000); // Every 30 seconds check for new alerts

    return () => clearTimeout(proactiveTimer);
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: input,
      timestamp: new Date(),
      type: 'query'
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      let aiResponse;
      
      if (input.toLowerCase().includes('soil') || input.toLowerCase().includes('moisture')) {
        // Simulate data gathering process
        setActiveDataSource('Soil Sensors');
        setTimeout(() => {
          setActiveDataSource('Weather Stations');
          setTimeout(() => {
            setActiveDataSource(null);
            aiResponse = {
              id: messages.length + 2,
              sender: 'ai',
              content: `Soil analysis complete:\n\n- Average moisture: 42% (Field 1: 38%, Field 2: 45%)\n- pH levels: 6.8 (optimal for current crops)\n- Nitrogen content: Medium (recommend light fertilization)\n- Temperature: 18°C at root zone\n\nI can simulate different irrigation scenarios if needed.`,
              timestamp: new Date(),
              type: 'analysis',
              sources: ['Soil Sensors', 'Weather Stations'],
              analysisTime: '2.1s'
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);
            setIsTyping(false);
          }, 1500);
        }, 1500);
      } else if (input.toLowerCase().includes('crop') || input.toLowerCase().includes('health')) {
        setActiveDataSource('Drone Imagery');
        setTimeout(() => {
          setActiveDataSource('Crop Health Sensors');
          setTimeout(() => {
            setActiveDataSource(null);
            aiResponse = {
              id: messages.length + 2,
              sender: 'ai',
              content: `Crop health analysis:\n\n- NDVI index: 0.72 (healthy range 0.6-0.8)\n- Stress indicators: Mild in northwest corner\n- Growth rate: 12% above seasonal average\n- Canopy cover: 78% (optimal for this stage)\n\nRecommend targeted inspection of northwest quadrant.`,
              timestamp: new Date(),
              type: 'analysis',
              sources: ['Drone Imagery', 'Crop Health Sensors'],
              analysisTime: '3.2s'
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);
            setIsTyping(false);
          }, 1500);
        }, 1500);
      } else if (input.toLowerCase().includes('weather') || input.toLowerCase().includes('forecast')) {
        setActiveDataSource('Weather Stations');
        setTimeout(() => {
          setActiveDataSource('Satellite Data');
          setTimeout(() => {
            setActiveDataSource(null);
            aiResponse = {
              id: messages.length + 2,
              sender: 'ai',
              content: `Weather analysis:\n\n- Next 48 hours: 80% chance rain (15-20mm expected)\n- Temperature: 22°C day / 14°C night\n- Wind: 15-20 km/h from southwest\n- Humidity: Rising to 85%\n\nRecommend delaying fungicide application until after rain.`,
              timestamp: new Date(),
              type: 'analysis',
              sources: ['Weather Stations', 'Satellite Data'],
              analysisTime: '1.9s'
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);
            setIsTyping(false);
          }, 1500);
        }, 1500);
      } else if (input.toLowerCase().includes('pest') || input.toLowerCase().includes('disease')) {
        setActiveDataSource('Drone Imagery');
        setTimeout(() => {
          setActiveDataSource('Crop Health Sensors');
          setTimeout(() => {
            setActiveDataSource(null);
            aiResponse = {
              id: messages.length + 2,
              sender: 'ai',
              content: `Pest/disease analysis:\n\n- Current risk level: Moderate (fungal)\n- Hotspots: Field 3 northeast quadrant\n- Recommended treatment: Organic fungicide (copper-based)\n- Application window: Tomorrow morning before rain\n\nI can alert your agronomist if needed.`,
              timestamp: new Date(),
              type: 'analysis',
              sources: ['Drone Imagery', 'Crop Health Sensors'],
              analysisTime: '2.5s'
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);
            setIsTyping(false);
          }, 1500);
        }, 1500);
      } else {
        // Default response
        aiResponse = {
          id: messages.length + 2,
          sender: 'ai',
          content: `I've analyzed your query across farm systems. Key insights:\n\n- Optimal planting window opens in 3 days\n- Water usage efficiency could improve by 12%\n- 2 fields need soil amendments\n- Pest pressure increasing with warmer weather\n\nHow else can I assist with your farm management today?`,
          timestamp: new Date(),
          type: 'response'
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
        setIsTyping(false);
      }
    }, 1000);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="relative rounded-3xl overflow-hidden 
      p-6 h-full flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Avatar className="bg-gradient-to-r from-green-500 to-amber-500">
            <AvatarFallback className="bg-transparent">
              <Leaf className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-300 
              to-amber-300 bg-clip-text text-transparent">
              Agriculture Digital Twin
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Wifi className="h-3 w-3 text-green-500" />
                <span>Connected</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Sprout className="h-3 w-3 text-amber-500" />
                <span>Precision Agriculture Mode</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Dialog open={agentsDialogOpen} onOpenChange={setAgentsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Workflow className="h-4 w-4" />
                AI Agents
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-2xl">
                  <Workflow className="h-6 w-6 text-green-600" />
                  AI Agent Automation Platform
                </DialogTitle>
                <DialogDescription>
                  Connect and orchestrate AI agents to automate your farm operations
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Available Agents */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    Available AI Agents
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { name: 'Crop Monitor Agent', desc: 'Monitors crop health and sends alerts', icon: <Sprout className="h-5 w-5" />, status: 'active' },
                      { name: 'Weather Analysis Agent', desc: 'Analyzes weather patterns and forecasts', icon: <Cloud className="h-5 w-5" />, status: 'active' },
                      { name: 'Irrigation Controller', desc: 'Automates irrigation based on soil moisture', icon: <Droplets className="h-5 w-5" />, status: 'active' },
                      { name: 'Pest Detection Agent', desc: 'Detects and alerts about pest infestations', icon: <Bug className="h-5 w-5" />, status: 'inactive' },
                      { name: 'Harvest Scheduler', desc: 'Optimizes harvest timing and resource allocation', icon: <Scale className="h-5 w-5" />, status: 'active' },
                      { name: 'Supply Chain Agent', desc: 'Manages logistics and supply chain operations', icon: <Tractor className="h-5 w-5" />, status: 'inactive' }
                    ].map((agent, idx) => (
                      <Card key={idx} className="p-4 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-3">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                              {agent.icon}
                            </div>
                            <div>
                              <h4 className="font-semibold">{agent.name}</h4>
                              <p className="text-sm text-muted-foreground">{agent.desc}</p>
                            </div>
                          </div>
                          <Badge variant={agent.status === 'active' ? 'default' : 'outline'}>
                            {agent.status === 'active' ? (
                              <><CheckCircle className="h-3 w-3 mr-1" />Active</>
                            ) : (
                              'Inactive'
                            )}
                          </Badge>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Automation Workflows */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <GitBranch className="h-5 w-5" />
                    Active Automation Workflows
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Smart Irrigation Flow', trigger: 'Soil Moisture < 30%', actions: ['Analyze weather', 'Calculate water needs', 'Start irrigation', 'Send notification'], runs: 142 },
                      { name: 'Pest Alert System', trigger: 'Disease detected in imagery', actions: ['Identify pest type', 'Check treatment inventory', 'Alert agronomist', 'Schedule treatment'], runs: 23 },
                      { name: 'Harvest Optimization', trigger: 'Crop maturity threshold', actions: ['Analyze market prices', 'Check labor availability', 'Schedule harvest', 'Notify buyers'], runs: 8 }
                    ].map((workflow, idx) => (
                      <Card key={idx} className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold flex items-center gap-2">
                            <Zap className="h-4 w-4 text-yellow-600" />
                            {workflow.name}
                          </h4>
                          <Badge variant="outline">{workflow.runs} runs</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="font-medium text-green-600">Trigger:</span> {workflow.trigger}
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            {workflow.actions.map((action, i) => (
                              <div key={i} className="flex items-center gap-1">
                                <Badge variant="secondary" className="text-xs">{action}</Badge>
                                {i < workflow.actions.length - 1 && <ArrowUp className="h-3 w-3 text-muted-foreground rotate-90" />}
                              </div>
                            ))}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Integration Options */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Share2 className="h-5 w-5" />
                    Integration Capabilities
                  </h3>
                  <div className="grid md:grid-cols-3 gap-3">
                    {[
                      { name: 'Webhooks', desc: 'Trigger actions via HTTP requests', icon: <Link /> },
                      { name: 'API Connectors', desc: 'Connect to external services', icon: <Server /> },
                      { name: 'Custom Scripts', desc: 'Run JavaScript/Python code', icon: <Code /> },
                      { name: 'Database Actions', desc: 'Read/write to databases', icon: <Database /> },
                      { name: 'File Operations', desc: 'Process and transform files', icon: <FileText /> },
                      { name: 'Notifications', desc: 'Email, SMS, Slack alerts', icon: <MessageSquare /> }
                    ].map((integration, idx) => (
                      <Card key={idx} className="p-3 text-center hover:bg-accent transition-colors cursor-pointer">
                        <div className="flex flex-col items-center gap-2">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            {integration.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm">{integration.name}</h4>
                            <p className="text-xs text-muted-foreground">{integration.desc}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <Button className="flex-1 bg-gradient-to-r from-green-600 to-blue-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Workflow
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage Agents
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={knowledgeGraphOpen} onOpenChange={setKnowledgeGraphOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <BrainCircuit className="h-4 w-4" />
                Knowledge Graph
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-2xl">
                  <BrainCircuit className="h-6 w-6 text-purple-600" />
                  Farm Knowledge Graph & AI Memory
                </DialogTitle>
                <DialogDescription>
                  Accumulated knowledge, context, and learning patterns from your entire farm operations
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Knowledge Stats */}
                <div className="grid md:grid-cols-4 gap-4">
                  <Card className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">12,847</div>
                      <div className="text-sm text-muted-foreground">Data Points</div>
                    </div>
                  </Card>
                  <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">487</div>
                      <div className="text-sm text-muted-foreground">Insights Learned</div>
                    </div>
                  </Card>
                  <Card className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600">94.2%</div>
                      <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                    </div>
                  </Card>
                  <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">156</div>
                      <div className="text-sm text-muted-foreground">Days Training</div>
                    </div>
                  </Card>
                </div>

                {/* Knowledge Connections - Simple View */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Network className="h-5 w-5" />
                    Knowledge Connections
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { label: 'Soil Health', connections: 24, icon: <Trees className="h-6 w-6" />, color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' },
                      { label: 'Weather Patterns', connections: 18, icon: <Cloud className="h-6 w-6" />, color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' },
                      { label: 'Crop Cycles', connections: 32, icon: <Sprout className="h-6 w-6" />, color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' },
                      { label: 'Pest Behavior', connections: 15, icon: <Bug className="h-6 w-6" />, color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' },
                      { label: 'Irrigation Needs', connections: 21, icon: <Droplets className="h-6 w-6" />, color: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400' },
                      { label: 'Market Trends', connections: 12, icon: <TrendingUp className="h-6 w-6" />, color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' }
                    ].map((node, idx) => (
                      <Card key={idx} className={`p-4 ${node.color} border-2`}>
                        <div className="flex items-center justify-between mb-2">
                          {node.icon}
                          <Badge variant="secondary">{node.connections} links</Badge>
                        </div>
                        <h4 className="font-semibold">{node.label}</h4>
                      </Card>
                    ))}
                  </div>
                </Card>

                {/* Learning Progress */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h3 className="text-lg font-semibold mb-3">Active Learning Areas</h3>
                    <div className="space-y-3">
                      {[
                        { area: 'Optimal Irrigation Timing', progress: 87 },
                        { area: 'Pest Prevention Patterns', progress: 72 },
                        { area: 'Yield Prediction Models', progress: 94 },
                        { area: 'Resource Optimization', progress: 81 }
                      ].map((item, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{item.area}</span>
                            <span className="font-semibold">{item.progress}%</span>
                          </div>
                          <Progress value={item.progress} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h3 className="text-lg font-semibold mb-3">Recent Insights</h3>
                    <div className="space-y-2">
                      {[
                        { insight: 'Early morning irrigation reduces water usage by 23%', time: '2 hours ago' },
                        { insight: 'Fungal risk increases 48hrs after heavy rain', time: '1 day ago' },
                        { insight: 'North field responds better to organic fertilizer', time: '3 days ago' },
                        { insight: 'Pest activity peaks during warm, humid evenings', time: '5 days ago' }
                      ].map((item, idx) => (
                        <div key={idx} className="p-2 bg-accent rounded-lg">
                          <p className="text-sm font-medium">{item.insight}</p>
                          <p className="text-xs text-muted-foreground">{item.time}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Data Sources Contributing to Knowledge */}
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Knowledge Sources & Context
                  </h3>
                  <div className="grid md:grid-cols-3 gap-3">
                    {[
                      { source: 'IoT Sensors', records: '8,234 records', contribution: 'Real-time field data' },
                      { source: 'Satellite Imagery', records: '142 images', contribution: 'Crop health analysis' },
                      { source: 'Weather History', records: '1,567 data points', contribution: 'Pattern recognition' },
                      { source: 'Harvest Logs', records: '89 seasons', contribution: 'Yield optimization' },
                      { source: 'Manual Observations', records: '423 entries', contribution: 'Expert knowledge' },
                      { source: 'Market Data', records: '2,341 records', contribution: 'Economic insights' }
                    ].map((item, idx) => (
                      <div key={idx} className="p-3 border rounded-lg">
                        <h4 className="font-semibold text-sm mb-1">{item.source}</h4>
                        <p className="text-xs text-muted-foreground mb-1">{item.records}</p>
                        <Badge variant="outline" className="text-xs">{item.contribution}</Badge>
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="flex gap-3 pt-4 border-t">
                  <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600">
                    <Download className="h-4 w-4 mr-2" />
                    Export Knowledge Base
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Activity className="h-4 w-4 mr-2" />
                    Training Dashboard
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Data Sources Status */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Server className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Connected Farm Systems</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {dataSources.map((source, index) => (
            <Badge 
              key={index} 
              variant={source.connected ? 'default' : 'outline'}
              className="gap-2"
            >
              {source.icon}
              {source.name}
              {source.connected ? (
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              ) : (
                <div className="h-2 w-2 rounded-full bg-gray-500"></div>
              )}
            </Badge>
          ))}
        </div>
      </div>

      {/* Chat Container */}
      <Card className="flex-1 backdrop-blur-lg bg-white/5 overflow-hidden mb-4">
        <ScrollArea className="h-full p-4">
          <div className="space-y-6">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`max-w-[85%] rounded-2xl p-4 ${
                    message.sender === 'ai' 
                      ? 'bg-white/5 border border-white/10 rounded-tl-none'
                      : 'bg-green-500/10 border border-green-500/20 rounded-tr-none'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {message.sender === 'ai' ? (
                      <Sprout className="h-4 w-4 text-green-400" />
                    ) : (
                      <User className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {formatTime(message.timestamp)}
                    </span>
                    {message.urgent && (
                      <Badge variant="destructive" className="ml-auto">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Urgent
                      </Badge>
                    )}
                  </div>
                  
                  {message.type === 'summary' || message.type === 'analysis' ? (
                    <div className="whitespace-pre-line">
                      {message.content.split('\n').map((line, i) => (
                        <p key={i} className="mb-2">{line}</p>
                      ))}
                      {message.sources && (
                        <div className="mt-3 pt-2 border-t border-white/10">
                          <div className="text-xs text-muted-foreground mb-1">
                            Analyzed data from:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {message.sources.map((source, i) => (
                              <Badge key={i} variant="outline" className="text-xs gap-1">
                                {dataSources.find(ds => ds.name === source)?.icon}
                                {source}
                              </Badge>
                            ))}
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {message.analysisTime}
                            </Badge>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="whitespace-pre-line">
                      {message.content}
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
            
            {/* Loading indicator when AI is typing */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[85%] rounded-2xl p-4 bg-white/5 border border-white/10 rounded-tl-none">
                    <div className="flex items-center gap-2 mb-2">
                      <Sprout className="h-4 w-4 text-green-400" />
                      <span className="text-xs text-muted-foreground">
                        {formatTime(new Date())}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-green-400" />
                      <span>Analyzing farm data...</span>
                    </div>
                    {activeDataSource && (
                      <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
                        <ArrowUp className="h-3 w-3 animate-bounce" />
                        Connecting to {activeDataSource}...
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </Card>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="relative">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about soil conditions, crop health, weather, pests, irrigation..."
          className="pr-12 backdrop-blur-lg bg-white/5 border-white/20"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          size="icon" 
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>

      {/* Quick Action Buttons */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="outline" size="sm" className="gap-2">
          <FileText className="h-4 w-4" />
          Generate Field Report
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <AlertCircle className="h-4 w-4" />
          View Crop Alerts
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Gauge className="h-4 w-4" />
          Soil Moisture Map
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Tractor className="h-4 w-4" />
          Equipment Status
        </Button>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-green-400 rounded-full"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Send(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}