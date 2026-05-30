import { Route, Routes } from 'react-router-dom'

import Register from '@/Pages/register.jsx'
import Login from '@/Pages/Login.jsx'
import Home from '@/Pages/Student/Home'

const AppRouter = () => {
    return (
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path='/home' element={<Home/>}/>
            </Routes>
        
    )
}
export default AppRouter