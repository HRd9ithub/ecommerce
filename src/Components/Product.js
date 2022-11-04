import React from 'react'
import { NavLink } from 'react-router-dom';
import { Data } from './Data';

const Product = () => {
  return (
    <>
      <div className='container py-5'>
        <div className='row'>
          <div className='col-12 text-center'>
            <h1>Product</h1>
            <hr />
          </div>
        </div>
      </div>
      <div className='container-fluid mb-5'>
        <div className='row'>
          <div className='col-8 mx-auto'>
            <div className='row gy-5'>
              {/* display product card */}
              {Data.map((data) => {
                return (
                  <div className='col-md 4 col-10 mx-auto' key={data.id}>
                    <NavLink to={`/product/${data.id}`} >
                      <div className="card " style={{ width: "18rem" }}>
                        <img src={data.img} className="card-img-top" alt="card-imge" height="250px" />
                        <div className="card-body text-center">
                          <h5 className="card-title">{data.title}</h5>
                          <p className="card-text">${data.Price}</p>
                          <button className='btn btn-outline-primary'>Buy Now</button>
                          {/* <NavLink to={`/product/${data.id}`} className="btn btn-outline-primary">Buy Now</NavLink> */}
                        </div>
                      </div>
                    </NavLink>
                  </div>

                )
              })
              }

            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default Product;