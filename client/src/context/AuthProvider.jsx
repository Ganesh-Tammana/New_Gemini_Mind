import {createContext,useEffect,useState } from "react";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [email,setEmail]=useState(null);
    const [loading,setLoading]=useState(true);
    
    useEffect(()=>{
        const fetchData = async () =>{

            try {
                const res = await axios.get('/auth/verify', { withCredentials: true });
                const info = res.data.message;
                if (res.data.status) {
                    setUser(info.username);
                    setEmail(info.email);
                }
            } catch (err) {
                console.error('Verification error:', err);
            }
        }
    
        fetchData();
    },[]);

    const login=async (email,password) =>{
        const res = await axios.post('http://localhost:8080/auth/login',{email,password},{withCredentials:true})
        const info = res.data.message;
        if(res.data.status){
            setUser(info.username);
            setEmail(info.email);
        }
    }

    const logout = async () =>{
        await axios.get('http://localhost:8080/auth/logout',{withCredentials:true});
        setUser(null)
        setEmail(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, email }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
