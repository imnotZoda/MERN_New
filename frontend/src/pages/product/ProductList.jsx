import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../layouts/AdminSideBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// DataTable
import { Button, TableCell, TableRow, Typography, Select, MenuItem, Box } from '@mui/material';
import MUIDataTables from 'mui-datatables';

const BASE_URL = "http://localhost:5000/product/all";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [selectedCategory, setCategory] = useState("All");
  const [categories, setCategories] = useState([]);

  const tableData = products.map((product) => ({
    image: (
      <div style={{ display: 'flex', gap: '8px' }}>
        {product.images.slice(0, 3).map((image) => (
          <img
            key={image._id}
            style={{
              width: 60,
              height: 60,
              objectFit: 'cover',
              borderRadius: '8px',
              cursor: 'pointer',
              border: '1px solid #ddd',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
            }}
            src={image.url}
            alt={product.name}
            onClick={() => window.open(image.url, '_blank')}
          />
        ))}
        {product.images.length > 3 && (
          <Typography
            style={{
              color: '#007bff',
              cursor: 'pointer',
              marginTop: '20px',
              fontWeight: 'bold',
            }}
          >
            +{product.images.length - 3}
          </Typography>
        )}
      </div>
    ),
    name: product.name,
    description: product.description,
    cost_price: `$${product.cost_price.toFixed(2)}`,
    category: product.category,
    sell_price: `$${product.sell_price.toFixed(2)}`,
    stock_quantity: product.stock_quantity,
    action: (
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button
          variant="contained"
          style={{
            backgroundColor: '#1A2D42',
            color: '#fff',
            textTransform: 'none',
            fontSize: '0.875rem',
          }}
          size="small"
          onClick={() => navigate(`/products/update/${product._id}`)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: '#dc3545',
            color: '#fff',
            textTransform: 'none',
            fontSize: '0.875rem',
          }}
          size="small"
          onClick={() => deleteProduct(product._id)}
        >
          Delete
        </Button>
      </div>
    ),
  }));

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await axios.delete(`http://localhost:5000/product/delete/${id}`);
      alert("Product deleted successfully");
      getProducts();
    }
  };

  const columns = [
    { label: 'Image', name: 'image', options: { filter: false, sort: false } },
    { label: 'Name', name: 'name', options: { filter: true, sort: true } },
    { label: 'Description', name: 'description', options: { filter: true, sort: true } },
    { label: 'Category', name: 'category', options: { filter: true, sort: true } },
    { label: 'Cost Price', name: 'cost_price', options: { filter: true, sort: true } },
    { label: 'Sell Price', name: 'sell_price', options: { filter: true, sort: true } },
    { label: 'Stock Quantity', name: 'stock_quantity', options: { filter: true, sort: true } },
    { label: 'Action', name: 'action', options: { filter: false, sort: false } },
  ];

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const { data } = await axios.get(BASE_URL);
    setProducts(data.products);

    const uniqueCategories = [
      "All",
      ...new Set(data.products.map((product) => product.category)),
    ];
    setCategories(uniqueCategories);
  };

  const bulkDelete = async (ids) => {
    try {
      await axios.delete('http://localhost:5000/product/bulk/delete', {
        data: { productIds: ids },
      });
      alert("Selected products deleted successfully");
      getProducts();
    } catch (error) {
      console.error(error);
      alert("Error deleting products");
    }
  };

  return (
    <AdminSidebar>
      <Box
        sx={{
          padding: '20px',
          background: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: '20px', fontWeight: 'bold', color: '#333' }}>
          Products List
        </Typography>

        <MUIDataTables
          title="Product Inventory"
          data={tableData}
          columns={columns}
          options={{
            responsive: 'standard',
            selectableRows: 'multiple',
            onRowsDelete: ({ data }) => {
              const ids = data.map((row) => products[row.dataIndex]._id);
              bulkDelete(ids);
            },
            expandableRows: true,
            renderExpandableRow: (rowData, rowMeta) => {
              const colSpan = rowData.length + 1;
              return (
                <TableRow>
                  <TableCell colSpan={colSpan}>{rowData[2]}</TableCell>
                </TableRow>
              );
            },
          }}
        />
      </Box>
    </AdminSidebar>
  );
}
