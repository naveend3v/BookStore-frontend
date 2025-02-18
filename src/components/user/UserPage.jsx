import '../../components/Home.css'
import { Routes, Route } from "react-router-dom"
import Header from './Header'
import Footer from './Footer'
import Welcome from './Welcome'
import Login from './Login'
import SignUp from './SignUp'

export default function UserPage() {
  return (
    <div className="UserPage">
      <Routes>
        <Route path='/' element={
          <>
            <Header />
            <Welcome />
            <Footer />
          </>
        }>
        </Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
      </Routes>
    </div>
  )
}