import { createContext, useState } from "react";
import axios from 'axios';


export const AuthContext= createContext();

export const AuthProvider= ({children})=>{

const [user,setUser]= useState(null);
const [token,setToken]= useState(localStorage.getItem('token') || '');



const handleLogin = async (username, password)=>{
try{
    const response= await axios.post('https://dummyjson.com/auth/login',{
        username,
        password,
    });
    setUser(response.data);
    setToken(response.data.token);
    localStorage.setItem('token', response.data.token);
}
catch (error) {
    console.error('Login failed', error);}
};


const handleRegister= async(userData)=>{
    try{
        const response= await axios.post('https://dummyjson.com/auth/register',userData);
        setUser(response.data);
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
    }
    catch (error) {
        console.error('Registration failed', error);
      }
};

const handleLogout = ()=>{
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
   
};



return (
    <AuthContext.Provider value={{ user, token, handleLogin, handleRegister, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );

};