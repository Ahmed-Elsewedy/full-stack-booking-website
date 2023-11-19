import { useState, useContext } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { saveToken } from './authentication'
import axios from "axios";
import { UserContext } from '../UserContext';

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext)

    if (user) {
        return <Navigate to={'/'} />
    }

    async function handleLoginSubmit(ev) {
        ev.preventDefault()

        try {
            const res = await axios.post('user/login', {
                email,
                password
            })
            const token = res.data.data.token
            const user = res.data.data.user
            saveToken(token)
            setUser(user)
            navigate('/')
        } catch (err) {
            alert('Login failed, check your data')
        }
    }

    return (

        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <h1 className='text-4xl text-center mb-4'>Login</h1>
                <form className='max-w-md mx-auto' onSubmit={handleLoginSubmit}>
                    <input type='email' placeholder='your@email.com'
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                    />
                    <input type='password' placeholder='password'
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                    />
                    <button className='primary'>Login</button>
                </form>
                <div className='text-center py-2 text-gray-500'>Don't have an account yet? <Link className='underline text-black' to={'/register'}> Register now</Link></div>
            </div>
        </div>
    )
}