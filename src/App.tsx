import React from "react";
import "./App.scss";
import { Header } from "./components/Header/Header";
import { TodoPage } from "./pages/TodoPage/TodoPage";




const App: React.FC = () => {
  

  return (
    <div className="App">
      <Header />
      <main>
        <TodoPage />
      </main>
    </div>
  );
};

export default App;
