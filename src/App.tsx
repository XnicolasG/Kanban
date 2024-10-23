import { TodoProvider } from "./context/TodoContext.tsx"
import { Board } from "./sections/Board/Board.tsx"
import { Header } from "./sections/Header/Header.tsx"


const App = (): JSX.Element => {

  return (
    <TodoProvider>
      <Header />
      <Board />
    </TodoProvider>
  )
}

export default App
