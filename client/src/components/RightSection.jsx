import { useState, useRef, useEffect, useContext } from 'react';
import { ArrowUp, User, Sun, Moon,AlignJustify } from 'lucide-react';
import { GeminiApi} from '../API/GeminiApi';
import { DNA,Triangle } from 'react-loader-spinner';
import Bot from '../assets/Bot.svg';
import UserLogo from '../assets/UserLogo.svg';
import { ThemeContext } from '../context/ThemeProvider';
import { SidebarContext } from '../context/SidebarProvider';

export default function RightSection() {
    const [input, setInput] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [theme, setTheme] = useContext(ThemeContext);
    const [show,setShow] = useContext(SidebarContext);
    const msgEnd = useRef(null);

    const [messages, setMessages] = useState([
        {
            text: "Hi, I'm Gemini.",
            isBot: true,
        }
    ]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        if (msgEnd.current) {
            msgEnd.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleEnter = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            await generateAnswer();
        }
            
    };

    const setSidebar = () =>{
        setShow(!show);
    }
    async function generateAnswer() {
        if (input.trim() !== '') {
            setIsVisible(true);
            const res = await GeminiApi(input);
            setMessages([
                ...messages,
                {
                    text: input,
                    isBot: false
                },
                {
                    text: res,
                    isBot: true
                }
            ]);
            setIsVisible(false);
            setInput('');
        }
    }

    return (
        <div className='p-4 w-full rounded-sm  h-[100dvh]  lg:w-4/5 lg:h-full lg:p-2 flex flex-col justify-between items-center'>
            <div className={`h-10 w-full lg:p-1  flex justify-around shadow-lg items-center font-extrabold text-ellipsis ${theme === 'light' ? 'text-white' : 'text-slate-700'}`}>
                <span className='lg:hidden'>
                    <button onClick={setSidebar}>
                        <AlignJustify />
                    </button>
                </span>
                <span className={`h-6 w-6 lg:h-8 lg:w-8 flex justify-center items-center rounded-full border-2 ${theme === 'light' ? 'border-white' : 'border-slate-700'}`}>
                    <User />
                </span>
                <span>GEMINI_MIND</span>
                <span>
                    <button onClick={toggleTheme}>
                        {theme === 'light' ? <Sun /> : <Moon />}
                    </button>
                </span>
            </div>

            <div className="flex flex-col w-full  rounded-lg p-4 space-y-4 h-[60vh] overflow-auto no-scrollbar">
                {messages.map((message, i) => (
                    <div key={i} className={`flex space-y-0.5 items-start gap-1 ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                        <span className='h-8 w-8 flex justify-center items-center bg-white rounded-full'>
                            <img src={message.isBot ? Bot : UserLogo} alt="Avatar" />
                        </span>
                        <span
                            className={`p-2 rounded-lg leading-6 max-w-[60vw]  ${
                                theme!=='light' ?(message.isBot ? 'bg-[#E0F4FF] text-black' : 'bg-[#000066] text-white'):(message.isBot ? 'text-black bg-[#fffffF]' : 'text-black bg-[#d9fdd3]')
                            }`}
                        >
                            {message.text}
                        </span>
                    </div>
                ))}
                <div ref={msgEnd} />
            </div>

            <div className='w-full flex justify-center items-center h-8 lg:h-10 '>
                {theme==='light' ?
                
                (isVisible && (
                    <DNA visible={true} height="60" width="60" lg:height="80" lg:width="80" ariaLabel="dna-loading" wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                    />
                )):
                (isVisible && (
                    <Triangle visible={true} height="60" width="60" lg:height="80" lg:width="80" color="black" ariaLabel="triangle-loading" wrapperStyle={{}}
                    wrapperClass=""
                    />
                ))
                
                }
            </div>
            
            <div className='p-4 flex w-full lg:w-2/4 justify-around items-center bg-cyan-50 h-10 rounded-lg lg:p-2 '>
                <textarea
                    type='text'
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    className="resize-none font-semibold bg-cyan-50 outline-none leading-6 px-4 w-full overflow-hidden"
                    rows={1}
                    onKeyDown={handleEnter}
                    placeholder='Text your message here'
                />
                <button
                    onClick={generateAnswer}
                    className={`w-6 flex justify-center items-center h-6 rounded-full border ${
                        input !== '' ? 'bg-black border-black' : 'bg-gray-400 border-gray-400'
                    }`}
                >
                    <ArrowUp color="white" size={24} />
                </button>
            </div>
        </div>
    );
}
