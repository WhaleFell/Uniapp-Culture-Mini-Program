<template>
  <view class="settings-container">
    <!-- 设置列表 -->
    <view class="settings-group">
      <view class="settings-item" @tap="toggleNotification">
        <text class="item-label">消息通知</text>
        <switch 
          :checked="settings.notification" 
          color="#d81e06"
          @change="toggleNotification"
        ></switch>
      </view>
      
      <view class="settings-item" @tap="toggleAutoPlay">
        <text class="item-label">自动播放</text>
        <switch 
          :checked="settings.autoPlay" 
          color="#d81e06"
          @change="toggleAutoPlay"
        ></switch>
      </view>
    </view>

    <view class="settings-group">
      <view class="settings-item" @tap="clearCache">
        <text class="item-label">清除缓存</text>
        <view class="item-right">
          <text class="cache-size">{{ cacheSize }}</text>
          <uni-icons type="right" size="16" color="#999"></uni-icons>
        </view>
      </view>
      
      <view class="settings-item" @tap="checkUpdate">
        <text class="item-label">检查更新</text>
        <view class="item-right">
          <text class="version">当前版本 {{ version }}</text>
          <uni-icons type="right" size="16" color="#999"></uni-icons>
        </view>
      </view>
    </view>

    <view class="settings-group">
      <view class="settings-item" @tap="goToPrivacy">
        <text class="item-label">隐私政策</text>
        <uni-icons type="right" size="16" color="#999"></uni-icons>
      </view>
      
      <view class="settings-item" @tap="goToAgreement">
        <text class="item-label">用户协议</text>
        <uni-icons type="right" size="16" color="#999"></uni-icons>
      </view>
      
      <view class="settings-item" @tap="goToAbout">
        <text class="item-label">关于我们</text>
        <uni-icons type="right" size="16" color="#999"></uni-icons>
      </view>
    </view>

    <!-- 退出登录按钮 -->
    <view class="logout-btn" @tap="logout">退出登录</view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 设置状态
const settings = ref({
  notification: true,
  autoPlay: false
})

// 缓存大小
const cacheSize = ref('23.5MB')
// 版本号
const version = ref('1.0.0')

// 切换通知设置
const toggleNotification = (e) => {
  settings.value.notification = e.detail ? e.detail.value : !settings.value.notification
  uni.showToast({
    title: settings.value.notification ? '已开启通知' : '已关闭通知',
    icon: 'none'
  })
}

// 切换自动播放
const toggleAutoPlay = (e) => {
  settings.value.autoPlay = e.detail ? e.detail.value : !settings.value.autoPlay
  uni.showToast({
    title: settings.value.autoPlay ? '已开启自动播放' : '已关闭自动播放',
    icon: 'none'
  })
}

// 清除缓存
const clearCache = () => {
  uni.showModal({
    title: '提示',
    content: '确定要清除缓存吗？',
    success: (res) => {
      if (res.confirm) {
        uni.showLoading({
          title: '清理中...'
        })
        setTimeout(() => {
          uni.hideLoading()
          cacheSize.value = '0B'
          uni.showToast({
            title: '清除成功',
            icon: 'success'
          })
        }, 1500)
      }
    }
  })
}

// 检查更新
const checkUpdate = () => {
  uni.showLoading({
    title: '检查中...'
  })
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '已是最新版本',
      icon: 'none'
    })
  }, 1500)
}

// 页面跳转
const goToPrivacy = () => {
  uni.navigateTo({
    url: '/pages/mine/privacy'
  })
}

const goToAgreement = () => {
  uni.navigateTo({
    url: '/pages/mine/agreement'
  })
}

const goToAbout = () => {
  uni.navigateTo({
    url: '/pages/mine/about'
  })
}

// 退出登录
const logout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        // 清除登录状态
        uni.clearStorageSync()
        // 返回登录页
        uni.reLaunch({
          url: '/pages/login/login'
        })
      }
    }
  })
}
</script>

<style scoped>
.settings-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx 0;
}

.settings-group {
  background-color: #fff;
  margin-bottom: 20rpx;
}

.settings-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.settings-item:last-child {
  border-bottom: none;
}

.item-label {
  font-size: 28rpx;
  color: #333;
}

.item-right {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.cache-size,
.version {
  font-size: 26rpx;
  color: #999;
  margin-right: 8rpx;
}

.logout-btn {
  margin: 60rpx 30rpx;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  background-color: #d81e06;
  color: #fff;
  font-size: 28rpx;
  border-radius: 40rpx;
}

.logout-btn:active {
  opacity: 0.8;
}
</style> 