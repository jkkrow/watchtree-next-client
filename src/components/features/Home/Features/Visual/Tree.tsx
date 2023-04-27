import { useState, useRef, useCallback, useEffect } from 'react';

import NodeVisual from './Node';
import { useMediaQuery } from '@/hooks/sensor/media-query';
import { Tree } from './_types/tree';
import { findNodeById } from './_utils/tree';

export default function TreeVisual() {
  const [tree, setTree] = useState<Tree>({
    id: 'id-0',
    children: [
      { id: 'id-1', children: [] },
      { id: 'id-2', children: [] },
      { id: 'id-3', children: [] },
    ],
  });
  const [translate, setTranslate] = useState('translate(0, 0)');
  const [activeNodeId, setActiveNodeId] = useState(tree.id);
  const containerRef = useRef<HTMLDivElement>(null);
  const isSmallScreen = useMediaQuery('(max-width: 640px)');

  useEffect(() => {
    setActiveNodeId(tree.id);
    setTranslate('translate(0, 0)');
  }, [isSmallScreen, tree.id]);

  const selectNodeHandler = useCallback(
    (id: string) => () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rootElement = container.querySelector(`#${tree.id}`);
      const targetElement = container.querySelector(`#${id}`);

      const {
        top: rootTop,
        left: rootLeft,
        width: rootWidth,
        height: rootHeight,
      } = rootElement!.getBoundingClientRect();
      const {
        top: childTop,
        left: childLeft,
        width: childWidth,
        height: childHeight,
      } = targetElement!.getBoundingClientRect();

      const rootX = rootLeft + rootWidth / 2;
      const rootY = rootTop + rootHeight / 2;
      const childX = childLeft + childWidth / 2;
      const childY = childTop + childHeight / 2;

      setTranslate(`translate(${rootX - childX}px, ${rootY - childY}px)`);
      setActiveNodeId(id);

      const newTree = JSON.parse(JSON.stringify(tree)) as Tree;
      const node = findNodeById(newTree, id);

      if (node && !node.children.length) {
        node.children.push(
          { id: node.id + '-1', children: [] },
          { id: node.id + '-2', children: [] },
          { id: node.id + '-3', children: [] }
        );
      }

      setTree(newTree);
    },
    [tree]
  );

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className="w-full h-full"
        ref={containerRef}
        style={{ transform: translate, transition: 'all 300ms ease-out' }}
      >
        <div className="w-full h-full -translate-y-16">
          <NodeVisual
            currentNode={tree}
            tree={tree}
            activeNodeId={activeNodeId}
            onSelect={selectNodeHandler}
          />
        </div>
      </div>
    </div>
  );
}
