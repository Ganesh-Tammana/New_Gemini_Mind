import  { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
const PrivateRoute = () => {
    const { email, loading } = useContext(AuthContext);


    return email ? <Outlet /> : <Navigate to="/login"/>;
};

export default PrivateRoute;
