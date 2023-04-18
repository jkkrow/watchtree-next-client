import Button from '@/components/common/Element/Button';
import PromptModal from '../Template/Prompt';
import { useAppSelector, useAppDispatch } from '@/hooks/store';
import { useModal } from '@/hooks/ui/modal';
import { useDiscardNodeMutation } from '@/store/features/upload/upload.api';
import { DiscardNodeModal } from '@/store/features/ui/ui.type';
import { setActiveNode } from '@/store/features/upload/upload.slice';
import { setActiveNode as setActiveVideo } from '@/store/features/video/video.slice';
import { findNodeByChildId } from '@/store/features/video/video.util';

export default function DiscardNode() {
  const tree = useAppSelector((state) => state.upload.uploadTree);
  const activeNodeId = useAppSelector((state) => state.upload.activeNodeId);
  const activeVideoId = useAppSelector((state) => state.video.activeNodeId);
  const dispatch = useAppDispatch();
  const { modal, complete, cancel } = useModal<DiscardNodeModal>();
  const [discardNode, { isLoading }] = useDiscardNodeMutation();

  const discardNodeHandler = async () => {
    if (!modal || !tree) return;
    await discardNode({ id: modal.treeId, nodeId: modal.nodeId }).unwrap();
    const parentNode = findNodeByChildId(tree.root, modal.nodeId);

    if (modal.nodeId === activeNodeId) {
      dispatch(setActiveNode(parentNode?.id || tree.root.id));
    }

    if (modal.nodeId === activeVideoId) {
      dispatch(setActiveVideo(parentNode?.id || tree.root.id));
    }

    complete();
  };

  return (
    <PromptModal
      title="Discard Node"
      action="Discard"
      header="Do you want to discard this video node?"
      body="This will remove all videos appended to it. Are you sure to continue?"
      danger
      loading={isLoading}
      onCancel={cancel}
      onClick={discardNodeHandler}
    />
  );
}
