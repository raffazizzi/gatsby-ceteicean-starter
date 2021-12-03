const basePath = '/gatsby-ceteicean-starter'

module.exports = {
  pathPrefix: basePath,
  siteMetadata: {
    title: `Group Project`,
    description: `A template for a group project.`,
    author: `Tutors`
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
