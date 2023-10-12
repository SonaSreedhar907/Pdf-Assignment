import React, { useState } from 'react'
import { AppBar, Toolbar, Typography , Tabs ,Tab } from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { NavLink } from 'react-router-dom';

function Header() {
    const [value,setValue]=useState()
  return (
    <div>
        <AppBar position='sticky'>
            <Toolbar>
                <Typography>
                   <PictureAsPdfIcon/>
                </Typography>
                <Tabs
                  sx={{ml:"auto"}}
                  textColor="inherit"
                  indicatorColor="primary"
                  value={value}
                  onChange={(e,val)=>setValue(val)}
                >
                    <Tab LinkComponent={NavLink} to='/' label="Home"/>
                    <Tab LinkComponent={NavLink} to='/add' label="Add PDF"/>
                </Tabs>
            </Toolbar>
        </AppBar>
    </div>
  )
}

export default Header