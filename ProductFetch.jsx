import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

function ProductFetch() {
  const [randomData, setRandomData] = useState([])
  const [cart, setCart] = useState([])

  useEffect(() => {

    async function getData() {
      const result = await axios.get('https://dummyjson.com/products')
      console.log(result.data.products)
      setRandomData(result.data.products)
    }
    getData();

  }, [])

  function updateInCart(id) {
    cart[id].quantity = cart[id].quantity + 1;
    cart[id].price = cart[id].price * cart[id].quantity;
    setCart([...cart])
    // let itemsPresent = false;
    // if (cart.length > 0) {
    //   let IdsInCart = cart.map((c) => {return (c.id)})
    //   IdsInCart.includes(id) ? quantity += 1 : itemsPresent = false;    
    // }
  }

  function addToCart(id, title, price, thumbnail){
    let cartItems = {
      id: id,
      title: title,
      price: price,
      quantity: 1,
      thumbnail: thumbnail,
    }
    setCart([...cart, cartItems]);
  }

  function addCart(id, title, price, thumbnail) {
    // updateInCart(id);
    let itemsPresent = false;
    if (cart.length > 0) {
      let IdsInCart = cart.map((c) => {return (c.id)})
      itemsPresent = IdsInCart.includes(id) ? IdsInCart.indexOf(id) : false; 
      (itemsPresent === false) 
        ? addToCart(id, title, price, thumbnail) 
        : updateInCart(itemsPresent);   
    }
    else{
      addToCart(id, title, price, thumbnail)
    }
    
  }

  console.log(cart)

  return (
    <div id='wrapper'><h1 className='mainHead'>Products</h1>
      <div id='navBar'>
        {
          <ul className='cartPrint'>
            {cart.map((c) => {
              return (
                <li className='cartList'><a href='' className='aCart'><ShoppingCartCheckoutIcon /></a>
                  <div className='cartItems'>
                    <ul className='cartListDetail'>
                      <li><a href=''> <img className='cartThumbnail' src={c.thumbnail} /></a></li>
                      <li><a href=''> Title:-{c.title} </a></li>
                      <li><a href=''> ID:- {c.id} </a></li>
                      <li><a href=''> Quantity:- {c.quantity}</a></li>
                      <li><a href=''> Price:- {c.price} </a></li>
                    </ul>
                  </div>
                </li>

              )
            })}
          </ul>
        }
      </div>
      <div id='details'>
        {
          randomData.map((data) => {
            return (
              <div id='moredetails' key={data.id}>
                <div className='top'>
                  <img className='picture' src={data.thumbnail} alt={data.tilte} />
                  <h1 className='productName'>{data.title}</h1>
                </div>
                <div className='bottom'>
                  <h3 className='price'>Price: {data.price}</h3>
                  <h4 className='discount'>Discount: {data.discountPercentage}%</h4>
                  <p className='description'>{data.description}</p>
                  <h4 className='rating'>Rating: {data.rating} / 5</h4>
                </div>
                <div className='button'>
                  <button className='cardButton' onClick={() => addCart(data.id, data.title, data.price, data.thumbnail)}>ADD TO CART</button>
                </div>
              </div>
            )

          })
        }
      </div>
    </div>
  )
}

export default ProductFetch