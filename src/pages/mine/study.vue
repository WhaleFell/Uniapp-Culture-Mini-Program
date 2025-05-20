<template>
  <view class="study-container">
    <!-- 学习统计 -->
    <view class="study-stats">
      <view class="stat-item">
        <text class="stat-value">{{ stats.totalDays }}</text>
        <text class="stat-label">学习天数</text>
      </view>
      <view class="stat-item">
        <text class="stat-value">{{ stats.totalTime }}h</text>
        <text class="stat-label">学习时长</text>
      </view>
      <view class="stat-item">
        <text class="stat-value">{{ stats.totalCourses }}</text>
        <text class="stat-label">完成课程</text>
      </view>
    </view>

    <!-- 学习记录列表 -->
    <view class="study-list">
      <view class="date-group" v-for="(group, date) in studyRecords" :key="date">
        <view class="date-header">
          <text class="date-text">{{ date }}</text>
          <text class="time-text">学习时长 {{ group.totalTime }}分钟</text>
        </view>
        
        <view class="record-items">
          <view 
            class="record-item" 
            v-for="(item, index) in group.records" 
            :key="index"
            @tap="goToDetail(item)"
          >
            <image :src="item.imageUrl" mode="aspectFill" class="item-image"></image>
            <view class="item-content">
              <text class="item-title">{{ item.title }}</text>
              <view class="progress-info">
                <progress 
                  :percent="item.progress" 
                  activeColor="#d81e06"
                  backgroundColor="#f5f5f5"
                  stroke-width="4"
                ></progress>
                <text class="progress-text">{{ item.progress }}%</text>
              </view>
              <view class="item-info">
                <text class="study-time">{{ item.studyTime }}分钟</text>
                <text class="study-status" :class="item.status">{{ item.statusText }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view class="empty-state" v-if="Object.keys(studyRecords).length === 0">
      <image src="/static/mine/empty-study.png" mode="aspectFit" class="empty-image"></image>
      <text class="empty-text">暂无学习记录</text>
      <text class="empty-desc">开始你的文化学习之旅吧</text>
      <button class="start-btn" @tap="goToStudy">立即学习</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 学习统计数据
const stats = ref({
  totalDays: 15,
  totalTime: 25.5,
  totalCourses: 8
})

// 学习记录数据
const studyRecords = ref({
  '今天': {
    totalTime: 45,
    records: [
      {
        id: 1,
        title: '中国传统建筑艺术赏析',
        imageUrl: '/static/culture/architecture.jpg',
        progress: 80,
        studyTime: 25,
        status: 'ongoing',
        statusText: '学习中'
      },
      {
        id: 2,
        title: '中国传统音乐基础入门',
        imageUrl: '/static/culture/music.jpg',
        progress: 20,
        studyTime: 20,
        status: 'ongoing',
        statusText: '学习中'
      }
    ]
  },
  '昨天': {
    totalTime: 90,
    records: [
      {
        id: 3,
        title: '中国传统节日文化解析',
        imageUrl: '/static/culture/festival.jpg',
        progress: 100,
        studyTime: 60,
        status: 'completed',
        statusText: '已完成'
      },
      {
        id: 4,
        title: '中国古代服饰艺术',
        imageUrl: '/static/culture/costume.jpg',
        progress: 100,
        studyTime: 30,
        status: 'completed',
        statusText: '已完成'
      }
    ]
  }
})

// 跳转到详情
const goToDetail = (item) => {
  uni.navigateTo({
    url: `/pages/culture/detail?id=${item.id}&title=${encodeURIComponent(item.title)}`
  })
}

// 跳转到学习页面
const goToStudy = () => {
  uni.switchTab({
    url: '/pages/culture/culture'
  })
}
</script>

<style scoped>
.study-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 40rpx;
}

.study-stats {
  display: flex;
  justify-content: space-around;
  padding: 40rpx 20rpx;
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

.date-group {
  margin-bottom: 20rpx;
}

.date-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
}

.date-text {
  font-size: 28rpx;
  color: #999;
}

.time-text {
  font-size: 24rpx;
  color: #666;
  background-color: #f0f0f0;
  padding: 4rpx 16rpx;
  border-radius: 100rpx;
}

.record-items {
  background-color: #fff;
}

.record-item {
  display: flex;
  padding: 20rpx;
  border-bottom: 1rpx solid #f5f5f5;
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
  font-size: 28rpx;
  color: #333;
  margin-bottom: 16rpx;
}

.progress-info {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 16rpx;
}

progress {
  flex: 1;
}

.progress-text {
  font-size: 24rpx;
  color: #666;
  width: 60rpx;
}

.item-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.study-time {
  font-size: 24rpx;
  color: #999;
}

.study-status {
  font-size: 24rpx;
  padding: 4rpx 16rpx;
  border-radius: 100rpx;
}

.study-status.ongoing {
  color: #1677ff;
  background-color: rgba(22, 119, 255, 0.1);
}

.study-status.completed {
  color: #52c41a;
  background-color: rgba(82, 196, 26, 0.1);
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
  margin-bottom: 40rpx;
}

.start-btn {
  width: 240rpx;
  height: 80rpx;
  line-height: 80rpx;
  background-color: #d81e06;
  color: #fff;
  font-size: 28rpx;
  border-radius: 40rpx;
}

.start-btn:active {
  opacity: 0.8;
}
</style> 