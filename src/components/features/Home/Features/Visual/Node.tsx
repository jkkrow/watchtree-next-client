import { useMemo } from 'react';

import PlayIcon from '@/assets/icons/play.svg';
import { Tree } from './_types/tree';
import { findAncestors } from './_utils/tree';

interface NodeVisualProps {
  currentNode: Tree;
  tree: Tree;
  activeNodeId: string;
  onSelect: (id: string) => () => void;
}

export default function NodeVisual({
  currentNode,
  tree,
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
        className="flex justify-center items-center w-20 h-14 bg-inversed text-inversed rounded-md data-[active=true]:scale-125 data-[active=false]:hover:bg-hover-inversed data-[active=false]:cursor-pointer transition-all"
        id={currentNode.id}
        data-active={isActive}
        onClick={onSelect(currentNode.id)}
      >
        {isActive ? <PlayIcon className="w-5 h-5 " /> : null}
      </div>
      {isAncestor && currentNode.children.length ? (
        <div
          className="absolute flex flex-col justify-center items-center data-[root=false]:top-full data-[root=true]:bottom-0"
          data-root={currentNode.id === 'id-0'}
        >
          <svg className="w-52 mt-2" viewBox="0 0 18 5" fill="currentColor">
            <path d="M8.54853 2.2979L0.0240585 2.32103L0 4.83762H0.815455V3.15989H8.54853V4.83762H9.36254V3.15989H17.0504V4.83762H17.8644V2.29835H9.36254V0.802002H8.54853V2.2979Z" />
          </svg>
          <div className="flex mt-2 gap-5">
            {currentNode.children.map((child) => (
              <NodeVisual
                key={child.id}
                currentNode={child}
                tree={tree}
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
