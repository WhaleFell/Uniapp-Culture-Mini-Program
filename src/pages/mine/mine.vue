<template>
  <view class="mine-container">
    <!-- 顶部用户信息卡片 -->
    <view class="user-card">
      <view class="user-info">
        <image :src="userInfo.avatar" class="avatar" @tap="changeAvatar"></image>
        <view class="info-content">
          <view class="name-row">
            <text class="username">{{ userInfo.nickname }}</text>
            <view class="level-tag">Lv.{{ userInfo.level }}</view>
          </view>
          <text class="user-id">ID: {{ userInfo.userId }}</text>
        </view>
        <button class="edit-btn" size="mini" @tap="editProfile">编辑资料</button>
      </view>
      
      <!-- 数据统计 -->
      <view class="user-stats">
        <view class="stat-item" @tap="navigateTo('follows')">
          <text class="num">{{ userInfo.follows }}</text>
          <text class="label">关注</text>
        </view>
        <view class="stat-item" @tap="navigateTo('fans')">
          <text class="num">{{ userInfo.fans }}</text>
          <text class="label">粉丝</text>
        </view>
        <view class="stat-item" @tap="navigateTo('likes')">
          <text class="num">{{ userInfo.likes }}</text>
          <text class="label">获赞</text>
        </view>
      </view>
    </view>

    <!-- 功能菜单 -->
    <view class="menu-section">
      <view class="menu-group">
        <view class="menu-item" @tap="navigateTo('collection')">
          <view class="item-left">
            <uni-icons type="star-filled" size="22" color="#ff9500"></uni-icons>
            <text>我的收藏</text>
          </view>
          <uni-icons type="right" size="16" color="#999"></uni-icons>
        </view>
        <view class="menu-item" @tap="navigateTo('history')">
          <view class="item-left">
            <uni-icons type="time-filled" size="22" color="#2f9e44"></uni-icons>
            <text>浏览历史</text>
          </view>
          <uni-icons type="right" size="16" color="#999"></uni-icons>
        </view>
        <view class="menu-item" @tap="navigateTo('posts')">
          <view class="item-left">
            <uni-icons type="compose" size="22" color="#1677ff"></uni-icons>
            <text>我的发布</text>
          </view>
          <uni-icons type="right" size="16" color="#999"></uni-icons>
        </view>
      </view>

      <view class="menu-group">
        <view class="menu-item" @tap="navigateTo('study')">
          <view class="item-left">
            <uni-icons type="flag-filled" size="22" color="#d81e06"></uni-icons>
            <text>学习记录</text>
          </view>
          <uni-icons type="right" size="16" color="#999"></uni-icons>
        </view>
        <view class="menu-item" @tap="navigateTo('calendar')">
          <view class="item-left">
            <uni-icons type="calendar-filled" size="22" color="#fa8c16"></uni-icons>
            <text>打卡日历</text>
          </view>
          <uni-icons type="right" size="16" color="#999"></uni-icons>
        </view>
      </view>

      <view class="menu-group">
        <view class="menu-item" @tap="navigateTo('settings')">
          <view class="item-left">
            <uni-icons type="gear-filled" size="22" color="#666"></uni-icons>
            <text>设置</text>
          </view>
          <uni-icons type="right" size="16" color="#999"></uni-icons>
        </view>
        <view class="menu-item" @tap="navigateTo('feedback')">
          <view class="item-left">
            <uni-icons type="help-filled" size="22" color="#666"></uni-icons>
            <text>反馈与帮助</text>
          </view>
          <uni-icons type="right" size="16" color="#999"></uni-icons>
        </view>
      </view>
    </view>

    <!-- 退出登录按钮 -->
    <view class="logout-section">
      <button class="logout-btn" @tap="handleLogout">退出登录</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 用户信息
const userInfo = ref({
  avatar: '/static/mine/avatar.jpg',
  nickname: '文化爱好者',
  level: 5,
  userId: '888888',
  follows: 128,
  fans: 256,
  likes: 1024
})

// 修改头像
const changeAvatar = () => {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      // 处理头像上传逻辑
      console.log('选择的图片：', res.tempFilePaths[0])
    }
  })
}

// 编辑资料
const editProfile = () => {
  uni.navigateTo({
    url: '/pages/mine/edit-profile'
  })
}

// 页面导航
const navigateTo = (page) => {
  uni.navigateTo({
    url: `/pages/mine/${page}`
  })
}

// 退出登录
const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        // 处理退出登录逻辑
        uni.reLaunch({
          url: '/pages/login/login'
        })
      }
    }
  })
}
</script>

<style scoped>
.mine-container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #9d7b56, #e7b57f);
  padding-bottom: 40rpx;
}

.user-card {
  
  padding: 40rpx 30rpx;
  margin-bottom: 20rpx;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  margin-right: 30rpx;
}

.info-content {
  flex: 1;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 20rpx;
  margin-bottom: 10rpx;
}

.username {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.level-tag {
  font-size: 24rpx;
  color: #d81e06;
  background-color: rgba(216, 30, 6, 0.1);
  padding: 4rpx 16rpx;
  border-radius: 100rpx;
}

.user-id {
  font-size: 24rpx;
  color: #363636;
}

.edit-btn {
  font-size: 26rpx;
  padding: 0 30rpx;
  height: 56rpx;
  line-height: 56rpx;
  border-radius: 28rpx;
  background-color: #f5f5f5;
  color: #666;
}

.user-stats {
  display: flex;
  justify-content: space-around;
  padding-top: 20rpx;
  border-top: 1rpx solid #f0f0f0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-item .num {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 6rpx;
}

.stat-item .label {
  font-size: 24rpx;
  color: #363636;
}

.menu-section {
  padding: 0 20rpx;
}

.menu-group {
  background-color: #fff;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.menu-item:last-child {
  border-bottom: none;
}

.item-left {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.item-left text {
  font-size: 30rpx;
  color: #333;
}

.logout-section {
  padding: 40rpx 20rpx;
}

.logout-btn {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  background-color: #fff;
  color: #d81e06;
  font-size: 32rpx;
  border-radius: 40rpx;
}

/* 点击效果 */
.menu-item:active {
  background-color: #f8f8f8;
}

.edit-btn:active,
.logout-btn:active {
  opacity: 0.8;
}

.stat-item:active {
  opacity: 0.7;
}
</style>