import './App.css'
import HomePage from "./components/homePage/HomePage.jsx"

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {


  return (

      
    <Router>

      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      
    </Router>

  )
}

export default App