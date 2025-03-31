import { create } from 'zustand';

interface I18nStore {
  isShow: boolean;
  toggle: (newState: boolean) => void;
}

export const useI18nStore = create<I18nStore>((set) => ({
  isShow: true,
  toggle: (newState) => set({ isShow: newState }),
}));
