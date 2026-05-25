import { Button } from '@/components/ui/button'

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-gray-900">Hello Anfioo!</h1>
        <p className="text-xl text-gray-600">使用 Vite + React + TypeScript + ShadCN UI 创建的简单项目</p>
        <div className="flex gap-4 justify-center">
          <Button size="lg">点击我</Button>
          <Button variant="outline" size="lg">了解更多</Button>
        </div>
      </div>
    </div>
  )
}

export default App
