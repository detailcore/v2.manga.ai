
export function useGoto() {
  const router = useRouter()

  function gotoByPath(alias: string) {
    router.push({ path: alias })
  }

  return {
    gotoByPath,
  }
}
