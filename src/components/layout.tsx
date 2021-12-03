import React from 'react'
import { useStaticQuery, graphql, navigate } from "gatsby"
import clsx from 'clsx'
import { makeStyles, createStyles, ThemeProvider } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ArrowRight from '@material-ui/icons/ArrowRight'

import theme from "../theme"
import "../style.css"

const drawerWidth = 240

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    drawerText: {
      padding: theme.spacing(3),
    },
    content: {
      flexGrow: 1,
      paddingTop: "2em",
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    appbarSpacer: {
      flex: '1 1 auto'
    },
    listIcon: {
      paddingBottom: '1rem'
    },
    title: {
      cursor: 'pointer'
    }
  }),
)

interface Props {
  location?: string
  children?: any
}

export default function Layout({children}: Props) {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          author
          description
        }
      }
      allFile(filter: {extension: {eq: "html"}}, sort: {fields: name, order: ASC}) {
        nodes {
          name
        }
      }
    }
  `)

  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const pages = data.allFile.nodes.filter((item: any) => item.name !== 'home')
  pages.unshift({name: 'home'})

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.appbarSpacer}/>
            <Typography variant="h6" noWrap color="secondary" onClick={() => navigate('/')}
              className={classes.title}>
              {data.site.siteMetadata.title}
            </Typography>
            <div className={classes.appbarSpacer}/>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <Typography paragraph className={classes.drawerText} variant="caption">
            {data.site.siteMetadata.description}
            <br/><em>By: {data.site.siteMetadata.author}</em>
          </Typography>
          <Divider />
          <List dense>
            {pages.map((node: any) => {
              const title = node.name.charAt(0).toUpperCase() + node.name.slice(1)
              const link = node.name === 'home' ? '' : node.name
              return (
                <ListItem button key={node.name}>
                  <ListItemIcon className={classes.listIcon}><ArrowRight/></ListItemIcon>
                  <ListItemText
                    primary={title} onClick={() => navigate(`/${link}`)} />
                </ListItem>)
            })}
            <ListItem button>
              <ListItemIcon className={classes.listIcon}><ArrowRight/></ListItemIcon>
              <ListItemText primary="Annotate me"
                onClick={() => {
                  const hypothesis = document.createElement('script')
                  hypothesis.setAttribute('src','https://hypothes.is/embed.js')
                  document.head.appendChild(hypothesis)}
                }/>
            </ListItem>
          </List>
          <Divider />
          <Typography paragraph className={classes.drawerText} variant="caption">
            Built with <a href="https://github.com/raffazizzi/gatsby-theme-ceteicean" target="_blank">Gatsby Theme Ceteicean</a>.
            Distributed under an MIT license. Other content on
            this site is released under a <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">
              Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.
          </Typography>
        </Drawer>
        <Container maxWidth="md" component="main"
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {children}
        </Container>
      </div>
    </ThemeProvider>
  )
}
