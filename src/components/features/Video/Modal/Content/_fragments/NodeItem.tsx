import { motion } from 'framer-motion';

import VideoThumbnail from '@/components/features/Video/UI/VideoThumbnail';
import VideoDuration from '@/components/features/Video/UI/VideoDuration';
import VideoHistory from '@/components/features/Video/UI/VideoHistory';
import PlayIcon from '@/assets/icons/play.svg';
import { opacityVariants } from '@/constants/variants';
import {
  VideoNode,
  VideoTreeEntryWithData,
  VideoTreeWithData,
} from '@/store/features/video/video.type';

interface NodeItemProps {
  node: VideoNode;
  video: VideoTreeEntryWithData | VideoTreeWithData;
  onWatch: (nodeId?: string) => () => void;
}

export default function NodeItem({ node, video, onWatch }: NodeItemProps) {
  return (
    <motion.li
      className="bg-primary"
      layout
      variants={opacityVariants}
      initial="inActive"
      animate="active"
      exit="inActive"
    >
      <div
        className="group flex gap-4 cursor-pointer"
        onClick={onWatch(node.id)}
      >
        <div className="relative flex-shrink-0 w-1/3 min-w-[150px]">
          <VideoThumbnail title={node.label} url={node.thumbnail} />
          <div className="absolute flex justify-center items-center inset-0 text-neutral-100 bg-neutral-900/70 opacity-0 group-hover:opacity-100 transition-opacity">
            <PlayIcon className="w-8 h-8" />
          </div>
        </div>
        <div className="flex flex-col flex-1 py-2 gap-4 overflow-hidden">
          <div className="font-medium line-clamp-2">{node.label}</div>
          <div className="flex flex-col w-52 max-w-full gap-4">
            <VideoDuration max={node.duration} min={node.duration} brief />
            <VideoHistory
              max={node.duration}
              progress={video.history?.progress}
              ended={
                node.id !== video.history?.activeNodeId ||
                (node.id === video.history.activeNodeId && video.history.ended)
              }
            />
          </div>
        </div>
      </div>
    </motion.li>
  );
}
