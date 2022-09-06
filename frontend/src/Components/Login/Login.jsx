import React from 'react';
import './Login.css'
import { Typography,Button } from '@mui/material';
import { Link } from 'react-router-dom';
const Login = () => {
    return ( 
        <div className='login'>
            <form className='loginForm'>
                <Typography variant='h3' style={{padding:'2vmax'}} >Social App</Typography>
                <input type='email' placeholder='enter your email' />
                <input type='password' placeholder='enter your passowrd' />
                <Link to='/forgot/password'>
                    <Typography>Forgot Password</Typography>
                </Link>
                <Link to='/register'>
                    <Typography>New User</Typography>
                </Link>
                <Button>Login</Button>
            </form>
        </div>
     );
}
 
export default Login;