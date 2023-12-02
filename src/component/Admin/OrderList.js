import React,{Fragment,useEffect} from 'react';
import {DataGrid} from "@material-ui/data-grid";
import "./productList.css";
import {useSelector,useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import {useAlert} from "react-alert";
import MetaData from "../layout/MetaData.js";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar.js";
import {deleteOrder,getAllOrders,clearErrors} from "../../actions/orderAction";
import {DELETE_ORDER_RESET} from "../../constants/orderConstants";


const OrderList = ({history}) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {error,orders} = useSelector((state)=>state.allOrders);
  const {error:deleteError,isDeleted} = useSelector((state)=>state.order);
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  }
  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    if(deleteError){
      alert.error(deleteError());
      dispatch(clearErrors());
    }
    if(isDeleted){
      alert.success("Order is deleted successfully");
      history.push("/admin/orders");
      dispatch({type:DELETE_ORDER_RESET});
    }
    dispatch(getAllOrders());
  },[dispatch,alert,error,deleteError,history,isDeleted]);

  const columns = [
    {
      field:"id",
      headerName:"Order ID",
      midWidth:300,
      flex:1,
    },
    {
      field:"status",
      headerName:"Status",
      midWidth:150,
      flex:0.5,
      cellClassName:(params)=>{
        return params.getValue(params.id,"status")==="Delivered"?"greenColor":"redColor"
      },
    },
    {
      field:"itemQty",
      headerName:"Items Qty",
      midWidth:150,
      flex:0.4,
    },
    {
      field:"amount",
      headerName:"Amount",
      midWidth:270,
      flex:0.5,
      type:"number"
    },
    {
      field:"actions",
      headerName:"Actions",
      type:"number",
      sortable:false,
      midWidth:150,
      flex:0.3,
      renderCell:(params)=>{
        return (
          <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id,"id")}`}>
              <EditIcon/>
            </Link>
            <Button onClick={()=>deleteOrderHandler(params.getValue(params.id,"id"))
            }>
              <DeleteIcon/>
            </Button>
          </Fragment>
        )
      }
    },
  ]


  const rows = [];
  orders && orders.forEach((item)=>{
    rows.push({
      id:item._id,
      itemsQty:item.orderItems.length,
      amount:item.totalPrice,
      status:item.status,
    });
  });

  return (
    <Fragment>
      <MetaData title={`{All Orders - Admin}`} />
      <div className='dashboard'>
        <SideBar />
        <div className='productListContainer'>
          <h1 id='productListHeading'>All Orders</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className='productListTable'
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  )
}

export default OrderList
