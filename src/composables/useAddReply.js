export function useAddReply(comment, emit) {
  const showReplyForm = ref(false)
  const newReplyText = ref('')
  const users = ref(['Ali', 'Reza', 'Mahdi', 'Asghar', 'Soghra'])
  const toggleReplyForm = () => {
    showReplyForm.value = !showReplyForm.value
  }
  const addReply = () => {
    if (newReplyText.value.trim() !== '') {
      const randomUser = users.value[Math.floor(Math.random() * users.value.length)]
      const newReply = {
        id: Date.now(),
        text: newReplyText.value,
        author: randomUser, // Replace with actual user data
        time: new Date().toISOString(),
        replies: [] // Empty replies array for the new reply
      }

      // Emit event to add a reply to the parent comment
      emit('add-reply', comment.id, newReply)

      // Clear reply form
      newReplyText.value = ''
      showReplyForm.value = false
    }
  }
  const handleReply = (parentId, reply) => {
    // Emit the add-reply event upwards to the root component
    emit('add-reply', parentId, reply)
  }
  return { toggleReplyForm, addReply, showReplyForm, newReplyText, handleReply }
}
