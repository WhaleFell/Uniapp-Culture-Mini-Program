<template>
  <view class="detail-container">
    <!-- 标题区域 -->
    <view class="header">
      <text class="title">{{ detailData.title }}</text>
      <view class="meta">
        <text class="author">作者：{{ detailData.author }}</text>
        <text class="time">发布时间：{{ detailData.publishTime }}</text>
      </view>
    </view>

    <!-- 内容区域 -->
    <scroll-view class="content-scroll" scroll-y>
      <!-- 封面图 -->
      <image v-if="detailData.cover" :src="detailData.cover" class="cover-image" mode="aspectFit"></image>
      
      <!-- 正文内容 -->
      <rich-text :nodes="detailData.content" class="content"></rich-text>

    </scroll-view>


    <!-- 评论弹出层 -->
    <uni-popup ref="commentPopup" type="bottom">
      <view class="comment-popup">
        <view class="popup-header">
          <text class="title">评论 {{ commentCount }}</text>
          <uni-icons 
            type="close" 
            size="24" 
            color="#666" 
            @tap="closeComments"
          ></uni-icons>
        </view>
        <comment-list 
          :article-id="queryParams.id"
          :commentCount="commentCount"
        ></comment-list>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { mockDetailData } from '@/mock/detail.js'
import CommentList from '@/components/comment-list/comment-list.vue'

// 页面参数
const queryParams = ref({})
// 详情数据
const detailData = ref({})
// 评论数
const commentCount = ref(0)

const commentPopup = ref(null)

onLoad((options) => {
  queryParams.value = options
  loadDetailData()
})

// 加载详情数据
const loadDetailData = async () => {
  try {
    // 模拟数据请求，实际应替换为真实接口
    const res = await mockDetailData(queryParams.value.id)
    detailData.value = res
    uni.setNavigationBarTitle({ title: res.title })
  } catch (e) {
    uni.showToast({ title: '数据加载失败', icon: 'none' })
  }
}

// 图片预览
const previewImage = (current) => {
  uni.previewImage({
    urls: detailData.value.images,
    current
  })
}

// 显示评论
const showComments = () => {
  commentPopup.value.open()
}

// 关闭评论
const closeComments = () => {
  commentPopup.value.close()
}
</script>

<style scoped>
.detail-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  padding: 30rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #f0f0f0;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
  line-height: 1.4;
}

.meta {
  margin-top: 20rpx;
  display: flex;
  justify-content: space-between;
  font-size: 26rpx;
  color: #666;
}

.content-scroll {
  flex: 1;
  padding: 10rpx;
  background-color: #fff;
}

.cover-image {
  width: 100%;
  border-radius: 12rpx;
  margin-bottom: 30rpx;
}

.content {
  font-size: 30rpx;
  color: #333;
  line-height: 1.8;
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
  padding: 0 20rpx;
  max-width: 100%;
  box-sizing: border-box;
}

.content >>> p {
  margin: 20rpx 0;
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
}




.comment-popup {
  background: #fff;
  border-radius: 24rpx 24rpx 0 0;
  max-height: 80vh;
  overflow-y: auto;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.popup-header .title {
  font-size: 32rpx;
  font-weight: bold;
}
</style> 