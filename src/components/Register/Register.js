import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from '@firebase/auth';
import Button from '@restart/ui/esm/Button';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import './Register.css';

const Register = () => {
    
    const auth = getAuth();
    //States
    const [name,setName] = useState('');
    const [email,setEmail] =useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const [isLogin,setLogin] = useState(false);
    //Email
    const handleEmail = (e) =>{
        setEmail(e.target.value);
    }
    //Password
    const handlePassword = (e) =>{
        setPassword(e.target.value);
    }
    //handle Login
    const handleIsLogin = (e) => {
        setLogin(e.target.checked);
    }
    //user verification
    const verifyEmail = () =>{
        sendEmailVerification(auth.currentUser)
        .then(result=> {
            console.log(result);
        })
    }
    //handle register
    const handleRegister = (e) => {
        e.preventDefault();
        if(password.length < 6){
            setError('Password must be 6 character long')
            return;
        }
        isLogin ? userLogin(email,password) : createNewUser(email,password) ;
       
        
    }
    //const userLogin
    const userLogin = (email,password) => {
        signInWithEmailAndPassword(auth,email,password)
        .then(result => {
            console.log(result.user);
            setError('');
        })
        .catch((error) => {
            setError(error.message)
        })
        

    }
    //create new user
    const createNewUser = (email,password) => {
        createUserWithEmailAndPassword(auth,email,password)
        .then(result => {
            const userLogged = result.user;
            console.log(userLogged);
            setError('Succesfully create your account');
            setUserName();
            verifyEmail();
        })
        .catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage);
        });
    }
    //Reset password
    const handleResetPass = () =>{
        sendPasswordResetEmail(auth,email)
        .then((res) => {
            console.log(res);
        })
        alert('Check Your Email for reset the password');
    }
    //user name
    const setUserName = () => {
        updateProfile(auth.currentUser,{
            displayName : name
        })
        .then(res=> console.log(res))
    }
    //handle Name
    const handleName = (e) =>{
        setName(e.target.value);
    }

    return (
        <div>
        <Form>
            <h1>{isLogin ? 'Login' : 'Register'}</h1>
            {!isLogin && <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Your Name</Form.Label>
            <Form.Control onBlur={handleName} type="text" placeholder="Enter your name" required/>
            </Form.Group> }
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onBlur={handleEmail} type="email" placeholder="Enter email" required/>
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label> 
                <Form.Control onBlur={handlePassword} type="password" placeholder="Password" required />
            </Form.Group>
            <Form.Group onChange={handleIsLogin} className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Already Registered?" />
             </Form.Group>
            <h4 className="text-danger">{error}</h4>
            <Button onClick={handleRegister} variant="primary" type="submit">
            {isLogin ? 'Login' : 'Register'}
            </Button>
            <Button onClick={handleResetPass}>Reset Password</Button>
        </Form>
        </div>
    );
};

export default Register;