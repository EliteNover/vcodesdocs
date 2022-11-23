/*

    Gatsby.js - Documentation
    Developed by: Void Development
    © 2019 - 2022, All Rights Reserved.
    Under the MIT License.

*/


import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  pathPrefix: "/getting-started",
  siteMetadata: {
    title: `vCodes.xyz - Documentation`,
    description: `vCodes.xyz - Documentation`,
    siteUrl: `https://github.com/vcodes-xyz/docs`
  },
  plugins: [
    'gatsby-plugin-netlify',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-highlight-code`,
            options: {
              terminal: "carbon",
              theme: "blackboard",
              lineNumbers: true,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-highlight-code`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: `${__dirname}/content/`,
      },
    }
  ],
}

export default config
