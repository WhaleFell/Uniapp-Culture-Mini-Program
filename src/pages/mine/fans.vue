<template>
  <view class="fans-container">
    <!-- 粉丝统计 -->
    <view class="fans-stats">
      <view class="stat-item">
        <text class="stat-value">{{ stats.totalFans }}</text>
        <text class="stat-label">粉丝总数</text>
      </view>
      <view class="stat-item">
        <text class="stat-value">{{ stats.newFans }}</text>
        <text class="stat-label">今日新增</text>
      </view>
      <view class="stat-item">
        <text class="stat-value">{{ stats.mutualFans }}</text>
        <text class="stat-label">互相关注</text>
      </view>
    </view>

    <!-- 粉丝列表 -->
    <scroll-view 
      class="fans-list"
      scroll-y
      @scrolltolower="loadMore"
      refresher-enabled
      @refresherrefresh="onRefresh"
      :refresher-triggered="isRefreshing"
    >
      <view 
        class="fan-item" 
        v-for="(fan, index) in fansList" 
        :key="index"
      >
        <view class="user-info" @tap="goToUserProfile(fan)">
          <image :src="fan.avatar" mode="aspectFill" class="avatar"></image>
          <view class="info-content">
            <view class="name-row">
              <text class="nickname">{{ fan.nickname }}</text>
              <image 
                v-if="fan.verified" 
                src="/static/mine/verified.png" 
                mode="aspectFit" 
                class="verified-icon"
              ></image>
            </view>
            <text class="signature">{{ fan.signature }}</text>
            <view class="follow-time">
              <uni-icons type="calendar" size="12" color="#999"></uni-icons>
              <text>{{ fan.followTime }}关注了你</text>
            </view>
          </view>
        </view>
        
        <button 
          class="follow-btn" 
          :class="{ following: fan.isFollowing }"
          @tap="toggleFollow(index)"
        >
          {{ fan.isFollowing ? '互相关注' : '回关' }}
        </button>
      </view>

      <!-- 加载更多 -->
      <uni-load-more :status="loadMoreStatus"></uni-load-more>
    </scroll-view>

    <!-- 空状态 -->
    <view class="empty-state" v-if="fansList.length === 0">
      <image src="/static/mine/empty-fans.png" mode="aspectFit" class="empty-image"></image>
      <text class="empty-text">暂无粉丝</text>
      <text class="empty-desc">多分享内容来吸引更多粉丝吧</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 粉丝统计数据
const stats = ref({
  totalFans: 256,
  newFans: 12,
  mutualFans: 68
})

// 粉丝列表数据
const fansList = ref([
  {
    id: 1,
    nickname: '文化探索家',
    avatar: '/static/avatar/user1.jpg',
    signature: '发现传统文化之美',
    verified: true,
    isFollowing: true,
    followTime: '2024-01-20'
  },
  {
    id: 2,
    nickname: '艺术收藏家',
    avatar: '/static/avatar/user2.jpg',
    signature: '热爱中国传统艺术',
    verified: false,
    isFollowing: false,
    followTime: '2024-01-19'
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

// 切换关注状态
const toggleFollow = (index) => {
  fansList.value[index].isFollowing = !fansList.value[index].isFollowing
  
  uni.showToast({
    title: fansList.value[index].isFollowing ? '已回关' : '已取消关注',
    icon: 'none'
  })
}

// 跳转到用户主页
const goToUserProfile = (user) => {
  uni.navigateTo({
    url: `/pages/user/profile?id=${user.id}`
  })
}
</script>

<style scoped>
.fans-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.fans-stats {
  display: flex;
  justify-content: space-around;
  padding: 30rpx;
  background-color: #fff;
  margin-bottom: 20rpx;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 8rpx;
}

.stat-label {
  font-size: 24rpx;
  color: #999;
}

.fans-list {
  height: calc(100vh - 180rpx);
}

.fan-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx;
  background-color: #fff;
  margin-bottom: 2rpx;
}

.user-info {
  display: flex;
  align-items: center;
  flex: 1;
  margin-right: 20rpx;
}

.avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.info-content {
  flex: 1;
}

.name-row {
  display: flex;
  align-items: center;
  margin-bottom: 8rpx;
}

.nickname {
  font-size: 28rpx;
  color: #333;
  font-weight: bold;
  margin-right: 8rpx;
}

.verified-icon {
  width: 32rpx;
  height: 32rpx;
}

.signature {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 8rpx;
}

.follow-time {
  display: flex;
  align-items: center;
  gap: 4rpx;
  font-size: 22rpx;
  color: #999;
}

.follow-btn {
  width: 140rpx;
  height: 56rpx;
  line-height: 56rpx;
  text-align: center;
  font-size: 26rpx;
  color: #fff;
  background-color: #d81e06;
  border-radius: 28rpx;
  padding: 0;
}

.follow-btn.following {
  background-color: #f5f5f5;
  color: #666;
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