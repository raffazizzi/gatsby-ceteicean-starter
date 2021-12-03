const basePath = '/mith301-project'

module.exports = {
  pathPrefix: basePath,
  siteMetadata: {
    title: `Group Project`,
    description: `A template for the MITH301 group project.`,
    author: `MITH301 Teachers`
  },
  plugins: [
    `gatsby-plugin-material-ui`,
    `gatsby-theme-ceteicean`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `src/content/tei`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `src/content/pages`,
        name: `html`,
      },
    },
  ],
}
