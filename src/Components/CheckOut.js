import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { empty } from './Redux/Action';
import { useNavigate } from 'react-router-dom';
import Thanks from './Thanks.js';



const CheckOut = () => {
    const [value, setValue] = useState({     // create state of Empty object 
        name: '',
        address: '',
        number: ''
    })
    const [errorMsg, setErrorMsg] = useState("");// Error message handling
    const [isSubmitting, setIsSubmitting] = useState(false);
    const userCollectionRef = collection(db, "userRecord");
    // //database collection
    const userCollectionRef1 = collection(db, "cardRecord");
    //variable store  value of add to cart data
    const state = useSelector((state) => state.addItem);
    //store login email id
    const [email, setEmail] = useState();
    //store login user id
    const [userId, setUserId] = useState();
    const navigate = useNavigate();
    //redux action event handle
    const Dispatch = useDispatch();

    //input filed data change in call function
    const InputEvent = (event) => {
        let name = event.target.name;
        let values = event.target.value;
        //     console.log(value)
        setValue({ ...value, [name]: values })
    }

    //submit buuton click call function
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg(validate(value));    // set error msg in state
        setIsSubmitting(true);
    }
    //input filed value is check 
    const validate = (values) => {
        let error = {};                //error msg store    

        if (!values.name) {
            error.name = "Please Enter the name";
        }

        if (!values.address) {
            error.address = "Please Enter the address";
        }
        if (!values.number) {
            error.number = "Please Enter the number";
        }
        return error;
    }

    // input data is not empty to call funtion
    const onSubmit = async () => {
        const { name } = value;
        //add data to database
        const res = await addDoc(userCollectionRef, {
            name,
            email,
            userId
        })
        if (res) {
            //data is added in database of empty input filed
            setValue({
                name: '',
                address: '',
                number: ''
            })
        }


        {
            state.map(async (item) => {
                // console.log(item.title)
                const { title, Price, quantity, img } = item;
                const { address, number } = value;

                const res1 = await addDoc(userCollectionRef1, {
                    title,
                    Price,
                    quantity,
                    userId,
                    img,
                    address,
                    number,
                    //random id create 
                    orderId: Math.random().toString().substr(2, 6),
                    date: serverTimestamp()
                })
                if (res1) {
                    // card data store in database of cart is empty 
                    Dispatch(empty());
                }
                navigate("/thankyou")
            })
        }
    }

    var total = 0;
    //card data in display page
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

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            // console.log(user.email   , "ytewrirwetuiege");
            if (user) {
                setEmail(user.email);
            }
            if (user) {
                setUserId(user.uid);
            }

            // console.log(email, "email id")
        })
    })
    useEffect(() => {
        //check errormsg state is empty to call onsubmit function
        if (Object.keys(errorMsg).length === 0 && isSubmitting) {
            onSubmit();
        }
    }, [errorMsg]);
    return (
        <>
            {/* form is display in page */}
            <div className="container my-5">
                <div className="row g-5 d-flex justify-content-center">
                    <div className='col-md-6'>
                        <form method='POST' className='form' onSubmit={handleSubmit}>
                            <label className="mb-2">Name</label>
                            <input type="text"
                                name='name'
                                value={value.name}
                                onChange={InputEvent}
                                autoComplete="off"
                                placeholder="Enter the name"
                                className={errorMsg.name && "input-error border-danger "}
                            />
                            <div className='errorshow' >{errorMsg.name && (<span className='error'>{errorMsg.name} </span>)}</div>
                            <label className="mb-2">Email</label>
                            <input type="email"
                                name='email'
                                value={email}
                                // onChange={InputEvent}
                                autoComplete="off"
                                placeholder="Enter the email id"
                                className={errorMsg.email && "input-error border-danger "}
                            />
                            <div className='errorshow'>{errorMsg.email && (<span className='error'>{errorMsg.email}</span>)}</div>
                            <label className="mb-2">Shiping Address</label>
                            <input type="text"
                                name='address'
                                value={value.address}
                                onChange={InputEvent}
                                autoComplete="off"
                                placeholder="Enter the address"
                                className={errorMsg.address && "input-error border-danger "}
                            />
                            <div className='errorshow'>{errorMsg.address && (<span className='error'>{errorMsg.address}</span>)}</div>
                            <label className="mb-2">Mobile No</label>
                            <input type="number"
                                name='number'
                                value={value.number}
                                onChange={InputEvent}
                                autoComplete="off"
                                placeholder="Enter the number"
                                className={errorMsg.number && "input-error border-danger "}
                            />
                            <div className='errorshow'>{errorMsg.number && (<span className='error'>{errorMsg.number}</span>)}</div>
                            <button type="submit" className="btn btn-outline-primary mt-4">Confirm Order</button>
                        </form>
                    </div>
                    {/* card display */}
                    <div className='col-md-4'>
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
                            {/* array value get */}
                            {state.map(itemList)}
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total</span>
                                <strong>${total}</strong>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <ToastContainer />


        </>
    )
}


export default CheckOut;