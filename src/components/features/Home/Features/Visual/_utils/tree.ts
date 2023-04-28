import { Tree } from '../_types/tree';

export function findNodeById(root: Tree, id: string) {
  const nodes = traverseNodes(root);
  return nodes.find((node) => node.id === id);
}

export function traverseNodes(root: Tree) {
  let currentNode = root;
  const queue: (typeof root)[] = [];
  const nodes: (typeof root)[] = [];

  while (currentNode) {
    nodes.push(currentNode);

    if (currentNode.children.length) {
      currentNode.children.forEach((child) => queue.push(child));
    }

    currentNode = queue.shift() as typeof root;
  }

  return nodes;
}

export function mapTree(root: Tree) {
  const map: { [id: string]: { node: Tree; parent: Tree | null } } = {};

  const iterate = (node: Tree, parent: Tree | null) => {
    map[node.id] = { node, parent };

    if (node.children.length) {
      node.children.forEach((child) => iterate(child, node));
    }
  };

  iterate(root, null);

  return map;
}

export function findAncestors(root: Tree, id: string, include?: boolean) {
  const map = mapTree(root);
  const ancestors: Tree[] = [];
  let current = map[id];

  if (include && current) {
    ancestors.push(current.node);
  }

  while (current?.parent) {
    ancestors.push(current.parent);
    current = map[current.parent.id];
  }

  return ancestors;
}
