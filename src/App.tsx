import { ReactFlowProvider } from "@xyflow/react"
import FlowBuilder from "./components/FlowBuilder"

const App = () => {
  return (
    <ReactFlowProvider>
      <FlowBuilder />
    </ReactFlowProvider>

  )
}

export default App