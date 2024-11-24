import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useNavigate } from "react-router-dom";
import { auth } from '../utils/firebase';
import logo from '../assets/img/logomern.png'; // Import the logo image

export default function AdminSidebar({ children }) {

    const navigate = useNavigate();

    const logout = () => {
        auth.signOut();
        navigate('/login');
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar
                style={{
                    backgroundColor: "#D4D8DD", // Light gray background for sidebar
                    borderRadius: "20px 0 0 20px", 
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
                    padding: "20px",
                    width: "250px", // Adjust the width as needed
                    height: "100vh", // Make it full height
                    position: "fixed", // Keep it fixed to the left side
                    top: "0", // Align to top
                    left: "0", // Align to left
                    zIndex: 999, // Ensure sidebar is always on top
                }}
            >
                <Menu>
                    {/* Add Logo */}
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <img
                            src={logo}
                            alt="Logo"
                            style={{ maxWidth: '80%', height: 'auto', borderRadius: '10px' }}
                        />
                    </div>

                    {/* Sidebar Menus */}
                    <SubMenu
                        label="Product"
                        style={{
                            backgroundColor: "#1A2D42", 
                            borderRadius: "10px", 
                            padding: "10px",
                            marginBottom: "15px",
                            color: "#FFFFFF"
                        }}
                    >
                        <MenuItem
                            onClick={() => navigate("/products/list")}
                            style={{
                                padding: "10px",
                                borderRadius: "10px",
                                backgroundColor: "#1A2D42", // Dark blue for active menu item
                                margin: "5px 0",
                                color: "#FFFFFF", // White text for contrast
                                fontWeight: "bold",
                            }}
                        >
                            List All
                        </MenuItem>
                        <MenuItem
                            onClick={() => navigate("/products/create")}
                            style={{
                                padding: "10px",
                                borderRadius: "10px",
                                backgroundColor: "#1A2D42", // Dark blue for active menu item
                                margin: "5px 0",
                                color: "#FFFFFF", // White text for contrast
                                fontWeight: "bold",
                            }}
                        >
                            Create New
                        </MenuItem>
                    </SubMenu>
                    <MenuItem
                        onClick={() => navigate("/orders")}
                        style={{
                            padding: "10px",
                            borderRadius: "10px",
                            backgroundColor: "#1A2D42", // Dark blue for orders
                            margin: "5px 0",
                            color: "#FFFFFF", // White text for contrast
                            fontWeight: "bold",
                        }}
                    >
                        Orders
                    </MenuItem>
                    <MenuItem
                        onClick={logout}
                        style={{
                            padding: "10px",
                            borderRadius: "10px",
                            backgroundColor: "#1A2D42", // Dark blue for logout
                            margin: "5px 0",
                            color: "#FFFFFF", // White text for contrast
                            fontWeight: "bold",
                        }}
                    >
                        Logout
                    </MenuItem>
                </Menu>
            </Sidebar>

            <main
                className='flex-grow-1'
                style={{
                    padding: "20px",
                    marginLeft: "250px", // Adjust for sidebar width
                    borderRadius: "20px",
                    backgroundColor: "#F8F9FA", // Light gray background for content
                    height: "100vh", // Ensure content fills the remaining height
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                }}
            >
                {children}
            </main>
        </div>
    );
}
