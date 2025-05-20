<template>
  <view class="calendar-container">
    <!-- 月份切换 -->
    <view class="month-selector">
      <view class="arrow-btn" @tap="changeMonth(-1)">
        <uni-icons type="left" size="20" color="#333"></uni-icons>
      </view>
      <text class="current-month">{{ currentYear }}年{{ currentMonth }}月</text>
      <view class="arrow-btn" @tap="changeMonth(1)">
        <uni-icons type="right" size="20" color="#333"></uni-icons>
      </view>
    </view>

    <!-- 日历主体 -->
    <view class="calendar-body">
      <!-- 星期表头 -->
      <view class="week-header">
        <text v-for="day in weekDays" :key="day">{{ day }}</text>
      </view>

      <!-- 日期格子 -->
      <view class="days-grid">
        <view 
          class="day-cell" 
          v-for="(day, index) in daysArray" 
          :key="index"
          :class="{
            'other-month': !day.currentMonth,
            'has-study': day.hasStudy,
            'today': day.isToday
          }"
          @tap="selectDay(day)"
        >
          <text class="day-number">{{ day.date }}</text>
          <view class="study-marker" v-if="day.hasStudy">
            <text class="study-time">{{ day.studyTime }}分钟</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 学习统计 -->
    <view class="study-stats">
      <view class="stat-item">
        <text class="stat-value">{{ monthStats.totalDays }}</text>
        <text class="stat-label">学习天数</text>
      </view>
      <view class="stat-item">
        <text class="stat-value">{{ monthStats.totalTime }}h</text>
        <text class="stat-label">学习时长</text>
      </view>
      <view class="stat-item">
        <text class="stat-value">{{ monthStats.averageTime }}min</text>
        <text class="stat-label">日均时长</text>
      </view>
    </view>

    <!-- 日期详情弹窗 -->
    <uni-popup ref="dayDetailPopup" type="bottom">
      <view class="day-detail">
        <view class="detail-header">
          <text class="detail-date">{{ selectedDay.fullDate }}</text>
          <view class="close-btn" @tap="hideDayDetail">
            <uni-icons type="close" size="20" color="#999"></uni-icons>
          </view>
        </view>
        
        <view class="detail-content" v-if="selectedDay.hasStudy">
          <view class="time-info">
            学习时长：<text class="highlight">{{ selectedDay.studyTime }}分钟</text>
          </view>
          <view class="study-list">
            <view 
              class="study-item" 
              v-for="(item, index) in selectedDay.studyList" 
              :key="index"
              @tap="goToDetail(item)"
            >
              <image :src="item.imageUrl" mode="aspectFill" class="item-image"></image>
              <view class="item-info">
                <text class="item-title">{{ item.title }}</text>
                <text class="study-duration">{{ item.duration }}分钟</text>
              </view>
              <uni-icons type="right" size="16" color="#999"></uni-icons>
            </view>
          </view>
        </view>
        
        <view class="empty-detail" v-else>
          <image src="/static/mine/empty-study.png" mode="aspectFit" class="empty-image"></image>
          <text class="empty-text">这天没有学习记录哦</text>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 星期表头
const weekDays = ['日', '一', '二', '三', '四', '五', '六']

// 当前日期
const currentYear = ref(2024)
const currentMonth = ref(1)

// 月度统计
const monthStats = ref({
  totalDays: 15,
  totalTime: 25.5,
  averageTime: 45
})

// 选中的日期
const selectedDay = ref({
  fullDate: '2024年1月20日',
  hasStudy: true,
  studyTime: 45,
  studyList: [
    {
      id: 1,
      title: '中国传统建筑艺术赏析',
      imageUrl: '/static/culture/architecture.jpg',
      duration: 25
    },
    {
      id: 2,
      title: '中国传统音乐基础入门',
      imageUrl: '/static/culture/music.jpg',
      duration: 20
    }
  ]
})

// 日期数组
const daysArray = computed(() => {
  // 这里应该返回当月的日期数组，包含上月末和下月初的日期
  // 示例数据
  return Array(35).fill(null).map((_, index) => ({
    date: (index % 31) + 1,
    currentMonth: index > 2 && index < 33,
    hasStudy: Math.random() > 0.7,
    studyTime: Math.floor(Math.random() * 60) + 30,
    isToday: index === 15
  }))
})

// 切换月份
const changeMonth = (delta) => {
  const newMonth = currentMonth.value + delta
  if (newMonth > 12) {
    currentMonth.value = 1
    currentYear.value++
  } else if (newMonth < 1) {
    currentMonth.value = 12
    currentYear.value--
  } else {
    currentMonth.value = newMonth
  }
  // 这里应该重新获取该月的数据
}

// 选择日期
const dayDetailPopup = ref(null)
const selectDay = (day) => {
  if (!day.currentMonth) return
  selectedDay.value = {
    fullDate: `${currentYear.value}年${currentMonth.value}月${day.date}日`,
    hasStudy: day.hasStudy,
    studyTime: day.studyTime,
    studyList: day.hasStudy ? selectedDay.value.studyList : []
  }
  dayDetailPopup.value.open()
}

// 隐藏日期详情
const hideDayDetail = () => {
  dayDetailPopup.value.close()
}

// 跳转到详情
const goToDetail = (item) => {
  uni.navigateTo({
    url: `/pages/culture/detail?id=${item.id}&title=${encodeURIComponent(item.title)}`
  })
}
</script>

<style scoped>
.calendar-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;
}

.month-selector {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  background-color: #fff;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
}

.current-month {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.arrow-btn {
  padding: 10rpx 20rpx;
}

.calendar-body {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.week-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  padding: 20rpx 0;
}

.week-header text {
  font-size: 28rpx;
  color: #999;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10rpx;
}

.day-cell {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 8rpx;
}

.day-number {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 8rpx;
}

.other-month {
  opacity: 0.3;
}

.has-study {
  background-color: rgba(216, 30, 6, 0.1);
}

.today {
  background-color: #d81e06;
}

.today .day-number {
  color: #fff;
}

.study-marker {
  position: absolute;
  bottom: 8rpx;
  left: 50%;
  transform: translateX(-50%);
}

.study-time {
  font-size: 20rpx;
  color: #d81e06;
}

.today .study-time {
  color: #fff;
}

.study-stats {
  display: flex;
  justify-content: space-around;
  padding: 30rpx;
  background-color: #fff;
  border-radius: 12rpx;
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

.day-detail {
  background-color: #fff;
  border-radius: 24rpx 24rpx 0 0;
  padding: 30rpx;
  padding-bottom: env(safe-area-inset-bottom);
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}

.detail-date {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.close-btn {
  padding: 10rpx;
}

.time-info {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 20rpx;
}

.highlight {
  color: #d81e06;
  font-weight: bold;
}

.study-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.study-item {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background-color: #f5f5f5;
  border-radius: 12rpx;
}

.item-image {
  width: 120rpx;
  height: 90rpx;
  border-radius: 8rpx;
  margin-right: 20rpx;
}

.item-info {
  flex: 1;
}

.item-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 8rpx;
  display: block;
}

.study-duration {
  font-size: 24rpx;
  color: #999;
}

.empty-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60rpx 0;
}

.empty-image {
  width: 200rpx;
  height: 200rpx;
  margin-bottom: 20rpx;
}

.empty-text {
  font-size: 28rpx;
  color: #999;
}
</style> 