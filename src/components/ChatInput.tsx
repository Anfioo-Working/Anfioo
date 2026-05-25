import { useState, useRef, FormEvent } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (input.trim() && !disabled) {
      onSendMessage(input.trim())
      setInput('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + 'px'
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 bg-white p-4">
      <div className="max-w-3xl mx-auto flex gap-2 items-end">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="输入你的问题... (Shift+Enter 换行)"
            disabled={disabled}
            rows={1}
            className={cn(
              "w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              "resize-none min-h-[48px] max-h-[150px]",
              "text-gray-900 placeholder-gray-400",
              "disabled:bg-gray-100 disabled:cursor-not-allowed",
              "transition-all duration-200"
            )}
            style={{ height: 'auto' }}
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={!input.trim() || disabled}
          size="lg"
          className={cn(
            "px-6",
            "bg-blue-600 hover:bg-blue-700",
            "disabled:bg-gray-300 disabled:cursor-not-allowed",
            "transition-colors duration-200"
          )}
        >
          {disabled ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </Button>
      </div>
      
      <div className="max-w-3xl mx-auto mt-2">
        <p className="text-xs text-gray-400 text-center">
          AI 助手可以会犯错，请核实重要信息。
        </p>
      </div>
    </form>
  )
}
