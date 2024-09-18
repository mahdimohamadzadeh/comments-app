<template>
  <div id="comment-item" class="flex flex-col px-2 py-2 border rounded-2xl">
    <div class="flex items-center gap-x-2">
      <div class="">
        <img src="/avatar.webp" alt="avatar" class="h-14 w-14" />
      </div>
      <div class="flex flex-col">
        <strong class="text-lg">{{ comment.author }}</strong>
        <span class="text-gray-400">{{ useCalculateDate(comment.time) }}</span>
      </div>
    </div>
    <div class="px-3 py-4">
      <span v-if="parentAuthor">Reply to : {{ parentAuthor }}</span>
      <p class="text-xl font-medium">{{ comment.text }}</p>
    </div>
    <div>
      <!-- Open the reply form modal using ID.showModal() method -->
      <label for="my_modal_6" @click="toggleReplyForm" class="text-white btn btn-info">Reply</label>
      <input type="checkbox" id="my_modal_6" class="modal-toggle" v-if="showReplyForm" />
      <div class="modal" role="dialog">
        <div class="modal-box">
          <h3 class="text-lg font-bold">Reply to : {{ comment.author }}</h3>
          <textarea
            v-model="newReplyText"
            class="w-full h-24 mt-6 textarea textarea-bordered"
            placeholder="Reply"
          ></textarea>
          <div class="modal-action">
            <button @click="addReply" class="text-white btn btn-primary">Reply</button>
            <label for="my_modal_6" class="btn btn-warning">Cancel!</label>
          </div>
        </div>
      </div>
    </div>

    <!-- Render replies recursively -->
    <div v-if="comment.replies.length" class="my-4">
      <AppCommentItem
        v-for="reply in comment.replies"
        :key="reply.id"
        :comment="reply"
        :parent-author="comment.author"
        @add-reply="handleReply"
      />
    </div>
  </div>
</template>

<script setup>
import { useAddReply } from '@/composables/useAddReply';
import { useCalculateDate } from '@/helpers/calculateDate';

const emit = defineEmits(['add-reply'])
const props = defineProps({
  comment: {
    type: Object,
    required: true
  },
  parentAuthor: {
    type: String,
    required: false
  }
})
const { toggleReplyForm, addReply, handleReply, showReplyForm, newReplyText } = useAddReply(
  props.comment,
  emit
)
</script>
