import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GeminiMind from './Geminimind';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthProvider';

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/forgotPassword' element={<ForgotPassword />} />
                    <Route path='/resetPassword/:token' element={<ResetPassword />} />

                    <Route element={<PrivateRoute />}>
                        <Route path='/geminimind' element={<GeminiMind />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
