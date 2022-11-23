import { resolve } from 'path'
import replacePath from './replacePath'


export const createPages = ({ actions, graphql }: {
    actions: any;
    graphql: any;
}) => {
  const { createPage } = actions
  const Template = resolve(`src/components/Layout.mdx.tsx`)
  return graphql(`
    {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `).then((result: any) => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    result.data.allMdx.edges.forEach(({ node }: any) => {
      createPage({
        path: replacePath(node.fields.slug),
        component: Template,
        context: { id: node.id }
      })
    })
  })
}