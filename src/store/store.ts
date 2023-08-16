import { create } from "zustand";

interface userState {
  userID: string;
  roomID: string;
  name: string;
  updateID: (id: string) => void;
  updateRoomID: (id: string) => void;
  updateName: (name: string) => void;
}

interface Message {
  userID: string;
  msg: string;
  time: string;
  name: string;
}

interface messagesState {
  messages: Message[];
  setMessage: (msg: Message) => void;
  overrideMessages: (msgs: Message[]) => void;
}

const useUserStore = create<userState>()((set) => ({
  userID: "",
  roomID: "",
  name: "",
  updateID: (id: string) => set(() => ({ userID: id })),
  updateRoomID: (id: string) => set(() => ({ roomID: id })),
  updateName: (name: string) => set(() => ({ name: name })),
}));

const useMessageStore = create<messagesState>()((set) => ({
  messages: [],
  setMessage: (msg: Message) =>
    set((state: messagesState) => {
      console.log(state, msg);
      return { messages: [...state.messages, msg] };
    }),
  overrideMessages: (msgs: Message[]) => set(() => ({ messages: msgs })),
}));

export { useUserStore, useMessageStore };
