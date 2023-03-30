import Button from '@/components/common/Element/Button';
import { useAppSelector } from '@/hooks/store';
import { useModal } from '@/hooks/ui/modal';
import { useDiscardNodeMutation } from '@/store/features/upload/upload.api';
import { DiscardNodeModal } from '@/store/features/ui/ui.type';

export default function DiscardNode() {
  const tree = useAppSelector((state) => state.upload.uploadTree);
  const { modal, complete, cancel } = useModal<DiscardNodeModal>();
  const [discardNode, { isLoading }] = useDiscardNodeMutation();

  const discardNodeHandler = async () => {
    if (!modal) return;
    await discardNode({ id: modal.treeId, nodeId: modal.nodeId });
    complete();
  };

  return (
    <div className="flex flex-col p-6 gap-6">
      <h3 className="text-xl font-bold">Discard Node</h3>
      <div className="font-medium">Do you want to discard this video node?</div>
      {tree ? (
        <div className="flex flex-col gap-2">
          <h4 className="text-invalid font-bold">&#9888; WARNING!</h4>
          <div className="max-w-lg">
            This will remove all videos appended to it. Are you sure to
            continue?
          </div>
        </div>
      ) : null}
      <div className="flex w-64 ml-auto gap-2">
        <Button onClick={cancel}>Cancel</Button>
        <Button inversed loading={isLoading} onClick={discardNodeHandler}>
          Discard
        </Button>
      </div>
    </div>
  );
}
