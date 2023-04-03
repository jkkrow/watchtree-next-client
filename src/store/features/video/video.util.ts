import { VideoNode } from './video.type';

export function findNodeById(root: VideoNode, id: string) {
  const nodes = traverseNodes(root);
  return nodes.find((node) => node.id === id);
}

export function findNodeByChildId(root: VideoNode, id: string) {
  const nodes = traverseNodes(root);
  return nodes.find((node) => node.children.find((child) => child.id === id));
}

export function traverseNodes(root: VideoNode) {
  let currentNode = root;
  const queue: typeof root[] = [];
  const nodes: typeof root[] = [];

  while (currentNode) {
    nodes.push(currentNode);

    if (currentNode.children.length) {
      currentNode.children.forEach((child) => queue.push(child));
    }

    currentNode = queue.shift() as typeof root;
  }

  return nodes;
}

export function getPaths(root: VideoNode) {
  const paths: VideoNode[][] = [];

  const iterate = (currentNode: VideoNode, path: VideoNode[]) => {
    const newPath = path.concat(currentNode);

    if (currentNode.children.length) {
      return currentNode.children.forEach((child) => {
        iterate(child, newPath);
      });
    }

    paths.push(newPath);
  };

  iterate(root, []);

  return paths;
}

export function mapTree(root: VideoNode) {
  const map: { [id: string]: { node: VideoNode; parent: VideoNode | null } } =
    {};

  const iterate = (node: VideoNode, parent: VideoNode | null) => {
    map[node.id] = { node, parent };

    if (node.children.length) {
      node.children.forEach((child) => iterate(child, node));
    }
  };

  iterate(root, null);

  return map;
}

export function findAncestors(root: VideoNode, id: string, include?: boolean) {
  const map = mapTree(root);
  const ancestors: VideoNode[] = [];
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

export function getTotalSize(root: VideoNode) {
  const nodes = traverseNodes(root);
  const filteredNodes: VideoNode[] = [];
  const seen: Record<string, boolean> = {};

  for (const node of nodes) {
    const duplicated = seen.hasOwnProperty(node.name);

    if (!duplicated) {
      filteredNodes.push(node);
      seen[node.name] = true;
    }
  }

  return filteredNodes.reduce((acc, cur) => acc + cur.size, 0);
}

export function getMinMaxDuration(root: VideoNode) {
  const paths = getPaths(root);
  const durations = paths.map((path) =>
    path.reduce((acc, cur) => acc + cur.duration, 0)
  );

  return { max: Math.max(...durations), min: Math.min(...durations) };
}
