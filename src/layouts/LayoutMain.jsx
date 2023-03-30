import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { NavLink, Outlet } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BusinessIcon from '@mui/icons-material/Business';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import SdCardAlertIcon from '@mui/icons-material/SdCardAlert';
import ArticleIcon from '@mui/icons-material/Article';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  background: "#010101",
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: "#010101",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const settings = ["Profile", "Account", "Dashboard", "Logout"];
export default function LayoutMain({ classes }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openList, setOpenList] = React.useState(false);
  const [openListBlackLists, setOpenListBlackLists] = React.useState(false);

  // const loading = 
  const handleClick = () => {
    setOpenList(!openList);
  };

  const handleClickBlackLists = () => {
    setOpenListBlackLists(!openListBlackLists);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <div className="flex h-16 items-center justify-between w-full p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img className="h-10" src="assets/images/Logo_GL_blanco.png" />
              </div>
            </div>
            <div className="hiden md:block">
              <div className="ml-10 flex items-center md:ml-6">
                <Box sx={{ flexGrow: 0 }}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      src="assets/images/Logo_Winba.png"
                      className="rounded-full bg-white"
                    />
                  </IconButton>

                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    Tom Cook
                  </div>
                  <div className="text-xs font-medium leading-none text-gray-100">
                    tom@example.com
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <div className="bg-white rounded-full">
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon className="text-black" />
              ) : (
                <ChevronLeftIcon className="text-black" />
              )}
            </IconButton>
          </div>
        </DrawerHeader>
        <Divider />
        <List>
          <NavLink to="/users">
            <ListItemButton>
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText primary="Usuarios" />
            </ListItemButton>
          </NavLink>

          <NavLink to="/grupos">
            <ListItemButton>
              <ListItemIcon>
                <ApartmentIcon />
              </ListItemIcon>
              <ListItemText primary="Grupos" />
            </ListItemButton>
          </NavLink>

          <NavLink to="/empresas">
            <ListItemButton>
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText primary="Empresas" />
            </ListItemButton>
          </NavLink>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <LockPersonIcon />
            </ListItemIcon>
            <ListItemText primary="Autenticación" />
            {openList ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openList} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>

              <NavLink to="/empresas">
                <ListItemButton sx={{ pl: 8 }}>
                  <ListItemIcon>
                    <VpnKeyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Roles" />
                </ListItemButton>
              </NavLink>

              <NavLink to="/empresas">
                <ListItemButton sx={{ pl: 8 }}>
                  <ListItemIcon>
                    <VpnKeyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Permisos" />
                </ListItemButton>
              </NavLink>
            </List>
          </Collapse>

          <ListItemButton onClick={handleClickBlackLists}>
            <ListItemIcon>
              <SdCardAlertIcon />
            </ListItemIcon>
            <ListItemText primary="Listas Negras" />
            {openListBlackLists ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openListBlackLists} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>

              <NavLink to="/listasnegras69sat">
                <ListItemButton sx={{ pl: 8 }}>
                  <ListItemIcon>
                    <ArticleIcon />
                  </ListItemIcon>
                  <ListItemText primary="69SAT" />
                </ListItemButton>
              </NavLink>

              <NavLink to="/empresas">
                <ListItemButton sx={{ pl: 8 }}>
                  <ListItemIcon>
                    <ArticleIcon />
                  </ListItemIcon>
                  <ListItemText primary="69BSAT" />
                </ListItemButton>
              </NavLink>

              <NavLink to="/empresas">
                <ListItemButton sx={{ pl: 8 }}>
                  <ListItemIcon>
                    <ArticleIcon />
                  </ListItemIcon>
                  <ListItemText primary="69DOF" />
                </ListItemButton>
              </NavLink>
            </List>
          </Collapse>
        </List>
      </Drawer>

      <div
        className="w-full h-full"
        style={{ background: "rgb(229, 231, 235)", minHeight: "100vh" }}
      >
        <div className="mt-24 mb-10 mx-28 h-full bg-white p-6 rounded-md border border-gray-300 shadow-xl">
          <Outlet />
        </div>
      </div>
    </Box>
  );
}
