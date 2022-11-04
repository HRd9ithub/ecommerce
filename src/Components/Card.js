import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { delItem, Increment, Decrement } from './Redux/Action';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../firebase';

const Card = () => {
    //login name store
    const [userState, setUserState] = useState(null);
    //store data get 
    const state = useSelector((state) => state.addItem)
    //redux event handle
    const Dispatch = useDispatch();


    //add to cart to delete product
    const handleClose = (item) => {
        Dispatch(delItem(item))
        toast.success('Product Deleted to Cart Successfully! ', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    //Increment quantity event handle
    const handleIncQuantity = (items) => {
        // console.log(items)
        Dispatch(Increment(items))
    }

    //Decrement quantity event handle
    const handleDecQuantity = (items) => {
        // console.log(items)
        Dispatch(Decrement(items))
    }

    // create card 
    const cardItems = (cardItem) => {
        return (
            <div className='px-4 my-5  bg-light rounded-3' key={cardItem.id}>
                <div className='container py-4'>
                    <button onClick={() => handleClose(cardItem)} className='btn-close float-end' aria-label='close'></button>
                    <div className='row d-flex justify-content-center'>
                        <div className='col-md-4'>
                            <img src={cardItem.img} alt={cardItem.title} height="200px" width="180px"></img>
                        </div>
                        <div className='col-md-4'>
                            <h3>{cardItem.title}</h3>
                            <p className='lead fw-bold'>${cardItem.Price} </p>

                            <div className='quantity'>
                                <RemoveIcon className='quantitybtn' onClick={() => handleDecQuantity(cardItem)} />
                                <input type="text" value={cardItem.quantity} readOnly />
                                <AddIcon className='quantitybtn' onClick={() => handleIncQuantity(cardItem)} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }


    // add to card is empty of visiable to empty card
    const emptyCard = () => {
        return (
            <div className='px-4 my-5 py-4 bg-light rounded-3'>
                <div className='container py-4'>
                    <div className='col-md-4'>
                        <h3>Your Card is Empty.</h3>
                    </div>
                </div>
            </div>
        )
    }

    useEffect(() => {
        //check user login 
        auth.onAuthStateChanged((user) => {
            // console.log(user.displayName , "ytewrirwetuiege");
            if (user) {
                setUserState(user.displayName);
            }
        })
    })

    const Button = () => {
        return (
            <div className='container'>
                <div className='row'>
                    {
                        //sate value check in null to redirect login page and checkout page
                        userState !== null ?
                            <NavLink to='/checkout' className="btn btn-outline-primary w-25 mb-5 mx-auto">Proceed To Checkout</NavLink>
                            : <NavLink to='/signup' className="btn btn-outline-primary w-25 mb-5 mx-auto">Login</NavLink>

                    }
                </div>
            </div>
        )
    }
    // order detail display
    var total = 0; // store total value
    const itemList = (item) => {
        total = total + item.Price * item.quantity;
        return (
            <>
                <li className="list-group-item d-flex justify-content-between lh-sm" key={item.id}>
                    <div>
                        <h6 className="my-0">{item.title}</h6>

                    </div>
                    <span className="text-muted">{item.quantity}</span>
                    <span className="text-muted">${item.Price * item.quantity}</span>
                </li>
            </>
        )
    }
    return (
        <>
            {/* reducer store value is empty call the function */}
            {state.length === 0 && emptyCard()}
            {/* reducer store value is not empty call the function */}
            {state.length !== 0 && state.map(cardItems)}
            {/* order details */}
            <div className="container my-5">
                <div className="row g-5 d-flex justify-content-center">
                    <div className='col-md-6'>
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-primary">Your cart</span>
                            <span className="badge bg-primary rounded-pill">{state.length}</span>
                        </h4>
                        <ul className="list-group mb-3">
                            <li className="list-group-item d-flex justify-content-between lh-sm" >
                                <div>
                                    <h6 className="my-0">Product Title</h6>

                                </div>
                                <span className="text-muted">quantity</span>
                                <span className="text-muted">Price </span>
                            </li>
                            {state.map(itemList)}
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total</span>
                                <strong>${total}</strong>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
            {/* reducer store value is not empty call the  button function */}
            {state.length !== 0 && Button()}
            <ToastContainer />
        </>
    )
}

export default Card;