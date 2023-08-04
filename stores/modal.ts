import { reactive } from 'vue';
import { acceptHMRUpdate, defineStore } from "pinia";

type modals = 'user' | 'login' | 'search'

interface togglePayload {
  name: modals
  value: boolean
}

export const useModalStore = defineStore("modal", () => {

  // Состояние окон
  const isOpen = reactive({
    user: false,
    login: false,
    search: false,
  })

  // Переключатель окон
  const toggleModal = ({ name, value }: togglePayload) => {
    isOpen[name] = value
  }

  return {
    isOpen,
    toggleModal,
  };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useModalStore, import.meta.hot));
