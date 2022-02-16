import React from "react";
import "./App.scss";
import { Header } from "./components/Header/Header";
import { TodoPage } from "./pages/TodoPage/TodoPage";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="App__wrapper">
        <Header />
        <main className="main">
          <TodoPage />
        </main>
      </div>
    </div>
  );
};

export default App;
