import React from "react";
import PropTypes from "prop-types";
import Link, { navigateTo } from "gatsby-link"


import { withStyles } from "material-ui/styles";
import Drawer from "material-ui/Drawer";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import List from "material-ui/List";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import Hidden from "material-ui/Hidden";
import Divider from "material-ui/Divider";
import MenuIcon from "material-ui-icons/Menu";
import { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import InboxIcon from "material-ui-icons/MoveToInbox";

import BookIcon from "material-ui-icons/ImportContacts";
import ChairIcon from "material-ui-icons/EventSeat";
import AboutIcon from "material-ui-icons/Info";
import MusicNoteIcon from "material-ui-icons/MusicNote";

import withRoot from "../withRoot";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: "100%",
    zIndex: 1,
    overflow: "hidden"
  },
  appFrame: {
    position: "relative",
    display: "flex",
    width: "100%",
    height: "100%"
  },
  appBar: {
    position: "absolute",
    marginLeft: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      position: "relative",
    }
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: "100%",
    padding: theme.spacing.unit * 3,
    height: "calc(100% - 56px)",
    marginTop: 56,
    [theme.breakpoints.up("sm")]: {
      height: "calc(100% - 64px)",
      marginTop: 64
    }
  }
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes, theme, children } = this.props;

    const drawer = (
      <div>
        <div className={classes.drawerHeader} />
        <Divider />
        <List>
          <div>
            <ListItem component={Link} to="/campaigns" button>
              <ListItemIcon>
                <ChairIcon />
              </ListItemIcon>
              <ListItemText primary="Campaigns" />
            </ListItem>
            <ListItem component={Link} to="/music" button>
              <ListItemIcon>
                <MusicNoteIcon />
              </ListItemIcon>
              <ListItemText primary="Music" />
            </ListItem>
            <ListItem component={Link} to="/about" button>
              <ListItemIcon>
                <AboutIcon />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
            <ListItem component={Link} to="/blog" button>
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText primary="Blog" />
            </ListItem>
          </div>
        </List>
        <Divider />
      </div>
    );

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                <MenuIcon />
              </IconButton>
              <Typography type="title" color="inherit" noWrap>
                Personal Dungeon Master
              </Typography>
            </Toolbar>
          </AppBar>
          <Hidden mdUp>
            <Drawer
              type="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              classes={{
                paper: classes.drawerPaper
              }}
              onClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              type="permanent"
              open
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <main className={classes.content}>
            {children()}
          </main>
        </div>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withRoot(
  withStyles(styles, { withTheme: true })(ResponsiveDrawer)
);
