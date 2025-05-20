<template>
  <view class="comments-container">
    <!-- 评论列表 -->
    <scroll-view 
      class="comments-list"
      scroll-y
      @scrolltolower="loadMore"
      refresher-enabled
      @refresherrefresh="onRefresh"
      :refresher-triggered="isRefreshing"
    >
      <!-- 评论项 -->
      <view 
        class="comment-item" 
        v-for="(item, index) in comments" 
        :key="index"
      >
        <view class="comment-header">
          <image :src="item.userAvatar" class="avatar"></image>
          <view class="user-info">
            <text class="username">{{ item.userName }}</text>
            <text class="time">{{ item.time }}</text>
          </view>
          <view class="like-btn" @tap="likeComment(item)">
            <uni-icons 
              :type="item.isLiked ? 'heart-filled' : 'heart'" 
              size="20" 
              :color="item.isLiked ? '#d81e06' : '#666'"
            ></uni-icons>
            <text :class="{ 'liked': item.isLiked }">{{ item.likes }}</text>
          </view>
        </view>
        
        <view class="comment-content">
          <text class="content-text">{{ item.content }}</text>
          <!-- 回复列表 -->
          <view class="replies" v-if="item.replies && item.replies.length">
            <view 
              class="reply-item"
              v-for="(reply, replyIndex) in item.replies"
              :key="replyIndex"
            >
              <text class="reply-user">{{ reply.userName }}</text>
              <text class="reply-text">{{ reply.content }}</text>
            </view>
          </view>
          <text 
            class="reply-btn" 
            @tap="showReplyInput(item)"
            v-if="!item.showReplyInput"
          >回复</text>
          <!-- 回复输入框 -->
          <view class="reply-input-box" v-if="item.showReplyInput">
            <input 
              type="text"
              v-model="replyContent"
              placeholder="回复评论..."
              @confirm="submitReply(item)"
              class="reply-input"
            />
            <button 
              class="submit-reply-btn"
              @tap="submitReply(item)"
            >发送</button>
          </view>
        </view>
      </view>
      
      <!-- 加载更多 -->
      <uni-load-more :status="loadMoreStatus"></uni-load-more>
    </scroll-view>

    <!-- 底部评论输入框 -->
    <view class="comment-input-section">
      <input 
        type="text"
        v-model="newComment"
        placeholder="写下你的评论..."
        class="comment-input"
      />
      <button 
        class="submit-btn"
        @tap="submitComment"
        :disabled="!newComment.trim()"
      >发送</button>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 评论数据
const comments = ref([
  {
    id: 1,
    userAvatar: '/static/discover/avatar1.jpg',
    userName: '文化爱好者',
    time: '10分钟前',
    content: '非常喜欢这个展览，让我对传统文化有了更深的了解！',
    likes: 12,
    isLiked: false,
    replies: [
      {
        userName: '展览策划者',
        content: '感谢您的支持，我们会继续努力！'
      }
    ]
  },
  {
    id: 2,
    userAvatar: '/static/discover/avatar2.jpg',
    userName: '小明',
    time: '30分钟前',
    content: '展览的讲解很专业，希望能多举办这样的文化活动。',
    likes: 8,
    isLiked: false,
    replies: []
  },
  {
    id: 3,
    userAvatar: '/static/discover/avatar3.jpg',
    userName: '传统文化研究者',
    time: '1小时前',
    content: '这次展览的策划很用心，每个展品都很有代表性。',
    likes: 15,
    isLiked: false,
    replies: []
  }
])

const isRefreshing = ref(false)
const loadMoreStatus = ref('more')
const newComment = ref('')
const replyContent = ref('')

// 获取帖子ID并加载评论
onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const postId = currentPage.$page.options.postId
  
  // 这里可以根据postId加载对应的评论数据
  console.log('Loading comments for post:', postId)
})

// 点赞评论
const likeComment = (item) => {
  item.isLiked = !item.isLiked
  item.likes += item.isLiked ? 1 : -1
}

// 显示回复输入框
const showReplyInput = (item) => {
  comments.value.forEach(comment => {
    comment.showReplyInput = comment.id === item.id
  })
  replyContent.value = ''
}

// 提交回复
const submitReply = (item) => {
  if (!replyContent.value.trim()) return
  
  item.replies.push({
    userName: '当前用户',
    content: replyContent.value
  })
  
  item.showReplyInput = false
  replyContent.value = ''
}

// 提交新评论
const submitComment = () => {
  if (!newComment.value.trim()) return
  
  comments.value.unshift({
    id: Date.now(),
    userAvatar: '/static/discover/avatar-default.jpg',
    userName: '当前用户',
    time: '刚刚',
    content: newComment.value,
    likes: 0,
    isLiked: false,
    replies: []
  })
  
  newComment.value = ''
}

// 下拉刷新
const onRefresh = () => {
  isRefreshing.value = true
  setTimeout(() => {
    // 刷新评论数据
    isRefreshing.value = false
  }, 1000)
}

// 加载更多
const loadMore = () => {
  if (loadMoreStatus.value === 'loading') return
  loadMoreStatus.value = 'loading'
  setTimeout(() => {
    // 加载更多评论
    loadMoreStatus.value = 'more'
  }, 1000)
}
</script>

<style scoped>
.comments-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 120rpx;
}

.comments-list {
  height: calc(100vh - 120rpx);
}

.comment-item {
  background-color: #fff;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.user-info {
  flex: 1;
}

.username {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  display: block;
}

.time {
  font-size: 24rpx;
  color: #999;
}

.like-btn {
  display: flex;
  align-items: center;
  gap: 8rpx;
  font-size: 24rpx;
  color: #666;
}

.liked {
  color: #d81e06;
}

.comment-content {
  padding-left: 100rpx;
}

.content-text {
  font-size: 28rpx;
  color: #333;
  line-height: 1.6;
}

.replies {
  background-color: #f8f8f8;
  border-radius: 12rpx;
  padding: 16rpx;
  margin-top: 16rpx;
}

.reply-item {
  font-size: 26rpx;
  margin-bottom: 12rpx;
}

.reply-user {
  color: #007AFF;
  margin-right: 10rpx;
}

.reply-text {
  color: #333;
}

.reply-btn {
  font-size: 24rpx;
  color: #666;
  margin-top: 16rpx;
  display: inline-block;
}

.reply-input-box {
  display: flex;
  gap: 16rpx;
  margin-top: 16rpx;
}

.reply-input {
  flex: 1;
  height: 60rpx;
  background-color: #f5f5f5;
  border-radius: 30rpx;
  padding: 0 20rpx;
  font-size: 26rpx;
}

.submit-reply-btn {
  font-size: 26rpx;
  color: #007AFF;
  background: none;
  padding: 0;
  line-height: 60rpx;
}

.comment-input-section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 20rpx;
  display: flex;
  gap: 20rpx;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.comment-input {
  flex: 1;
  height: 80rpx;
  background-color: #f5f5f5;
  border-radius: 40rpx;
  padding: 0 30rpx;
  font-size: 28rpx;
}

.submit-btn {
  width: 120rpx;
  height: 80rpx;
  line-height: 80rpx;
  background-color: #007AFF;
  color: #fff;
  border-radius: 40rpx;
  font-size: 28rpx;
}

.submit-btn[disabled] {
  background-color: #ccc;
}
</style> 