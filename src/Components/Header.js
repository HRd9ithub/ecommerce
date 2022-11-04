import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import './Home/Home.css'
import CartBtn from './Home/CartBtn';


const Header = () => {
    //page redirect 
    const navigate = useNavigate();
    //store login name
    const [userState, setUserState] = useState(null)

    //user logout event call
    const logOutUser = () => {
        signOut(auth).then(() => {
            setUserState(null);
            //redirect home page
            navigate('/');
        }).catch((error) => {
            console.log(error);
        });
    }


    useEffect(() => {
        //check user login state 
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUserState(user.displayName);
            }
        });
    });

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid py-2">
                    <NavLink className="navbar-brand mx-auto fw-bold " to="#">APPLE MART</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/product">Product</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contact">Contact</NavLink>
                            </li>
                            {/* userstate null to not visiable */}
                            {userState !== null ?
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/tabpanel">My account</NavLink>
                                </li> : null}
                        </ul>

                        <ul className="navbar-nav me-0 mb-1 mb-lg-0">
                            {/* userstate null to not visiable */}
                            {userState !== null ? <>
                                <li className="nav-item ">
                                    <NavLink className="btn btn-outline-primary" to="/logout" onClick={logOutUser}>Logout</NavLink>
                                </li>

                            </> :
                                <>
                                    <li className="nav-item ">
                                        <NavLink className="btn btn-outline-primary" to="/login">Login </NavLink>
                                    </li>

                                    <li className="nav-item ms-2">
                                        <NavLink className="btn btn-outline-primary" to="/signup">Signup</NavLink>
                                    </li>
                                </>
                            }
                            {/* add to cart button */}
                            <CartBtn />
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header