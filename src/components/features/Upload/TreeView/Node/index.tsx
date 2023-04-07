import { useMemo } from 'react';

import Input from '@/components/common/Element/Input';
import Button from '@/components/common/Element/Button';
import FileInput from '@/components/common/Element/FileInput';
import Tooltip from '@/components/common/UI/Tooltip';
import Progress from '@/components/common/UI/Progress';
import UploadIcon from '@/assets/icons/upload.svg';
import UpdateIcon from '@/assets/icons/update.svg';
import AngleLeftIcon from '@/assets/icons/angle-left.svg';
import AngleLeftDoubleIcon from '@/assets/icons/angle-left-double.svg';
import VideoIcon from '@/assets/icons/video.svg';
import MarkerIcon from '@/assets/icons/marker.svg';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import {
  setActiveNode,
  updateNode,
} from '@/store/features/upload/upload.slice';
import { setActiveNode as setActiveVideo } from '@/store/features/video/video.slice';
import { useUploadVideoMutation } from '@/store/features/upload/upload.api';
import { findNodeByChildId } from '@/store/features/video/video.util';
import { VideoNode } from '@/store/features/video/video.type';
import { formatSize, formatTime } from '@/utils/format';

interface UploadNodeProps {
  node: VideoNode;
  active: boolean;
}

export default function UploadNode({ node, active }: UploadNodeProps) {
  const root = useAppSelector((state) => state.upload.uploadTree!.root);
  const progresses = useAppSelector((state) => state.upload.progresses);
  const activeVideoId = useAppSelector((state) => state.video.activeNodeId);
  const currentProgress = useAppSelector(
    (state) => state.video.currentProgress
  );
  const dispatch = useAppDispatch();
  const [uploadVideo] = useUploadVideoMutation();

  const parentNode = useMemo(
    () => findNodeByChildId(root, node.id),
    [root, node.id]
  );
  const progress = useMemo(
    () => progresses.find((item) => item.fileName === node.name),
    [progresses, node.name]
  );
  const setCurrentTime = useMemo(
    () => (node.id === activeVideoId ? 'Set to current time' : 'Show preview'),
    [node.id, activeVideoId]
  );

  const setActiveNodeHandler = (id: string) => () => {
    dispatch(setActiveNode(id));
  };

  const setActiveVideoHandler = (id: string) => () => {
    dispatch(setActiveVideo(id));
  };

  const changeLabelHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateNode({ id: node.id, info: { label: event.target.value } }));
  };

  const startChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = +event.target.value;
    if (value > node.duration) value = node.duration;
    if (value > node.selectionTimeEnd) value = node.selectionTimeEnd;

    dispatch(updateNode({ id: node.id, info: { selectionTimeStart: value } }));
  };

  const endChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = +event.target.value;
    if (value < node.selectionTimeStart) value = node.selectionTimeStart;
    if (value > node.duration) value = node.duration;

    dispatch(updateNode({ id: node.id, info: { selectionTimeEnd: value } }));
  };

  const setStartHandler = () => {
    const { id, selectionTimeEnd, duration } = node;
    const fixedStart = +currentProgress.toFixed(3);
    dispatch(updateNode({ id, info: { selectionTimeStart: fixedStart } }));

    if (currentProgress > (selectionTimeEnd || 0)) {
      const fixedDuration = +duration.toFixed(3);
      const skip = +(currentProgress + 10).toFixed(3);
      const fixedEnd = currentProgress + 10 > duration ? fixedDuration : skip;
      dispatch(updateNode({ id, info: { selectionTimeEnd: fixedEnd } }));
    }
  };

  const setEndHandler = () => {
    const { id, selectionTimeStart } = node;
    const fixedEnd = +currentProgress.toFixed(3);
    dispatch(updateNode({ id, info: { selectionTimeEnd: fixedEnd } }));

    if (currentProgress < (selectionTimeStart || 0)) {
      const start = +(currentProgress - 10).toFixed(3);
      const fixedStart = currentProgress - 10 < 0 ? 0 : start;
      dispatch(updateNode({ id, info: { selectionTimeStart: fixedStart } }));
    }
  };

  const uploadVideoHandler = (files: File[]) => {
    const file = files[0];
    uploadVideo({ file, nodeId: node.id });
  };

  return (
    <div className="w-full border-[1.5px] border-secondary rounded-md overflow-hidden">
      <div>
        <header
          className="flex items-center p-4 gap-4 data-[empty=true]:bg-secondary"
          data-empty={!node.url}
        >
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
                  autoComplete="off"
                  value={node.label}
                  onChange={changeLabelHandler}
                />
              </div>
            ) : null}
          </div>
          <div className="flex items-center ml-auto gap-4">
            {progress ? (
              <Progress size={40} percentage={progress.percentage} />
            ) : null}
            {!progress && node.url ? (
              <Tooltip text="Change video file" direction="left">
                <FileInput type="video" brief onFile={uploadVideoHandler}>
                  <UpdateIcon className="w-6 h-6" />
                </FileInput>
              </Tooltip>
            ) : null}
            {!active ? (
              <Button small inversed onClick={setActiveNodeHandler(node.id)}>
                Details
              </Button>
            ) : null}
            {active && node.url ? (
              <Button
                small
                inversed
                disabled={activeVideoId === node.id}
                onClick={setActiveVideoHandler(node.id)}
              >
                <span className="w-6 h-6">
                  <VideoIcon />
                </span>
                <span>Preview</span>
              </Button>
            ) : null}
          </div>
        </header>
        <div className="[&>*]:border-t-[1.5px] [&>*]:border-secondary">
          {active && node.url ? (
            <div className="flex flex-col p-4 gap-2 font-medium [&>div]:flex [&>div]:items-center [&>div]:justify-between [&>div]:gap-4">
              <div>
                <span>Filename</span>
                <span className="text-ellipsis overflow-hidden text-end">
                  {node.name}
                </span>
              </div>
              <div>
                <span>Filesize</span>
                <span>{formatSize(node.size)}</span>
              </div>
              <div>
                <span>Duration</span>
                <span>{formatTime(node.duration)}</span>
              </div>
              <div>
                <span className="flex-shrink-0">Selection Time</span>
                <span className="flex items-center gap-4 [&_input]:max-w-[72px] [&_input]:text-center [&>div]:m-0 [&_button]:h-10 [&_button]:p-3">
                  <Tooltip text={setCurrentTime} direction="top">
                    <Button
                      small
                      inversed
                      disabled={node.id !== activeVideoId}
                      onClick={setStartHandler}
                    >
                      <MarkerIcon className="w-4 h-4" />
                    </Button>
                  </Tooltip>
                  <Input
                    type="number"
                    value={node.selectionTimeStart}
                    onChange={startChangeHandler}
                  />
                  <span>to</span>
                  <Tooltip text={setCurrentTime} direction="top">
                    <Button
                      small
                      inversed
                      disabled={node.id !== activeVideoId}
                      onClick={setEndHandler}
                    >
                      <MarkerIcon className="w-4 h-4" />
                    </Button>
                  </Tooltip>
                  <Input
                    type="number"
                    value={node.selectionTimeEnd}
                    onChange={endChangeHandler}
                  />
                </span>
              </div>
            </div>
          ) : null}
          {!node.url ? (
            <div className="[&>*]:border-none">
              <FileInput type="video" onFile={uploadVideoHandler}>
                <UploadIcon className="w-16 h-16" />
              </FileInput>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
