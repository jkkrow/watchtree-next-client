export interface UiSliceState {
  messages: Message[];
  modal: Modal | null;
}

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  action?: string;
  subject?: string;
}

export type Modal<Payload extends ModalPayload = {}> = {
  id: ModalRoutes;
} & Payload;

export interface ModalPayload extends Record<string, any> {}

export interface ImageModal {
  src: string;
  alt?: string;
}

export interface DeleteVideoModal {
  videoId: string;
  title: string;
}

export type ModalRoutes =
  | 'signout'
  | 'image'
  | 'delete-video'
  | 'delete-account';

export type MessageType = 'message' | 'error';
