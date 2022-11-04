import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Data } from './Data';
import { useDispatch } from 'react-redux';
import { addItem, delItem } from './Redux/Action/index'
import ProductSilder from './ProductSilder';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = () => {
    /* Now we need a product id  which is from pass produt page:*/
    const proid = useParams();
    //button toggle karva 
    const [cartBtn, setCartBtn] = useState("Add to Cart");

    //check id and edual id of data return in store the prodetail 
    const prodetail = Data.filter((x) => {
        return x.id == proid.id;
    })
    const product = prodetail[0];
    console.log(product);
    //redux event call karva
    const Displatch = useDispatch();

    const handleCart = (product) => {
        if (cartBtn === "Add to Cart") {
            Displatch(addItem(product));
            setCartBtn("Remove to Cart");
            //toast message diaplay
            toast.success('Product Added to Cart Successfully!  ', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light",
            });
        }
        else {
            Displatch(delItem(product));
            toast.success('Product Deleted to Cart Successfully!  ', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light",
            });
            setCartBtn("Add to Cart");

        }
    }

    return (
        <>
            {/* product array data diaplay in card */}
            <div className='container my-5  py-3'>
                <div className='row'>
                    <div className='col-md-6 d-flex justify-content-center mx-auto product'>
                        {/* image slider componet */}
                        <ProductSilder />
                    </div>
                    <div className='col-md-6 mt-5 d-flex flex-column '>
                        <h1>{product.title}</h1>
                        <hr />
                        <h2>${product.Price}</h2>
                        <p>{product.desc}</p>

                        <button onClick={() => handleCart(product)} className='btn btn-outline-primary'>{cartBtn}</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default ProductDetail;