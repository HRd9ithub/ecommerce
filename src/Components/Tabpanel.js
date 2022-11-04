import { collection, getDocs, query, Timestamp, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { auth, db } from '../firebase';
import Table from 'react-bootstrap/Table';
import { NavLink } from 'react-router-dom';
import ChangePassword from './ChangePassword';

const Tabpanel = () => {
    //database collection
    const userCollectionRef = collection(db, "cardRecord");
    const [card, setCard] = useState([])
    const [id, setId] = useState(null);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            //get login id 
            if (user) {
                setId(user.uid);
                // console.log(user.uid, "login user id")
            }
        })
        const getUser = async () => {
            //check id of database store id and login id
            const q = query(userCollectionRef, where("userId", "==", id));
            //databse get data 
            const data = await getDocs(q);
            // console.log(data, " database get record");
            //store data in state 
            setCard(data.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            })))
        }
        getUser();
    }, [id])

    return (
        <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3"
        >
            <Tab eventKey="home" title="My Order">
                <Table striped >
                    <thead>
                        <tr>
                            <th>Product img </th>
                            <th>Product Name </th>
                            <th>Product Quantity</th>
                            <th>Time of Purchase</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* database data in table display */}
                        {card.map((user) => {
                            return (
                                <tr key={user.id}>
                                    <td><img src={user.img}
                                        size="medium"
                                        style={{
                                            width: "70px",
                                            height: "70px"
                                        }} /></td>
                                    <td>{user.title}</td>
                                    <td>{user.quantity}</td>
                                    <td>{user.date.toDate().toLocaleString()}</td>
                                    {/* order detail page redirect */}
                                    <td><NavLink to={`/orderview/${user.orderId}`}>View</NavLink></td>
                                </tr>
                            )
                        })}

                    </tbody>

                </Table>
            </Tab>
            <Tab eventKey="change password" title="Change Password">
                <ChangePassword/>
            </Tab>
        </Tabs>
    )
}

export default Tabpanel;


