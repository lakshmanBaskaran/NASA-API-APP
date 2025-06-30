import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeIcon from '@mui/icons-material/Home'
import DashboardIcon from '@mui/icons-material/Dashboard'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const menu = [
  { text: 'Home', icon: <HomeIcon />, to: '/' },
  { text: 'Dashboard', icon: <DashboardIcon />, to: '/dashboard' }
]

export default function Layout() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpen(true)}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            NASA Data Explorer
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 240 }} onClick={() => setOpen(false)}>
          <List>
            {menu.map(i => (
              <ListItem button key={i.text} component={Link} to={i.to}>
                <ListItemIcon>{i.icon}</ListItemIcon>
                <ListItemText primary={i.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box sx={{ p: 2 }}>
        <Outlet />
      </Box>
    </>
  )
}
