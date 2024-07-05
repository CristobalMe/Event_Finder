import InitialHeader from "./InitialHeader";
import SignInForm from "./SignInForm";

function App() {
  return (
    <div>
      <InitialHeader />

      <div className="h-screen flex items-center justify-center">
        <SignInForm />
      </div>
    </div>
  );
}

export default App;
