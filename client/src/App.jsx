import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GeminiMind from './Geminimind';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import PrivateRoute from './components/PrivateRoute';
import AuthContext, { AuthProvider} from './context/AuthProvider';
import { useContext } from 'react';


export default function App() {
    const user = useContext(AuthContext);
    
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element = {<Register/>}/>
                    <Route path='/login' element = {<Login/>} />
                    <Route path='/forgotPassword' element = {<ForgotPassword />} />
                    <Route path='/resetPassword/:token'  element = {<ResetPassword/>} />
                    <Route element={<PrivateRoute/>}>
                        <Route path='/geminimind' element={<GeminiMind />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
