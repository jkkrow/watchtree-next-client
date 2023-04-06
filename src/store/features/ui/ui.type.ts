export interface UiSliceState {
  messages: Message[];
  modal: Modal | null;
}

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  subject?: string;
}

export type Modal<Payload extends ModalPayload = {}> = {
  id: ModalRoutes;
  status: ModalStatus;
} & Payload;

export interface ModalPayload extends Record<string, any> {}

export interface PromptModal {
  name: string;
  header: string;
  message: string;
}

export interface ImageModal {
  src: string;
  alt?: string;
}

export interface EditVideoModal {
  videoId: string;
}

export interface DeleteVideoModal {
  videoId: string;
  title: string;
}

export interface DiscardNodeModal {
  treeId: string;
  nodeId: string;
}

export type ModalRoutes =
  | 'signin'
  | 'signout'
  | 'image'
  | 'edit-video'
  | 'delete-video'
  | 'delete-account'
  | 'clear-history'
  | 'undo-upload'
  | 'discard-node';

export type ModalStatus = 'pending' | 'cancelled' | 'completed';

export type MessageType = 'message' | 'error';
