import { TodoProvider } from "./context/TodoContext.tsx"
import { Board } from "./sections/Board/Board.tsx"
import { Header } from "./sections/Header/Header.tsx"


const App = (): JSX.Element => {

  return (
    <TodoProvider>
      <main className="bg-slate-100 h-screen font-talisman">
      <Header />
      <Board />
      </main>
    </TodoProvider>
  )
}

export default App
