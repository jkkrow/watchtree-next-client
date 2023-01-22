import { appListener } from '@/store/app/listener';
import { createNode } from './upload.action';

appListener.startListening({
  actionCreator: createNode,
  effect: (action, api) => {
    const { activeNodeId } = api.getState().upload;

    console.log(activeNodeId);

    return;
  },
});
