import React, { useState, useEffect } from "react";
import Navbar from "./Component/Navbar"
import Amazon from './Component/Amazon'
import Cart from "./Component/Cart"
import './Component/Amazon.css'
import { useCookies } from 'react-cookie'
function App() {
  const [show, setShow] = useState(true)
  const [cart, setCart] = useState([])
  const [warn, setWarn] = useState(false)
  const [cookie, setCookie] = useCookies(['o'])
  useEffect(() => {
    const storedSubmissions = cookie.o || [];
    setCart(storedSubmissions);
  }, [cookie.o]);
  const handleClick = (item) => {
    // console.log(item);
    let isPresent = false;
    cart.forEach((product) => {
      if (item.id === product.id)
        isPresent = true;
    })
    if (isPresent) {
      setWarn(true);
      setTimeout(() => setWarn(false), 2000)
      return;
    }                                    //after return nothing will execute like setCart
    setCart([...cart, item])
    //cookies
    setCookie('o', [...cart, item], { path: '/' })
  }
  const handleChange = (item, d) => {
    // console.log(item, d);
    let ind = -1;
    cart.forEach((data, index) => {
      if (data.id === item.id)
        ind = index;
    });
    const tempArr = cart;
    tempArr[ind].amount += d;

    if (tempArr[ind].amount === 0)
      tempArr[ind].amount = 1;
    setCart([...tempArr])

  }
  console.log(cart)

  return (
    <div className="App">
      <Navbar size={cart.length} setShow={setShow} />
      {show ? <Amazon handleClick={handleClick} /> : <Cart cart={cart} setCart={setCart} handleChange={handleChange} />}


      {warn && <div className="warning">Item is already added,go to cart</div>}

    </div>
  );
}

export default App;
