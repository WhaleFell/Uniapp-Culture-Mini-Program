<template>
  <view class="likes-container">
    <!-- 点赞列表 -->
    <scroll-view 
      class="likes-list"
      scroll-y
      @scrolltolower="loadMore"
      refresher-enabled
      @refresherrefresh="onRefresh"
      :refresher-triggered="isRefreshing"
    >
      <view 
        class="like-item" 
        v-for="(item, index) in likesList" 
        :key="index"
        @tap="goToDetail(item)"
      >
        <view class="user-info">
          <image :src="item.userAvatar" mode="aspectFill" class="avatar"></image>
          <view class="info-content">
            <text class="nickname">{{ item.userName }}</text>
            <text class="time">{{ item.time }}</text>
          </view>
          <text class="action-text">赞了你的{{ item.type }}</text>
        </view>
        
        <view class="content-preview">
          <view class="text-content">{{ item.content }}</view>
          <image 
            v-if="item.image" 
            :src="item.image" 
            mode="aspectFill" 
            class="content-image"
          ></image>
        </view>
      </view>

      <!-- 加载更多 -->
      <uni-load-more :status="loadMoreStatus"></uni-load-more>
    </scroll-view>

    <!-- 空状态 -->
    <view class="empty-state" v-if="likesList.length === 0">
      <image src="/static/mine/empty-likes.png" mode="aspectFit" class="empty-image"></image>
      <text class="empty-text">暂无点赞</text>
      <text class="empty-desc">分享更多内容来获取点赞吧</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 点赞列表数据
const likesList = ref([
  {
    id: 1,
    userName: '文化探索家',
    userAvatar: '/static/avatar/user1.jpg',
    time: '10分钟前',
    type: '动态',
    content: '中国传统文化博大精深，源远流长...',
    image: '/static/content/post1.jpg'
  },
  {
    id: 2,
    userName: '艺术收藏家',
    userAvatar: '/static/avatar/user2.jpg',
    time: '1小时前',
    type: '评论',
    content: '非常认同你的观点，传统文化确实需要传承和发展。',
    image: ''
  }
])

const isRefreshing = ref(false)
const loadMoreStatus = ref('more')

// 下拉刷新
const onRefresh = () => {
  isRefreshing.value = true
  setTimeout(() => {
    isRefreshing.value = false
    uni.showToast({
      title: '刷新成功',
      icon: 'success'
    })
  }, 1500)
}

// 加载更多
const loadMore = () => {
  if (loadMoreStatus.value === 'noMore') return
  
  loadMoreStatus.value = 'loading'
  setTimeout(() => {
    loadMoreStatus.value = 'noMore'
  }, 1500)
}

// 跳转到详情页
const goToDetail = (item) => {
  const url = item.type === '动态' 
    ? `/pages/discover/post-detail?id=${item.id}`
    : `/pages/discover/comments?id=${item.id}`
  
  uni.navigateTo({ url })
}
</script>

<style scoped>
.likes-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.likes-list {
  height: 100vh;
}

.like-item {
  background-color: #fff;
  padding: 30rpx;
  margin-bottom: 2rpx;
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

.info-content {
  flex: 1;
}

.nickname {
  font-size: 28rpx;
  color: #333;
  font-weight: bold;
  margin-bottom: 4rpx;
  display: block;
}

.time {
  font-size: 24rpx;
  color: #999;
}

.action-text {
  font-size: 26rpx;
  color: #666;
}

.content-preview {
  background-color: #f8f8f8;
  padding: 20rpx;
  border-radius: 8rpx;
}

.text-content {
  font-size: 28rpx;
  color: #333;
  line-height: 1.6;
  margin-bottom: 16rpx;
}

.content-image {
  width: 200rpx;
  height: 150rpx;
  border-radius: 8rpx;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 200rpx;
}

.empty-image {
  width: 200rpx;
  height: 200rpx;
  margin-bottom: 20rpx;
}

.empty-text {
  font-size: 32rpx;
  color: #333;
  margin-bottom: 10rpx;
}

.empty-desc {
  font-size: 26rpx;
  color: #999;
}
</style> 