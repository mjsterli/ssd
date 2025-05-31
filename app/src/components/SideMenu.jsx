import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import {
  faGear,
  faHouse,
  faSignHanging,
  faUserClock,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListItem, ListItemIcon, ListSubheader } from "@mui/material";
import Chip from "@mui/material/Chip";
import { Link } from "@tanstack/react-router";

export default function SelectedListItem() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List
        component="nav"
        aria-label="main mailbox folders"
        subheader={<ListSubheader>Menu</ListSubheader>}
      >
        <ListItemButton component={Link} to="/" selected={selectedIndex === 0}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faHouse} />
          </ListItemIcon>
          <ListItemText primary="DashBoard" />
        </ListItemButton>
        <ListItemButton
          component={Link}
          to="/customers"
          selected={selectedIndex === 1}
        >
          <ListItemIcon>
            <FontAwesomeIcon icon={faUserGroup} />
          </ListItemIcon>
          <ListItemText primary="Customers" />
          <ListItemIcon>
            <Chip label="16" />
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton component={Link} to='/orders'
          selected={selectedIndex === 2}
        >
          <ListItemIcon>
            <FontAwesomeIcon icon={faSignHanging} />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItemButton>
      </List>
      <Divider />
      <List component="nav" subheader={<ListSubheader>Tools</ListSubheader>}>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemIcon>
            <FontAwesomeIcon icon={faGear} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
        >
          <ListItemIcon>
            <FontAwesomeIcon icon={faUserClock} />
          </ListItemIcon>
          <ListItemText primary="Employees" />
        </ListItemButton>
      </List>
    </Box>
  );
}
