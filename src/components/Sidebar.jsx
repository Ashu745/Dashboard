import React from 'react';
import { NavLink } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';

const Sidebar = () => {
  return (
    <List>
      <ListItem button component={NavLink} to="/dashboard">
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={NavLink} to="/tables">
        <ListItemText primary="Tables" />
      </ListItem>
      <ListItem button component={NavLink} to="/charts">
        <ListItemText primary="Charts" />
      </ListItem>
      <ListItem button component={NavLink} to="/calendar">
        <ListItemText primary="Calendar" />
      </ListItem>
      <ListItem button component={NavLink} to="/kanban">
        <ListItemText primary="Kanban Board" />
      </ListItem>
      <ListItem button component={NavLink} to="/form">
        <ListItemText primary="Form" />
      </ListItem>
    </List>
  );
};

export default Sidebar;
