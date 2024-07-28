import { Pencil,Computer,DoorOpen,User,X } from "lucide-react";
import { ThemeContext } from '../context/ThemeProvider';
import { useContext } from "react";
import { SidebarContext } from "../context/SidebarProvider";
import  AuthContext   from "../context/AuthProvider";


export default function LeftSection() {
  const [theme] = useContext(ThemeContext);
  const [show,isShow ] = useContext(SidebarContext);
  const { email, logout } = useContext(AuthContext)

  const handleLogout = async () =>{
    await logout();
  }
  const close=()=>{
    isShow(!show)
  }
  const handleNew = ()=>{
    window.location.reload();
  }
  return (
    <div   className={`fixed lg:relative inset-y-0 left-0  ${show  ? 'translate-x-0  bg-[#FFFED3] text-[#330000]' : '-translate-x-full '} lg:translate-x-0 lg:w-1/5 lg:border-r-2 ${theme === 'light' ? ' lg:border-r-emerald-50 ' : 'lg:border-r-slate-800'} flex flex-col items-center justify-between p-8 transition-transform duration-300 ease-in-out z-50`}>
      <button onClick={close} className={`${show ? 'fixed top-3 right-3 block':'hidden'}`}>
        <X />
      </button>
      <div className="flex justify-center items-center">
        <button onClick={handleNew} className={`flex justify-center items-center p-2 w-48 space-x-2  rounded-md text-white font-bold ${theme==='light' ? 'bg-sky-400' : 'bg-[#000080]'}`}><p>New Chat </p><Pencil/> </button>
      </div>
      <div className={`flex justify-center items-center flex-col ${theme==='light' ? 'lg:text-white' : 'lg:text-slate-800'}`} >
        <span className="font-semibold flex gap-2 p-2">ABOUT ME <Computer/></span>
        <p className="leading-6">
          An AI assistant ,
          Gemini AI is a multi-modal artificial intelligence (AI) model developed by Google.A creative language model, I roam the realms of text, Guiding users through linguistic quests, both complex and next.
          Gemini AI produces highly accurate and coherent responses, even for complex queries.
        </p>
      </div>
      <div className="flex flex-col">
        <span className={`font-semibold  ${theme==='light' ? 'lg:bg-slate-800 lg:text-white' : 'lg:bg-zinc-100 lg:text-slate-800'} flex `}>
          <User/><p className="font-semibold flex lg:gap-2">{email}</p>
        </span><br/>
        <button onClick={handleLogout} className="flex justify-center items-center  text-xl font-normal p-1 rounded-md  w-48  bg-red-600 text-white">
          <DoorOpen color="white" size={35}/>Leave 
        </button>
      </div>
    </div>
  )
}

