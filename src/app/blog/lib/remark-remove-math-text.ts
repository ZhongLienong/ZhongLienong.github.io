import { visit } from 'unist-util-visit';

// Custom remark plugin to remove the 'value' property from math nodes
export default function remarkRemoveMathText() {
  return (tree: any) => {
    visit(tree, ['math', 'inlineMath'], (node: any) => {
      // Remove the original text value from the node
      delete node.value;
    });
  };
}
