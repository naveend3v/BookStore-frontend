import '../../components/Home.css'
import { Routes, Route, Navigate } from "react-router-dom"
import Header from './Header'
import Footer from './Footer'
import Welcome from './Welcome'
import Login from './Login'
import SignUp from './SignUp'
import Dashboard from './Dashboard'
import AuthProvider, { useAuth } from './api/AuthContext'
import ViewBook from './ViewBook'
import ViewCart from './ViewCart'

function AuthenticationRoute({ children }) {

  const authContext = useAuth()
  if (authContext.isAuthenticated)
    return children
  return <Navigate to="/login" />
}

export default function UserPage() {
  return (
    <div className="UserPage">
      <AuthProvider>
        <Routes>
          <Route path='/' element={
            <>
              <Header />
              <Welcome />
              <Footer />
            </>
          }>
          </Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/books' element={
            <AuthenticationRoute>
              <Header />
              <Dashboard />
              <Footer />
            </AuthenticationRoute>
          }></Route>
          <Route path='/books/:id' element={
            <AuthenticationRoute>
              <Header />
              <ViewBook />
              <Footer />
            </AuthenticationRoute>
          }></Route>
          <Route path='/cart' element={
            <AuthenticationRoute>
              <Header />
              <ViewCart/>
              <Footer />
            </AuthenticationRoute>
          }></Route>
        </Routes>
      </AuthProvider>
    </div>
  )
}