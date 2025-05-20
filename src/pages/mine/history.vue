<template>
  <view class="history-container">
    <!-- 顶部操作栏 -->
    <view class="action-header">
      <view class="filter-btn" @tap="showFilterPopup">
        <text>{{ currentFilter.name }}</text>
        <uni-icons type="down" size="12" color="#666"></uni-icons>
      </view>
      <view class="clear-btn" @tap="clearHistory" v-if="Object.keys(groupedHistory).length > 0">
        <uni-icons type="trash" size="16" color="#999"></uni-icons>
        <text>清空</text>
      </view>
    </view>

    <!-- 日期分组列表 -->
    <scroll-view 
      class="history-list"
      scroll-y
      @scrolltolower="loadMore"
      refresher-enabled
      @refresherrefresh="onRefresh"
      :refresher-triggered="isRefreshing"
    >
      <view class="date-group" v-for="(group, date) in groupedHistory" :key="date">
        <view class="date-header">{{ date }}</view>
        <view class="history-items">
          <view 
            class="history-item" 
            v-for="(item, index) in group" 
            :key="index"
            @tap="goToDetail(item)"
          >
            <image :src="item.imageUrl" mode="aspectFill" class="item-image"></image>
            <view class="item-content">
              <text class="item-title">{{ item.title }}</text>
              <view class="item-info">
                <text class="item-type">{{ item.type }}</text>
                <text class="item-time">{{ item.time }}</text>
              </view>
            </view>
            <view class="delete-btn" @tap.stop="removeHistory(date, index)">
              <uni-icons type="trash" size="16" color="#999"></uni-icons>
            </view>
          </view>
        </view>
      </view>

      <!-- 加载更多 -->
      <uni-load-more :status="loadMoreStatus"></uni-load-more>
    </scroll-view>

    <!-- 空状态 -->
    <view class="empty-state" v-if="Object.keys(groupedHistory).length === 0">
      <image src="/static/mine/empty-history.png" mode="aspectFit" class="empty-image"></image>
      <text class="empty-text">暂无浏览记录</text>
      <text class="empty-desc">快去发现更多精彩内容吧</text>
    </view>

    <!-- 筛选弹窗 -->
    <uni-popup ref="filterPopup" type="bottom">
      <view class="filter-popup">
        <view class="popup-header">
          <text class="popup-title">内容筛选</text>
          <view class="close-btn" @tap="hideFilterPopup">
            <uni-icons type="close" size="20" color="#999"></uni-icons>
          </view>
        </view>
        <view class="filter-list">
          <view 
            class="filter-item" 
            v-for="(filter, index) in filters" 
            :key="index"
            :class="{ active: currentFilter.id === filter.id }"
            @tap="selectFilter(filter)"
          >
            {{ filter.name }}
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 筛选选项
const filters = [
  { id: 0, name: '全部内容' },
  { id: 1, name: '文章' },
  { id: 2, name: '视频' },
  { id: 3, name: '话题' }
]

const currentFilter = ref(filters[0])
const isRefreshing = ref(false)
const loadMoreStatus = ref('more')
const filterPopup = ref(null)

// 历史记录数据
const groupedHistory = ref({
  '今天': [
    {
      id: 1,
      title: '中国传统节日：春节的习俗与文化',
      imageUrl: '/static/culture/spring-festival.jpg',
      type: '文章',
      time: '20:30'
    },
    {
      id: 2,
      title: '中国古代四大发明',
      imageUrl: '/static/culture/inventions.jpg',
      type: '视频',
      time: '15:45'
    }
  ],
  '昨天': [
    {
      id: 3,
      title: '中国传统音乐欣赏',
      imageUrl: '/static/culture/music.jpg',
      type: '文章',
      time: '18:20'
    }
  ]
})

// 跳转到详情
const goToDetail = (item) => {
  uni.navigateTo({
    url: `/pages/detail/detail?id=${item.id}&title=${encodeURIComponent(item.title)}`
  })
}

// 删除单条历史记录
const removeHistory = (date, index) => {
  uni.showModal({
    title: '提示',
    content: '确定要删除这条浏览记录吗？',
    success: (res) => {
      if (res.confirm) {
        groupedHistory.value[date].splice(index, 1)
        if (groupedHistory.value[date].length === 0) {
          delete groupedHistory.value[date]
        }
        uni.showToast({
          title: '已删除',
          icon: 'success'
        })
      }
    }
  })
}

// 清空历史记录
const clearHistory = () => {
  uni.showModal({
    title: '提示',
    content: '确定要清空全部浏览记录吗？',
    success: (res) => {
      if (res.confirm) {
        groupedHistory.value = {}
        uni.showToast({
          title: '已清空',
          icon: 'success'
        })
      }
    }
  })
}

// 显示筛选弹窗
const showFilterPopup = () => {
  filterPopup.value.open()
}

// 隐藏筛选弹窗
const hideFilterPopup = () => {
  filterPopup.value.close()
}

// 选择筛选条件
const selectFilter = (filter) => {
  currentFilter.value = filter
  hideFilterPopup()
  // 这里可以添加筛选逻辑
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
.history-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.action-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 1;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 8rpx;
  font-size: 28rpx;
  color: #666;
}

.clear-btn {
  display: flex;
  align-items: center;
  gap: 8rpx;
  font-size: 28rpx;
  color: #999;
}

.date-group {
  margin-bottom: 20rpx;
}

.date-header {
  padding: 20rpx;
  font-size: 28rpx;
  color: #999;
}

.history-items {
  background-color: #fff;
}

.history-item {
  display: flex;
  align-items: center;
  padding: 20rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.item-image {
  width: 160rpx;
  height: 120rpx;
  border-radius: 8rpx;
  margin-right: 20rpx;
}

.item-content {
  flex: 1;
}

.item-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 10rpx;
  display: block;
}

.item-info {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.item-type {
  font-size: 24rpx;
  color: #666;
  background-color: #f5f5f5;
  padding: 4rpx 16rpx;
  border-radius: 100rpx;
}

.item-time {
  font-size: 24rpx;
  color: #999;
}

.delete-btn {
  padding: 20rpx;
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

.filter-popup {
  background-color: #fff;
  border-radius: 24rpx 24rpx 0 0;
  padding-bottom: env(safe-area-inset-bottom);
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.popup-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.close-btn {
  padding: 10rpx;
}

.filter-list {
  padding: 30rpx;
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.filter-item {
  font-size: 28rpx;
  color: #666;
  padding: 16rpx 30rpx;
  background-color: #f5f5f5;
  border-radius: 100rpx;
}

.filter-item.active {
  color: #fff;
  background-color: #d81e06;
}
</style> 