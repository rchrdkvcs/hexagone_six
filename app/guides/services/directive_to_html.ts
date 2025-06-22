import { visit } from 'unist-util-visit'
import type { Plugin } from 'unified'

export const remarkDirectiveToHtml: Plugin = () => {
  return (tree) => {
    visit(tree, (node: any) => {
      if (
        node.type === 'containerDirective' &&
        ['info', 'success', 'warning', 'tip', 'error'].includes(node.name)
      ) {
        node.data = {
          hName: 'div',
          hProperties: {
            class: `alert alert-${node.name}`,
          },
        }
      }
    })
  }
}
