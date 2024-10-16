import { TodoProvider } from "./context/TodoContext.tsx"
import { Board } from "./sections/Board/Board.tsx"


const App = (): JSX.Element => {

  return (
    <TodoProvider>
      <Board />
    </TodoProvider>
  )
}

export default App
