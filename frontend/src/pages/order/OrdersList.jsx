import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../layouts/AdminSideBar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { baseUrl } from '../../assets/constant';
import { Button, TableCell, TableRow, TextField } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function OrdersList() {
    const [orders, setOrders] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const { access_token } = useSelector(state => state.auth);

    const getAllOrders = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/order/all`, {
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                },
            });

            setOrders(data.orders);
        } catch (error) {
            console.log(error);
        }
    };

    const filterOrdersByDate = () => {
        if (!startDate || !endDate) return setFilteredOrders(orders); // If no date range is selected, show all orders

        const filtered = orders.filter((order) => {
            const orderDate = new Date(order.createdAt);
            return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
        });

        setFilteredOrders(filtered);
    };

    useEffect(() => {
        getAllOrders();
    }, []);

    useEffect(() => {
        filterOrdersByDate(); // Re-filter orders when the date range changes
    }, [startDate, endDate, orders]);

    // Count the finished orders for the chart
    const finishedOrdersCount = filteredOrders.filter(order => order.status.toLowerCase() === 'finished').length;

    // Data for the line chart (formatted to show data by date)
    const chartData = {
        labels: filteredOrders.map(order => new Date(order.createdAt).toLocaleDateString('en-US')), // Order dates
        datasets: [
            {
                label: 'Finished Orders',
                data: filteredOrders.map(order => order.status.toLowerCase() === 'finished' ? 1 : 0),
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 1)',
                borderColor: 'rgba(75, 192, 192, 0.6)',
                tension: 0.1,
            },
        ],
    };

    // Table data
    const tableData = filteredOrders.map(order => {
        return {
            user: order.user.username,
            order_date: order.createdAt,
            status: order.status,
            action: order,
            order: JSON.stringify(order), // added
        };
    });

    const columns = [
        {
            label: 'Order',
            name: 'order',
            options: {
                display: false,
            },
        },
        {
            label: 'Ordered Date',
            name: 'order_date',
            options: {
                customBodyRender: (orderDate) => {
                    const date = new Date(orderDate);
                    const options = { month: 'short', day: 'numeric', year: 'numeric' };
                    const formattedDate = date.toLocaleDateString('en-US', options);
                    return formattedDate;
                },
            },
        },
        {
            label: 'Status',
            name: 'status',
        },
        {
            label: 'Action',
            name: 'action',
            options: {
                customBodyRender: (order) => {
                    if (order.status.toLowerCase() === "pending") {
                        return (
                            <div style={{ display: 'flex', gap: 5 }}>
                                <Button variant='outlined' color='error' size='small'
                                    onClick={() => updateStatus({ id: order._id, status: 'cancelled' })}>
                                    Cancel
                                </Button>
                                <Button variant='outlined' color='success' size='small'
                                    onClick={() => updateStatus({ id: order._id, status: 'confirmed' })}>
                                    Confirm
                                </Button>
                            </div>
                        );
                    } else if (order.status.toLowerCase() === "cancelled") {
                        return (
                            <Button variant='outlined' size='small' disabled={true} >
                                No Action
                            </Button>
                        );
                    } else if (order.status.toLowerCase() === "confirmed") {
                        return (
                            <Button variant='outlined' size='small'
                                onClick={() => updateStatus({ status: 'on-delivery', id: order._id, })}>
                                Deliver
                            </Button>
                        );
                    } else if (order.status.toLowerCase() === "on-delivery") {
                        return (
                            <Button variant='outlined' size='small'
                                onClick={() => updateStatus({ status: 'delivered', id: order._id, })}>
                                Delivered
                            </Button>
                        );
                    } else if (order.status.toLowerCase() === "delivered") {
                        return (
                            <Button variant='outlined' size='small'
                                onClick={() => updateStatus({ status: 'finished', id: order._id, })}>
                                Finish
                            </Button>
                        );
                    } else {
                        return (
                            <Button variant='outlined' size='small' disabled={true} >
                                No Action
                            </Button>
                        );
                    }
                }
            }
        }
    ];

    const updateStatus = async ({ id, status }) => {
        try {
            const { data } = await axios.post(`${baseUrl}/order/update/status/${id}`, {
                status: status,
            }, {
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                },
            });

            alert("Order Updated");
            getAllOrders();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <AdminSidebar>
            {/* Date range filter */}
            <div style={{ marginBottom: '20px' }}>
                <TextField
                    type="date"
                    label="Start Date"
                    variant="outlined"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <TextField
                    type="date"
                    label="End Date"
                    variant="outlined"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={filterOrdersByDate}
                >
                    Apply Filter
                </Button>
            </div>

            {/* Line chart displaying finished orders */}
            <div style={{ marginBottom: '20px', width: '100%', height: '40vh' }}>
                <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>

            {/* Orders table */}
            <MUIDataTable
                title={"Order List"}
                data={tableData}
                columns={columns}
                options={{
                    responsive: 'standard',
                    filterType: 'multiselect',
                    expandableRows: true,
                    renderExpandableRow: (rowData) => {
                        const order = JSON.parse(rowData[0]);
                        const orderItems = order.order_items;
                        return (
                            <TableRow style={{ flexWrap: 'wrap' }}>
                                <TableCell />
                                {orderItems.map(item => (
                                    <TableCell style={{ minWidth: 'fit-content' }}>
                                        <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                                            <img src={item.product.images[0].url} width={60} height={60} />
                                            <div>
                                                <div><strong>Product:</strong> {item.product.name}</div>
                                                <div><strong>Quantity:</strong> {item.quantity}</div>
                                                <div><strong>Total Price:</strong> P{item.quantity * item.product.sell_price}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                        );
                    },
                }}
            />
        </AdminSidebar>
    );
}
