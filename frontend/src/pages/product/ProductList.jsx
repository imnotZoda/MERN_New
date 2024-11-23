import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../layouts/AdminSideBar';
import axios from 'axios'

import { useNavigate } from 'react-router-dom';

//dataable
import { MDBDataTable } from 'mdbreact';
import { Button, TableCell, TableRow } from '@mui/material';
import MUIDataTables from 'mui-datatables'



const BASE_URL = "http://localhost:5000/product/all"

export default function ProductList() {


  const [products, setProducts] = useState([]);
  const navigate = useNavigate()
  const [selectedCategory, setCategory] = useState("All")
  const [categories, setCategories] = useState([]);

  const tableData = products.map(product => (
    {
      image: (
        <div style={{ display: 'flex', gap: '5px' }}>
          {product.images.slice(0, 3).map(image => (
            <img
              key={image._id}
              style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: '5px', cursor: 'pointer' }}
              src={image.url}
              alt={product.name}
              onClick={() => window.open(image.url, '_blank')}
            />
          ))}
          {product.images.length > 3 && (
            <span style={{ color: '#007bff', cursor: 'pointer' }}>+{product.images.length - 3}</span>
          )}
        </div>
      ),
      name: product.name,
      description: product.description,
      cost_price: product.cost_price,
      category: product.category,
      sell_price: product.sell_price,
      stock_quantity: product.stock_quantity,
      action: (
        <div>
          <Button onClick={() => navigate(`/products/update/${product._id}`)} color='success' size='small'>
            Edit
          </Button>
          <Button onClick={() => deleteProduct(product._id)} color='error' size='small'>
            Delete
          </Button>
        </div>
      )
    }
  ));


  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure to delete?')) {
      await axios.delete(`http://localhost:5000/product/delete/${id}`);
      alert("Deleted");

      getProducts();
    }
  }

  const columns = [
    {
      label: 'Image',
      name: 'image',
      options: {
        display: false,
        filter: false,
      }

    },
    {
      label: 'Name',
      name: 'name',
      options: {
        filter: true,
        sort: true,
        display: true,
      }
    },
    {
      label: 'Description',
      name: 'description',
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      label: 'Category',
      name: 'category',
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      label: 'Cost Price',
      name: 'cost_price',
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      label: 'Sell Price',
      name: 'sell_price',
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      label: 'Stock Quantity',
      name: 'stock_quantity',
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      label: 'Action',
      name: 'action',
      options: {
        filter: false,
      }
    }
  ]




  useEffect(() => {

    getProducts();

  }, [])

  const getProducts = async () => {

    const { data } = await axios.get(BASE_URL);
    setProducts(data.products);

    //Fetching ng lahat ng category sa products
    const uniqueCategories = [
      "All",
      ...new Set(data.products.map((product) => product.category)),
    ];

    setCategories(uniqueCategories);

  }

  // const bulkDelete = async (ids) => {
  //   try {


  //     const { data } = await axios.put(`http://localhost:5000/product/bulk/delete`, {
  //       productIds: ids,
  //     })

  //     getProducts();

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const bulkDelete = async (ids) => {
    try {
      const { data } = await axios.delete('http://localhost:5000/product/bulk/delete', {
        data: { productIds: ids }  // Correct way to send data in a DELETE request
      });

      // Reload products after deletion
      getProducts();
      alert(data.message); // Optionally, show success message

    } catch (error) {
      console.log(error);
      alert("Error deleting products");
    }
  }

  return (
    <AdminSidebar>


      {/* <MUIDataTables
        title={"Products List"}
        data={tableData}
        columns={columns}
        options={{

          expandableRows: true,
          responsive: 'standard',
          filterType: 'multiselect',

          onRowSelectionChange: (currentRowsSelected, allRowsSelected, rowsSelected) => {
            // console.log(currentRowsSelected);
          },

          // PARA SA BULK DELETE
          onRowsDelete: ({ data }) => {
            const ids = data.map(d => (
              tableData[d.index]._id
            ))

            // console.log(ids)
            bulkDelete(ids);
          },

          // Expandable
          renderExpandableRow: (rowData, rowMeta) => {
            const colSpan = rowData.length + 1;
            return (
              // <div>
              //     {rowData[0]}
              // </div>



              <TableRow>
                <TableCell colSpan={colSpan}>
                  {rowData[0]}
                </TableCell>
              </TableRow>



            )
          },


        }}

      /> */}

      <MUIDataTables
        title={"Products List"}
        data={tableData}
        columns={columns}
        options={{
          expandableRows: true,
          responsive: 'standard',
          filterType: 'multiselect',

          // Handle row selection for bulk delete
          onRowsDelete: ({ data }) => {
            const ids = data.map(d => products[d.dataIndex]._id);  // Make sure we're getting the IDs from the correct data
            bulkDelete(ids);
          },

          renderExpandableRow: (rowData, rowMeta) => {
            const colSpan = rowData.length + 1;
            return (
              <TableRow>
                <TableCell colSpan={colSpan}>
                  {rowData[0]}
                </TableCell>
              </TableRow>
            );
          },
        }}
      />

    </AdminSidebar>
  )
}

