import Header from "../header/Header";
import SignUpForm from "./SignUpForm";

function App() {
  return (
    <div>
      <Header />

      <div className="h-screen flex items-center justify-center mt-[6rem]">
        <SignUpForm />
      </div>
    </div>
  );
}

export default App;
