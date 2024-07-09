import LoginForm from "./LoginForm";
import Header from "../header/Header";

function App() {
  return (
    <div>
      <Header />

      <div className="h-screen flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
}

export default App;
