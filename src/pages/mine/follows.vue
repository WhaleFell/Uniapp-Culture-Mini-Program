<template>
  <view class="follows-container">
    <!-- 标签页 -->
    <view class="tab-header">
      <view 
        class="tab-item" 
        v-for="(tab, index) in tabs" 
        :key="index"
        :class="{ active: currentTab === index }"
        @tap="changeTab(index)"
      >
        {{ tab.name }}
        <text class="count">({{ tab.count }})</text>
      </view>
    </view>

    <!-- 用户列表 -->
    <scroll-view 
      class="user-list"
      scroll-y
      @scrolltolower="loadMore"
      refresher-enabled
      @refresherrefresh="onRefresh"
      :refresher-triggered="isRefreshing"
    >
      <view 
        class="user-item" 
        v-for="(user, index) in currentList" 
        :key="index"
      >
        <view class="user-info" @tap="goToUserProfile(user)">
          <image :src="user.avatar" mode="aspectFill" class="avatar"></image>
          <view class="info-content">
            <view class="name-row">
              <text class="nickname">{{ user.nickname }}</text>
              <image 
                v-if="user.verified" 
                src="/static/mine/verified.png" 
                mode="aspectFit" 
                class="verified-icon"
              ></image>
            </view>
            <text class="signature">{{ user.signature }}</text>
          </view>
        </view>
        
        <button 
          class="follow-btn" 
          :class="{ following: user.isFollowing }"
          @tap="toggleFollow(index)"
        >
          {{ user.isFollowing ? '已关注' : '关注' }}
        </button>
      </view>

      <!-- 加载更多 -->
      <uni-load-more :status="loadMoreStatus"></uni-load-more>
    </scroll-view>

    <!-- 空状态 -->
    <view class="empty-state" v-if="currentList.length === 0">
      <image 
        :src="currentTab === 0 ? '/static/mine/empty-follows.png' : '/static/mine/empty-fans.png'" 
        mode="aspectFit" 
        class="empty-image"
      ></image>
      <text class="empty-text">{{ currentTab === 0 ? '暂无关注' : '暂无粉丝' }}</text>
      <text class="empty-desc">{{ currentTab === 0 ? '去发现更多有趣的人吧' : '多分享内容来吸引更多粉丝吧' }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 标签页配置
const tabs = [
  { name: '关注', count: 128 },
  { name: '粉丝', count: 256 }
]

const currentTab = ref(0)
const isRefreshing = ref(false)
const loadMoreStatus = ref('more')

// 模拟用户数据
const follows = ref([
  {
    id: 1,
    nickname: '文化传承者',
    avatar: '/static/avatar/user1.jpg',
    signature: '致力于传统文化的传播与发展',
    verified: true,
    isFollowing: true
  },
  {
    id: 2,
    nickname: '国学爱好者',
    avatar: '/static/avatar/user2.jpg',
    signature: '学习中国传统文化，感受经典魅力',
    verified: false,
    isFollowing: true
  }
])

const fans = ref([
  {
    id: 3,
    nickname: '文化探索家',
    avatar: '/static/avatar/user3.jpg',
    signature: '发现传统文化之美',
    verified: true,
    isFollowing: false
  },
  {
    id: 4,
    nickname: '艺术收藏家',
    avatar: '/static/avatar/user4.jpg',
    signature: '热爱中国传统艺术',
    verified: false,
    isFollowing: true
  }
])

// 当前显示的列表
const currentList = computed(() => {
  return currentTab.value === 0 ? follows.value : fans.value
})

// 切换标签
const changeTab = (index) => {
  currentTab.value = index
  loadMoreStatus.value = 'more'
}

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
  const list = currentTab.value === 0 ? follows : fans
  list.value[index].isFollowing = !list.value[index].isFollowing
  
  uni.showToast({
    title: list.value[index].isFollowing ? '已关注' : '已取消关注',
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
.follows-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.tab-header {
  display: flex;
  background-color: #fff;
  padding: 20rpx 0;
  position: sticky;
  top: 0;
  z-index: 100;
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
  bottom: -20rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 40rpx;
  height: 4rpx;
  background-color: #d81e06;
  border-radius: 2rpx;
}

.count {
  font-size: 24rpx;
  color: #999;
  margin-left: 4rpx;
}

.user-list {
  height: calc(100vh - 88rpx);
}

.user-item {
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