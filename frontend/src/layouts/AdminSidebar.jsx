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
            <Sidebar>
                <Menu>
                    {/* Add Logo */}
                    <div style={{ textAlign: 'center', margin: '20px 0' }}>
                        <img 
                            src={logo} 
                            alt="Logo" 
                            style={{ maxWidth: '80%', height: 'auto' }} 
                        />
                    </div>

                    {/* Sidebar Menus */}
                    <SubMenu label="Product">
                        <MenuItem onClick={() => navigate("/products/list")}> List All</MenuItem>
                        <MenuItem onClick={() => navigate("/products/create")}> Create New </MenuItem>
                    </SubMenu>
                    <MenuItem onClick={() => navigate("/orders")}> Orders </MenuItem>
                    <MenuItem onClick={logout}> Logout </MenuItem>
                    <MenuItem> Calendar </MenuItem>
                </Menu>
            </Sidebar>
            <main className='flex-grow-1' style={{ padding: 10, overflow: 'hidden' }}>
                {children}
            </main>
        </div>
    );
}