import AuthContext from '../context/AuthProvider';
import { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState(null);

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
    });

    useEffect(() => {
        if (user) navigate('/geminimind', { replace: true });
    }, [user, navigate]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: async values => {
            try {
                await login(values.email, values.password);
                navigate('/geminimind', { replace: true });
            } catch (err) {
                console.error(err);
                setLoginError('Login failed. Please check your credentials and try again.');
            }
        }
    });

    return (
        <div className='h-[100dvh] flex justify-center items-center bg-gray-100'>
            <form onSubmit={formik.handleSubmit} className='bg-white p-6 md:w-1/2 lg:w-1/3 mx auto rounded shadow-md'>
                <h2 className='text-2xl mb-4 text-center'>Back to GeminiMind 🤖</h2>
                {loginError && <div className='text-red-500 text-sm mb-2'>{loginError}</div>}
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
                    {formik.touched.email && formik.errors.email ? (
                        <div className='text-red-500 text-sm mt-1 font-medium'>{formik.errors.email}</div>
                    ) : null}

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
                    {formik.touched.password && formik.errors.password ? (
                        <div className='text-red-500 text-sm mt-1 font-medium'>{formik.errors.password}</div>
                    ) : null}
                </div>
                <button 
                    type='submit'
                    className='w-full bg-blue-500 text-white py-2 px-4 rounded-md font-medium'>
                    Sign in to GEMINIMIND
                </button>
                <Link to='/forgotPassword' className='font-medium text-black mt-6'>Forgot password?</Link>
                <p className='font-medium'>New to GeminiMind? <Link to='/' className='underline'>Sign up now.</Link></p>
            </form>
        </div>
    );
}
