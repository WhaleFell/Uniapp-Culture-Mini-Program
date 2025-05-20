<template>
  <view class="special-container">
    <!-- 顶部封面图 -->
    <view class="cover-section">
      <image :src="currentSpecial.imageUrl" mode="aspectFill" class="cover-image"></image>
      <view class="cover-title">{{ currentSpecial.title }}</view>
    </view>

    <!-- 专题内容 -->
    <view class="content-section">
      <!-- 专题简介 -->
      <view class="intro-box">
        <view class="section-title">专题简介</view>
        <text class="intro-text">{{ currentSpecial.introduction }}</text>
      </view>

      <!-- 知识列表 -->
      <view class="knowledge-list">
        <view class="section-title">相关知识</view>
        <view 
          class="knowledge-item" 
          v-for="(item, index) in currentSpecial.knowledgeList" 
          :key="index"
          @tap="goToDetail(item)"
        >
          <view class="knowledge-content">
            <view class="content-main">
              <text class="title">{{ item.title }}</text>
              <text class="desc">{{ item.description }}</text>
            </view>
            <image 
              v-if="item.imageUrl" 
              :src="item.imageUrl" 
              mode="aspectFill"
              class="content-image"
            ></image>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const currentSpecial = ref({})

// 模拟专题数据
const specialTopics = [
  {
    title: '二十四节气的智慧',
    imageUrl: '/static/culture/special1.jpg',
    introduction: '二十四节气是中国古代劳动人民经过长期观察总结出来的时令知识体系，体现了中华民族对自然规律的深刻认知。通过本专题，您可以了解每个节气的特点、习俗和养生智慧。',
    knowledgeList: [
      {
        title: '立春：万物始发之时',
        description: '立春是二十四节气之首，预示着新一年的开始。这一天，人们会举行各种迎春活动...',
        imageUrl: '/static/culture/lichun.jpg'
      },
      {
        title: '清明：追思与新生',
        description: '清明不仅是扫墓追思的日子，也是春耕播种的好时节。传统习俗包括踏青、放风筝...',
        imageUrl: '/static/culture/qingming.jpg'
      },
      {
        title: '立夏：夏季的开端',
        description: '立夏表示进入夏季，天气逐渐炎热。民间有称重、吃立夏饭等习俗...',
        imageUrl: '/static/culture/lixia.jpg'
      }
    ]
  },
  {
    title: '诗词中的文化意境',
    imageUrl: '/static/culture/special2.jpg',
    introduction: '中国古典诗词是中华文化的瑰宝，承载着丰富的文化内涵和审美意境。本专题将带您领略诗词之美，了解其中蕴含的文化智慧。',
    knowledgeList: [
      {
        title: '李白的浪漫主义诗歌',
        description: '李白诗歌豪放不羁，想象丰富，被誉为"诗仙"...',
        imageUrl: '/static/culture/libai.jpg'
      },
      {
        title: '杜甫的现实主义诗歌',
        description: '杜甫诗歌反映现实，关心民生，被称为"诗圣"...',
        imageUrl: '/static/culture/dufu.jpg'
      }
    ]
  },
  {
    title: '传统建筑之美',
    imageUrl: '/static/culture/special3.jpg',
    introduction: '中国传统建筑是中华文明的重要组成部分，融合了工艺技术、美学思想和文化内涵。本专题将带您领略中国传统建筑的独特魅力，了解其背后的设计智慧和文化象征。',
    knowledgeList: [
      {
        title: '北京四合院：传统居住智慧的结晶',
        description: '四合院是北京传统民居的代表，体现了中国传统的居住理念和生活方式。其布局讲究对称、层次分明，既保证了私密性，又有利于家人之间的交流...',
        imageUrl: '/static/culture/siheyuan.jpg'
      },
      {
        title: '苏州园林：诗意栖居的艺术',
        description: '苏州园林以其精巧的布局、优美的景观闻名于世。园林中的亭台楼阁、山水盆景，体现了中国传统的自然观和美学追求...',
        imageUrl: '/static/culture/suzhougardens.jpg'
      },
      {
        title: '福建土楼：独特的聚居建筑',
        description: '福建土楼是客家人的传统民居，圆形或方形的建筑结构既能防御外敌，又适合大家族共同生活。其建造技术和空间设计都体现了先民的智慧...',
        imageUrl: '/static/culture/tulou.jpg'
      },
      {
        title: '皇家建筑：威严与美学的统一',
        description: '故宫等皇家建筑群展现了中国传统建筑的最高水平，其严格的等级制度、精湛的工艺和宏伟的规模，都体现了中国古代的建筑成就...',
        imageUrl: '/static/culture/palace.jpg'
      }
    ]
  }
]

// 获取路由参数
onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const title = decodeURIComponent(currentPage.$page.options.title)
  
  // 根据标题找到对应的专题数据
  const special = specialTopics.find(item => item.title === title)
  if (special) {
    currentSpecial.value = special
  }
})

// 跳转到知识详情
const goToDetail = (item) => {
  uni.navigateTo({
    url: `/pages/culture/detail?title=${encodeURIComponent(item.title)}`
  })
}
</script>

<style scoped>
.special-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.cover-section {
  position: relative;
  height: 400rpx;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40rpx 30rpx;
  color: #fff;
  font-size: 36rpx;
  font-weight: bold;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
}

.content-section {
  padding: 30rpx;
  margin-top: -40rpx;
  border-radius: 40rpx 40rpx 0 0;
  background-color: #fff;
  position: relative;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.intro-box {
  margin-bottom: 40rpx;
}

.intro-text {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
}

.knowledge-list {
  margin-top: 30rpx;
}

.knowledge-item {
  background-color: #f8f8f8;
  border-radius: 16rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.knowledge-content {
  display: flex;
  gap: 20rpx;
}

.content-main {
  flex: 1;
}

.content-image {
  width: 200rpx;
  height: 150rpx;
  border-radius: 12rpx;
}

.title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.desc {
  font-size: 24rpx;
  color: #666;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

/* 点击效果 */
.knowledge-item:active {
  opacity: 0.8;
  transform: scale(0.98);
  transition: all 0.2s;
}
</style> 