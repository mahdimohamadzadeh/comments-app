export function useObserver(allComments, loadMoreTriggerRef) {
  const visibleComments = ref([])
  const commentsPerLoad = ref(5)
  const observer = ref(null)
  const hasMoreComments = computed(() => {
    return visibleComments.value.length < unref(allComments).length
  })
  onMounted(() => {
    unref(loadMoreTriggerRef).focus()
    // Fetch initial comments from API or any data source
    loadMoreComments()

    // Set up Intersection Observer for lazy loading
    setupObserver()
  })
  const loadMoreComments = () => {
    const start = visibleComments.value.length
    const end = start + commentsPerLoad.value
    visibleComments.value.push(...unref(allComments).slice(start, end))
  }
  const setupObserver = () => {
    const loadMoreTrigger = unref(loadMoreTriggerRef)

    if (loadMoreTrigger) {
      setTimeout(() => {
        observer.value = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            loadMoreComments()
          }
        })

        observer.value.observe(loadMoreTrigger)
      }, 5000)
    }
  }
  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect()
    }
  })
  return { visibleComments, hasMoreComments }
}
