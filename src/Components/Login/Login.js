import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState({     // Empty object 
        password: '',
        email: ''
    })
    const [errorMsg, setErrorMsg] = useState("");// Error message handling
    const [isSubmitting, setIsSubmitting] = useState(false);  // submit mange state
    const [submitButtonDisable, setSubmitButtonDisable] = useState(false);  // submit button click and disable state


    const InputEvent = (event) => {
        let name = event.target.name;     // input filed name and value target
        let values = event.target.value;

        setValue({ ...value, [name]: values }); // store the value in state
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg(validate(value));    // set error msg in state
        setIsSubmitting(true);
    }

    const validate = (values) => {
        let error = {};                //error msg store    

        if (!values.email) {
            error.email = "Plz Enter the Email";
        }
        if (!values.password) {
            error.password = "Plz Enter the Password";
        }
        return error;
    }

    const onSubmit = () => {
        setSubmitButtonDisable(true);
        let { password, email } = value;
        signInWithEmailAndPassword(auth, email, password).then((res) => {   // create user login functionality 
            console.log(res.user.uid, 'UserData');
            setSubmitButtonDisable(false);
            navigate("/");                 // set path is redirect
        })
            .catch((err) => {              //error handle
                console.log(err.message);
                toast.error(err.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "colored",
                });
                setSubmitButtonDisable(false)
            })
    }

    useEffect(() => {
        if (Object.keys(errorMsg).length === 0 && isSubmitting) {    //conditional is true onsubmit function is call
            onSubmit();
        }
    }, [errorMsg]);

    return (
        <>
            <div className='main-div'>
                <h1 className='heading'>Login  </h1>

                <form className='form' onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input type="email"
                        name='email'
                        value={value.email}
                        onChange={InputEvent}
                        autoComplete="off"
                        placeholder="Enter the email id"
                        className={errorMsg.email && "input-error border-danger "}
                    />
                    <div className='errorshow' >{errorMsg.email && (<span className='error'>{errorMsg.email} </span>)}
                    </div>

                    <label>password</label>
                    <input type="password"
                        name='password'
                        value={value.password}
                        onChange={InputEvent}
                        autoComplete="off"
                        placeholder="Enter the password "
                        className={errorMsg.password && "input-error border-danger "}
                    />
                    <div className='errorshow' >{errorMsg.password && (<span className='error'>{errorMsg.password} </span>)}
                    </div>

                    <button className='btn2'
                        type='submit'
                        disabled={submitButtonDisable}>Login</button>
                    <p>Create New Account?
                        <span>
                            <NavLink to="/signup">  Signup </NavLink>
                        </span>
                    </p>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}

export default Login;