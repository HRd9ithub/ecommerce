import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase';
import { Data } from './Data';

const Order = () => {
    const [order, setOrder] = useState([]);
    //get Parmeter
    const pram = useParams();
    // console.log(pram.id, " id number of click");


    //database collection
    const userCollectionRef2 = collection(db, "cardRecord")   

    useEffect(() => {
        //data get in database
        const getUsers = async () => {
            const qu = query(userCollectionRef2, where("orderId", "==", pram.id ));
            const data = await getDocs(qu);
            console.log(data, " get data order js");
            //databse value store empty array
            setOrder(data.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            })))
        }
        getUsers();
    }, [])

    return (
        <>
            <div className='container my-5 py-3'>
                <div className='row'>
                    {
                        //array value display  in page
                        order.map((val) => {
                            return (
                                <>
                                    <div className='col-md-6 d-flex justify-content-center mx-auto' key={val.id}>
                                        <img src={'/' + val.img} alt={val.title} className="orderimg"></img>
                                    </div>
                                    <div className='col-md-6'>
                                        <h1>{val.title}</h1> 
                                        <hr/>
                                        <h2>Price : <span>${val.Price}</span></h2>
                                        <p>Quantity : <span>{val.quantity} </span></p>    
                                        <p>Total Price : <span>${val.Price * val.quantity}</span></p>
                                        <p>Shiping Address : <span>{val.address} </span></p>    
                                        <p>Mobile No : <span>{val.number} </span></p>    
                              </div>

                                </>

                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Order