<template>
  <view class="collection-container">
    <!-- 分类标签 -->
    <view class="category-tabs">
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

    <!-- 收藏列表 -->
    <scroll-view 
      class="collection-list"
      scroll-y
      @scrolltolower="loadMore"
      refresher-enabled
      @refresherrefresh="onRefresh"
      :refresher-triggered="isRefreshing"
    >
      <view 
        class="collection-item" 
        v-for="(item, index) in collections" 
        :key="index"
        @tap="goToDetail(item)"
      >
        <image :src="item.imageUrl" mode="aspectFill" class="item-image"></image>
        <view class="item-content">
          <text class="item-title">{{ item.title }}</text>
          <text class="item-desc">{{ item.description }}</text>
          <view class="item-info">
            <text class="time">{{ item.time }}</text>
            <view class="action-btn" @tap.stop="removeCollection(index)">
              <uni-icons type="trash" size="16" color="#999"></uni-icons>
              <text>取消收藏</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 加载更多 -->
      <uni-load-more :status="loadMoreStatus"></uni-load-more>
    </scroll-view>

    <!-- 空状态 -->
    <view class="empty-state" v-if="collections.length === 0">
      <image src="/static/mine/empty-collection.png" mode="aspectFit" class="empty-image"></image>
      <text class="empty-text">暂无收藏内容</text>
      <text class="empty-desc">你还没有收藏任何内容</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 分类标签
const tabs = ref([
  { name: '全部', count: 8 },
  { name: '文章', count: 5 },
  { name: '视频', count: 3 }
])

const currentTab = ref(0)
const isRefreshing = ref(false)
const loadMoreStatus = ref('more')

// 收藏数据
const collections = ref([
  {
    id: 1,
    title: '中国传统戏曲艺术',
    description: '探索京剧、昆曲等传统戏曲的魅力，了解非物质文化遗产的传承与发展。',
    imageUrl: '/static/culture/xiqu.jpg',
    time: '2024-01-15',
    type: 'article'
  },
  {
    id: 2,
    title: '传统建筑之美',
    description: '走进中国古代建筑，感受匠心独运的建筑智慧。',
    imageUrl: '/static/culture/architecture.jpg',
    time: '2024-01-10',
    type: 'video'
  }
])

// 切换标签
const changeTab = (index) => {
  currentTab.value = index
  // 这里可以添加根据标签筛选内容的逻辑
}

// 跳转到详情
const goToDetail = (item) => {
  uni.navigateTo({
    url: `/pages/detail/detail?id=${item.id}&title=${encodeURIComponent(item.title)}`
  })
}

// 取消收藏
const removeCollection = (index) => {
  uni.showModal({
    title: '提示',
    content: '确定要取消收藏吗？',
    success: (res) => {
      if (res.confirm) {
        collections.value.splice(index, 1)
        // 更新对应标签的数量
        tabs.value[currentTab.value].count--
        uni.showToast({
          title: '已取消收藏',
          icon: 'success'
        })
      }
    }
  })
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
</script>

<style scoped>
.collection-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.category-tabs {
  display: flex;
  background-color: #fff;
  padding: 20rpx;
  position: sticky;
  top: 0;
  z-index: 1;
}

.tab-item {
  flex: 1;
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 16rpx 0;
  position: relative;
}

.tab-item.active {
  color: #d81e06;
  font-weight: bold;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
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

.collection-list {
  padding: 20rpx;
}

.collection-item {
  display: flex;
  background-color: #fff;
  padding: 20rpx;
  margin-bottom: 20rpx;
  border-radius: 12rpx;
}

.item-image {
  width: 200rpx;
  height: 150rpx;
  border-radius: 8rpx;
  margin-right: 20rpx;
}

.item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.item-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.item-desc {
  font-size: 26rpx;
  color: #666;
  line-height: 1.4;
  margin-bottom: 20rpx;
}

.item-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.time {
  font-size: 24rpx;
  color: #999;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8rpx;
  font-size: 24rpx;
  color: #999;
  padding: 8rpx 16rpx;
  background-color: #f5f5f5;
  border-radius: 100rpx;
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