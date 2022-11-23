
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

  return (
    <>
        <title>{title} | {data.site.siteMetadata.title}</title>
        {description && <meta name="description" content={description} />}
        <link rel="icon" href="https://cdn.vcodes.xyz/assets/logo.png" />
        <meta name="theme-color" content="#090a0f" />
        <meta name="og:title" content={title} />
        {description && <meta name="og:description" content={description} />}
        <meta name="og:image" content="https://cdn.vcodes.xyz/assets/logo.png" />
        <meta name="og:url" content="https://developers.vcodes.xyz" />
        <meta name="og:type" content="website" />
        <meta name="og:site_name" content="vCodes" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@vDiscordBots" />
        <meta name="twitter:creator" content="@vDiscordBots" />
        <meta name="twitter:title" content={title} />
        {description && <meta name="twitter:description" content={description} />}
        <meta name="twitter:image" content="https://cdn.vcodes.xyz/assets/logo.png" />
        <meta name="twitter:image:alt" content="vCodes Logo" />
    </>
  )
}

export default SEO