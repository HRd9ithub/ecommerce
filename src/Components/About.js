import React from 'react';
import { NavLink } from 'react-router-dom';

const About = () => {
  return (
    <>

      <div className='container py-5 my-2'>
        <div className='row'>
          <div className='col-md 6'>
            <h1 className='text-primary'>About</h1>
            <p className='text'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Sunt, eum? Maxime similique, quo quisquam, aperiam optio ipsam
              repellat id natus laudantium dicta voluptatem ullam quos perspiciatis
              ad itaque velit eaque vero praesentium autem, vel nostrum soluta.
              Iusto perferendis numquam incidunt animi officiis laborum vitae ad maxime.
              Doloremque soluta veniam quasi distinctio labore beatae ducimus temporibus
              esse ea. 
            </p>
            <p className='text'>
                tempora quae voluptatem iste inventore explicabo autem dolor accusantium amet. Ipsam quae beatae recusandae debitis nulla
                aliquid nobis illo ratione praesentium, accusantium et dolorum ex soluta voluptatibus
                iusto repudiandae animi rerum ad eveniet consectetur repellat.
            </p>
            {/* button click in redirect contact page */}
            <NavLink to='/contact' className="btn btn-primary">Contact Now</NavLink>
          </div>
          <div className='col-md 6 d-flex justify-content-center align-items-center'>
            <img className='img' src="images/About/ab.jpg" alt="about-image" height="250px" /> 
          </div>
        </div>
      </div>
    </>
  )
}

export default About