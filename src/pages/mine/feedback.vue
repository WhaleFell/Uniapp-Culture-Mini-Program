<template>
  <view class="feedback-container">
    <!-- 反馈类型 -->
    <view class="feedback-type">
      <text class="section-title">反馈类型</text>
      <view class="type-grid">
        <view 
          class="type-item" 
          v-for="(type, index) in feedbackTypes" 
          :key="index"
          :class="{ active: currentType === index }"
          @tap="selectType(index)"
        >
          {{ type }}
        </view>
      </view>
    </view>

    <!-- 反馈内容 -->
    <view class="feedback-content">
      <text class="section-title">问题描述</text>
      <textarea
        class="content-textarea"
        v-model="content"
        placeholder="请详细描述您遇到的问题，以便我们更好地帮助您解决"
        :maxlength="500"
        show-confirm-bar="false"
      ></textarea>
      <text class="word-count">{{ content.length }}/500</text>
    </view>

    <!-- 图片上传 -->
    <view class="image-upload">
      <text class="section-title">图片上传（选填，最多3张）</text>
      <view class="image-list">
        <view 
          class="image-item" 
          v-for="(image, index) in images" 
          :key="index"
        >
          <image :src="image" mode="aspectFill"></image>
          <view class="delete-btn" @tap="deleteImage(index)">
            <uni-icons type="close" size="16" color="#fff"></uni-icons>
          </view>
        </view>
        
        <view class="upload-btn" @tap="chooseImage" v-if="images.length < 3">
          <uni-icons type="camera" size="24" color="#999"></uni-icons>
          <text>上传图片</text>
        </view>
      </view>
    </view>

    <!-- 联系方式 -->
    <view class="contact-info">
      <text class="section-title">联系方式（选填）</text>
      <input 
        type="text"
        v-model="contact"
        placeholder="请留下您的手机号或邮箱，方便我们联系您"
        class="contact-input"
      />
    </view>

    <!-- 提交按钮 -->
    <button 
      class="submit-btn" 
      :disabled="!isValid"
      :class="{ disabled: !isValid }"
      @tap="submitFeedback"
    >
      提交反馈
    </button>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 反馈类型
const feedbackTypes = [
  '功能异常',
  '体验问题',
  '内容建议',
  '其他问题'
]

const currentType = ref(0)
const content = ref('')
const images = ref([])
const contact = ref('')

// 选择反馈类型
const selectType = (index) => {
  currentType.value = index
}

// 选择图片
const chooseImage = () => {
  uni.chooseImage({
    count: 3 - images.value.length,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      images.value = [...images.value, ...res.tempFilePaths]
    }
  })
}

// 删除图片
const deleteImage = (index) => {
  images.value.splice(index, 1)
}

// 验证表单
const isValid = computed(() => {
  return content.value.trim().length >= 10
})

// 提交反馈
const submitFeedback = () => {
  if (!isValid.value) return
  
  uni.showLoading({
    title: '提交中...'
  })
  
  // 模拟提交
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '提交成功',
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
.feedback-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;
}

.section-title {
  font-size: 28rpx;
  color: #333;
  font-weight: bold;
  margin-bottom: 20rpx;
  display: block;
}

.feedback-type {
  background-color: #fff;
  padding: 20rpx;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
}

.type-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}

.type-item {
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  background-color: #f5f5f5;
  border-radius: 8rpx;
  font-size: 28rpx;
  color: #666;
}

.type-item.active {
  background-color: #d81e06;
  color: #fff;
}

.feedback-content {
  background-color: #fff;
  padding: 20rpx;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
  position: relative;
}

.content-textarea {
  width: 100%;
  height: 300rpx;
  font-size: 28rpx;
  line-height: 1.6;
  padding: 20rpx;
  box-sizing: border-box;
  background-color: #f5f5f5;
  border-radius: 8rpx;
}

.word-count {
  position: absolute;
  right: 40rpx;
  bottom: 40rpx;
  font-size: 24rpx;
  color: #999;
}

.image-upload {
  background-color: #fff;
  padding: 20rpx;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
}

.image-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.image-item {
  width: 200rpx;
  height: 200rpx;
  position: relative;
}

.image-item image {
  width: 100%;
  height: 100%;
  border-radius: 8rpx;
}

.delete-btn {
  position: absolute;
  top: -16rpx;
  right: -16rpx;
  width: 32rpx;
  height: 32rpx;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-btn {
  width: 200rpx;
  height: 200rpx;
  background-color: #f5f5f5;
  border-radius: 8rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10rpx;
}

.upload-btn text {
  font-size: 24rpx;
  color: #999;
}

.contact-info {
  background-color: #fff;
  padding: 20rpx;
  border-radius: 12rpx;
  margin-bottom: 40rpx;
}

.contact-input {
  height: 80rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  background-color: #f5f5f5;
  border-radius: 8rpx;
}

.submit-btn {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  background-color: #d81e06;
  color: #fff;
  font-size: 28rpx;
  border-radius: 40rpx;
}

.submit-btn.disabled {
  opacity: 0.5;
}

.submit-btn:active {
  opacity: 0.8;
}
</style> 