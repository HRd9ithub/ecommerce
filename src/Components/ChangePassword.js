import { updatePassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ChangePassword = () => {
    const [value, setValue] = useState({
        currentpassword: '',
        newpassword: '',
        confirmpassword: ''
    })
    const [errorMsg, setErrorMsg] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const InputEvent = (event) => {
        // console.log("🚀 ~ file: ChangePassword.js ~ line 21 ~ InputEvent ~ event", event.target.value)
        // console.log("🚀 ~ file: ChangePassword.js ~ line 21 ~ InputEvent ~ event", event.target.name)

        const name = event.target.name;
        const values = event.target.value;

        setValue({ ...value, [name]: values });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg(validate(value));
        setIsSubmitting(true)
    }

    const validate = (values) => {
        let error = {};

        if (!values.currentpassword) {
            error.currentpassword = " Please Enter The Current-Password"
        }

        if (!values.newpassword) {
            error.newpassword = " Please Enter The New-Password"
        }

        if (!values.confirmpassword) {
            error.confirmpassword = " Please Enter The Confirm-Password"
        }
        if (values.newpassword) {
            if (values.newpassword !== values.confirmpassword) {
                error.message = "Passwords Not Match"
            }
        }
        return error;
    }

    useEffect(() => {
        if (Object.keys(errorMsg).length === 0 && isSubmitting) {    //conditional is true onsubmit function is call
            onSubmit();
        }
    }, [errorMsg]);

    const onSubmit = () => {
        const user = auth.currentUser;
        console.log("auth.currentUser", auth.currentUser)
        const newPassword = value.newpassword;

        updatePassword(user, newPassword).then(() => {
            toast.success('Password Changed is Successfully!  ', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light",
            });
        })
        setValue({
            currentpassword: '',
            newpassword: '',
            confirmpassword: ''
        })
    }
    return (
        <>
            <div className="container my-5">
                <div className="row g-5 d-flex justify-content-center">
                    <div className='col-md-6'>
                        <form className='form' onSubmit={handleSubmit}>
                            <label className="mb-2">current password</label>
                            <input type="password"
                                name='currentpassword'
                                value={value.currentpassword}
                                onChange={InputEvent}
                                autoComplete="off"
                                placeholder="Enter the current password"
                                className={errorMsg.currentpassword && "input-error border-danger "}
                            />
                            <div className='errorshow' >{errorMsg.currentpassword && (<span className='error'>{errorMsg.currentpassword} </span>)}</div>

                            <label className="mb-2">new password</label>
                            <input type="password"
                                name='newpassword'
                                value={value.newpassword}
                                onChange={InputEvent}
                                autoComplete="off"
                                placeholder="Enter the new password"
                                className={errorMsg.newpassword && "input-error border-danger "}
                            />
                            <div className='errorshow'>{errorMsg.newpassword && (<span className='error'>{errorMsg.newpassword}</span>)}</div>

                            <label className="mb-2">confirm password</label>
                            <input type="password"
                                name='confirmpassword'
                                value={value.confirmpassword}
                                onChange={InputEvent}
                                autoComplete="off"
                                placeholder="Enter the confirm password"
                                className={(errorMsg.confirmpassword || errorMsg.message) && "input-error border-danger "}
                            />
                            {
                            !value.confirmpassword ? 
                            <div className='errorshow'>{errorMsg.confirmpassword && (<span className='error'>{errorMsg.confirmpassword}</span>)}</div> :
                            <div className='errorshow'>{errorMsg.message && (<span className='error'>{errorMsg.message}</span>)}</div>
                        }

                            <button type="submit" className="btn btn-outline-primary mt-4">Save</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default ChangePassword;