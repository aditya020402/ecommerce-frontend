import React, { Fragment, useEffect } from 'react';
import {DataGrid} from "@material-ui/data-grid";
import "./productList.css";
import {useSelector,useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import MetaData from "../layout/MetaData.js";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar.js";
import {getAllUsers,clearErrors,deleteUser} from "../../actions/userActions";
import {DELETE_USER_RESET} from "../../constants/userConstants";
import {useAlert} from "react-alert";

const UsersList = ({history}) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {error,users} = useSelector((state) => state.allUsers);

  const {error:deleteError,isDeleted,message} = useSelector((state)=> state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  }

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    if(deleteError){
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if(isDeleted){
      alert.success("User Deleted Successfully");
      history.push("/admin/users");
      dispatch({
        type:DELETE_USER_RESET,
      })
      dispatch(getAllUsers());
    }
  },[dispatch,alert,error,deleteError,history,isDeleted,message]);


  const columns = [
    {
      field:"id",
      headerName:"User Id",
      minWidth:180,
      flex:0.8,
    },
     {
      field:"name",
      headerName:"Name",
      minWidth:150,
      flex:0.3,
      cellClassName:(params)=>{
        return params.getValue(params.id,"role")==="admin"?"greenColor":"redColor"
      },
    },
    {
      field:"actions",
      headerName:"Actions",
      minWidth:150,
      flex:0.3,
      type:"number",
      sortable:false,
      renderCell:(params)=>{
        return(
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id,"id")}`}>
              <EditIcon/>
            </Link>
            <Button 
              onClick={()=>deleteUserHandler(params.getValue(params.id,"id"))}
            >
              <DeleteIcon/>
            </Button>
          </Fragment>
        )
      }
    },
  ]

  const rows = [];
   
  users && users.forEach((item)=>{
    rows.push({
      id:item._id,
      role:item.role,
      emai:item.email,
      name:item.name,
    })
  })
  


  return (
    <Fragment>
        <MetaData title={`All Users - Admin`}/>
        <div className="dashboard">
            <SideBar/>
            <div className="productListContainer">
                <h1 id="productListHeading">All Users</h1>
                <DataGrid columns={columns} rows={rows}  pageSize={10} disableSelectionOnClick className="productListTable" autoHeight/>
            </div>
        </div>
    </Fragment>
  )
}

export default UsersList;
