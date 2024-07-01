import InitialHeaderSignUp from "./InitialHeaderSignUp"
import SignUpForm from "./SignUpForm"


function App() {

    return (
      <div>
        <InitialHeaderSignUp />

        <div className="h-screen flex items-center justify-center mt-[6rem]"><SignUpForm /></div>
        
          
      </div>
    )
  }
  
  export default App