<template>
  <view class="exhibition-container">
    <!-- 搜索栏 -->
    <view class="search-section">
      <uni-search-bar 
        v-model="searchValue"
        placeholder="搜索展览"
        @confirm="handleSearch"
        @clear="onSearchClear"
        radius="100"
        cancelButton="none"
      />
    </view>

    <!-- 搜索状态提示 -->
    <view class="search-info" v-if="isSearchMode">
      <text>搜索结果: {{ exhibitions.length }}个展览</text>
      <text class="reset-link" @tap="resetSearch">清除搜索</text>
    </view>

    <!-- 展览分类选择器 -->
    <view class="filter-section" v-if="!isSearchMode">
      <view class="filter-row">
        <view 
          class="filter-item" 
          v-for="(item, index) in filters" 
          :key="index"
          :class="{ active: currentFilter === index }"
          @tap="changeFilter(index)"
        >
          {{ item.name }}
          <uni-icons v-if="item.showIcon" :type="item.iconType" size="12"></uni-icons>
        </view>
      </view>
    </view>

    <!-- 搜索无结果提示 -->
    <view class="no-result" v-if="isSearchMode && exhibitions.length === 0">
      <image src="/static/images/no-result.png" mode="aspectFit"></image>
      <text>没有找到相关展览</text>
      <text class="sub-text">请尝试其他关键词</text>
    </view>

    <!-- 展览列表 -->
    <scroll-view 
      class="exhibition-list"
      scroll-y
      @scrolltolower="loadMore"
      refresher-enabled
      @refresherrefresh="onRefresh"
      :refresher-triggered="isRefreshing"
    >
      <view 
        class="exhibition-item" 
        v-for="(item, index) in exhibitions" 
        :key="index"
        @tap="goToDetail(item)"
      >
        <image :src="item.imageUrl" mode="aspectFill" class="exhibition-image"></image>
        <view class="exhibition-info">
          <view class="status-tag" :class="item.status">{{ item.statusText }}</view>
          <text class="title">{{ item.title }}</text>
          <view class="info-row">
            <view class="info-item">
              <uni-icons type="calendar" size="14" color="#666"></uni-icons>
              <text>{{ item.date }}</text>
            </view>
            <view class="info-item">
              <uni-icons type="location" size="14" color="#666"></uni-icons>
              <text>{{ item.location }}</text>
            </view>
          </view>
          <text class="description">{{ item.description }}</text>
          <view class="price-row">
            <view class="price" v-if="item.price > 0">¥{{ item.price }}</view>
            <view class="price free" v-else>免费</view>
            <button class="book-btn" size="mini" @tap.stop="bookExhibition(item)">
              预约参观
            </button>
          </view>
        </view>
      </view>

      <!-- 加载更多提示 -->
      <view class="loading-more" v-if="isLoading">
        <uni-load-more status="loading"></uni-load-more>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
// 导入uni-search-bar组件
import uniSearchBar from '@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar.vue'

// 搜索值
const searchValue = ref('')
// 当前筛选项
const currentFilter = ref(0)
// 加载状态
const isLoading = ref(false)
// 刷新状态
const isRefreshing = ref(false)
// 是否在搜索模式
const isSearchMode = ref(false)

// 筛选选项
const filters = ref([
  { name: '全部展览', showIcon: false },
  { name: '展览类型', showIcon: true, iconType: 'bottom' },
  { name: '时间排序', showIcon: true, iconType: 'bottom' },
  { name: '位置距离', showIcon: true, iconType: 'bottom' }
])

// 原始展览数据
const originalExhibitions = [
  {
    imageUrl: '/static/exhibition/exhibit1.jpg',
    title: '丝绸之路文物特展',
    status: 'ongoing',
    statusText: '展览中',
    date: '2024.01.01 - 2024.03.31',
    location: '国家博物馆',
    description: '展现丝绸之路上的文化交流与商贸往来，展出珍贵文物300余件。',
    price: 60
  },
  {
    imageUrl: '/static/exhibition/exhibit2.jpg',
    title: '明清瓷器艺术展',
    status: 'upcoming',
    statusText: '即将开展',
    date: '2024.04.01 - 2024.06.30',
    location: '故宫博物院',
    description: '汇集明清两代精美瓷器，展现中国传统制瓷工艺的巅峰。',
    price: 80
  },
  {
    imageUrl: '/static/exhibition/exhibit3.jpg',
    title: '非遗文化展',
    status: 'ongoing',
    statusText: '展览中',
    date: '2024.02.01 - 2024.02.29',
    location: '文化馆',
    description: '展示各地非物质文化遗产，包括手工艺品展示和现场表演。',
    price: 0
  },
  {
    imageUrl: '/static/exhibition/exhibit4.png',
    title: '唐代壁画艺术展',
    status: 'ongoing',
    statusText: '展览中',
    date: '2024.02.15 - 2024.05.15',
    location: '陕西历史博物馆',
    description: '展出唐代经典壁画复原作品及相关文物，展现盛唐时期的艺术成就。',
    price: 50
  },
  {
    imageUrl: '/static/exhibition/exhibit5.png',
    title: '中国古代青铜器展',
    status: 'upcoming',
    statusText: '即将开展',
    date: '2024.05.01 - 2024.07.31',
    location: '上海博物馆',
    description: '集中展示从商周到汉代的精美青铜器，探索中国青铜文明的发展历程。',
    price: 70
  },
  {
    imageUrl: '/static/exhibition/exhibit6.png',
    title: '传统节日文化展',
    status: 'ongoing',
    statusText: '展览中',
    date: '2024.01.20 - 2024.03.20',
    location: '民俗文化中心',
    description: '通过实物、图片和互动装置，展示中国传统节日的习俗和文化内涵。',
    price: 0
  }
]

// 展览数据
const exhibitions = ref([...originalExhibitions])

// 搜索处理
const handleSearch = () => {
  if (!searchValue.value.trim()) {
    // 如果搜索框为空，显示所有展览
    resetSearch()
    return
  }
  
  const keyword = searchValue.value.toLowerCase().trim()
  isSearchMode.value = true
  
  // 根据关键词筛选展览
  const results = originalExhibitions.filter(item => 
    item.title.toLowerCase().includes(keyword) || 
    item.description.toLowerCase().includes(keyword) || 
    item.location.toLowerCase().includes(keyword)
  )
  
  // 更新展览列表
  exhibitions.value = results
  
  // 根据搜索结果提供反馈
  if (results.length > 0) {
    uni.showToast({
      title: `找到${results.length}个展览`,
      icon: 'none'
    })
  } else {
    uni.showToast({
      title: '未找到相关展览',
      icon: 'none'
    })
  }
}

// 重置搜索
const resetSearch = () => {
  searchValue.value = ''
  isSearchMode.value = false
  exhibitions.value = [...originalExhibitions]
}

// 监听搜索框清空事件
const onSearchClear = () => {
  resetSearch()
}

// 切换筛选
const changeFilter = (index) => {
  currentFilter.value = index
  
  // 如果在搜索模式下切换筛选，先退出搜索模式
  if (isSearchMode.value) {
    resetSearch()
  }
  
  // 根据筛选条件排序展览
  switch(index) {
    case 0: // 全部展览
      // 恢复默认排序
      exhibitions.value = [...originalExhibitions]
      break
    case 1: // 展览类型
      // 按状态排序：先显示正在展览的，再显示即将开展的
      exhibitions.value.sort((a, b) => {
        if (a.status === 'ongoing' && b.status !== 'ongoing') return -1
        if (a.status !== 'ongoing' && b.status === 'ongoing') return 1
        return 0
      })
      break
    case 2: // 时间排序
      // 按开始日期排序
      exhibitions.value.sort((a, b) => {
        const dateA = a.date.split(' - ')[0]
        const dateB = b.date.split(' - ')[0]
        return dateA.localeCompare(dateB)
      })
      break
    case 3: // 位置距离
      // 这里可以实现按照距离排序的逻辑
      // 通常需要获取用户位置，然后计算距离
      uni.showToast({
        title: '获取位置信息中...',
        icon: 'none'
      })
      break
  }
}

// 加载更多
const loadMore = () => {
  if (isLoading.value) return
  isLoading.value = true
  
  setTimeout(() => {
    // 模拟加载更多数据
    isLoading.value = false
  }, 1000)
}

// 下拉刷新
const onRefresh = () => {
  isRefreshing.value = true
  
  setTimeout(() => {
    // 刷新数据逻辑
    if (isSearchMode.value) {
      // 如果在搜索模式下刷新，重新执行搜索
      handleSearch()
    } else {
      // 否则重新加载所有展览
      exhibitions.value = [...originalExhibitions]
    }
    isRefreshing.value = false
    
    uni.showToast({
      title: '刷新成功',
      icon: 'success'
    })
  }, 1000)
}

// 预约参观
const bookExhibition = (item) => {
  uni.showModal({
    title: '预约参观',
    content: `是否预约参观"${item.title}"？`,
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: '预约成功',
          icon: 'success'
        })
      }
    }
  })
}

// 跳转到详情页
const goToDetail = (item) => {
  uni.navigateTo({
    url: `/pages/exhibition/detail?title=${encodeURIComponent(item.title)}`
  })
}
</script>

<style scoped>
.exhibition-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.search-section {
  padding: 20rpx;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
}

.search-info {
  display: flex;
  justify-content: space-between;
  padding: 16rpx 30rpx;
  background-color: #f0f8ff;
  font-size: 24rpx;
  color: #666;
}

.reset-link {
  color: #1677ff;
}

.no-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100rpx 0;
}

.no-result image {
  width: 200rpx;
  height: 200rpx;
  margin-bottom: 30rpx;
}

.no-result text {
  font-size: 30rpx;
  color: #333;
}

.no-result .sub-text {
  font-size: 24rpx;
  color: #999;
  margin-top: 10rpx;
}

.filter-section {
  background-color: #fff;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.filter-row {
  display: flex;
  justify-content: space-around;
}

.filter-item {
  display: flex;
  align-items: center;
  font-size: 28rpx;
  color: #666;
  padding: 10rpx 20rpx;
}

.filter-item.active {
  color: #d81e06;
  font-weight: bold;
}

.exhibition-list {
  height: calc(100vh - 200rpx);
}

.exhibition-item {
  margin: 20rpx;
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
}

.exhibition-image {
  width: 100%;
  height: 400rpx;
}

.exhibition-info {
  padding: 20rpx;
  position: relative;
}

.status-tag {
  position: absolute;
  top: -30rpx;
  right: 20rpx;
  padding: 6rpx 20rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
}

.status-tag.ongoing {
  background-color: #e6f4ff;
  color: #1677ff;
}

.status-tag.upcoming {
  background-color: #fff7e6;
  color: #fa8c16;
}

.title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin: 20rpx 0;
}

.info-row {
  display: flex;
  gap: 30rpx;
  margin-bottom: 16rpx;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 6rpx;
  font-size: 24rpx;
  color: #666;
}

.description {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20rpx;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20rpx;
}

.price {
  font-size: 36rpx;
  color: #d81e06;
  font-weight: bold;
}

.price.free {
  color: #52c41a;
}

.book-btn {
  background-color: #d81e06;
  color: #fff;
  border-radius: 100rpx;
  font-size: 26rpx;
}

.loading-more {
  padding: 20rpx 0;
  text-align: center;
}

/* 点击效果 */
.exhibition-item:active {
  transform: scale(0.98);
  transition: transform 0.2s;
}

.filter-item:active {
  opacity: 0.8;
}

.book-btn:active {
  opacity: 0.9;
}
</style>