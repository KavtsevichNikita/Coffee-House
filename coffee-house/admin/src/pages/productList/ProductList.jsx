import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import React, {useEffect, useState } from "react";

export default function ProductList() {
    const productsUrl = 'http://localhost:3001/products'
    const [products, setProducts] = useState([])
    const [rerender, setRerender] = useState(true)

    useEffect(() =>{
      fetch(productsUrl).then(res =>{
        if(res.ok) {
            return res.json()
        }
      }).then(jsonRes => setProducts(jsonRes.map((o,i) =>{  
          o.id = i+1;
          return o;
      })))
    },[rerender])
 
  const columns = [
    { field: "id", 
    headerName: "ID",
     width: 100 },

    //  {
    //   field: "Image",
    //   headerName: "Image",
    //   width: 250,
    //   renderCell: (params) => {
    //     return <div className="productListItem">
    //         {params.row.file}
    //       </div>
    //     ;
    //   },
    // },
    
    {
      field: "Product",
      headerName: "Product",
      width: 250,
      renderCell: (params) => {
        return <div className="productListItem">
            {params.row.name}
          </div>
        ;
      },
    },
    { field: "country", 
    headerName: "Country", 
    width: 150,
    renderCell: (params) => {
      return <div className="productListItem">
          {params.row.country}
        </div>
      ;
    },
  },
    {
      field: "description",
      headerName: "Description",
      width: 200,
      renderCell: (params) => {
        return <div className="productListItem">
            {params.row.descr}
          </div>
        ;
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 130,
      renderCell: (params) => {
        return <div className="productListItem">
            {params.row.price}
          </div>
        ;
      },
      
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              onClick={() => {
                console.log(params)
                fetch(productsUrl, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json' 
                  },
                  body: JSON.stringify({ id: params.row._id })
                })
                .finally(setProducts(products.filter(it => it._id !== params.row._id)))
              }}      
              className="productListDelete"
            />
            
          </>
        );
      },
    },
  
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        pageSize={15}
        checkboxSelection
      />
    </div>
  );

}
