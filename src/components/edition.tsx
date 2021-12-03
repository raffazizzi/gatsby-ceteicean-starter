import React from "react"
import { graphql, Link } from "gatsby"
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Layout from "../components/layout"
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

import "../CETEIcean.css"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    listItem: {
      paddingTop: '10px'
    }
  }),
);

export default function Edition({ data, pageContext }: any) {
  const classes = useStyles()
  return (
    <Layout location="edition">
      <div dangerouslySetInnerHTML={{__html: pageContext.rawContent}}/>
      <List className={classes.root} dense>
        {
        data.allCetei.nodes.map((n: any, i: Number) => (
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                TEI
              </Avatar>
            </ListItemAvatar>
            <ListItemText className={classes.listItem} primary={<Link to={`/${n.parent.name}`} key={`l${i}`} >
                {n.parent.name}
              </Link>}>
              
            </ListItemText>
          </ListItem>
        ))
      }
      </List>
    </Layout>
  )
}

export const query = graphql`
  query {
    allCetei {
      nodes {
        prefixed
        elements
        parent {
          ... on File {
            name
          }
        }
      }
    }
  }
`