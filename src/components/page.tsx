import React from "react"
import Layout from "./layout"
import { ThemeProvider } from '@material-ui/core/styles'

import theme from "../theme"

export default function Page({ pageContext }: any) {
  return (
    <ThemeProvider theme={theme}>
      <Layout location={pageContext.name}>
        <main dangerouslySetInnerHTML={{__html: pageContext.rawContent}}/>
      </Layout>
    </ThemeProvider>
  )
}