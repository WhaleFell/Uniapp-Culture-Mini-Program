<template>
  <view class="art-container">
    <!-- 技艺分类网格 -->
    <view class="grid-section">
      <view
        class="grid-item"
        v-for="(item, index) in artCategories"
        :key="index"
        @tap="selectCategory(item)"
      >
        <uni-icons
          :type="item.icon"
          size="80"
          color="#333"
          class="icon"
        ></uni-icons>
        <text class="category-name">{{ item.name }}</text>
      </view>
    </view>

    <!-- 技艺列表 -->
    <view class="art-list">
      <view class="section-title">
        <text class="title">{{ currentCategory || "推荐技艺" }}</text>
      </view>

      <view
        class="art-item"
        v-for="(item, index) in filteredArtList"
        :key="index"
        @tap="goToDetail(item)"
      >
        <image :src="item.imageUrl" mode="aspectFill" class="art-image"></image>
        <view class="art-content">
          <view class="art-header">
            <text class="art-title">{{ item.title }}</text>
            <text class="art-level" :class="item.level">{{
              item.levelText
            }}</text>
          </view>
          <text class="art-desc">{{ item.description }}</text>
          <view class="art-footer">
            <view class="art-stats">
              <uni-icons type="fire" size="14" color="#ff6b6b"></uni-icons>
              <text>{{ item.popularity }}人关注</text>
            </view>
            <view class="art-location">
              <uni-icons type="location" size="14" color="#666"></uni-icons>
              <text>{{ item.location }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";

const currentCategory = ref("");

// 技艺分类数据
const artCategories = ref([
  {
    name: "全部",
  },
  {
    name: "刺绣织绣",
  },
  {
    name: "陶瓷制作",
  },
  {
    name: "木雕技艺",
  },
  {
    name: "漆器工艺",
  },
  {
    name: "金属工艺",
  },
  {
    name: "织锦织绫",
  },
  {
    name: "剪纸技艺",
  },
  {
    name: "书画技艺",
  },
]);

// 技艺列表数据
const artList = ref([
  {
    imageUrl: "/static/art/suzhou.jpg",
    title: "苏州刺绣",
    levelText: "国家级",
    level: "national",
    description:
      "苏绣以其精细的针法、严谨的构图、优美的色彩著称于世，是中国传统刺绣艺术的杰出代表。",
    popularity: "12.5万",
    location: "江苏苏州",
    category: "刺绣织绣",
  },
  {
    imageUrl: "/static/art/jingdezhen.jpg",
    title: "景德镇陶瓷",
    levelText: "国家级",
    level: "national",
    description:
      '景德镇素有"瓷都"之称，千年窑火传承，是中国陶瓷文化的重要发源地。',
    popularity: "15.8万",
    location: "江西景德镇",
    category: "陶瓷制作",
  },
  {
    imageUrl: "/static/art/dongyang.jpg",
    title: "东阳木雕",
    levelText: "省级",
    level: "provincial",
    description:
      "浙江东阳木雕以其精湛的技艺和独特的艺术风格闻名，是中国传统木雕艺术的典范。",
    popularity: "8.3万",
    location: "浙江东阳",
    category: "木雕技艺",
  },
  {
    imageUrl: "/static/art/yuxiu.jpg",
    title: "湘绣",
    levelText: "国家级",
    level: "national",
    description:
      "湘绣是中国四大名绣之一，以色彩鲜艳、层次分明、虚实结合的独特风格著称，擅长绣制人物花鸟。",
    popularity: "9.8万",
    location: "湖南长沙",
    category: "刺绣织绣",
  },
  {
    imageUrl: "/static/art/shu.jpg",
    title: "蜀绣",
    levelText: "国家级",
    level: "national",
    description:
      "蜀绣是中国四大名绣之一，以密、平、齐、光、和谐的特点著称，以表现熊猫、锦鸡等川蜀自然风光见长。",
    popularity: "8.7万",
    location: "四川成都",
    category: "刺绣织绣",
  },
  {
    imageUrl: "/static/art/mudiao1.jpg",
    title: "龙眼木雕",
    levelText: "国家级",
    level: "national",
    description:
      "福建龙眼木雕以工艺精细、雕法多样著称，主要题材包括人物、花鸟、龙凤等，常用于家具装饰和艺术品制作。",
    popularity: "6.2万",
    location: "福建莆田",
    category: "木雕技艺",
  },
  {
    imageUrl: "/static/art/mudiao2.jpg",
    title: "黄杨木雕",
    levelText: "省级",
    level: "provincial",
    description:
      "黄杨木雕选用质地细密的黄杨木为材料，以其精细的雕刻技法和写实风格闻名，作品细腻逼真。",
    popularity: "5.4万",
    location: "浙江温州",
    category: "木雕技艺",
  },
  {
    imageUrl: "/static/art/qiqi1.jpg",
    title: "福州脱胎漆器",
    levelText: "国家级",
    level: "national",
    description:
      "脱胎漆器是中国特有的漆器制作工艺，以其制作精细、轻巧坚固、造型优美著称，集实用性与欣赏性于一体。",
    popularity: "7.1万",
    location: "福建福州",
    category: "漆器工艺",
  },
  {
    imageUrl: "/static/art/qiqi2.jpg",
    title: "阳江漆器",
    levelText: "省级",
    level: "provincial",
    description:
      "阳江漆器工艺历史悠久，以髹漆、镶嵌、描绘等工艺为主，产品造型古朴典雅，色泽鲜艳夺目。",
    popularity: "4.8万",
    location: "广东阳江",
    category: "漆器工艺",
  },
  {
    imageUrl: "/static/art/metal1.jpg",
    title: "景泰蓝",
    levelText: "国家级",
    level: "national",
    description:
      '景泰蓝是中国特有的金属工艺品，以铜为胎，以景泰蓝釉料烧制而成，色彩绚丽多彩，被誉为"东方珐琅"。',
    popularity: "9.3万",
    location: "北京",
    category: "金属工艺",
  },
  {
    imageUrl: "/static/art/metal2.jpg",
    title: "錾金银器",
    levelText: "国家级",
    level: "national",
    description:
      "錾金银器是一种古老的金属加工技艺，通过在金银材质上錾刻图案，制作精美华丽的器皿和装饰品。",
    popularity: "6.7万",
    location: "云南大理",
    category: "金属工艺",
  },
  {
    imageUrl: "/static/art/paper1.jpg",
    title: "满族剪纸",
    levelText: "国家级",
    level: "national",
    description:
      "满族剪纸以其细腻的刀工和独特的民族风格著称，主题多反映满族生活习俗、神话传说等内容。",
    popularity: "7.5万",
    location: "辽宁",
    category: "剪纸技艺",
  },
  {
    imageUrl: "/static/art/paper2.jpg",
    title: "陕西剪纸",
    levelText: "省级",
    level: "provincial",
    description:
      "陕西剪纸以其粗犷豪放、简练概括的艺术风格闻名，常见于窗花、门笺等，多表现祥瑞吉祥的题材。",
    popularity: "6.9万",
    location: "陕西",
    category: "剪纸技艺",
  },
  {
    imageUrl: "/static/art/paint1.jpg",
    title: "山水画",
    levelText: "国家级",
    level: "national",
    description:
      "中国山水画是中国传统绘画的重要门类，以笔墨表现自然山水，追求意境与哲理，是文人精神的体现。",
    popularity: "11.2万",
    location: "全国",
    category: "书画技艺",
  },
  {
    imageUrl: "/static/art/paint2.jpg",
    title: "工笔花鸟",
    levelText: "国家级",
    level: "national",
    description:
      "工笔花鸟画以细腻的笔法和鲜艳的色彩描绘花卉鸟虫，讲究形神兼备，生动传神，是中国传统绘画的重要组成部分。",
    popularity: "10.6万",
    location: "全国",
    category: "书画技艺",
  },
]);

// 筛选后的技艺列表
const filteredArtList = ref([]);

// 初始化显示所有项目
onMounted(() => {
  filteredArtList.value = [...artList.value];
});

// 选择分类
const selectCategory = (category) => {
  currentCategory.value = category.name;

  // 根据分类筛选列表
  if (category.name === "全部") {
    filteredArtList.value = [...artList.value];
  } else {
    filteredArtList.value = artList.value.filter(
      (item) => item.category === category.name
    );
  }
};

// 跳转到详情页
const goToDetail = (item) => {
  uni.navigateTo({
    url: `/pages/art/detail?title=${encodeURIComponent(item.title)}`,
  });
};
</script>

<style scoped>
.art-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 30rpx;
}

.search-box {
  padding: 20rpx;
  background-color: #fff;
}

.grid-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20rpx;
  padding: 30rpx 20rpx;
  background-color: #fff;
  margin-bottom: 20rpx;
}

.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rpx;
}

.icon {
  margin-bottom: 5rpx;
}

.category-name {
  font-size: 24rpx;
  color: #333;
  text-align: center;
}

.section-title {
  padding: 20rpx;
  background-color: #fff;
  margin-bottom: 20rpx;
}

.section-title .title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  border-left: 8rpx solid #d81e06;
  padding-left: 20rpx;
}

.art-item {
  margin: 20rpx;
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
}

.art-image {
  width: 100%;
  height: 360rpx;
}

.art-content {
  padding: 20rpx;
}

.art-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10rpx;
}

.art-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.art-level {
  font-size: 24rpx;
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
}

.art-level.national {
  color: #d81e06;
  background-color: rgba(216, 30, 6, 0.1);
}

.art-level.provincial {
  color: #ff9500;
  background-color: rgba(255, 149, 0, 0.1);
}

.art-desc {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
  margin: 16rpx 0;
}

.art-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16rpx;
  font-size: 24rpx;
  color: #666;
}

.art-stats,
.art-location {
  display: flex;
  align-items: center;
  gap: 6rpx;
}

/* 添加点击效果 */
.art-item:active {
  transform: scale(0.98);
  transition: transform 0.2s;
}

.grid-item:active {
  opacity: 0.8;
  transform: scale(0.95);
  transition: all 0.2s;
}
</style>