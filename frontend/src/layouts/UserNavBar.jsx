import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import CartIcon from '@mui/icons-material/ShoppingBag';
import { Badge } from '@mui/material';
import { useSelector } from 'react-redux';
import { Navigate, Route, useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';

const pages = [
  { route: '/', label: 'Home' },
];
const settings = ['Profile', 'Account', 'Logout'];

export default function UserNavBar() {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#1A2D42',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        padding: '0 1rem',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate('/')}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#AAB7B7',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            ThrillTix
          </Typography>

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(page.route);
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: 'center',
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: 'bold',
                      color: '#1A2D42',
                    }}
                  >
                    {page.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: '#AAB7B7' }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => navigate('/')}
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#AAB7B7',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            ThrillTix
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={() => {
                  handleCloseNavMenu();
                  navigate(page.route);
                }}
                sx={{
                  my: 2,
                  color: '#AAB7B7',
                  fontWeight: 'bold',
                  fontFamily: 'Roboto, sans-serif',
                  '&:hover': {
                    color: '#FFFFFF',
                  },
                }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          {/* Cart Icon */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <IconButton
              onClick={() => navigate('/cart')}
              size="large"
              aria-label="cart items"
              sx={{
                color: '#AAB7B7',
                '&:hover': {
                  color: '#FFFFFF',
                },
              }}
            >
              <Badge badgeContent={cartItems.length} color="error">
                <CartIcon />
              </Badge>
            </IconButton>

            {/* User Profile Avatar */}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
                {/* <MenuItem onClick={() => {
                  handleCloseUserMenu()
                  navigate('/profile')
                }}>
                  <Typography sx={{ textAlign: 'center' }}> Profile </Typography>
                </MenuItem> */}


                <MenuItem onClick={() => {
                  handleCloseUserMenu()
                  auth.signOut()
                  navigate('/login')
                }}>
                  <Typography sx={{ textAlign: 'center' }}> Logout </Typography>
                </MenuItem>
              
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
