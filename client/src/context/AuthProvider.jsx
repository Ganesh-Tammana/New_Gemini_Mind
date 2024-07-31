import {createContext,useEffect,useState } from "react";
import axios from '../axiosConfig';

const AuthContext = createContext();

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [email,setEmail]=useState(null);
    const [loading,setLoading]=useState(true);
    
    useEffect(()=>{
        const fetchData = async () =>{

            await axios.get('https://gemini-mind-api.onrender.com/auth/login',{withCredentials:true})
            .then(res=>{
                const info = res.data.message;
                if(res.data.status){
                    setUser(info.username);
                    setEmail(info.email);
                }
            })
            .catch(err =>{
                console.log(err)
            })
        }
        fetchData();
    },[]);

    const login=async (email,password) =>{
        const res = await axios.post('https://gemini-mind-api.onrender.com',{email,password},{withCredentials:true})
        const info = res.data.message;
        if(res.data.status){
            setUser(info.username);
            setEmail(info.email);
        }
    }

    const logout = async () =>{
        await axios.get('https://gemini-mind-api.onrender.com',{withCredentials:true});
        setUser(null)
        setEmail(null)
    }

    return (
        <AuthContext.Provider value={{user,login,logout,loading,email}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
