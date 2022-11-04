import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase';
import Product from '../Product';
import './Home.css';

const Home = () => {

  // const [userName, setUserName] = useState(null);
  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       setUserName(user.displayName);
  //     } else {
  //       setUserName('');
  //     }
  //   });
  // });

  return (
    // <div  classNameName='home'>
    //     <h2 classNameName='heading'>
    //         {userName ? `welcome - ${userName}`: "please sign up"}
    //     </h2>
    // </div>
    <>
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="images/image1.jpg" className="d-block w-100" alt="images" height="500px" width="300px" />
          </div>
          <div className="carousel-item">
            <img src="images/image2.jpg" className="d-block w-100" alt="images" height="500px" />
          </div>
          <div className="carousel-item">
            <img src="images/image3.jpg" className="d-block w-100" alt="images" height="500px" />
          </div>

        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <Product/>
    </>
  )
}

export default Home;