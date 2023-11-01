import NavBar from "./components/navbar"
import Register from "./pages/register"
import { BrowserRouter as Router , Routes, Route } from "react-router-dom"
import Login from "./pages/login"
export default function App() {
  return (
    <>

    <Router>
    <NavBar/>

      <Routes>
        <Route exact path = "/register" element = {<Register/>}> </Route>
        <Route exact path = "/login" element = {<Login/>}> </Route>
      </Routes>
    </Router>
   

    </>

  )
}