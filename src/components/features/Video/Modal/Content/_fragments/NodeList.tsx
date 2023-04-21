import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import NodeItem from './NodeItem';
import SkeletonGrid from '@/components/common/UI/Skeleton/Grid';
import AngleLeftIcon from '@/assets/icons/angle-left.svg';
import { findAncestors } from '@/store/features/video/video.util';
import {
  VideoTreeEntryWithData,
  VideoTreeWithData,
} from '@/store/features/video/video.type';

interface NodeListProps {
  video: VideoTreeEntryWithData | VideoTreeWithData;
  loading: boolean;
  onWatch: (nodeId?: string) => () => void;
}

export default function NodeList({ video, loading, onWatch }: NodeListProps) {
  const [collapsed, setCollapsed] = useState(true);

  const nodes = useMemo(() => {
    if (!(video as VideoTreeWithData).root) return null;
    if (!video.history) return [(video as VideoTreeWithData).root];

    const root = (video as VideoTreeWithData).root;
    const nodeId = video.history.activeNodeId;
    const ancestors = findAncestors(root, nodeId, true);

    return ancestors.reverse();
  }, [video]);

  const collapsedNodes = useMemo(() => {
    return nodes ? nodes.slice(-2) : null;
  }, [nodes]);

  const hasNextVideo = useMemo(() => {
    if (!nodes) return false;
    if (!nodes[nodes.length - 1]) return false;
    return nodes[nodes.length - 1].children.some((node) => !!node.url);
  }, [nodes]);

  const toggleCollapsedHandler = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className="p-6">
      <SkeletonGrid on={loading} count={3} type="node" />
      {nodes && collapsedNodes ? (
        <ul className="grid grid-cols-1 mb-20 gap-6">
          <AnimatePresence initial={false}>
            {nodes.length !== collapsedNodes.length ? (
              <button
                key="collapse-button"
                className="flex justify-center items-center p-2 gap-2 transition-colors hover:bg-hover"
                onClick={toggleCollapsedHandler}
              >
                <AngleLeftIcon
                  className="w-8 h-8 -rotate-90 transition-transform data-[collapsed=true]:rotate-90"
                  data-collapsed={collapsed}
                />
              </button>
            ) : null}
            {(collapsed ? collapsedNodes : nodes).map((node) => (
              <NodeItem
                key={node.id}
                node={node}
                video={video}
                onWatch={onWatch}
              />
            ))}
            {hasNextVideo ? (
              <motion.div layout key="next-video" className="relative">
                <button
                  className="absolute z-[1] inset-0 font-medium text-lg transition-colors hover:text-hover"
                  onClick={onWatch()}
                >
                  {video.history ? 'Continue to watch' : 'Watch now'}
                </button>
                <div className="blur-lg pointer-events-none">
                  <NodeItem
                    node={nodes[nodes.length - 1].children[0]}
                    video={video}
                    onWatch={onWatch}
                  />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </ul>
      ) : null}
    </div>
  );
}
