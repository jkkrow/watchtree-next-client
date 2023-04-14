import { useMemo } from 'react';

import UploadNode from '../Node';
import Button from '@/components/common/Element/Button';
import PlusIcon from '@/assets/icons/plus.svg';
import RemoveIcon from '@/assets/icons/remove.svg';
import { useModal } from '@/hooks/ui/modal';
import { useAppSelector } from '@/hooks/store';
import { useAppendNodeMutation } from '@/store/features/upload/upload.api';
import { findNodeById } from '@/store/features/video/video.util';
import { DiscardNodeModal } from '@/store/features/ui/ui.type';

export default function UploadTree() {
  const tree = useAppSelector((state) => state.upload.uploadTree);
  const activeNodeId = useAppSelector((state) => state.upload.activeNodeId);
  const { open } = useModal<DiscardNodeModal>();
  const [appendNode, { isLoading }] = useAppendNodeMutation();

  const activeNode = useMemo(
    () => (tree ? findNodeById(tree.root, activeNodeId) : null),
    [tree, activeNodeId]
  );

  const appendNodeHandler = () => {
    if (!tree || !activeNode) return;
    appendNode({ id: tree.id, parentId: activeNode.id });
  };

  const discardNodeHandler = (id: string) => () => {
    if (!tree) return;
    open('discard-node', { treeId: tree.id, nodeId: id });
  };

  return activeNode ? (
    <div className="flex flex-col w-full gap-4 min-h-[800px]">
      <UploadNode node={activeNode} active={true} />
      <div className="flex flex-col ml-auto gap-4 w-full">
        {activeNode.children.map((child) => (
          <div className="flex gap-2" key={child.id}>
            <Button small onClick={discardNodeHandler(child.id)}>
              <RemoveIcon className="w-6 h-6" />
            </Button>
            <UploadNode node={child} active={false} />
          </div>
        ))}
        {activeNode.children.length < 4 ? (
          <div className="ml-auto">
            <Button
              small
              inversed
              loading={isLoading}
              onClick={appendNodeHandler}
            >
              <span className="w-6 h-6">
                <PlusIcon />
              </span>
              <span>Add Next Video</span>
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  ) : null;
}
