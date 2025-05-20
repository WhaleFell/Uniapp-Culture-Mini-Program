<template>
  <view class="comment-list">
    <!-- 评论输入框 -->
    <view class="comment-input">
      <input 
        type="text" 
        v-model="commentText"
        placeholder="说点什么..."
        @confirm="submitComment"
      />
      <button class="submit-btn" @tap="submitComment">发送</button>
    </view>

    <!-- 评论列表 -->
    <view class="comments">
      <view v-if="comments.length === 0" class="empty-tip">
        暂无评论，快来抢沙发吧~
      </view>
      <view 
        v-for="(item, index) in comments" 
        :key="index" 
        class="comment-item"
      >
        <image class="avatar" :src="item.avatar" mode="aspectFill"></image>
        <view class="comment-content">
          <view class="comment-header">
            <text class="username">{{ item.username }}</text>
            <text class="time">{{ item.time }}</text>
          </view>
          <text class="text">{{ item.content }}</text>
          <view class="actions">
            <view class="action" @tap="likeComment(index)">
              <uni-icons 
                :type="item.isLiked ? 'heart-filled' : 'heart'" 
                size="20" 
                :color="item.isLiked ? '#ff4d4f' : '#999'"
              ></uni-icons>
              <text>{{ item.likes || '' }}</text>
            </view>
            <view class="action" @tap="replyComment(item)">
              <uni-icons type="chat" size="20" color="#999"></uni-icons>
              <text>回复</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  articleId: {
    type: [String, Number],
    required: true
  }
})

const emit = defineEmits(['update:commentCount'])

const commentText = ref('')
const comments = ref([])

// 提交评论
const submitComment = () => {
  if (!commentText.value.trim()) {
    uni.showToast({
      title: '请输入评论内容',
      icon: 'none'
    })
    return
  }

  const newComment = {
    id: Date.now(),
    username: '游客' + Math.floor(Math.random() * 1000),
    avatar: '/static/avatar.png',
    content: commentText.value,
    time: new Date().toLocaleString(),
    likes: 0,
    isLiked: false
  }

  comments.value.unshift(newComment)
  commentText.value = ''
  emit('update:commentCount', comments.value.length)

  uni.showToast({
    title: '评论成功',
    icon: 'success'
  })
}

// 点赞评论
const likeComment = (index) => {
  const comment = comments.value[index]
  comment.isLiked = !comment.isLiked
  comment.likes = comment.isLiked ? (comment.likes || 0) + 1 : (comment.likes || 1) - 1
}

// 回复评论
const replyComment = (comment) => {
  commentText.value = `回复 @${comment.username}：`
}
</script>

<style scoped>
.comment-list {
  padding: 20rpx;
  background: #fff;
}

.comment-input {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background: #f5f5f5;
  border-radius: 40rpx;
  margin-bottom: 30rpx;
}

.comment-input input {
  flex: 1;
  height: 72rpx;
  font-size: 28rpx;
}

.submit-btn {
  margin-left: 20rpx;
  background: #d81e06;
  color: #fff;
  font-size: 28rpx;
  padding: 0 30rpx;
  height: 72rpx;
  line-height: 72rpx;
  border-radius: 36rpx;
}

.comment-item {
  display: flex;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10rpx;
}

.username {
  font-size: 28rpx;
  color: #333;
  font-weight: bold;
}

.time {
  font-size: 24rpx;
  color: #999;
}

.text {
  font-size: 28rpx;
  color: #333;
  line-height: 1.5;
}

.actions {
  display: flex;
  gap: 30rpx;
  margin-top: 16rpx;
}

.action {
  display: flex;
  align-items: center;
  gap: 8rpx;
  font-size: 24rpx;
  color: #999;
}

.empty-tip {
  text-align: center;
  color: #999;
  font-size: 28rpx;
  padding: 40rpx 0;
}
</style> 