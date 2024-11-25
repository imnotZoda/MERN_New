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
        <div style={{ display: 'flex', height: '100%', minHeight: '100vh' }}>
            {/* Sidebar with enhanced styling */}
            <Sidebar
                style={{
                    backgroundColor: '#1A2D42', // Sidebar background
                    color: '#D4D8DD',          // Text color
                    minWidth: '250px',
                    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
                    borderRadius: '10px',     // Rounded corners
                }}
            >
                <Menu
                    menuItemStyles={{
                        button: ({ active }) => ({
                            backgroundColor: active ? '#2E4156' : 'transparent', // Active state color
                            color: '#000000',              // Active text color
                            borderRadius: '8px',  // Smooth corners
                            padding: '10px 20px',
                            margin: '5px 0',
                            transition: 'all 0.3s ease', // Smooth hover transition
                        }),
                        icon: {
                            color: '#AAB7B7', // Icon color
                        },
                    }}
                >
                    {/* Logo Section */}
                    <div style={{ textAlign: 'center', margin: '20px 0' }}>
                        <img 
                            src={logo} 
                            alt="Logo" 
                            style={{
                                maxWidth: '80%',
                                height: 'auto',
                                borderRadius: '10px', // Slightly rounded logo
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', // Subtle shadow
                            }} 
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
                    <MenuItem onClick={() => navigate("/orders")}> Orders </MenuItem>
                    <MenuItem onClick={logout}> Logout </MenuItem>
                </Menu>
            </Sidebar>
            <main
                className='flex-grow-1'
                style={{
                    padding: 10,
                    overflow: 'hidden',
                    backgroundColor: '#F5F7FA', // Light background for the main content
                }}
            >
                {children}
            </main>
        </div>
    );
}
