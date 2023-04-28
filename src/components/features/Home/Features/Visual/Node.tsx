import { useMemo } from 'react';

import { Tree } from './_types/tree';
import { findAncestors } from './_utils/tree';

interface NodeVisualProps {
  currentNode: Tree;
  activeNodeId: string;
  onSelect: (id: string) => () => void;
}

export default function NodeVisual({
  currentNode,
  activeNodeId,
  onSelect,
}: NodeVisualProps) {
  const isActive = useMemo(() => {
    return activeNodeId === currentNode.id;
  }, [activeNodeId, currentNode.id]);

  const isAncestor = useMemo(() => {
    const ancestors = findAncestors(currentNode, activeNodeId, true);
    const ids = ancestors.map((item) => item.id);

    return ids.includes(currentNode.id);
  }, [currentNode, activeNodeId]);

  return (
    <div className="relative flex flex-col justify-center items-center w-full h-full">
      <div
        className="flex justify-center items-center w-20 h-14 bg-inversed rounded-md data-[active=true]:scale-125 data-[active=false]:hover:bg-hover-inversed data-[active=false]:cursor-pointer transition-all"
        id={currentNode.id}
        data-active={isActive}
        onClick={onSelect(currentNode.id)}
      >
        {isActive ? (
          <div className="w-full h-1 mx-2 mt-auto mb-2 rounded-full bg-hover" />
        ) : null}
      </div>
      {isAncestor && currentNode.children.length ? (
        <div
          className="absolute flex flex-col justify-center items-center data-[root=false]:top-full data-[root=true]:bottom-0"
          data-root={currentNode.id === 'id-0'}
        >
          <svg className="w-52 my-2" viewBox="0 0 18 5" fill="currentColor">
            <path d="M8.549 2.098a.2.2 0 0 1-.2.2L.222 2.32a.2.2 0 0 0-.2.199l-.02 2.117a.2.2 0 0 0 .2.202h.413a.2.2 0 0 0 .2-.2V3.36c0-.11.09-.2.2-.2H8.35c.11 0 .2.09.2.2v1.278c0 .11.09.2.2.2h.414a.2.2 0 0 0 .2-.2V3.36c0-.11.09-.2.2-.2h7.287c.11 0 .2.09.2.2v1.278c0 .11.09.2.2.2h.414a.2.2 0 0 0 .2-.2v-2.14a.2.2 0 0 0-.2-.2H9.563a.2.2 0 0 1-.2-.2V1.002a.2.2 0 0 0-.2-.2h-.414a.2.2 0 0 0-.2.2v1.096Z" />
          </svg>
          <div className="flex gap-5">
            {currentNode.children.map((child) => (
              <NodeVisual
                key={child.id}
                currentNode={child}
                activeNodeId={activeNodeId}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
