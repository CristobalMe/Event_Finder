import SignUpForm from "./SignUpForm";

function App() {
  return (
    <div>
      <HeaderSignUp />

      <div className="h-screen flex items-center justify-center mt-[6rem]">
        <SignUpForm />
      </div>
    </div>
  );
}

export default App;
