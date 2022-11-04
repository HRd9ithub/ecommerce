import React from 'react'

const Contact = () => {
  return (
    <>
      <div className='container py-3'>
        <div className='row'>
          <div className='col-12 text-center'>
            <h1 >Contact Us</h1>
            <hr />
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-md 5 d-flex justify-content-center align-items-center'>
            <img className='img' src="images/contact/contact.jpg" alt="contact-image" height="300px" />
          </div>
          <div className='col-md 6'>
            <form>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Full Name</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter the Name" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput2" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleFormControlInput2" placeholder="name@example.com" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Message</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
              <button type="submit" className="btn btn-outline-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}

export default Contact