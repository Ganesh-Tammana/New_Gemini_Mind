import {useFormik} from 'formik';
import axios from '../axiosConfig.js'
import * as Yup from 'yup';
import {useNavigate,Link} from 'react-router-dom';

export default function Register() {
    const navigate=useNavigate();

    const validationSchema= Yup.object({
        username: Yup.string().max(15,'Must be 15 character or less').required('Required'),
        email : Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
    })
    const formik=useFormik({
        initialValues:{
            username : '',
            email : '',
            password : ''
        },
        validationSchema,
        onSubmit :async values=>{
            await axios.post('https://gemini-mind-api.onrender.com',values)
            .then(res=>{
                    if(res.data.status) {
                        alert(res.data.message)
                        navigate('/login')
                    }
                }
            )
            .catch(err=>{
                console.log(err)
            })
        }
    })
  return (
    <div className=' h-[100dvh] flex justify-center items-center bg-gray-100'>
        <form onSubmit={formik.handleSubmit} className='bg-white p-6 md:w-1/2 lg:w-1/3 mx auto rounded shadow-md'>
            <h2  className='text-2xl mb-4'>Join GeminiMind Today </h2>
            <div className='mb-4'>
                <label htmlFor='username' className='block text-sm font-medium text-gray-700'>Username :</label>
                <input 
                    id='username'
                    name='username'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type='text'
                    value={formik.values.name}
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                />
                {formik.touched.username && formik.errors.username ?
                    (<div className='text-red-500 text-sm font-medium mt-1'>{formik.errors.username}</div>):
                    null
                }
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email :</label>
                <input 
                    id='email'
                    name='email'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type='email'
                    value={formik.values.email}
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                />
                {formik.touched.email && formik.errors.email ?
                    (<div className='text-red-500 text-sm mt-1 font-medium'>{formik.errors.email}</div>):
                    null
                }

                <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password :</label>
                <input 
                    id='password'
                    name='password'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type='password'
                    value={formik.values.password}
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                />
                {formik.touched.password && formik.errors.password ?
                    (<div className='text-red-500 text-sm mt-1 font-medium'>{formik.errors.password}</div>):
                    null
                }
            </div>
            <button 
                type='submit'
                className='w-full bg-blue-500 text-white py-2 px-4 rounded-md'>
                Sign Up
            </button>
            <p className='mt-5 font-medium'>Have an Account ? <Link to='/login' className='underline font-bold'>Login</Link></p>
        </form>
    </div>
  )
}
