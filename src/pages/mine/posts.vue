<template>
  <view class="posts-container">
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

    <!-- 帖子列表 -->
    <view class="posts-list">
      <view class="post-item" v-for="(item, index) in currentPosts" :key="index">
        <view class="post-header">
          <text class="post-time">{{ item.time }}</text>
          <view class="post-status" :class="item.status">{{ item.statusText }}</view>
        </view>
        
        <view class="post-content">
          <text class="post-text">{{ item.content }}</text>
          <view class="image-grid" v-if="item.images && item.images.length">
            <image 
              v-for="(img, imgIndex) in item.images" 
              :key="imgIndex"
              :src="img"
              mode="aspectFill"
              @tap="previewImage(item.images, imgIndex)"
            ></image>
          </view>
        </view>

        <view class="post-footer">
          <view class="stats">
            <view class="stat-item">
              <uni-icons type="eye" size="14" color="#999"></uni-icons>
              <text>{{ item.views }}</text>
            </view>
            <view class="stat-item">
              <uni-icons type="heart" size="14" color="#999"></uni-icons>
              <text>{{ item.likes }}</text>
            </view>
            <view class="stat-item">
              <uni-icons type="chat" size="14" color="#999"></uni-icons>
              <text>{{ item.comments }}</text>
            </view>
          </view>
          
          <view class="actions">
            <view class="action-btn edit" v-if="item.status === 'draft'" @tap="editPost(item)">
              编辑
            </view>
            <view class="action-btn delete" @tap="deletePost(index)">
              删除
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view class="empty-state" v-if="currentPosts.length === 0">
      <image src="/static/mine/empty-posts.png" mode="aspectFit" class="empty-image"></image>
      <text class="empty-text">暂无{{ tabs[currentTab].name }}</text>
    </view>

    <!-- 发布按钮 -->
    <view class="publish-btn" @tap="createPost">
      <uni-icons type="plus" size="24" color="#fff"></uni-icons>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 分类标签
const tabs = ref([
  { name: '已发布', count: 2 },
  { name: '待审核', count: 1 },
  { name: '草稿', count: 1 }
])

const currentTab = ref(0)

// 帖子数据
const posts = ref([
  {
    id: 1,
    content: '参观了国家博物馆的"古代中国"展览，感受到了中华文明的博大精深。分享一些展品照片，大家一起来了解中国传统文化的魅力！',
    images: [
      '/static/discover/post1.jpg',
      '/static/discover/post2.jpg',
      '/static/discover/post3.jpg'
    ],
    time: '2024-01-20 15:30',
    views: 235,
    likes: 45,
    comments: 12,
    status: 'published',
    statusText: '已发布'
  },
  {
    id: 2,
    content: '记录一下今天学习传统剪纸艺术的心得，虽然还很生疏，但非常享受这个过程。',
    images: [
      '/static/discover/post4.jpg'
    ],
    time: '2024-01-19 20:15',
    views: 0,
    likes: 0,
    comments: 0,
    status: 'draft',
    statusText: '草稿'
  }
])

// 当前标签页的帖子
const currentPosts = computed(() => {
  const statusMap = ['published', 'pending', 'draft']
  return posts.value.filter(post => post.status === statusMap[currentTab.value])
})

// 切换标签
const changeTab = (index) => {
  currentTab.value = index
}

// 预览图片
const previewImage = (images, current) => {
  uni.previewImage({
    urls: images,
    current: images[current]
  })
}

// 编辑帖子
const editPost = (post) => {
  uni.navigateTo({
    url: `/pages/discover/publish?id=${post.id}`
  })
}

// 删除帖子
const deletePost = (index) => {
  uni.showModal({
    title: '提示',
    content: '确定要删除这条动态吗？',
    success: (res) => {
      if (res.confirm) {
        posts.value.splice(index, 1)
        // 更新对应标签的数量
        tabs.value[currentTab.value].count--
        uni.showToast({
          title: '已删除',
          icon: 'success'
        })
      }
    }
  })
}

// 创建新帖子
const createPost = () => {
  uni.navigateTo({
    url: '/pages/discover/publish'
  })
}
</script>

<style scoped>
.posts-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 120rpx;
}

.category-tabs {
  display: flex;
  background-color: #fff;
  padding: 20rpx;
  margin-bottom: 20rpx;
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

.post-item {
  background-color: #fff;
  margin-bottom: 20rpx;
  padding: 20rpx;
}

.post-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16rpx;
}

.post-time {
  font-size: 24rpx;
  color: #999;
}

.post-status {
  font-size: 24rpx;
  padding: 4rpx 16rpx;
  border-radius: 100rpx;
}

.post-status.published {
  color: #52c41a;
  background-color: rgba(82, 196, 26, 0.1);
}

.post-status.pending {
  color: #faad14;
  background-color: rgba(250, 173, 20, 0.1);
}

.post-status.draft {
  color: #999;
  background-color: rgba(0, 0, 0, 0.1);
}

.post-content {
  margin-bottom: 20rpx;
}

.post-text {
  font-size: 28rpx;
  color: #333;
  line-height: 1.6;
  margin-bottom: 16rpx;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10rpx;
}

.image-grid image {
  width: 100%;
  height: 200rpx;
  border-radius: 8rpx;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16rpx;
  border-top: 1rpx solid #f0f0f0;
}

.stats {
  display: flex;
  gap: 30rpx;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8rpx;
  font-size: 24rpx;
  color: #999;
}

.actions {
  display: flex;
  gap: 20rpx;
}

.action-btn {
  font-size: 24rpx;
  padding: 8rpx 20rpx;
  border-radius: 100rpx;
}

.action-btn.edit {
  color: #1677ff;
  background-color: rgba(22, 119, 255, 0.1);
}

.action-btn.delete {
  color: #d81e06;
  background-color: rgba(216, 30, 6, 0.1);
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
  font-size: 28rpx;
  color: #999;
}

.publish-btn {
  position: fixed;
  right: 40rpx;
  bottom: 40rpx;
  width: 100rpx;
  height: 100rpx;
  background-color: #d81e06;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 16rpx rgba(216, 30, 6, 0.3);
}

.publish-btn:active {
  transform: scale(0.95);
}
</style> 