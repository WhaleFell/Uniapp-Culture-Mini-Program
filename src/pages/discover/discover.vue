<template>
  <view class="discover-container">
    <!-- 顶部导航栏 -->
    <view class="nav-tabs">
      <view class="tab-item" v-for="(tab, index) in tabs" :key="index" :class="{ active: currentTab === index }"
        @tap="changeTab(index)">
        {{ tab }}
      </view>
    </view>

    <!-- 内容区域 -->
    <scroll-view class="content-scroll" :scroll-top="scrollTop" scroll-y @scrolltolower="loadMore" refresher-enabled
      @refresherrefresh="onRefresh" :refresher-triggered="isRefreshing">
      <!-- 热门话题 -->
      <view class="topics-section" v-if="currentTab === 0">
        <scroll-view class="topics-scroll" scroll-x="true">
          <view class="topics-list">
            <view class="topic-item" v-for="(item, index) in hotTopics" :key="index" @tap="goToTopic(item)">
              <text class="topic-title">#{{ item.title }}#</text>
              <text class="topic-count">{{ item.discussCount }}讨论</text>
            </view>
          </view>
        </scroll-view>
      </view>

      <!-- 动态列表 -->
      <view class="post-list">
        <view class="post-item" v-for="(item, index) in posts" :key="index">
          <!-- 用户信息 -->
          <view class="user-info">
            <image :src="item.userAvatar" class="avatar"></image>
            <view class="user-detail">
              <text class="username">{{ item.userName }}</text>
              <text class="post-time">{{ item.postTime }}</text>
            </view>
            <button class="follow-btn" size="mini" @tap="followUser(item)">
              {{ item.isFollowed ? '已关注' : '关注' }}
            </button>
          </view>

          <!-- 动态内容 -->
          <view class="post-content">
            <text class="post-text">{{ item.content }}</text>
            <!-- 图片网格 -->
            <view class="image-grid" v-if="item.images && item.images.length">
              <image v-for="(img, imgIndex) in item.images" :key="imgIndex" :src="img" mode="aspectFill"
                @tap="previewImage(item.images, imgIndex)"></image>
            </view>
            <!-- 话题标签 -->
            <view class="post-tags">
              <text class="tag" v-for="(tag, tagIndex) in item.tags" :key="tagIndex"
                @tap="goToTopic({ title: tag })">#{{
                  tag }}</text>
            </view>
          </view>

          <!-- 互动栏 -->
          <view class="interaction-bar">
            <view class="action-item" @tap="likePost(item)">
              <uni-icons :type="item.isLiked ? 'heart-filled' : 'heart'" size="20"
                :color="item.isLiked ? '#d81e06' : '#666'"></uni-icons>
              <text>{{ item.likes }}</text>
            </view>
            <view class="action-item" @tap="showComments(item)">
              <uni-icons type="chat" size="20" color="#666"></uni-icons>
              <text>{{ item.comments }}</text>
            </view>
            <view class="action-item" @tap="sharePost(item)">
              <uni-icons type="redo" size="20" color="#666"></uni-icons>
              <text>分享</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 加载更多 -->
      <uni-load-more :status="loadMoreStatus"></uni-load-more>
    </scroll-view>

    <!-- 添加悬浮发布按钮 -->
    <view class="publish-btn" @tap="goToPublish">
      <uni-icons type="plus" size="24" color="#fff"></uni-icons>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
		scrollTop: 0,   
      currentTab: 0,
      isRefreshing: false,
      loadMoreStatus: 'more',
      tabs: ['推荐', '关注', '最新'],
      hotTopics: [
        { title: '传统文化创新', discussCount: '12.5k' },
        { title: '非遗传承人故事', discussCount: '8.9k' },
        { title: '古风穿搭', discussCount: '15.2k' },
        { title: '文化美食探店', discussCount: '10.1k' }
      ],
      posts: [
        {
          userAvatar: '/static/discover/avatar1.jpg',
          userName: '文化探索者',
          postTime: '10分钟前',
          isFollowed: false,
          content: '今天参观了国家博物馆的"古代中国"展览，感受到了中华文明的博大精深...',
          images: [
            '/static/discover/post1-1.jpg',
            '/static/discover/post1-2.jpg',
            '/static/discover/post1-3.jpg'
          ],
          tags: ['博物馆探索', '文化遗产'],
          likes: 128,
          comments: 32,
          isLiked: false
        },
        {
          userAvatar: '/static/discover/avatar2.jpg',
          userName: '非遗传承人小张',
          postTime: '2小时前',
          isFollowed: true,
          content: '分享一下今天教学生制作传统剪纸的过程，看到年轻人对传统文化这么感兴趣，特别欣慰！',
          images: [
            '/static/discover/post2-1.jpg',
            '/static/discover/post2-2.jpg'
          ],
          tags: ['非遗传承', '剪纸艺术'],
          likes: 256,
          comments: 45,
          isLiked: true
        },
        {
          userAvatar: '/static/discover/avatar1.jpg',
          userName: '文化探索者',
          postTime: '10分钟前',
          isFollowed: false,
          content: '今天参观了国家博物馆的"古代中国"展览，感受到了中华文明的博大精深...',
          images: [
            '/static/discover/post1-1.jpg',
            '/static/discover/post1-2.jpg',
            '/static/discover/post1-3.jpg'
          ],
          tags: ['博物馆探索', '文化遗产'],
          likes: 128,
          comments: 32,
          isLiked: false
        },
        {
          userAvatar: '/static/discover/avatar2.jpg',
          userName: '非遗传承人小张',
          postTime: '2小时前',
          isFollowed: true,
          content: '分享一下今天教学生制作传统剪纸的过程，看到年轻人对传统文化这么感兴趣，特别欣慰！',
          images: [
            '/static/discover/post2-1.jpg',
            '/static/discover/post2-2.jpg'
          ],
          tags: ['非遗传承', '剪纸艺术'],
          likes: 256,
          comments: 45,
          isLiked: true
        }
      ]
    };
  },
  onLoad() {
    const _this = this
    uni.$on('updatePosts', (newPost) => {
      _this.posts.unshift(newPost);
    });
  },
  methods: {
    changeTab(index) {
      this.currentTab = index;
      // 加载对应标签的数据
    },
    onRefresh() {
      this.isRefreshing = true;
      setTimeout(() => {
        // 刷新数据逻辑
        this.isRefreshing = false;
      }, 1000);
    },
    loadMore() {
      if (this.loadMoreStatus === 'loading') return;
      this.loadMoreStatus = 'loading';
      setTimeout(() => {
        // 加载更多数据逻辑
        this.loadMoreStatus = 'more';
      }, 1000);
    },
    followUser(item) {
      item.isFollowed = !item.isFollowed;
      uni.showToast({
        title: item.isFollowed ? '已关注' : '已取消关注',
        icon: 'none'
      });
    },
    likePost(item) {
      item.isLiked = !item.isLiked;
      item.likes += item.isLiked ? 1 : -1;
    },
    showComments(item) {
      uni.navigateTo({
        url: `/pages/discover/comments?postId=${item.id}`
      });
    },
    sharePost(item) {
      uni.showActionSheet({
        itemList: ['分享到微信', '分享到朋友圈', '复制链接'],
        success: (res) => {
          uni.showToast({
            title: '分享成功',
            icon: 'success'
          });
        }
      });
    },
    previewImage(images, current) {
      uni.previewImage({
        urls: images,
        current: images[current]
      });
    },
    goToTopic(topic) {
      uni.navigateTo({
        url: `/pages/discover/topic?title=${encodeURIComponent(topic.title)}`
      });
    },
    goToPublish() {
      uni.navigateTo({
        url: '/pages/discover/publish'
      });
    },
    addPost(newPost) {
      this.posts.unshift(newPost);
    }
  }
};
</script>

<style scoped>
.discover-container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #9d7b56, #e7b57f);
}

.nav-tabs {
  display: flex;

  padding: 20rpx;
  position: sticky;
  top: 0;
  z-index: 100;
}

.tab-item {
  flex: 1;
  text-align: center;
  font-size: 32rpx;
  color: #666;
  position: relative;
  padding: 10rpx 0;
}

.tab-item.active {
  color: #333;
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

.content-scroll {
  height: calc(100vh - 88rpx);
}

.topics-section {

  padding: 20rpx;
  margin-bottom: 20rpx;
}

.topics-scroll {
  white-space: nowrap;
}

.topics-list {
  display: flex;
  padding: 10rpx 0;
}

.topic-item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30rpx;
  background-color: #f8f8f8;
  padding: 20rpx 30rpx;
  border-radius: 16rpx;
}

.topic-title {
  font-size: 28rpx;
  color: #363636;
  margin-bottom: 10rpx;
}

.topic-count {
  font-size: 24rpx;
  color: #999;
}

.post-list {
  padding: 20rpx;
}

.post-item {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.user-detail {
  flex: 1;
}

.username {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.post-time {
  font-size: 24rpx;
  color: #999;
  display: block;
}

.follow-btn {
  font-size: 24rpx;
  padding: 0 30rpx;
  height: 56rpx;
  line-height: 56rpx;
  border-radius: 28rpx;
  background-color: #f5f5f5;
  color: #666;
}

.follow-btn:active {
  opacity: 0.8;
}

.post-content {
  margin-bottom: 20rpx;
}

.post-text {
  font-size: 28rpx;
  color: #333;
  line-height: 1.6;
  margin-bottom: 20rpx;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10rpx;
  margin-bottom: 20rpx;
}

.image-grid image {
  width: 100%;
  height: 200rpx;
  border-radius: 8rpx;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.tag {
  font-size: 24rpx;
  color: #666;
}

.interaction-bar {
  display: flex;
  justify-content: space-around;
  padding-top: 20rpx;
  border-top: 1rpx solid #f0f0f0;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 8rpx;
  font-size: 26rpx;
  color: #666;
}

/* 发布按钮样式 */
.publish-btn {
  position: fixed;
  right: 40rpx;
  bottom: 100rpx;
  width: 100rpx;
  height: 100rpx;
  background-color: #d81e06;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4rpx 20rpx rgba(216, 30, 6, 0.3);
  z-index: 100;
}
</style>