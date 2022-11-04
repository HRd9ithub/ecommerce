import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import './Home.css';

const Navbar = () => {

    const navigate = useNavigate();
    const [userState, setUserState] = useState(null)

    const logOutUser = () => {
        signOut(auth).then(() => {
            setUserState(null);
            navigate('/');
        }).catch((error) => {
            console.log(error);
        });
    }


    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUserState(user.displayName);
            }
        });
    });
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="#">Navbar</NavLink>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                        </li>
                        {userState !== null ? <>
                            <button className="nav-item bg-info" onClick={logOutUser}>Logout </button>

                        </> :
                            <> 
                                <li className="nav-item">
                                    <NavLink className="nav-link active m-6" to="/login">Login</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link active" to="/signup">Signup</NavLink>
                                </li>
                            </>
                        }


                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar