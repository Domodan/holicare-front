// import React from "react";
// import { Link } from "react-router-dom";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
import logo from "../../assets/img/holicare-ws.png";
// // public/assets/holicare-ws.png

// import { Box, IconButton, Typography, useTheme } from "@mui/material";

// const navItems = ["Home", "About", "Contact"];
// const Head = () => {
//   return (
//     <div className="page-wrapper">
//       <header id="header" className="fixed-top d-flex align-items-center">
//         <div className="container d-flex align-items-center justify-content-between">
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//           >
//             <Box display="flex" justifyContent="center" alignItems="center">
//               <img
//                 alt="holicare-logo"
//                 width="102px"
//                 height="82px"
//                 src={logo}
//                 style={{ cursor: "pointer" }}
//               />
//             </Box>
//           </Box>
//           <nav id="navbar" className="navbar">
//             <i className="bi bi-list mobile-nav-toggle"></i>
//           </nav>
//         </div>
//       </header>
//     </div>
//   );
// };

// export default Head;
import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const drawerWidth = 240;
const navItems = ["Home", "About","Partners", "Contact"];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <img
          alt="holicare-logo"
          width="102px"
          height="82px"
          src={logo}
          style={{ cursor: "pointer", my:2 }}
        />
      </Box>
      <Divider />
      <div>
        
            <Link to="/services" >
              Home
            </Link>
            <Link >
            <Typography
            variant="h6"
            noWrap
            component="a"
            href="/about"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
            </Link>
            <Link href="/contact" >
              Contact
            </Link>
            <Link href="/partners" >
              Partners
            </Link>
            <Link href="/faq" >
              FAQ
            </Link>
          </div>
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", }}>
      <CssBaseline />
      <AppBar component="nav" sx={{backgroundColor:"white"}}>
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          
            
           <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <img
              alt="holicare-logo"
              width="102px"
              height="82px"
              src={logo}
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            />
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "black" }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
