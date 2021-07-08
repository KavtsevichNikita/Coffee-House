import "./userList.css";
import  React, {useEffect, useState } from "react";
import { Table } from 'react-bootstrap';
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";

export default function UserList() {

      const [users, setUsers] = useState([])
  
      useEffect(() =>{
        fetch("http://localhost:3001/contact").then(res =>{
          if(res.ok) {
              return res.json()
          }
        }).then(jsonRes => setUsers(jsonRes.map((o,i)=>{
            o.id = i+1;
            return o;
        })))
      },[])
  
   
    const columns = [
      { field: "id",
       width: 110
       },
      {
        field: "Name",
        width: 200,
        renderCell: (params) => {
          return <div>
            {params.row.name}
            
          </div>
        }
      
      },
      {
        field: "Email",
        width: 250,
        renderCell: (params) => {
          return <div>
            {params.row.email}
            
          </div>
        }
        
      },
      { field: "Phone",
       headerName: "Phone",
        width: 200,
        renderCell: (params) => {
          return <div>
            {params.row.phone}
            
          </div>
        }
      },
      {
        field: "Message",
        width: 330,
        renderCell: (params) => {
          return <div>
            {params.row.message}
            
          </div>
        }
      }
    ];
  
    return (
      <div className="productList">
        <DataGrid
          rows={users}
          disableSelectionOnClick
          columns={columns}
          pageSize={15}
          checkboxSelection
        />
      </div>
    ); 
  }
  