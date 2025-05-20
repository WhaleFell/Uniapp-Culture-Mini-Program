<template>
  <view class="detail-container">
    <!-- 展览图片 -->
    <view class="header-image">
      <image :src="currentExhibition.imageUrl" mode="aspectFill"></image>
    </view>
    
    <!-- 展览标题和状态 -->
    <view class="title-section">
      <view class="status-tag" :class="currentExhibition.status">
        {{ currentExhibition.statusText }}
      </view>
      <text class="title">{{ currentExhibition.title }}</text>
    </view>
    
    <!-- 基本信息 -->
    <view class="info-section">
      <view class="info-item">
        <uni-icons type="calendar" size="16" color="#666"></uni-icons>
        <text class="label">展览时间：</text>
        <text class="value">{{ currentExhibition.date }}</text>
      </view>
      <view class="info-item">
        <uni-icons type="location" size="16" color="#666"></uni-icons>
        <text class="label">展览地点：</text>
        <text class="value">{{ currentExhibition.location }}</text>
      </view>
      <view class="info-item">
        <uni-icons type="money" size="16" color="#666"></uni-icons>
        <text class="label">门票价格：</text>
        <text class="value" v-if="currentExhibition.price > 0">¥{{ currentExhibition.price }}</text>
        <text class="value free" v-else>免费</text>
      </view>
      <view class="info-item" v-if="currentExhibition.organizer">
        <uni-icons type="person" size="16" color="#666"></uni-icons>
        <text class="label">主办单位：</text>
        <text class="value">{{ currentExhibition.organizer }}</text>
      </view>
      <view class="info-item" v-if="currentExhibition.openingHours">
        <uni-icons type="time" size="16" color="#666"></uni-icons>
        <text class="label">开放时间：</text>
        <text class="value">{{ currentExhibition.openingHours }}</text>
      </view>
    </view>
    
    <!-- 展览介绍 -->
    <view class="content-section">
      <view class="section-title">展览介绍</view>
      <text class="content-text">{{ currentExhibition.description }}</text>
    </view>
    
    <!-- 交通信息 -->
    <view class="content-section" v-if="currentExhibition.trafficInfo">
      <view class="section-title">交通信息</view>
      <text class="content-text">{{ currentExhibition.trafficInfo }}</text>
    </view>
    
    <!-- 参观须知 -->
    <view class="content-section" v-if="currentExhibition.notices && currentExhibition.notices.length > 0">
      <view class="section-title">参观须知</view>
      <view class="notice-list">
        <view class="notice-item" v-for="(notice, index) in currentExhibition.notices" :key="index">
          <text class="notice-dot">•</text>
          <text class="notice-text">{{ notice }}</text>
        </view>
      </view>
    </view>
    
    <!-- 联系方式 -->
    <view class="content-section" v-if="currentExhibition.contactInfo">
      <view class="section-title">联系方式</view>
      <text class="content-text">{{ currentExhibition.contactInfo }}</text>
    </view>
    
    <!-- 预约按钮 -->
    <view class="action-section">
      <button class="book-btn" @tap="bookExhibition">预约参观</button>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const currentExhibition = ref({})

// 模拟展览数据
const exhibitions = [
  {
    imageUrl: '/static/exhibition/exhibit1.jpg',
    title: '丝绸之路文物特展',
    status: 'ongoing',
    statusText: '展览中',
    date: '2024.01.01 - 2024.03.31',
    location: '国家博物馆',
    description: '展现丝绸之路上的文化交流与商贸往来，展出珍贵文物300余件。展品包括各类丝绸、陶瓷、金银器等，充分展示了古代东西方文明交流的历史见证。\n\n本次展览分为"丝路起源"、"贸易繁荣"、"文化交融"三个主题区域，通过实物展示、多媒体互动和场景复原，让观众身临其境地感受丝绸之路的历史魅力。展览同时展出多件国家一级文物，包括唐代彩绘载乐骆驼俑、波斯银币、罗马玻璃器等珍贵文物，全方位展示丝路文明的辉煌。',
    price: 60,
    organizer: '国家文物局',
    contactInfo: '010-65511000',
    trafficInfo: '乘坐地铁1号线或4号线至天安门东站下车，步行约10分钟可达。',
    openingHours: '周二至周日 9:00-17:00（16:00停止入场），周一闭馆（法定节假日除外）',
    notices: [
      '需提前一天在官网预约',
      '禁止携带食品饮料入内',
      '禁止拍照（特别标注区域除外）',
      '请勿触摸展品'
    ]
  },
  {
    imageUrl: '/static/exhibition/exhibit2.jpg',
    title: '明清瓷器艺术展',
    status: 'upcoming',
    statusText: '即将开展',
    date: '2024.04.01 - 2024.06.30',
    location: '故宫博物院',
    description: '汇集明清两代精美瓷器，展现中国传统制瓷工艺的巅峰。展出官窑、民窑等各类珍贵瓷器，全面展示明清时期瓷器艺术的辉煌成就。\n\n本次展览共展出明清时期瓷器200余件（套），包括景德镇御窑厂、德化窑、龙泉窑等著名窑口的代表作品。展品按照年代和装饰工艺分区展示，观众可欣赏到青花、斗彩、五彩、粉彩等多种彩瓷精品，了解不同时期的审美变化和工艺创新。展览还原了部分制瓷工艺流程，通过视频和模型展示拉坯、施釉、装饰、烧制等环节。',
    price: 80,
    organizer: '故宫博物院',
    contactInfo: '010-85051114',
    trafficInfo: '乘坐地铁1号线至天安门西站或天安门东站下车，步行约15分钟可达。',
    openingHours: '周二至周日 8:30-17:00（16:30停止入场），周一闭馆（法定节假日除外）',
    notices: [
      '需提前七天在"故宫博物院"小程序预约',
      '持老年证、军官证等可享受优惠',
      '部分展区限流，请关注现场指引',
      '展厅内保持安静，请遵守参观秩序'
    ]
  },
  {
    imageUrl: '/static/exhibition/exhibit3.jpg',
    title: '非遗文化展',
    status: 'ongoing',
    statusText: '展览中',
    date: '2024.02.01 - 2024.02.29',
    location: '文化馆',
    description: '展示各地非物质文化遗产，包括手工艺品展示和现场表演。通过展览让观众近距离了解中国传统文化的魅力。\n\n本次非遗文化展汇集了来自全国各地的30余项非物质文化遗产项目，包括传统手工技艺、民间音乐、传统戏剧等多个类别。展览现场设有互动体验区，观众可在非遗传承人的指导下亲身体验剪纸、泥塑、编织等传统工艺。每天下午还有京剧、皮影戏等传统表演艺术的现场展示，让非遗文化活起来、传下去。',
    price: 0,
    organizer: '中国文化馆协会',
    contactInfo: '010-63012211',
    trafficInfo: '乘坐地铁2号线至复兴门站下车，步行约5分钟可达。',
    openingHours: '每日 9:00-18:00（17:30停止入场）',
    notices: [
      '免费参观，无需预约',
      '互动体验项目需提前半小时现场报名',
      '欢迎拍照记录，请勿使用闪光灯',
      '每日限流2000人，请避开高峰时段'
    ]
  },
  {
    imageUrl: '/static/exhibition/exhibit4.png',
    title: '唐代壁画艺术展',
    status: 'ongoing',
    statusText: '展览中',
    date: '2024.02.15 - 2024.05.15',
    location: '陕西历史博物馆',
    description: '展出唐代经典壁画复原作品及相关文物，展现盛唐时期的艺术成就。\n\n本次展览集中展示了陕西地区出土的唐代墓葬壁画复原品和相关文物，包括来自章怀太子墓、懿德太子墓等著名墓葬的壁画精品。展览通过高科技复原和数字呈现技术，让观众欣赏到唐代壁画的原貌和细节。展出的壁画内容丰富，包括宫廷生活、狩猎出行、乐舞百戏等场景，生动展现了唐代社会的繁荣景象和审美风尚。\n\n同时展出的还有与壁画相关的陶俑、金银器等文物，从多角度展示唐代艺术的辉煌成就。展览特设"唐代色彩"互动区，观众可了解唐代壁画的颜料配方和绘制工艺。',
    price: 50,
    organizer: '陕西省文物局',
    contactInfo: '029-85253806',
    trafficInfo: '乘坐地铁2号线至小寨站下车，换乘公交5路至博物馆站下车即到。',
    openingHours: '周二至周日 9:00-17:30（16:30停止入场），周一闭馆（法定节假日除外）',
    notices: [
      '需提前三天在"陕西博物馆"小程序预约',
      '特定区域禁止拍照',
      '团体参观请提前一周预约',
      '每日限流3000人'
    ]
  },
  {
    imageUrl: '/static/exhibition/exhibit5.png',
    title: '中国古代青铜器展',
    status: 'upcoming',
    statusText: '即将开展',
    date: '2024.05.01 - 2024.07.31',
    location: '上海博物馆',
    description: '集中展示从商周到汉代的精美青铜器，探索中国青铜文明的发展历程。\n\n这是近年来规模最大的青铜器专题展览，共展出国宝级青铜器120余件，按照时代发展顺序，系统展示了中国青铜文明从萌芽到鼎盛再到衰落的完整历程。展品包括礼器、乐器、兵器、工具等多种类型，其中不乏著名的司母戊大方鼎、毛公鼎等珍贵文物的复制品。\n\n展览特别设计了青铜器制作工艺展示区，通过模型和视频展示失蜡法等古代铸造技术，并配备了多媒体互动装置，观众可通过触摸屏幕放大观察青铜器上的精美纹饰和铭文。展览还原了不同时期的礼乐场景，帮助观众理解青铜器在古代礼制中的重要地位。',
    price: 70,
    organizer: '上海博物馆',
    contactInfo: '021-63723500',
    trafficInfo: '乘坐地铁1、2、8号线至人民广场站下车，10号出口步行约5分钟可达。',
    openingHours: '周二至周日 9:00-17:00（16:00停止入场），周一闭馆（法定节假日除外）',
    notices: [
      '需提前一周在官网或"上海博物馆"微信公众号预约',
      '儿童需在成人陪同下参观',
      '大件行李需存放在一楼存包处',
      '部分镇馆之宝限时展出，请关注现场公告'
    ]
  },
  {
    imageUrl: '/static/exhibition/exhibit6.png',
    title: '传统节日文化展',
    status: 'ongoing',
    statusText: '展览中',
    date: '2024.01.20 - 2024.03.20',
    location: '民俗文化中心',
    description: '通过实物、图片和互动装置，展示中国传统节日的习俗和文化内涵。\n\n本次展览全面介绍了中国传统节日的历史渊源、文化内涵和地域特色，涵盖春节、元宵、清明、端午、七夕、中秋、重阳等主要传统节日。展览按照时间顺序布置，每个节日区域展出相关的实物、图片和文献资料，生动再现传统节日的独特魅力。\n\n展览设有多个互动体验环节，如包粽子、制作灯笼、编中国结等，让观众亲身体验传统节日活动。同时设有节日美食展示区，通过模型和视频展示各地节日美食的制作工艺。展览还利用声光电等现代科技手段，创造沉浸式体验空间，如春节的爆竹声、端午的龙舟竞渡、中秋的月光等场景，让传统节日文化更加直观地呈现在观众面前。',
    price: 0,
    organizer: '中国民俗学会',
    contactInfo: '010-64852266',
    trafficInfo: '乘坐地铁5号线至东四站下车，换乘公交113路至民俗文化中心站下车即到。',
    openingHours: '每日 9:30-16:30（16:00停止入场）',
    notices: [
      '免费参观，需在入口处领取参观券',
      '体验活动需提前在现场报名',
      '周末可能人流较大，建议工作日参观',
      '展厅内提供免费讲解服务，每整点一场'
    ]
  }
]

// 获取路由参数
onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const title = decodeURIComponent(currentPage.$page.options.title)
  
  // 根据标题找到对应的展览数据
  const exhibition = exhibitions.find(item => item.title === title)
  if (exhibition) {
    currentExhibition.value = exhibition
  }
})

// 预约参观
const bookExhibition = () => {
  uni.showModal({
    title: '预约参观',
    content: `是否预约参观"${currentExhibition.value.title}"？`,
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: '预约成功',
          icon: 'success'
        })
      }
    }
  })
}
</script>

<style scoped>
.detail-container {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 120rpx;
}

.header-image {
  width: 100%;
  height: 400rpx;
}

.header-image image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.title-section {
  background-color: #fff;
  padding: 30rpx;
  margin-top: -40rpx;
  border-radius: 20rpx 20rpx 0 0;
  position: relative;
}

.status-tag {
  position: absolute;
  top: -30rpx;
  right: 30rpx;
  padding: 6rpx 20rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
}

.status-tag.ongoing {
  background-color: #e6f4ff;
  color: #1677ff;
}

.status-tag.upcoming {
  background-color: #fff7e6;
  color: #fa8c16;
}

.title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.info-section {
  background-color: #fff;
  padding: 30rpx;
  margin-top: 20rpx;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.info-item:last-child {
  margin-bottom: 0;
}

.label {
  color: #666;
  font-size: 26rpx;
  margin: 0 10rpx;
}

.value {
  color: #333;
  font-size: 26rpx;
}

.value.free {
  color: #52c41a;
}

.content-section {
  background-color: #fff;
  padding: 30rpx;
  margin-top: 20rpx;
}

.section-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.content-text {
  font-size: 26rpx;
  color: #666;
  line-height: 1.6;
}

.notice-list {
  margin-top: 10rpx;
}

.notice-item {
  display: flex;
  margin-bottom: 10rpx;
}

.notice-dot {
  color: #d81e06;
  margin-right: 10rpx;
  font-size: 26rpx;
}

.notice-text {
  font-size: 26rpx;
  color: #666;
  line-height: 1.6;
}

.action-section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 20rpx 30rpx;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.book-btn {
  background-color: #d81e06;
  color: #fff;
  border-radius: 100rpx;
  font-size: 28rpx;
  padding: 20rpx 0;
}

.book-btn:active {
  opacity: 0.9;
}
</style> 