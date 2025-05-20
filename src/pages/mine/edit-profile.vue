<template>
  <view class="edit-profile-container">
    <!-- 头像编辑 -->
    <view class="edit-item avatar-item" @tap="changeAvatar">
      <text class="item-label">头像</text>
      <view class="avatar-wrapper">
        <image :src="userInfo.avatar" class="avatar"></image>
        <uni-icons type="right" size="16" color="#999"></uni-icons>
      </view>
    </view>

    <!-- 基本信息编辑 -->
    <view class="edit-section">
      <view class="edit-item">
        <text class="item-label">昵称</text>
        <input 
          type="text"
          v-model="userInfo.nickname"
          placeholder="请输入昵称"
          class="input-field"
        />
      </view>
      
      <view class="edit-item">
        <text class="item-label">性别</text>
        <picker 
          @change="handleGenderChange" 
          :value="genderIndex" 
          :range="genderOptions"
          class="picker"
        >
          <view class="picker-value">
            {{ genderOptions[genderIndex] }}
            <uni-icons type="right" size="16" color="#999"></uni-icons>
          </view>
        </picker>
      </view>

      <view class="edit-item">
        <text class="item-label">生日</text>
        <picker 
          mode="date" 
          :value="userInfo.birthday"
          start="1900-01-01"
          end="2023-12-31"
          @change="handleBirthdayChange"
          class="picker"
        >
          <view class="picker-value">
            {{ userInfo.birthday || '请选择生日' }}
            <uni-icons type="right" size="16" color="#999"></uni-icons>
          </view>
        </picker>
      </view>

      <view class="edit-item">
        <text class="item-label">地区</text>
        <picker 
          mode="region" 
          @change="handleRegionChange"
          :value="userInfo.region"
          class="picker"
        >
          <view class="picker-value">
            {{ userInfo.region.join(' ') || '请选择地区' }}
            <uni-icons type="right" size="16" color="#999"></uni-icons>
          </view>
        </picker>
      </view>
    </view>

    <!-- 个人简介编辑 -->
    <view class="edit-section">
      <view class="edit-item">
        <text class="item-label">个人简介</text>
        <textarea 
          v-model="userInfo.bio"
          placeholder="介绍一下自己吧..."
          class="bio-textarea"
          maxlength="200"
        ></textarea>
        <text class="word-count">{{ userInfo.bio.length }}/200</text>
      </view>
    </view>

    <!-- 保存按钮 -->
    <view class="button-section">
      <button class="save-btn" @tap="saveProfile">保存</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 性别选项
const genderOptions = ['男', '女', '保密']
const genderIndex = ref(0)

// 用户信息
const userInfo = ref({
  avatar: '/static/mine/avatar.jpg',
  nickname: '文化爱好者',
  gender: '保密',
  birthday: '2000-01-01',
  region: ['广东省', '广州市', '海珠区'],
  bio: '热爱中国传统文化，致力于文化传承与创新。'
})

// 修改头像
const changeAvatar = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      userInfo.value.avatar = res.tempFilePaths[0]
      // 这里可以添加上传头像到服务器的逻辑
    }
  })
}

// 性别选择
const handleGenderChange = (e) => {
  genderIndex.value = e.detail.value
  userInfo.value.gender = genderOptions[genderIndex.value]
}

// 生日选择
const handleBirthdayChange = (e) => {
  userInfo.value.birthday = e.detail.value
}

// 地区选择
const handleRegionChange = (e) => {
  userInfo.value.region = e.detail.value
}

// 保存资料
const saveProfile = () => {
  // 这里添加保存资料的逻辑
  uni.showLoading({
    title: '保存中...'
  })

  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 2000,
      success: () => {
        setTimeout(() => {
          uni.navigateBack()
        }, 2000)
      }
    })
  }, 1500)
}
</script>

<style scoped>
.edit-profile-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 40rpx;
}

.edit-section {
  background-color: #fff;
  margin-bottom: 20rpx;
}

.edit-item {
  display: flex;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.edit-item:last-child {
  border-bottom: none;
}

.avatar-item {
  background-color: #fff;
  margin-bottom: 20rpx;
}

.item-label {
  width: 160rpx;
  font-size: 28rpx;
  color: #333;
}

.avatar-wrapper {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20rpx;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
}

.input-field {
  flex: 1;
  font-size: 28rpx;
  color: #333;
  text-align: right;
}

.picker {
  flex: 1;
}

.picker-value {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10rpx;
  font-size: 28rpx;
  color: #333;
}

.bio-textarea {
  flex: 1;
  height: 200rpx;
  font-size: 28rpx;
  color: #333;
  line-height: 1.6;
  padding: 20rpx 0;
}

.word-count {
  position: absolute;
  right: 30rpx;
  bottom: 30rpx;
  font-size: 24rpx;
  color: #999;
}

.button-section {
  padding: 40rpx 30rpx;
}

.save-btn {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  background-color: #d81e06;
  color: #fff;
  font-size: 32rpx;
  border-radius: 40rpx;
}

.save-btn:active {
  opacity: 0.8;
}
</style> 