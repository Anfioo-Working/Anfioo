import { useState, useEffect, useRef } from 'react'
import { Trash2, Sparkles } from 'lucide-react'
import { ChatMessage } from '@/components/ChatMessage'
import { ChatInput } from '@/components/ChatInput'
import { Button } from '@/components/ui/button'
import type { Message } from '@/types/chat'

const TYPING_SPEED = 30

const AI_RESPONSES = [
  "你好！我是 AI 助手。很高兴为你服务！有什么我可以帮助你的吗？",
  "这是一个很棒的问题！让我来为你详细解答...",
  "我理解你的需求。让我给你一些建议...",
  "根据我的分析，这个问题可以从多个角度来看待...",
  "很好！你提出了一个很有深度的问题...",
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, displayedText])

  const simulateAITyping = (fullText: string) => {
    setIsTyping(true)
    setDisplayedText('')
    
    let currentIndex = 0
    
    const typeInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typeInterval)
        setIsTyping(false)
        setDisplayedText('')
      }
    }, TYPING_SPEED)

    return () => clearInterval(typeInterval)
  }

  const handleSendMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
    }
    
    setMessages(prev => [...prev, userMessage])
    
    const aiResponse = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)]
    
    setTimeout(() => {
      const aiMessageId = (Date.now() + 1).toString()
      const aiMessage: Message = {
        id: aiMessageId,
        role: 'assistant',
        content: aiResponse,
      }
      
      setMessages(prev => [...prev, aiMessage])
      simulateAITyping(aiResponse)
    }, 500)
  }

  const handleDeleteMessage = (id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id))
  }

  const handleClearChat = () => {
    if (messages.length > 0) {
      setMessages([])
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">AI 对话助手</h1>
              <p className="text-sm text-gray-500">基于 GPT 的智能对话</p>
            </div>
          </div>
          
          {messages.length > 0 && (
            <Button 
              onClick={handleClearChat}
              variant="outline"
              size="sm"
              className="text-gray-600 hover:text-red-600 hover:border-red-300"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              清空对话
            </Button>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              有什么我可以帮助你的？
            </h2>
            <p className="text-gray-500 text-center max-w-md">
              开始一段对话，我可以帮你回答问题、写代码、分析数据等
            </p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            {messages.map((message) => (
              <ChatMessage 
                key={message.id} 
                message={message}
                onDelete={handleDeleteMessage}
              />
            ))}
            
            {isTyping && displayedText && (
              <div className="bg-gray-50">
                <ChatMessage 
                  message={{
                    id: 'typing',
                    role: 'assistant',
                    content: displayedText
                  }} 
                />
              </div>
            )}
            
            {isTyping && !displayedText && (
              <div className="bg-gray-50 p-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-sm font-semibold text-white">
                    AI
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-gray-700">AI 助手</span>
                      <span className="text-xs text-gray-400">正在输入...</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  )
}
