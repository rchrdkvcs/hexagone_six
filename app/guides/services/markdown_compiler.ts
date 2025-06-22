import { unified } from 'unified'
import remarkParse from 'remark-parse'
import rehypeStringify from 'rehype-stringify'
import { toc } from 'mdast-util-toc'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeFormat from 'rehype-format'
import rehypeSlug from 'rehype-slug'
import remarkDirective from 'remark-directive'
import { remarkDirectiveToHtml } from '#guides/services/directive_to_html'

export class MarkdownCompiler {
  async toHtml(markdown: string) {
    const tree = unified().use(remarkParse).parse(markdown)

    const tocNode = toc(tree, { maxDepth: 2 })

    let tocHtml = ''
    if (tocNode.map) {
      const tocTree = unified()
        .use(remarkRehype)
        .use(rehypeStringify)
        .runSync(tocNode.map as any)
      tocHtml = unified().use(rehypeStringify).stringify(tocTree)
    }

    const htmlContent = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkDirective)
      .use(remarkDirectiveToHtml)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeSlug)
      .use(rehypeRaw)
      .use(rehypeFormat)
      .use(rehypeStringify)
      .process(markdown)

    return {
      html: String(htmlContent),
      toc: tocHtml,
    }
  }
}
