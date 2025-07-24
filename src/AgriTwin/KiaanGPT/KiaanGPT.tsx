"use client"

import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  Loader2, 
  Bot, 
  User, 
  Sparkles, 
  MessageSquare, 
  RefreshCcw,
  Download,
  Copy,
  Workflow
} from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { POST } from "@/utils/ApiHandler"
import { cn } from "@/lib/utils"

interface Message {
  text: string
  isUser: boolean
  timestamp?: Date
}

const ChatMessage: React.FC<Message> = ({ text, isUser, timestamp }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
  >
    <div className={`flex items-start space-x-2 ${isUser ? 'flex-row-reverse' : 'flex-row'} group`}>
      <Avatar className={cn(
        "transition-all duration-300 hover:scale-110",
        isUser ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
      )}>
        <AvatarFallback>{isUser ? 'U' : 'K'}</AvatarFallback>
        <AvatarImage src={isUser ? '/user-avatar.png' : '/kiaan-avatar.png'} />
      </Avatar>
      <div className={cn(
        "max-w-[80%] p-4 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300",
        isUser 
          ? 'bg-green-100/90 dark:bg-green-900/90 text-green-900 dark:text-green-100 hover:bg-green-200/90 dark:hover:bg-green-800/90' 
          : 'bg-blue-100/90 dark:bg-blue-900/90 text-blue-900 dark:text-blue-100 hover:bg-blue-200/90 dark:hover:bg-blue-800/90'
      )}>
        <p className="text-sm leading-relaxed">{text}</p>
        {timestamp && (
          <p className="text-xs mt-2 opacity-60">
            {timestamp.toLocaleTimeString()}
          </p>
        )}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2 flex gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </motion.div>
)

const KiaanGPT: React.FC = () => {
  const { token } = useSelector((state: any) => state.login)
  const [input, setInput] = useState('')
  const [conversation, setConversation] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [conversation])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { 
      text: input, 
      isUser: true,
      timestamp: new Date()
    }
    setConversation(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setMessageCount(prev => prev + 1)

    try {
      const body = { prompt: input }
      const response = await POST(`${import.meta.env.VITE_API_URL}/api/v1/kiaanagrowgpt`, body, token)
      const data = response.data.gptResponse
      const gptMessage: Message = { 
        text: data, 
        isUser: false,
        timestamp: new Date()
      }
      setConversation(prev => [...prev, gptMessage])
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: "Sorry, there was an error processing your request.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const clearConversation = () => {
    setConversation([])
    setMessageCount(0)
    toast({
      title: "Conversation Cleared",
      description: "The chat history has been cleared.",
    })
  }

  const downloadConversation = () => {
    const conversationText = conversation
      .map(msg => `${msg.isUser ? 'User' : 'KiaanGPT'}: ${msg.text}`)
      .join('\n\n')
    
    const blob = new Blob([conversationText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'kiaan-gpt-conversation.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Card className="w-full max-w-[92vw]  backdrop-blur-xl bg-white/30 dark:bg-gray-800/30 border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300">
        <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-4 sm:p-6 rounded-t-2xl ">
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                <Sparkles className="text-green-600 dark:text-blue-400" />
                KiaanGPT
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-blue-200">
                Your intelligent agricultural assistant
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
                Messages: {messageCount}
              </Badge>
              <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
                AI-Powered
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <ScrollArea className="h-[60vh] sm:h-[70vh] p-4" ref={scrollAreaRef}>
            <AnimatePresence>
              {conversation.map((msg, index) => (
                <ChatMessage key={index} {...msg} />
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-blue-100/90 dark:bg-blue-900/90 p-4 rounded-xl">
                    <Loader2 className="h-5 w-5 animate-spin text-blue-600 dark:text-blue-400" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollArea>
        </CardContent>

        <CardFooter className="border-t border-gray-200 dark:border-gray-700 p-4 flex flex-col sm:flex-row gap-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
            <Input
              type="text"
              placeholder="Ask me anything about agriculture..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-green-100 dark:border-blue-900"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600 text-white dark:bg-green-700 dark:hover:bg-green-800 transition-all duration-300"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </form>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={clearConversation}
              className="bg-white/50 dark:bg-gray-700/50"
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
            <Button
              variant="outline"
              onClick={downloadConversation}
              className="bg-white/50 dark:bg-gray-700/50"
            >
              <Download className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </CardFooter>

        <div className="p-4 flex justify-end items-center space-x-2 text-sm text-green-700 dark:text-blue-200">
          <Workflow className="text-green-600 dark:text-blue-400" />
          <span>AI Model v2.5</span>
        </div>
      </Card>
      </div>
  )
}

export default KiaanGPT