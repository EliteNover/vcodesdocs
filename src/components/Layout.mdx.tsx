import * as React from 'react'
import { graphql } from 'gatsby'
import RootLayout from './Layout.root';
import { MDXProvider } from "@mdx-js/react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import SEO from './SEO';
import createSlug from '../utils/createSlug';

export default function Layout({ data: { mdx, allMdx } }: any) {
  const components: {
    [key: string]: React.ComponentType<any>
  } = {
    h1: ({ children }) => <h1 className="flex items-center gap-1 text-2xl font-bold text-white group">{children}</h1>,
    h2: ({ children }) => <h2 className="flex items-center gap-1 text-xl font-bold text-white group">{children}</h2>,
    h3: ({ children }) => <h3 className="flex items-center gap-1 text-lg font-bold text-white group">{children}</h3>,
    blockquote: ({ children }) => <blockquote className="p-4 bg-dark-2 border-l border-violet-600">{children}</blockquote>,
    code: ({ node, inline, className, lineNumbers = true, children, ...props }: {
      node: any,
      inline: boolean,
      className: string,
      lineNumbers: boolean,
      children: any,
      props: any
    }) => {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <deckgo-highlight-code
          language={match?.[1] || "text"}
          {...props}
        >
          <code slot="code">{String(children).replace(/\n$/, '')}</code>
        </deckgo-highlight-code>
      ) : (
        <mark  className="p-1 bg-dark-2 rounded-md text-violet-600 px-2">
          {children}
        </mark>
      )
    },
  };
  return (
    <RootLayout sidebarRoot={mdx.frontmatter.root} mdx={mdx}>
      <MDXProvider>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={components}
          className="prose prose-sm lg:prose-lg prose-invert prose-pre:!relative prose-pre:!p-0 prose-headings:p-0 prose-pre:!bg-transparent prose-pre:!text-white prose-pre:!rounded-none prose-pre:!overflow-x-auto"
        >

          {
            mdx.body
              .replace(/\(tm\)|\(TM\)/g, '™')
              .replace(/\(r\)|\(R\)/g, '®')
              .replace(/\(c\)|\(C\)/g, '©')
              .replace(/\(p\)|\(P\)/g, '§')
              .replace(/\(deg\)|\(DEG\)/g, '°')
              .replace(/\(plusmn\)|\(PLUSMN\)/g, '±')
              .replace(/\(times\)|\(TIMES\)/g, '×')
              .replace(/\(divide\)|\(DIVIDE\)/g, '÷')
              .replace(/\(cent\)|\(CENT\)/g, '¢')
              .replace(/\(pound\)|\(POUND\)/g, '£')
              .replace(/\(yen\)|\(YEN\)/g, '¥')
              .replace(/\(euro\)|\(EURO\)/g, '€')
              .replace(/\(sect\)|\(SECT\)/g, '§')
              .replace(/\(para\)|\(PARA\)/g, '¶')
              .replace(/\(middot\)|\(MIDDOT\)/g, '·')
              .replace(/\(copy\)|\(COPY\)/g, '©')
              .replace(/\(reg\)|\(REG\)/g, '®')
              .replace(/\(trade\)|\(TRADE\)/g, '™')
              .replace(/\(ordf\)|\(ORDF\)/g, 'ª')
              .replace(/\(ordm\)|\(ORDM\)/g, 'º')
              .replace(/\(laquo\)|\(LAQUO\)/g, '«')
              .replace(/\(raquo\)|\(RAQUO\)/g, '»')
              .replace(/\(not\)|\(NOT\)/g, '¬')
              .replace(/\(shy\)|\(SHY\)/g, '­')
              .replace(/\(macr\)|\(MACR\)/g, '¯')
          }
        </ReactMarkdown>
      </MDXProvider>
    </RootLayout>
  )
};

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
        root
        description
        sidebar {
          label
        }
      }
      body
    }
  }
`

export const Head = ({ data: { mdx } }: any) => <SEO title={mdx.frontmatter.sidebar.label} description={mdx.frontmatter.description} />

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'deckgo-highlight-code': any
    }
  }
}