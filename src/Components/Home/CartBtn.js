import React from 'react'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


const CartBtn = () => {
  const state = useSelector((state) => state.addItem)
  return (
    <>
      <NavLink className="btn btn-outline-primary ms-2" to="/card"> <ShoppingCartOutlinedIcon />Cart ({state.length})</NavLink>
    </>
  )
}

export default CartBtn;