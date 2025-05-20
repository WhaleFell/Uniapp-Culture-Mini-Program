<template>
  <view class="feiyi-container">
    <!-- 顶部轮播图 -->
    <swiper class="banner" circular :indicator-dots="true" :autoplay="true" 
            :interval="3000" :duration="1000">
      <swiper-item v-for="(item, index) in bannerList" :key="index">
        <image :src="item.url" mode="aspectFill"></image>
      </swiper-item>
    </swiper>

    <!-- 分类标签 -->
    <scroll-view class="category-scroll" scroll-x="true">
      <view class="category-list">
        <view 
          class="category-item" 
          v-for="(item, index) in categories" 
          :key="index"
          :class="{ active: currentCategory === index }"
          @click="changeCategory(index)"
        >
          {{ item.name }}
        </view>
      </view>
    </scroll-view>

    <!-- 非遗项目列表 -->
    <view class="feiyi-list">
      <view 
        class="feiyi-item" 
        v-for="(item, index) in filteredFeiyiList" 
        :key="index"
        @click="goToDetail(item)"
      >
        <image :src="item.imageUrl" mode="aspectFill"></image>
        <view class="item-info">
          <text class="title">{{ item.title }}</text>
          <text class="desc">{{ item.description }}</text>
          <view class="tags">
            <text class="tag" v-for="(tag, tagIndex) in item.tags" :key="tagIndex">
              {{ tag }}
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 轮播图数据
const bannerList = ref([
  { url: '/static/feiyi/banner1.jpg' },
  { url: '/static/feiyi/banner2.jpg' },
  { url: '/static/feiyi/banner3.jpg' }
])

// 分类数据
const categories = ref([
  { name: '全部' },
  { name: '手工艺' },
  { name: '传统技艺' },
  { name: '民间艺术' },
  { name: '传统医药' }
])

const currentCategory = ref(0)

// 非遗项目列表
const feiyiList = ref([
  {
    id: 1,
    imageUrl: '/static/feiyi/banner1.jpg',
    title: '景德镇陶瓷制作技艺',
    description: '始于宋代的传统制瓷工艺，被誉为"瓷都"',
    tags: ['手工艺', '国家级']
  },
  {
    id: 2,
    imageUrl: '/static/feiyi/banner2.jpg',
    title: '苏州刺绣',
    description: '以其精细的针法和优美的图案闻名于世',
    tags: ['手工艺', '国家级']
  },
  {
    id: 3,
    imageUrl: '/static/feiyi/banner3.jpg',
    title: '中医针灸',
    description: '传统中医治疗方法，具有数千年历史',
    tags: ['传统医药', '世界级']
  },
  {
    id: 4,
    imageUrl: '/static/feiyi/banner4.jpg',
    title: '云锦织造技艺',
    description: '南京特色丝织工艺，有"寸锦寸金"之称',
    tags: ['手工艺', '国家级']
  },
  {
    id: 5,
    imageUrl: '/static/feiyi/banner5.jpg',
    title: '德化白瓷烧制技艺',
    description: '福建德化的传统瓷器烧制工艺，以"象牙白"著称',
    tags: ['手工艺', '国家级']
  },
  {
    id: 6,
    imageUrl: '/static/feiyi/banner6.jpg',
    title: '酿酒技艺',
    description: '包括茅台、五粮液等传统白酒酿造工艺',
    tags: ['传统技艺', '国家级']
  },
  {
    id: 7,
    imageUrl: '/static/feiyi/banner7.jpg',
    title: '雕版印刷术',
    description: '中国古代四大发明之一，距今已有1300多年历史',
    tags: ['传统技艺', '世界级']
  },
  {
    id: 8,
    imageUrl: '/static/feiyi/banner8.jpg',
    title: '京剧',
    description: '中国五大戏曲剧种之一，被誉为"国粹"',
    tags: ['民间艺术', '世界级']
  },
  {
    id: 9,
    imageUrl: '/static/feiyi/banner9.jpg',
    title: '皮影戏',
    description: '利用兽皮制作的人物剪影进行表演的传统艺术',
    tags: ['民间艺术', '国家级']
  },
  {
    id: 10,
    imageUrl: '/static/feiyi/banner10.jpg',
    title: '中药炮制技术',
    description: '中药材的传统加工与处理技术，有数千年历史',
    tags: ['传统医药', '国家级']
  },
  {
    id: 11,
    imageUrl: '/static/feiyi/banner11.jpg',
    title: '藏医药浴法',
    description: '藏族传统医疗方式，融合药物和沐浴的治疗技术',
    tags: ['传统医药', '世界级']
  }
])

// 筛选后的项目列表
const filteredFeiyiList = ref([])

// 初始化显示所有项目
onMounted(() => {
  filteredFeiyiList.value = [...feiyiList.value]
})

// 切换分类
const changeCategory = (index) => {
  currentCategory.value = index
  
  // 根据分类筛选列表
  if (index === 0) {
    // 全部
    filteredFeiyiList.value = [...feiyiList.value]
  } else {
    const categoryName = categories.value[index].name
    filteredFeiyiList.value = feiyiList.value.filter(item => 
      item.tags.includes(categoryName)
    )
  }
}

// 跳转到详情页
const goToDetail = (item) => {
  uni.navigateTo({
    url: `/pages/feiyi/detail?id=${item.id}`
  })
}
</script>

<style scoped>
.feiyi-container {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.banner {
  width: 100%;
  height: 400rpx;
}

.banner image {
  width: 100%;
  height: 100%;
}

.category-scroll {
  background-color: #fff;
  padding: 20rpx 0;
  white-space: nowrap;
}

.category-list {
  display: flex;
  padding: 0 20rpx;
}

.category-item {
  padding: 10rpx 30rpx;
  margin-right: 20rpx;
  background-color: #f0f0f0;
  border-radius: 30rpx;
  font-size: 28rpx;
  color: #666;
}

.category-item.active {
  background-color: #d81e06;
  color: #fff;
}

.feiyi-list {
  padding: 20rpx;
}

.feiyi-item {
  background-color: #fff;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
}

.feiyi-item image {
  width: 100%;
  height: 360rpx;
}

.item-info {
  padding: 20rpx;
}

.title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.desc {
  font-size: 28rpx;
  color: #666;
  margin: 10rpx 0;
  display: block;
}

.tags {
  margin-top: 10rpx;
}

.tag {
  font-size: 24rpx;
  color: #d81e06;
  background-color: rgba(216, 30, 6, 0.1);
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
  margin-right: 16rpx;
}
</style>