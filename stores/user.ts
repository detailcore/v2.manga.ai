import { acceptHMRUpdate, defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const savedName = ref("")
  let currentPost = ref([])
  const previousNames = ref(new Set<string>())
  const { public: { apiDomain, apiPrefix } } = useRuntimeConfig()

  const fetchPostById = async (id: number) => {
    // const { data: post } = await useFetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { pick: ['title', 'body'] })
    // currentPost.value = post
    const { data: { value } } = await useFetch(apiDomain + apiPrefix + `/library`)
    currentPost.value = value as []
  }

  const usedNames = computed(() => Array.from(previousNames.value));
  const otherNames = computed(() =>
    usedNames.value.filter((name) => name !== savedName.value)
  );

  /**
   * Changes the current name of the user and saves the one that was used
   * before.
   *
   * @param name - new name to set
   */
  function setNewName(name: string) {
    if (savedName.value) previousNames.value.add(savedName.value);

    savedName.value = name;
  }

  // Состояние окна регистрации
  const isOpenLogin = ref<boolean>(false)
  // Переключатель окна регистрации
  const toggleLogin = (payload: boolean) => {
    isOpenLogin.value = payload
  }

  return {
    isOpenLogin,
    toggleLogin,

    currentPost,
    setNewName,
    otherNames,
    savedName,
    fetchPostById,
  };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
