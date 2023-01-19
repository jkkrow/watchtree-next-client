import { startListening } from '../listener';
import { createNode } from './upload.action';

startListening({
  actionCreator: createNode,
  effect: (action, api) => {
    const { activeNodeId } = api.getState().upload;

    console.log(activeNodeId);

    return;
  },
});
