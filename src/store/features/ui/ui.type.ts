export interface UiSliceState {
  messages: Message[];
  modal: null;
}

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  action?: string;
  subject?: string;
}

export type MessageType = 'message' | 'error';
