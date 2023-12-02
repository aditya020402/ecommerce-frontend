import './App.css';
import React from 'react'
import WebFont from 'webfontloader'
import {useEffect,useState} from "react";
import { useSelector } from 'react-redux'
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import axios from 'axios'

//importing store 
import store from './store'

//layout file components
import Header from './component/layout/Header/Header.js'
// User Options inside header folder
import UserOptions from './component/layout/Header/UserOptions.js'
import Footer from "./component/layout/Footer/Footer.js";
import About from "./component/layout/About/About.js";
import NotFound from "./component/layout/NotFound/NotFound.js";
import Contact from "./component/layout/Contact/Contact.js";

// Home component
import Home from './component/Home/Home.js'

//Product file components
import Products from './component/Product/Products.js'
import ProductDetails from "./component/Product/ProductDetails.js";
import Search from "./component/Product/Search.js";

// Route file component
import ProtectedRoute from './component/Route/ProtectedRoute'


//User file components
import { loadUser } from './actions/userActions'
import LoginSignUp from "./component/User/LoginSignUp";
import ForgotPassword from './component/User/ForgotPassword';
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from './component/User/UpdatePassword';
import ResetPassword from "./component/User/ResetPassword"

//Cart file components
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import OrderSuccess from './component/Cart/OrderSuccess'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Payment from './component/Cart/Payment.js'

// Admin file components
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";

//Order file components
import MyOrders from './component/Order/MyOrders';
import OrderDetails from './component/Order/OrderDetails';



function App() {
  const {isAuthenticated,user} = useSelector((state) => state.user);
  const [stripeApiKey,setStripeApiKey] = useState("");
  async function getStripeApiKey(){
    const {data} = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();

  },[]);

  //preventing the right button click by disabling the context menu 
  //uncomment when project is finished. 

  // window.addEventListener("contextmenu",(e)=>e.preventDefault());

  return (
    <Router>
      <Header/>
      {/* this component is only rendered when the user is authenticated  */}
        {isAuthenticated && <UserOptions user={user}/>}

        {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment}/>
        </Elements>
        )}

        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/product/:id" component={ProductDetails}/>
          <Route exact path="/products" component={Products}/>
          <Route path="/products/:keyword" component={Products}/>
          <Route exact path="/search" component={Search}/>
          <Route exact path="/contact" component={Contact}/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/login" component={LoginSignUp}/>
          <Route exact path="/cart" component={Cart}/>
          <ProtectedRoute exact path= "/account" component={Profile}/>
          <ProtectedRoute exact path="/me/update" component={UpdateProfile}/>
          <ProtectedRoute exact path="/password/update" component={UpdatePassword}/>
          <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder}/>
          <ProtectedRoute exact path="/shipping" component={Shipping}/>
          <Route exact path="/password/forgot" component={ForgotPassword}/>
          <Route exact path="/password/reset/:token" component={ResetPassword}/>

          <ProtectedRoute exact path="/orders" component={MyOrders}/>
          <ProtectedRoute exact path="/order/:id" component={OrderDetails}/>
          <ProtectedRoute exact path="/success" component={OrderSuccess}/>

          <ProtectedRoute exact path="/admin/dashboard" isAdmin = {true} component={Dashboard}/>
          <ProtectedRoute exact path="/admin/products" isAdmin= {true} component={ProductList}/>
          <ProtectedRoute exact path="/admin/product" isAdmin = {true} component={NewProduct}/>
          <ProtectedRoute exact path="/admin/product/:id" isAdmin={true} component={UpdateProduct}/>
          <ProtectedRoute exact path="/admin/orders" isAdmin={true} component={OrderList}/>
          <ProtectedRoute exact path="/admin/order/:id" isAdmin = {true} component={ProcessOrder}/>
          <ProtectedRoute exact path ="/admin/users" isAdmin = {true} component={UsersList}/>
          <ProtectedRoute exact path="/admin/user/:id" isAdmin = {true} component={UpdateUser}/>
          <ProtectedRoute exact path ="/admin/reviews" isAdmin={true} component={ProductReviews}/>
          <Route component={window.location.pathname === "/process/payment"?null:NotFound}/>
         </Switch>
       <Footer/>
    </Router>
  );
}

export default App;
