import { useState } from 'react'
import { Copy, Check, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Message } from '@/types/chat'

interface ChatMessageProps {
  message: Message
  onDelete?: (id: string) => void
}

export function ChatMessage({ message, onDelete }: ChatMessageProps) {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === 'user'

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn(
      "flex w-full gap-3 p-4",
      isUser ? "bg-white" : "bg-gray-50"
    )}>
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold",
        isUser ? "bg-blue-600 text-white" : "bg-green-600 text-white"
      )}>
        {isUser ? 'U' : 'AI'}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-gray-700">
            {isUser ? '你' : 'AI 助手'}
          </span>
          <span className="text-xs text-gray-400">
            {new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
            {message.content}
          </p>
        </div>
        
        {!isUser && (
          <div className="flex items-center gap-1 mt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCopy}
              className="h-8 px-2 text-gray-500 hover:text-gray-700"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-1" />
                  已复制
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1" />
                  复制
                </>
              )}
            </Button>
            
            {onDelete && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onDelete(message.id)}
                className="h-8 px-2 text-gray-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                删除
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
