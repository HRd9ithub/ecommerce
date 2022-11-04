import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useParams } from 'react-router-dom'
import { Data } from './Data';
import './Productslider.css'

const ProductSilder = () => {
  //get parameter value
  const proid = useParams();

  const prodetail = Data.filter((x) => {
    return x.id == proid.id;
  })
  const product = prodetail[0];
  console.log(product);
  return (
    //image slider display
    <Carousel>
      <div>
        <img src={'/' + product.img} />

      </div>
      <div>
        <img src={'/' + product.img2} />

      </div>
      <div>
        <img src={'/' + product.img3} />

      </div>
    </Carousel>
  )
}

export default ProductSilder;