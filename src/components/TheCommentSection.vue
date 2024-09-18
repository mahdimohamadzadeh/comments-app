<template>
  <div class="container px-6 py-6 mx-auto mt-20 rounded-lg shadow-lg bg-base-100">
    <h2 class="mb-10 text-4xl text-primary">Comments</h2>

    <AppCommentItem
      class="my-5"
      v-for="comment in visibleComments"
      :key="comment.id"
      :comment="comment"
      @add-reply="addReply"
    />
    <!-- Observer element for detecting when the last comment is in view -->
    <div ref="loadMoreTrigger" v-if="hasMoreComments">Loading more comments...</div>
  </div>
</template>

<script setup>
import Comments from '@/assets/json/allComments.json'
import { useObserver } from '@/composables/useObserver';
const allComments = ref(Comments)
const loadMoreTriggerRef = useTemplateRef('loadMoreTrigger')

const { visibleComments, hasMoreComments } = useObserver(allComments, loadMoreTriggerRef)

const addReply = (parentId, newReply) => {
  const findAndAddReply = (comments, parentId) => {
    for (const comment of comments) {
      if (comment.id === parentId) {
        comment.replies.push(newReply)
      } else if (comment.replies.length) {
        findAndAddReply(comment.replies, parentId)
      }
    }
  }

  findAndAddReply(allComments.value, parentId)
}
</script>
