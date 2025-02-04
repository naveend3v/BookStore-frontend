import '../../components/Home.css'
import { Routes, Route, Navigate } from "react-router-dom"
import AuthProvider, { useAuth } from './api/AuthContext'
import Login from './Login'
import Header from './Header'
import Footer from './Footer'
import Dashboard from './Dashboard'
import AddBook from './AddBook'

function AuthenticationRoute({ children }) {

    const authContext = useAuth()
    if (authContext.isAuthenticated)
        return children
    return <Navigate to="/admin/login" />
}

export default function AdminPage() {
    return (
        <div className="AdminPage">
            <AuthProvider>
                <Routes>
                    <Route path='login' element={<Login />} />
                    <Route path='books' element={
                        <AuthenticationRoute>
                            <Header />
                            <Dashboard />
                            <Footer />
                        </AuthenticationRoute>
                    }></Route>
                    <Route path='add-book' element={
                        <AuthenticationRoute>
                            <AddBook />
                        </AuthenticationRoute>
                    } />
                </Routes>
            </AuthProvider>
        </div>
    )
}