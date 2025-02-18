import './Home.css'
import { BrowserRouter,Routes, Route } from "react-router-dom"
import AdminPage from './admin/AdminPage'
import UserPage from './user/UserPage'

export default function Home() {
    return (
        <div className="Home">
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<UserPage />
                    }></Route>
                    <Route path="/admin/*" element={<AdminPage />
                    }></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}