import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import './Signup.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState({      // Empty object 
        name: '',
        password: '',
        email: ''
    })
    const [errorMsg, setErrorMsg] = useState("");   // Error message handling
    const [isSubmitting, setIsSubmitting] = useState(false);  // submit mange state
    const [submitButtonDisable, setSubmitButtonDisable] = useState(false);  // submit button click and disable state

    const InputEvent = (event) => {
        let name = event.target.name;  // input filed name and value target
        let values = event.target.value;

        setValue({ ...value, [name]: values }); // store the value in state
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg(validate(value));   // set error msg in state
        setIsSubmitting(true);
    }

    const validate = (values) => {
        let errors = {};            //error msg store          

        if (!values.name) {
            errors.name = "Plz Enter The name.";
        }
        if (!values.password) {
            errors.password = "Plz Enter The password.";
        }
        if (!values.email ) {
            errors.email = "Plz Enter The email id.";
        }

        return errors;
    };

    const onSubmit = () => {
        setSubmitButtonDisable(true);
        const { email, password, name } = value;
        createUserWithEmailAndPassword(auth, email, password).then(async (res) => {   // create user register functionality 
            console.log(res.user);
            const user = res.user;
            setSubmitButtonDisable(false);
            await updateProfile(user, {
                displayName: name,
            });
            navigate("/");    // set path is redirect
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
            <div className='main_div'>
                <h1 className='heading'>Signup  </h1>
                <form className="form" onSubmit={handleSubmit} >
                    <label>Name</label>
                    <input type="text" name='name'
                        value={value.name}
                        onChange={InputEvent}
                        autoComplete="off"
                        placeholder="Enter the Name "
                        className={errorMsg.name && "input-error border-danger "}
                        />
                    <div className='errorshow' >{errorMsg.name && (<span className='error' >{errorMsg.name} </span>
                    )}</div>

                    <label>Email</label>
                    <input type="email"
                        name='email'
                        value={value.email}
                        onChange={InputEvent}
                        autoComplete="off"
                        placeholder="Enter the email id"
                        className={errorMsg.email && "input-error border-danger "}
                        />
                    <div className='errorshow' >{errorMsg.email && (<span className='error' >{errorMsg.email} </span>
                    )}</div>

                    <label>password</label>
                    <input type="password"
                        name='password'
                        value={value.password}
                        onChange={InputEvent}
                        autoComplete="off"
                        placeholder="Enter the password "
                        className={errorMsg.password && "input-error border-danger "}
                        />
                    <div className='errorshow' >{errorMsg.password && (<span className='error' >{errorMsg.password} </span>
                    )}</div>


                    <button className='btn1' type='submit'
                        disabled={submitButtonDisable}>Signup</button>
                    <p>Already have an account?
                        <span>
                            <NavLink to="/login">  Login </NavLink>
                        </span>
                    </p>
                </form>
            </div>

            <ToastContainer/>
            
        </>
    )
}

export default Signup;