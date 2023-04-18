export interface UiSliceState {
  messages: Message[];
  curtain: Curtain | null;
  modal: Modal | null;
  scrollLock: boolean;
}

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  subject?: string;
}

export interface Curtain {
  id: string;
  nodeId?: string;
  progress?: number;
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

export interface DeleteVideoModal {
  videoId: string;
  title: string;
}

export interface DiscardNodeModal {
  treeId: string;
  nodeId: string;
}

export interface DeleteHistoryModal {
  videoId: string;
}

export type ModalRoutes =
  | 'signin'
  | 'signout'
  | 'image'
  | 'delete-video'
  | 'delete-account'
  | 'delete-history'
  | 'clear-history'
  | 'undo-upload'
  | 'discard-node';

export type ModalStatus = 'pending' | 'cancelled' | 'completed';

export type MessageType = 'message' | 'error';
