
import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

const SEO = ({ title , description }: {
    title: string;
    description?: string;
}) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  
  const defaultDescription = "✨ Beautify your application with vCodes — Whether you manage your bot(s), or search for users or bots to improve your bot(s).";

  return (
    <>
        <title>{title}: {"vCodes — API Docs for Developers"}</title>
        <meta name="description" content={description || defaultDescription} />
        <link rel="icon" href="https://cdn.vcodes.xyz/assets/icon.png" />
        <meta name="theme-color" content="#7c3aed" />
        <meta name="og:title" content={title +": vCodes — API Docs for Developers"} />
        <meta name="og:description" content={description || defaultDescription} />
        <meta name="og:image" content="https://cdn.vcodes.xyz/assets/logo.png" />
        <meta name="og:url" content="https://developers.vcodes.xyz" />
        <meta name="og:type" content="website" />
        <meta name="og:site_name" content="vCodes — API Docs for Developers" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@vDiscordBots" />
        <meta name="twitter:creator" content="@vDiscordBots" />
        <meta name="twitter:title" content={title +": vCodes — API Docs for Developers"} />
        <meta name="twitter:description" content={description || defaultDescription} />
        <meta name="twitter:image" content="https://cdn.vcodes.xyz/assets/logo.png" />
        <meta name="twitter:image:alt" content="vCodes Logo" />
    </>
  )
}

export default SEO
