import { useMemo } from 'react';

import Input from '@/components/common/Element/Input';
import Button from '@/components/common/Element/Button';
import FileInput from '@/components/common/Element/FileInput';
import UploadIcon from '@/assets/icons/upload.svg';
import AngleLeftIcon from '@/assets/icons/angle-left.svg';
import AngleLeftDoubleIcon from '@/assets/icons/angle-left-double.svg';
import VideoIcon from '@/assets/icons/video.svg';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import {
  setActiveNode,
  updateNode,
} from '@/store/features/upload/upload.slice';
import { findNodeByChildId } from '@/store/features/video/video.util';
import { VideoNode } from '@/store/features/video/video.type';
import { formatSize, formatTime } from '@/utils/format';

interface UploadNodeProps {
  node: VideoNode;
  active: boolean;
}

export default function UploadNode({ node, active }: UploadNodeProps) {
  const root = useAppSelector((state) => state.upload.uploadTree!.root);
  const dispatch = useAppDispatch();

  const parentNode = useMemo(
    () => findNodeByChildId(root, node.id),
    [root, node.id]
  );

  const setActiveNodeHandler = (id: string) => () => {
    dispatch(setActiveNode(id));
  };

  const changeLabelHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateNode({ id: node.id, info: { label: event.target.value } }));
  };

  return (
    <div className="w-full border-[1.5px] border-secondary rounded-md">
      <div>
        <header className="flex items-center p-4 gap-2">
          <div className="flex flex-col gap-2">
            {node.level === 0 ? (
              <div className="font-bold text-lg">ROOT</div>
            ) : null}
            {node.level !== 0 && active ? (
              <button className="flex mb-3">
                <AngleLeftDoubleIcon
                  className="w-6 h-6 hover:text-hover transition-colors"
                  onClick={setActiveNodeHandler(root.id)}
                />
                <AngleLeftIcon
                  className="w-6 h-6 hover:text-hover transition-colors"
                  onClick={setActiveNodeHandler(parentNode?.id || root.id)}
                />
              </button>
            ) : null}
            {node.level !== 0 ? (
              <div className="font-medium text-lg">
                <Input
                  name="label"
                  value={node.label}
                  onChange={changeLabelHandler}
                />
              </div>
            ) : null}
          </div>
          <div className="flex ml-auto gap-2">
            {!active ? (
              <Button small inversed onClick={setActiveNodeHandler(node.id)}>
                See Detail
              </Button>
            ) : null}
            {active && node.url ? (
              <Button small inversed>
                <span className="w-6 h-6">
                  <VideoIcon />
                </span>
                <span>Show Preview</span>
              </Button>
            ) : null}
          </div>
        </header>
        {active ? (
          <div className="border-t-[1.5px] border-secondary">
            {node.url ? (
              <div className="flex flex-col p-4 gap-2 font-medium [&_div]:flex [&_div]:justify-between [&_div]:gap-4">
                <div>
                  <span>Filename</span>
                  <span className="line-clamp-2 text-end">{node.name}</span>
                </div>
                <div>
                  <span>Filesize</span>
                  <span>{formatSize(node.size)}</span>
                </div>
                <div>
                  <span>Duration</span>
                  <span>{formatTime(node.duration)}</span>
                </div>
              </div>
            ) : (
              <div className="[&>*]:border-none">
                <FileInput type="video" onFile={() => console.log('test')}>
                  <UploadIcon className="w-16 h-16" />
                </FileInput>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
