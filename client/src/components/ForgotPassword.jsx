import {useFormik} from 'formik';
import axios from 'axios'
import * as Yup from 'yup';
import {useNavigate} from 'react-router-dom';

export default function ForgotPassword() {
    const navigate=useNavigate();
    axios.defaults.withCredentials = true;
    const validationSchema= Yup.object({
        email : Yup.string().email('Invalid email address').required('Required'),
    })
    const formik=useFormik({
        initialValues:{
            email : '',
        },
        validationSchema,
        onSubmit :async values=>{
            await axios.post('http://localhost:8080/auth/forgot-password',values)
            .then(res=>{
                    alert(res.data.message)
                    if(!res.data.status) window.location.reload()
                    else{
                        alert('check your email for reset password link')
                        navigate('/login');
                    }
                         
                }
            )
            .catch(err=>{
                console.log(err)
            })
        }
    })
  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-100'>
        <form onSubmit={formik.handleSubmit} className='bg-white p-6 md:w-1/2 lg:w-1/3 mx auto rounded shadow-md'>
            <h2  className='text-2xl mb-4'>Forgot Password</h2>
            <div className='mb-4'>
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
            </div>
            <button 
                type='submit'
                className='w-full bg-blue-500 text-white py-2 px-4 rounded-md  font-medium'>
               Forgot Password
            </button>
        </form>
    </div>
  )
}
