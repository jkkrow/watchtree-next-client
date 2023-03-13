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

export interface Modal extends Record<string, unknown> {
  id: string;
}

export type MessageType = 'message' | 'error';
