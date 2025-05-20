<template>
  <view class="detail-container">
    <view class="header-image">
      <image :src="currentArt.imageUrl" mode="aspectFill"></image>
    </view>
    
    <view class="title-section">
      <text class="title">{{ currentArt.title }}</text>
      <view class="tags">
        <text class="tag" v-for="(tag, index) in currentArt.tags" :key="index">
          {{ tag }}
        </text>
      </view>
    </view>
    
    <view class="info-section">
      <view class="info-item">
        <text class="label">传承人：</text>
        <text class="value">{{ currentArt.inheritor }}</text>
      </view>
      <view class="info-item">
        <text class="label">级别：</text>
        <text class="value">{{ currentArt.level }}</text>
      </view>
      <view class="info-item">
        <text class="label">地区：</text>
        <text class="value">{{ currentArt.region }}</text>
      </view>
    </view>
    
    <view class="content-section">
      <view class="section-title">项目介绍</view>
      <text class="content-text">{{ currentArt.description }}</text>
      
      <view class="section-title">历史渊源</view>
      <text class="content-text">{{ currentArt.history }}</text>
      
      <view class="section-title">工艺特点</view>
      <text class="content-text">{{ currentArt.features }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const currentArt = ref({})

// 模拟艺术品数据
const artDetails = [
  {
    title: '苏州刺绣',
    imageUrl: '/static/art/suzhou.jpg',
    tags: ['手工艺', '国家级'],
    inheritor: '李大师',
    level: '国家级非物质文化遗产',
    region: '江苏省苏州市',
    description: '苏州刺绣是中国四大名绣之一，以其精美的刺绣技艺和丰富的文化内涵而闻名。',
    history: '苏州刺绣的历史可以追溯到两千多年前的春秋时期。',
    features: '苏州刺绣以其细腻的针法、丰富的色彩和生动的图案而著称。',
  },
  {
    title: '景德镇陶瓷',
    imageUrl: '/static/art/jingdezhen.jpg',
    tags: ['陶瓷', '国家级'],
    inheritor: '张大师',
    level: '国家级非物质文化遗产',
    region: '江西省景德镇市',
    description: '景德镇陶瓷制作技艺是中国传统手工技艺的杰出代表，具有悠久的历史传承。',
    history: '景德镇制瓷始于汉代，兴于唐宋，最终发展成为明清时期的御窑重地。',
    features: '景德镇陶瓷制作包括选料、制胎、施釉、装饰、烧制等多道工序，每个环节都凝聚着匠人的智慧与技艺。',
  },
  {
    title: '东阳木雕',
    imageUrl: '/static/art/dongyang.jpg',
    tags: ['木雕', '省级'],
    inheritor: '王大师',
    level: '省级非物质文化遗产',
    region: '浙江省东阳市',
    description: '东阳木雕以其精湛的技艺和独特的艺术风格闻名，是中国传统木雕艺术的典范。',
    history: '东阳木雕的历史可以追溯到几百年前，经过多代匠人的努力，形成了独特的风格。',
    features: '东阳木雕以其细腻的雕刻和生动的表现手法而著称，常用于家居装饰和工艺品制作。',
  },
  // 添加湘绣详情
  {
    title: '湘绣',
    imageUrl: '/static/art/yuxiu.jpg',
    tags: ['刺绣织绣', '国家级'],
    inheritor: '陈传承人',
    level: '国家级非物质文化遗产',
    region: '湖南省长沙市',
    description: '湘绣是中国四大名绣之一，以色彩鲜艳、层次分明、虚实结合的独特风格著称，擅长绣制人物花鸟。',
    history: '湘绣起源于楚汉时期，距今已有两千多年历史。明清时期达到鼎盛，1915年在巴拿马万国博览会上获得金奖。',
    features: '湘绣以针法精细、图案精美、色彩鲜艳、画面逼真著称，讲究"平、齐、和、光、顺"，擅长绣制人物、动物、山水等多种题材。',
  },
  // 添加蜀绣详情
  {
    title: '蜀绣',
    imageUrl: '/static/art/shu.jpg',
    tags: ['刺绣织绣', '国家级'],
    inheritor: '赵传承人',
    level: '国家级非物质文化遗产',
    region: '四川省成都市',
    description: '蜀绣是中国四大名绣之一，以密、平、齐、光、和谐的特点著称，以表现熊猫、锦鸡等川蜀自然风光见长。',
    history: '蜀绣源于秦汉，盛于唐宋，是中国最古老的刺绣品种之一。在巴蜀文化的影响下，形成了独特的艺术风格。',
    features: '蜀绣色彩浓艳、构思巧妙、针法活泼、善用双面绣技法。最具特色的是"彩丝熊猫"，将四川特有的大熊猫形象表现得惟妙惟肖。',
  },
  // 添加龙眼木雕详情
  {
    title: '龙眼木雕',
    imageUrl: '/static/art/mudiao1.jpg',
    tags: ['木雕技艺', '国家级'],
    inheritor: '林传承人',
    level: '国家级非物质文化遗产',
    region: '福建省莆田市',
    description: '福建龙眼木雕以工艺精细、雕法多样著称，主要题材包括人物、花鸟、龙凤等，常用于家具装饰和艺术品制作。',
    history: '龙眼木雕始于唐宋，盛于明清，是福建传统工艺美术的代表作。明代莆田"湄洲派"木雕在全国享有盛名。',
    features: '龙眼木雕选用龙眼木为原料，质地细密，不易变形开裂。雕刻技法丰富，包括圆雕、浮雕、镂雕等，尤以其精湛的人物雕刻技艺闻名。',
  },
  // 添加黄杨木雕详情
  {
    title: '黄杨木雕',
    imageUrl: '/static/art/mudiao2.jpg',
    tags: ['木雕技艺', '省级'],
    inheritor: '吴大师',
    level: '省级非物质文化遗产',
    region: '浙江省温州市',
    description: '黄杨木雕选用质地细密的黄杨木为材料，以其精细的雕刻技法和写实风格闻名，作品细腻逼真。',
    history: '黄杨木雕在明代已经兴盛，清代达到高峰，温州黄杨木雕以其独特的工艺和艺术风格在全国木雕中独树一帜。',
    features: '黄杨木雕以"白如象牙、细如毛发、活如真人"著称，雕工极其精细，多采用圆雕和镂空雕法，以人物题材为主，尤擅长表现古代文人雅士。',
  },
  // 添加福州脱胎漆器详情
  {
    title: '福州脱胎漆器',
    imageUrl: '/static/art/qiqi1.jpg',
    tags: ['漆器工艺', '国家级'],
    inheritor: '郑大师',
    level: '国家级非物质文化遗产',
    region: '福建省福州市',
    description: '脱胎漆器是中国特有的漆器制作工艺，以其制作精细、轻巧坚固、造型优美著称，集实用性与欣赏性于一体。',
    history: '福州脱胎漆器始于唐代，盛于明清，是中国漆器中的珍品。明代福州漆器作坊遍布城乡，产品远销海外。',
    features: '脱胎漆器以布、纸为胎，经过多次漆涂、打磨，胎体脱出后即成器具，具有质轻坚固、隔热保温、色泽油亮等特点，常见的有圆盘、花瓶等器型。',
  },
  // 添加阳江漆器详情
  {
    title: '阳江漆器',
    imageUrl: '/static/art/qiqi2.jpg',
    tags: ['漆器工艺', '省级'],
    inheritor: '黄传承人',
    level: '省级非物质文化遗产',
    region: '广东省阳江市',
    description: '阳江漆器工艺历史悠久，以髹漆、镶嵌、描绘等工艺为主，产品造型古朴典雅，色泽鲜艳夺目。',
    history: '阳江漆器可追溯至明清时期，以其精美的工艺和浓郁的岭南特色享誉华南地区，是广东传统工艺的重要组成部分。',
    features: '阳江漆器擅长螺钿镶嵌、彩绘、描金等技法，图案多取材于花鸟虫鱼、山水人物，色彩艳丽，具有浓郁的岭南风格和地方特色。',
  },
  // 添加景泰蓝详情
  {
    title: '景泰蓝',
    imageUrl: '/static/art/metal1.jpg',
    tags: ['金属工艺', '国家级'],
    inheritor: '马大师',
    level: '国家级非物质文化遗产',
    region: '北京市',
    description: '景泰蓝是中国特有的金属工艺品，以铜为胎，以景泰蓝釉料烧制而成，色彩绚丽多彩，被誉为"东方珐琅"。',
    history: '景泰蓝发源于元代，明代景泰年间(1450-1456年)达到顶峰而得名，是北京最具代表性的传统工艺之一。',
    features: '景泰蓝制作工艺复杂，包括制胎、掐丝、点蓝、烧制等30多道工序。成品色彩绚丽，图案精美，富有立体感，具有很高的艺术和收藏价值。',
  },
  // 添加錾金银器详情
  {
    title: '錾金银器',
    imageUrl: '/static/art/metal2.jpg',
    tags: ['金属工艺', '国家级'],
    inheritor: '杨传承人',
    level: '国家级非物质文化遗产',
    region: '云南省大理市',
    description: '錾金银器是一种古老的金属加工技艺，通过在金银材质上錾刻图案，制作精美华丽的器皿和装饰品。',
    history: '大理白族錾金银器有着千年历史，早在唐代就已闻名，是大理白族特有的传统手工艺，也是白族文化的重要组成部分。',
    features: '錾金银器制作工艺繁复，包括锻造、錾刻、掐丝、镶嵌等多种技法。图案多以白族传统纹样为主，如蝴蝶、花卉等，具有浓郁的民族特色。',
  },
  // 添加满族剪纸详情
  {
    title: '满族剪纸',
    imageUrl: '/static/art/paper1.jpg',
    tags: ['剪纸技艺', '国家级'],
    inheritor: '关传承人',
    level: '国家级非物质文化遗产',
    region: '辽宁省',
    description: '满族剪纸以其细腻的刀工和独特的民族风格著称，主题多反映满族生活习俗、神话传说等内容。',
    history: '满族剪纸起源于清代，距今已有300多年历史，是满族文化中不可或缺的一部分，记录了满族人民的生活和精神世界。',
    features: '满族剪纸讲究刀法流畅，线条清晰，色彩丰富。题材多为满族神话、历史故事、生活场景等，常用于窗花、门笺以及节庆装饰品。',
  },
  // 添加陕西剪纸详情
  {
    title: '陕西剪纸',
    imageUrl: '/static/art/paper2.jpg',
    tags: ['剪纸技艺', '省级'],
    inheritor: '刘艺人',
    level: '省级非物质文化遗产',
    region: '陕西省',
    description: '陕西剪纸以其粗犷豪放、简练概括的艺术风格闻名，常见于窗花、门笺等，多表现祥瑞吉祥的题材。',
    history: '陕西剪纸历史悠久，是中国北方剪纸的代表，尤以陕北地区最为兴盛。早在宋代，陕西民间就流行用剪纸装饰居室。',
    features: '陕西剪纸风格朴实粗犷，图案夸张变形，线条简练有力，色彩艳丽对比强烈，多用红色等喜庆色彩，寓意吉祥如意，表达了人民对美好生活的向往。',
  },
  // 添加山水画详情
  {
    title: '山水画',
    imageUrl: '/static/art/paint1.jpg',
    tags: ['书画技艺', '国家级'],
    inheritor: '钱老师',
    level: '国家级非物质文化遗产',
    region: '全国',
    description: '中国山水画是中国传统绘画的重要门类，以笔墨表现自然山水，追求意境与哲理，是文人精神的体现。',
    history: '中国山水画起源于魏晋南北朝，五代时期形成独立画科，宋元时期达到高峰。历代文人墨客不断创新发展，形成了多种流派和风格。',
    features: '山水画讲究以形写神，意在笔先，强调"外师造化，中得心源"。主要分为青绿山水和水墨山水两大类，通过点、线、面的组合来表现山石、树木、流水等自然景观。',
  },
  // 添加工笔花鸟详情
  {
    title: '工笔花鸟',
    imageUrl: '/static/art/paint2.jpg',
    tags: ['书画技艺', '国家级'],
    inheritor: '孙大师',
    level: '国家级非物质文化遗产',
    region: '全国',
    description: '工笔花鸟画以细腻的笔法和鲜艳的色彩描绘花卉鸟虫，讲究形神兼备，生动传神，是中国传统绘画的重要组成部分。',
    history: '工笔花鸟画起源于汉代，盛于唐宋，尤以宋代院体花鸟画达到巅峰。明清时期继续发展，近现代以来又有新的创新和突破。',
    features: '工笔花鸟画以工整细致的笔法，艳丽华贵的色彩，传神写照的刻画见长。强调物象的真实感和质感，讲究设色工艺，技法包括勾线、填色、皴擦、点染等，表现手法丰富多样。',
  },
]

// 获取路由参数
onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const title = decodeURIComponent(currentPage.$page.options.title)
  
  // 根据标题找到对应的艺术品数据
  const art = artDetails.find(item => item.title === title)
  if (art) {
    currentArt.value = art
  }
})
</script>

<style scoped>
.detail-container {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20rpx; /* 增加内边距 */
}

.header-image {
  width: 100%;
  height: 300rpx; /* 调整高度 */
  border-radius: 10rpx; /* 圆角 */
  overflow: hidden; /* 避免溢出 */
}

.header-image image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保持比例 */
}

.title-section {
  background-color: #ffffff;
  padding: 20rpx;
  border-radius: 10rpx;
  margin-top: -20rpx; /* 使其与图片重叠 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.tags {
  margin-top: 10rpx;
}

.tag {
  font-size: 22rpx;
  color: #d81e06;
  background-color: rgba(216, 30, 6, 0.1);
  padding: 4rpx 12rpx;
  border-radius: 20rpx;
  margin-right: 10rpx;
}

.info-section {
  background-color: #ffffff;
  padding: 20rpx;
  border-radius: 10rpx;
  margin-top: 20rpx;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.info-item {
  display: flex;
  margin-bottom: 15rpx; /* 增加间距 */
}

.label {
  color: #666;
  width: 100rpx; /* 固定宽度 */
  font-size: 24rpx;
}

.value {
  color: #333;
  font-size: 24rpx;
  flex: 1;
}

.content-section {
  background-color: #ffffff;
  padding: 20rpx;
  border-radius: 10rpx;
  margin-top: 20rpx;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.section-title {
  font-size: 26rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
  margin-top: 20rpx;
}

.content-text {
  font-size: 24rpx;
  color: #666;
  line-height: 1.6;
}
</style> 