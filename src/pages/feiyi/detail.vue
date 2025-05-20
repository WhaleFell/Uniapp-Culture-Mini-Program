<template>
  <view class="detail-container">
    <!-- 顶部图片 -->
    <view class="header-image">
      <image :src="currentDetail.imageUrl" mode="aspectFill"></image>
    </view>
    
    <!-- 标题区域 -->
    <view class="title-section">
      <text class="title">{{ currentDetail.title }}</text>
      <view class="tags">
        <text class="tag" v-for="(tag, index) in currentDetail.tags" :key="index">
          {{ tag }}
        </text>
      </view>
    </view>
    
    <!-- 基本信息 -->
    <view class="info-section">
      <view class="info-item">
        <text class="label">传承人：</text>
        <text class="value">{{ currentDetail.inheritor }}</text>
      </view>
      <view class="info-item">
        <text class="label">级别：</text>
        <text class="value">{{ currentDetail.level }}</text>
      </view>
      <view class="info-item">
        <text class="label">地区：</text>
        <text class="value">{{ currentDetail.region }}</text>
      </view>
    </view>
    
    <!-- 详细介绍 -->
    <view class="content-section">
      <view class="section-title">项目介绍</view>
      <text class="content-text">{{ currentDetail.description }}</text>
      
      <view class="section-title">历史渊源</view>
      <text class="content-text">{{ currentDetail.history }}</text>
      
      <view class="section-title">工艺特点</view>
      <text class="content-text">{{ currentDetail.features }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const feiyiDetail = ref([{
  id: 1,
  imageUrl: '/static/feiyi/banner1.jpg',
  title: '景德镇陶瓷制作技艺',
  tags: ['手工艺', '国家级'],
  inheritor: '张大师',
  level: '国家级非物质文化遗产',
  region: '江西省景德镇市',
  description: '景德镇陶瓷制作技艺是中国传统手工技艺的杰出代表，具有悠久的历史传承。景德镇素有"瓷都"之称，其陶瓷制作工艺举世闻名。',
  history: '景德镇制瓷始于汉代，兴于唐宋，最终发展成为明清时期的御窑重地。千百年来，景德镇陶瓷以其精湛的制作工艺、独特的艺术风格享誉海内外。',
  features: '景德镇陶瓷制作包括选料、制胎、施釉、装饰、烧制等多道工序，每个环节都凝聚着匠人的智慧与技艺。其中青花瓷、粉彩瓷最具代表性。',
},
{
  id: 2,
  imageUrl: '/static/feiyi/banner2.jpg', // 苏州刺绣的图片
  title: '苏州刺绣',
  tags: ['手工艺', '国家级'],
  inheritor: '李大师',
  level: '国家级非物质文化遗产',
  region: '江苏省苏州市',
  description: '苏州刺绣是中国四大名绣之一，以其精美的刺绣技艺和丰富的文化内涵而闻名。',
  history: '苏州刺绣的历史可以追溯到两千多年前的春秋时期，经过历代的发展，形成了独特的风格。',
  features: '苏州刺绣以其细腻的针法、丰富的色彩和生动的图案而著称，常用于服饰、家居装饰等。',
},
{
  id: 3,
  imageUrl: '/static/feiyi/banner3.jpg', // 中医针灸的图片
  title: '中医针灸',
  tags: ['传统医药', '世界级'],
  inheritor: '王医生',
  level: '国家级非物质文化遗产',
  region: '全国',
  description: '中医针灸是中国传统医学的重要组成部分，具有悠久的历史和独特的治疗效果。',
  history: '针灸的起源可以追溯到公元前3000年左右，经过几千年的发展，形成了完整的理论体系。',
  features: '针灸通过刺激特定的穴位，调节身体的气血，达到治疗疾病的目的。'
},
{
  id: 4,
  imageUrl: '/static/feiyi/banner4.jpg',
  title: '云锦织造技艺',
  tags: ['手工艺', '国家级'],
  inheritor: '周传承人',
  level: '国家级非物质文化遗产',
  region: '江苏省南京市',
  description: '云锦是中国传统丝织工艺的珍品，被誉为"寸锦寸金"，是中国最复杂、最精致的丝织品之一，代表着中国丝织业的最高水平。',
  history: '云锦起源于三国时期，盛于唐宋，明清时期达到鼎盛。它曾是皇家御用织物，用于龙袍、朝服等重要服饰的制作。',
  features: '云锦织造采用多梭多综复杂提花技术，一匹云锦往往需要两人配合，经过数月甚至上年的时间才能完成。其图案色彩丰富，寓意吉祥。'
},
{
  id: 5,
  imageUrl: '/static/feiyi/banner5.jpg',
  title: '德化白瓷烧制技艺',
  tags: ['手工艺', '国家级'],
  inheritor: '林大师',
  level: '国家级非物质文化遗产',
  region: '福建省德化县',
  description: '德化白瓷以其洁白如玉的釉色和细腻的质感著称，被誉为"中国白"，是中国陶瓷艺术的珍品。',
  history: '德化白瓷始于宋代，明代达到高峰，是中国古代外销瓷的主要品种之一，曾大量输往欧洲各国，对欧洲瓷器的发展有重要影响。',
  features: '德化白瓷的主要特点是胎质细腻，釉色润白似玉，洁白莹润。其艺术表现多为立体雕塑，尤以佛像、观音等宗教题材和人物、动植物造型见长。'
},
{
  id: 6,
  imageUrl: '/static/feiyi/banner6.jpg',
  title: '酿酒技艺',
  tags: ['传统技艺', '国家级'],
  inheritor: '赵大师',
  level: '国家级非物质文化遗产',
  region: '贵州省茅台镇、四川省宜宾市等',
  description: '中国传统酿酒技艺是中华民族几千年来智慧的结晶，包括茅台、五粮液等名酒的酿造都有着独特的工艺和流程。',
  history: '中国酿酒历史悠久，据考古发现，早在新石器时代，我国先民就已经掌握了酿酒技术。经过几千年的发展，形成了多种不同风格的酒种。',
  features: '中国传统白酒酿造强调"天时、地利、人和"，讲究选料、制曲、发酵、蒸馏等工序，每个环节都有严格的要求和独特的技艺。'
},
{
  id: 7,
  imageUrl: '/static/feiyi/banner7.jpg',
  title: '雕版印刷术',
  tags: ['传统技艺', '世界级'],
  inheritor: '吴传承人',
  level: '世界非物质文化遗产',
  region: '北京市、江苏扬州等',
  description: '雕版印刷是中国古代四大发明之一，是世界上最早的印刷术，对人类文明的传播和发展做出了重大贡献。',
  history: '雕版印刷始于隋唐时期，盛于宋代。它的发明大大降低了书籍的成本，推动了知识的普及和文化的传播。',
  features: '雕版印刷的工艺流程包括选材、制版、刻字、印刷等环节。工匠需要在木板上反向雕刻文字或图案，然后涂墨印刷，技艺要求极高。'
},
{
  id: 8,
  imageUrl: '/static/feiyi/banner8.jpg',
  title: '京剧',
  tags: ['民间艺术', '世界级'],
  inheritor: '梅传承人',
  level: '世界非物质文化遗产',
  region: '北京市',
  description: '京剧是中国国粹，融合了唱、念、做、打等多种艺术表现形式，是中国最具代表性的传统戏曲之一。',
  history: '京剧形成于清代乾隆年间，由徽剧、汉剧等多种地方戏曲融合发展而成，经过200多年的发展，形成了独特的艺术风格。',
  features: '京剧以生、旦、净、丑四大行当为基础，讲究程式化的表演，通过脸谱、服装、身段等元素，塑造不同的人物形象。'
},
{
  id: 9,
  imageUrl: '/static/feiyi/banner9.jpg',
  title: '皮影戏',
  tags: ['民间艺术', '国家级'],
  inheritor: '陈艺人',
  level: '国家级非物质文化遗产',
  region: '陕西、河北、山东等地',
  description: '皮影戏是一种以兽皮或纸板制作的人物剪影在幕后表演的传统民间艺术，被誉为"光影的艺术"。',
  history: '皮影戏起源于汉代，盛于唐宋，是中国最古老的戏剧形式之一。它曾广泛流传于民间，是重要的娱乐形式。',
  features: '皮影戏结合了雕刻、绘画、音乐、文学、表演等多种艺术形式。皮影人物造型夸张，色彩鲜艳，表演时伴随着丰富的音乐和唱腔。'
},
{
  id: 10,
  imageUrl: '/static/feiyi/banner10.jpg',
  title: '中药炮制技术',
  tags: ['传统医药', '国家级'],
  inheritor: '刘医师',
  level: '国家级非物质文化遗产',
  region: '全国',
  description: '中药炮制是中药材加工与处理的传统技术，是中医药学的重要组成部分，对中药的安全性和有效性具有重要影响。',
  history: '中药炮制技术始于秦汉时期，经过几千年的发展，形成了一套完整的理论体系和操作规范。',
  features: '中药炮制包括净制、切制、炒制、蒸煮、发酵等多种方法，通过不同的加工手段，改变药材的性质，增强药效或减轻毒副作用。'
},
{
  id: 11,
  imageUrl: '/static/feiyi/banner11.jpg',
  title: '藏医药浴法',
  tags: ['传统医药', '世界级'],
  inheritor: '索南医生',
  level: '世界非物质文化遗产',
  region: '西藏自治区',
  description: '藏医药浴是藏族传统医疗方式，通过药物浴疗达到治疗疾病、保健养生的目的，是藏医药学的重要组成部分。',
  history: '藏医药浴有2500多年历史，是藏族人民在长期与疾病斗争中积累的宝贵经验，2018年被列入人类非物质文化遗产代表作名录。',
  features: '藏医药浴采用数十种天然药材煎煮成药液，通过蒸汽熏蒸或浸泡沐浴的方式，治疗风湿、关节炎等多种疾病，具有独特的治疗效果。'
}])

const currentDetail = ref({})

// 获取路由参数
onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const id = parseInt(currentPage.$page.options.id)
  
  // 根据id找到对应的详情数据
  const detail = feiyiDetail.value.find(item => item.id === id)
  if (detail) {
    currentDetail.value = detail
  }
})

// 预览图片
const previewImage = (index) => {
  uni.previewImage({
    current: feiyiDetail.value.gallery[index],
    urls: feiyiDetail.value.gallery
  })
}
</script>

<style scoped>
.detail-container {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.header-image {
  width: 100%;
  height: 500rpx;
}

.header-image image {
  width: 100%;
  height: 100%;
}

.title-section {
  background-color: #fff;
  padding: 30rpx;
  margin-top: -50rpx;
  border-radius: 30rpx 30rpx 0 0;
  position: relative;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.tags {
  margin-top: 20rpx;
}

.tag {
  font-size: 24rpx;
  color: #d81e06;
  background-color: rgba(216, 30, 6, 0.1);
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
  margin-right: 16rpx;
}

.info-section {
  background-color: #fff;
  padding: 30rpx;
  margin-top: 2rpx;
}

.info-item {
  display: flex;
  margin-bottom: 20rpx;
}

.label {
  color: #666;
  width: 140rpx;
  font-size: 28rpx;
}

.value {
  color: #333;
  font-size: 28rpx;
  flex: 1;
}

.content-section {
  background-color: #fff;
  padding: 30rpx;
  margin-top: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  margin-top: 30rpx;
}

.content-text {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
}

</style> 