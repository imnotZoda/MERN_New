import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../layouts/AdminSideBar';

import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBTextArea,
  MDBFile,
  MDBBtn,
  MDBContainer
} from 'mdb-react-ui-kit';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ProductCreate() {
  const categorySits = [
    'VIP Standing',
    'Upper Box A',
    'Upper Box B',
    'Lower Box A',
    'Lower Box B',
    'Gen Ad',
  ];

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    category: Yup.string().required('Category is required'),
    sell_price: Yup.number()
      .required('Sell price is required')
      .positive('Sell price must be a positive number'),
    cost_price: Yup.number()
      .required('Cost price is required')
      .positive('Cost price must be a positive number'),
    stock_quantity: Yup.number()
      .required('Stock quantity is required')
      .integer('Stock quantity must be an integer')
      .min(0, 'Stock quantity cannot be negative'),
    images: Yup.string().required('Images are required'),
  });

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      name: '',
      description: '',
      category: '',
      sell_price: '',
      cost_price: '',
      stock_quantity: '',
      images: '',
    },
    onSubmit: () => saveData(),
  });

  const saveData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', formik.values.name);
      formData.append('description', formik.values.description);
      formData.append('category', formik.values.category);
      formData.append('sell_price', formik.values.sell_price);
      formData.append('cost_price', formik.values.cost_price);
      formData.append('stock_quantity', formik.values.stock_quantity);

      for (let i = 0; i < formik.values.images.length; i++) {
        formData.append('images', formik.values.images[i]);
      }
      const { data } = await axios.post('http://localhost:5000/product/create/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/products/list');
      alert(data.message);
    } catch (error) {
      alert('Error creating product');
    }
  };

  return (
    <AdminSidebar>
      <Box
        sx={{
          padding: '20px',
          background: '#f5f5f5',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
          Create Product
        </h2>
        <MDBContainer>
          <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', background: '#fff' }}>
            <MDBRow style={{ marginBottom: '15px' }}>
              <MDBCol>
                <MDBInput
                  name="name"
                  label="Product Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && <small style={{ color: 'red' }}>{formik.errors.name}</small>}
              </MDBCol>
            </MDBRow>

            <MDBRow style={{ marginBottom: '15px' }}>
              <MDBCol>
                <MDBTextArea
                  name="description"
                  label="Product Description"
                  rows={4}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                />
                {formik.touched.description && <small style={{ color: 'red' }}>{formik.errors.description}</small>}
              </MDBCol>
            </MDBRow>

            <MDBRow style={{ marginBottom: '15px' }}>
              <MDBCol>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="category">Categories</InputLabel>
                    <Select
                      id="category"
                      name="category"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.category}
                    >
                      {categorySits.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                {formik.touched.category && <small style={{ color: 'red' }}>{formik.errors.category}</small>}
              </MDBCol>
            </MDBRow>

            <MDBRow style={{ marginBottom: '15px' }}>
              <MDBCol>
                <MDBInput
                  id="sell_price"
                  name="sell_price"
                  type="number"
                  label="Sell Price"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sell_price}
                />
                {formik.touched.sell_price && <small style={{ color: 'red' }}>{formik.errors.sell_price}</small>}
              </MDBCol>
            </MDBRow>

            <MDBRow style={{ marginBottom: '15px' }}>
              <MDBCol>
                <MDBInput
                  id="cost_price"
                  name="cost_price"
                  type="number"
                  label="Cost Price"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cost_price}
                />
                {formik.touched.cost_price && <small style={{ color: 'red' }}>{formik.errors.cost_price}</small>}
              </MDBCol>
            </MDBRow>

            <MDBRow style={{ marginBottom: '15px' }}>
              <MDBCol>
                <MDBInput
                  id="stock_quantity"
                  name="stock_quantity"
                  type="number"
                  label="Stock Quantity"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.stock_quantity}
                />
                {formik.touched.stock_quantity && <small style={{ color: 'red' }}>{formik.errors.stock_quantity}</small>}
              </MDBCol>
            </MDBRow>

            <MDBRow style={{ marginBottom: '15px' }}>
              <MDBCol>
                <MDBFile
                  id="images"
                  name="images"
                  multiple
                  label="Upload Image"
                  onChange={(e) => formik.setFieldValue('images', e.target.files)}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.images && <small style={{ color: 'red' }}>{formik.errors.images}</small>}
              </MDBCol>
            </MDBRow>

            <MDBBtn
              onClick={formik.handleSubmit}
              className="mb-4"
              style={{ backgroundColor: '#1A2D42', color: '#fff', fontWeight: 'bold' }}
              block
            >
              Submit
            </MDBBtn>
          </div>
        </MDBContainer>
      </Box>
    </AdminSidebar>
  );
}
