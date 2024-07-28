import React from 'react';
import {useFormik} from 'formik';
import axios from 'axios'
import * as Yup from 'yup';
import {useNavigate,Link,useParams} from 'react-router-dom';

export default function Register() {
    const navigate=useNavigate();
    const {token} = useParams();
    axios.defaults.withCredentials = true;

    const validationSchema= Yup.object({
        password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
    })
    const formik=useFormik({
        initialValues:{
            password : ''
        },
        validationSchema,
        onSubmit :async values=>{
            await axios.post('https://gemini-mind-api.onrender.com'+token,values)
            .then(res=>{
              if(res.data.status)
                {
                  navigate('/login')
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
    })
  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-100'>
        <form onSubmit={formik.handleSubmit} className='bg-white p-6 md:w-1/2 lg:w-1/3 mx auto rounded shadow-md'>
            <h2  className='text-2xl mb-4'>Reset Password</h2>
            <div className='mb-4'>
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
                className='w-full bg-blue-500 text-white py-2 px-4 rounded-md  font-medium'>
                Reset
            </button>
        </form>
    </div>
  )
}
