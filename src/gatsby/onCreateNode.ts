import replacePath from './replacePath';
import { createFilePath } from 'gatsby-source-filesystem';

export const onCreateNode = ({ node, getNode, actions }: {
    node: any;
    getNode: any;
    actions: any;
}) => {
    const { createNodeField } = actions
    if (node.internal.type === `MarkdownRemark`) {
      const slug = createFilePath({ node, getNode, basePath: `pages` })
      createNodeField({
        node,
        name: `slug`,
        value: replacePath(slug),
      })
    } else if (node.internal.type === 'Mdx') {
      const value = createFilePath({ node, getNode })
      createNodeField({
        name: 'slug',
        node,
        value: replacePath(value),
      })
    }

    if (node.internal.type === 'SitePage') {
      createNodeField({
        node,
        name: 'slug',
        value: '/404.html',
      })
    }
  }