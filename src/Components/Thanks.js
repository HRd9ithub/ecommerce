import React from 'react'
import { NavLink } from 'react-router-dom';

const Thanks = () => {
  return (
    <div className='container my-5 py-5'>
      <div className='row d-flex justify-content-center'>
        <div className='col-4'>
          <img src='images/thankyou/thankyou.png' alt='thank you image' ></img>
          <p className='text'>your order was Successfully and deliver on
          </p>
          <div className='text-center mb-4'>
            <NavLink to="/">
              <button type="submit" className="btn btn-outline-primary mt-4 ">Go to Home</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Thanks;