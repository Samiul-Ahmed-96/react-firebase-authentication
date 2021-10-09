import { createUserWithEmailAndPassword, getAuth } from '@firebase/auth';
import Button from '@restart/ui/esm/Button';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import './Register.css';

const Register = () => {
    
    const auth = getAuth();

    const [email,setEmail] =useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const handleEmail = (e) =>{
        setEmail(e.target.value);
    }
    const handlePassword = (e) =>{
        setPassword(e.target.value);
    }
    console.log(email,password);
    const handleRegister = (e) => {
        e.preventDefault();
        if(password.length < 6){
            setError('Password must be 6 character long')
            return;
        }
        createUserWithEmailAndPassword(auth,email,password)
        .then(result => {
            const userLogged = result.user;
        })
        .catch((error) => {
            const errorMessage = error.message;
        });
    }

    return (
        <div>
        <Form>
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
            <h4 className="text-danger">{error}</h4>
            <Button onClick={handleRegister} variant="primary" type="submit">
                Submit
            </Button>
            </Form>
        </div>
    );
};

export default Register;