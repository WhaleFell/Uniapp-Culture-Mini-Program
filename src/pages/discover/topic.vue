<template>
  <view class="topic-container">
    <!-- 话题头部 -->
    <view class="topic-header">
      <view class="topic-info">
        <text class="topic-title">#{{ topicTitle }}#</text>
        <text class="topic-stats">{{ topicData.discussCount }}讨论 · {{ topicData.viewCount }}浏览</text>
      </view>
      <view class="topic-desc">{{ topicData.description }}</view>
      <button class="follow-btn" @tap="followTopic">
        {{ isFollowed ? '已关注' : '关注' }}
      </button>
    </view>

    <!-- 内容筛选 -->
    <view class="filter-tabs">
      <view 
        class="tab-item" 
        v-for="(tab, index) in tabs" 
        :key="index"
        :class="{ active: currentTab === index }"
        @tap="changeTab(index)"
      >
        {{ tab }}
      </view>
    </view>

    <!-- 话题内容列表 -->
    <scroll-view 
      class="content-scroll"
      scroll-y
      @scrolltolower="loadMore"
      refresher-enabled
      @refresherrefresh="onRefresh"
      :refresher-triggered="isRefreshing"
    >
      <view class="post-list">
        <view 
          class="post-item" 
          v-for="(item, index) in posts" 
          :key="index"
        >
          <!-- 用户信息 -->
          <view class="user-info">
            <image :src="item.userAvatar" class="avatar"></image>
            <view class="user-detail">
              <text class="username">{{ item.userName }}</text>
              <text class="post-time">{{ item.postTime }}</text>
            </view>
          </view>

          <!-- 动态内容 -->
          <view class="post-content">
            <text class="post-text">{{ item.content }}</text>
            <!-- 图片网格 -->
            <view class="image-grid" v-if="item.images && item.images.length">
              <image 
                v-for="(img, imgIndex) in item.images" 
                :key="imgIndex"
                :src="img"
                mode="aspectFill"
                @tap="previewImage(item.images, imgIndex)"
              ></image>
            </view>
          </view>

          <!-- 互动栏 -->
          <view class="interaction-bar">
            <view class="action-item" @tap="likePost(item)">
              <uni-icons 
                :type="item.isLiked ? 'heart-filled' : 'heart'" 
                size="20" 
                :color="item.isLiked ? '#d81e06' : '#666'"
              ></uni-icons>
              <text>{{ item.likes }}</text>
            </view>
            <view class="action-item" @tap="showComments(item)">
              <uni-icons type="chat" size="20" color="#666"></uni-icons>
              <text>{{ item.comments }}</text>
            </view>
            <view class="action-item" @tap="sharePost(item)">
              <uni-icons type="redo" size="20" color="#666"></uni-icons>
              <text>分享</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 加载更多 -->
      <uni-load-more :status="loadMoreStatus"></uni-load-more>
    </scroll-view>

    <!-- 发布按钮 -->
    <view class="publish-btn" @tap="showPublishModal">
      <uni-icons type="plus" size="24" color="#fff"></uni-icons>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const topicTitle = ref('')
const isFollowed = ref(false)
const currentTab = ref(0)
const isRefreshing = ref(false)
const loadMoreStatus = ref('more')

// 话题数据
const topicData = ref({
  title: '传统文化创新',
  description: '探讨如何在现代生活中传承和创新中国传统文化，分享创新实践和心得体会。',
  discussCount: '12.5k',
  viewCount: '89.2k'
})

// 筛选标签
const tabs = ref(['最热', '最新', '精选'])

// 话题内容列表
const posts = ref([
  {
    userAvatar: '/static/discover/avatar1.jpg',
    userName: '文创达人',
    postTime: '10分钟前',
    content: '今天参加了一场非遗文创市集，看到很多传统工艺与现代设计的碰撞，特别有意思！分享一些现场照片...',
    images: [
      '/static/discover/post1-1.jpg',
      '/static/discover/post1-2.jpg',
      '/static/discover/post1-3.jpg'
    ],
    likes: 128,
    comments: 32,
    isLiked: false
  },
  {
    userAvatar: '/static/discover/avatar2.jpg',
    userName: '手工艺人',
    postTime: '2小时前',
    content: '用传统蓝染工艺制作的现代服装系列，每一件都独一无二，希望能让更多年轻人爱上传统工艺。',
    images: [
      '/static/discover/post2-1.jpg',
      '/static/discover/post2-2.jpg'
    ],
    likes: 256,
    comments: 45,
    isLiked: true
  }
])

onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  topicTitle.value = decodeURIComponent(currentPage.$page.options.title)
})

// 关注话题
const followTopic = () => {
  isFollowed.value = !isFollowed.value
  uni.showToast({
    title: isFollowed.value ? '已关注' : '已取消关注',
    icon: 'none'
  })
}

// 切换标签
const changeTab = (index) => {
  currentTab.value = index
  // 加载对应标签的数据
}

// 点赞帖子
const likePost = (item) => {
  item.isLiked = !item.isLiked
  item.likes += item.isLiked ? 1 : -1
}

// 查看评论
const showComments = (item) => {
  uni.navigateTo({
    url: `/pages/discover/comments?postId=${item.id}`
  })
}

// 分享帖子
const sharePost = (item) => {
  uni.showActionSheet({
    itemList: ['分享到微信', '分享到朋友圈', '复制链接'],
    success: (res) => {
      uni.showToast({
        title: '分享成功',
        icon: 'success'
      })
    }
  })
}

// 预览图片
const previewImage = (images, current) => {
  uni.previewImage({
    urls: images,
    current: images[current]
  })
}

// 显示发布模态框
const showPublishModal = () => {
  uni.navigateTo({
    url: `/pages/discover/publish?topic=${encodeURIComponent(topicTitle.value)}`
  })
}

// 下拉刷新
const onRefresh = () => {
  isRefreshing.value = true
  setTimeout(() => {
    // 刷新数据逻辑
    isRefreshing.value = false
  }, 1000)
}

// 加载更多
const loadMore = () => {
  if (loadMoreStatus.value === 'loading') return
  loadMoreStatus.value = 'loading'
  setTimeout(() => {
    // 加载更多数据逻辑
    loadMoreStatus.value = 'more'
  }, 1000)
}
</script>

<style scoped>
.topic-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.topic-header {
  background-color: #fff;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.topic-info {
  margin-bottom: 20rpx;
}

.topic-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
  display: block;
}

.topic-stats {
  font-size: 24rpx;
  color: #666;
}

.topic-desc {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20rpx;
}

.follow-btn {
  width: 200rpx;
  height: 64rpx;
  line-height: 64rpx;
  background-color: #d81e06;
  color: #fff;
  font-size: 28rpx;
  border-radius: 32rpx;
}

.filter-tabs {
  display: flex;
  background-color: #fff;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.tab-item {
  flex: 1;
  text-align: center;
  font-size: 28rpx;
  color: #666;
  position: relative;
}

.tab-item.active {
  color: #333;
  font-weight: bold;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: -10rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 40rpx;
  height: 4rpx;
  background-color: #d81e06;
  border-radius: 2rpx;
}

.content-scroll {
  height: calc(100vh - 300rpx);
}

.post-list {
  padding: 20rpx;
}

.post-item {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.user-detail {
  flex: 1;
}

.username {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  display: block;
}

.post-time {
  font-size: 24rpx;
  color: #999;
}

.post-content {
  margin-bottom: 20rpx;
}

.post-text {
  font-size: 28rpx;
  color: #333;
  line-height: 1.6;
  margin-bottom: 20rpx;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10rpx;
}

.image-grid image {
  width: 100%;
  height: 200rpx;
  border-radius: 8rpx;
}

.interaction-bar {
  display: flex;
  justify-content: space-around;
  padding-top: 20rpx;
  border-top: 1rpx solid #eee;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 8rpx;
  font-size: 24rpx;
  color: #666;
}

.publish-btn {
  position: fixed;
  right: 40rpx;
  bottom: 40rpx;
  width: 100rpx;
  height: 100rpx;
  background-color: #d81e06;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 16rpx rgba(216, 30, 6, 0.3);
}

.publish-btn:active {
  transform: scale(0.95);
}
</style> 