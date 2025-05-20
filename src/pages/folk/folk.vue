<template>
  <view class="folk-container">
    <!-- 日历展示最近节日 -->
    <view class="calendar-section">
      <view class="calendar-header">
        <text class="title">近期民俗节日</text>
        <text class="date">{{ currentDate }}</text>
      </view>
      <scroll-view class="festival-scroll" scroll-x="true">
        <view class="festival-list">
          <view
            class="festival-item"
            v-for="(item, index) in festivals"
            :key="index"
            :class="{ 'coming-soon': item.isComingSoon }"
            @tap="showFestivalDetail(item)"
          >
            <text class="festival-date">{{ item.date }}</text>
            <text class="festival-name">{{ item.name }}</text>
            <text class="festival-status">{{
              item.isComingSoon ? "即将到来" : "进行中"
            }}</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 活动分类标签 -->
    <view class="category-tabs">
      <view
        class="tab-item"
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ active: currentTab === index }"
        @tap="changeTab(index)"
      >
        {{ tab }}
      </view>
    </view>

    <!-- 活动列表 -->
    <view class="activity-list">
      <view
        class="activity-item"
        v-for="(item, index) in filteredActivities"
        :key="index"
        @tap="goToDetail(item)"
      >
        <image
          :src="item.imageUrl"
          mode="aspectFill"
          class="activity-image"
        ></image>
        <view class="activity-info">
          <view class="activity-header">
            <text class="activity-title">{{ item.title }}</text>
            <view class="activity-tag" :class="item.type">{{
              item.typeText
            }}</view>
          </view>
          <text class="activity-desc">{{ item.description }}</text>
          <view class="activity-footer">
            <view class="location">
              <uni-icons type="location" size="14" color="#666"></uni-icons>
              <text>{{ item.location }}</text>
            </view>
            <view class="time">
              <uni-icons type="calendar" size="14" color="#666"></uni-icons>
              <text>{{ item.time }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";

// 当前日期
const currentDate = ref("");
// 当前选中的标签
const currentTab = ref(0);

// 标签数据
const tabs = ref(["全部活动", "节日庆典", "民间习俗", "传统表演", "手工体验"]);

// 节日数据
const festivals = ref([
  {
    date: "2024-02-10",
    name: "春节",
    isComingSoon: true,
  },
  {
    date: "2024-04-04",
    name: "清明节",
    isComingSoon: true,
  },
  {
    date: "2024-06-10",
    name: "端午节",
    isComingSoon: true,
  },
]);

// 活动列表数据
const activities = ref([
  {
    imageUrl: "/static/folk/activity1.jpg",
    title: "春节庙会",
    typeText: "节日庆典",
    type: "festival",
    description: "体验传统庙会文化，品尝特色小吃，观看民俗表演，感受浓浓年味。",
    location: "北京地坛公园",
    time: "2024-02-10 ~ 2024-02-16",
  },
  {
    imageUrl: "/static/folk/activity2.jpg",
    title: "非遗手工艺体验",
    typeText: "手工体验",
    type: "workshop",
    description: "跟随非遗传承人学习传统手工艺，体验制作过程，传承匠人精神。",
    location: "苏州博物馆",
    time: "每周六 14:00-16:00",
  },
  {
    imageUrl: "/static/folk/activity3.jpg",
    title: "龙舟竞渡表演",
    typeText: "传统表演",
    type: "performance",
    description: "端午节特别活动，现场体验划龙舟，观看专业队伍比赛。",
    location: "杭州西湖",
    time: "2024-06-10 09:00-17:00",
  },

  {
    imageUrl: "/static/folk/activity4.jpg",
    title: "元宵灯会",
    typeText: "节日庆典",
    type: "festival",
    description:
      "欣赏各式花灯展示，猜灯谜，品尝元宵，感受传统元宵节的欢乐氛围。",
    location: "南京夫子庙",
    time: "2024-02-24 ~ 2024-02-26",
  },
  {
    imageUrl: "/static/folk/activity5.jpg",
    title: "中秋民俗文化节",
    typeText: "节日庆典",
    type: "festival",
    description: "赏月、吃月饼、制作花灯，体验传统中秋节日氛围，传承思乡文化。",
    location: "广州市越秀公园",
    time: "2024-09-17 ~ 2024-09-19",
  },

  {
    imageUrl: "/static/folk/activity6.jpg",
    title: "二月二龙抬头",
    typeText: "民间习俗",
    type: "custom",
    description:
      "体验农耕文化中的重要节气，参与剃龙头、祭农神等传统活动，祈求丰收。",
    location: "河南开封",
    time: "2024-03-02 08:00-17:00",
  },
  {
    imageUrl: "/static/folk/activity7.png",
    title: "泼水节",
    typeText: "民间习俗",
    type: "custom",
    description:
      "参与傣族传统节日活动，体验泼水祈福、放飞孔明灯等民族特色习俗。",
    location: "云南西双版纳",
    time: "2024-04-13 ~ 2024-04-15",
  },

  {
    imageUrl: "/static/folk/activity8.jpg",
    title: "京剧专场演出",
    typeText: "传统表演",
    type: "performance",
    description: "欣赏国粹京剧表演，了解脸谱、行当等知识，与名家近距离交流。",
    location: "北京梅兰芳大剧院",
    time: "每周日 19:30-21:30",
  },
  {
    imageUrl: "/static/folk/activity9.jpg",
    title: "傩舞表演",
    typeText: "传统表演",
    type: "performance",
    description:
      "观赏古老的傩舞表演，了解驱鬼纳福的民间信仰，感受神秘面具的魅力。",
    location: "江西南昌傩舞文化园",
    time: "2024-05-05 15:00-17:00",
  },

  {
    imageUrl: "/static/folk/activity10.jpg",
    title: "传统陶艺制作",
    typeText: "手工体验",
    type: "workshop",
    description:
      "在景德镇陶瓷艺人指导下，体验拉坯、上釉、烧制等工艺，制作专属陶瓷作品。",
    location: "景德镇陶瓷文化创意园",
    time: "每天 10:00-16:00",
  },
  {
    imageUrl: "/static/folk/activity11.jpg",
    title: "传统木版年画制作",
    typeText: "手工体验",
    type: "workshop",
    description: "学习中国传统木版年画技艺，亲手刻版印刷，体验非遗文化的魅力。",
    location: "天津杨柳青年画馆",
    time: "每周六、日 13:00-16:00",
  },
]);

// 筛选后的活动列表
const filteredActivities = ref([]);

// 初始化当前日期
onMounted(() => {
  const date = new Date();
  currentDate.value = `${date.getFullYear()}年${
    date.getMonth() + 1
  }月${date.getDate()}日`;

  // 初始加载所有活动
  filteredActivities.value = [...activities.value];
});

// 切换标签
const changeTab = (index) => {
  currentTab.value = index;

  // 根据标签筛选活动列表
  if (index === 0) {
    // 全部活动
    filteredActivities.value = [...activities.value];
  } else {
    const tabType = {
      1: "festival", // 节日庆典
      2: "custom", // 民间习俗
      3: "performance", // 传统表演
      4: "workshop", // 手工体验
    };

    filteredActivities.value = activities.value.filter(
      (item) => item.type === tabType[index]
    );
  }
};

// 显示节日详情
const showFestivalDetail = (festival) => {
  uni.showModal({
    title: festival.name,
    content: `节日日期：${festival.date}\n敬请期待精彩活动！`,
    showCancel: false,
  });
};

// 跳转到活动详情页
const goToDetail = (item) => {
  console.log("跳转到详情页:", item.title);
  try {
    const itemJson = encodeURIComponent(JSON.stringify(item));
    uni.navigateTo({
      url: `/pages/folk/detail?title=${encodeURIComponent(
        item.title
      )}&data=${itemJson}`,
    });
  } catch (error) {
    console.error("数据传递错误:", error);
    // 降级处理：仅传递标题
    uni.navigateTo({
      url: `/pages/folk/detail?title=${encodeURIComponent(item.title)}`,
    });
  }
};
</script>

<style scoped>
.folk-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.calendar-section {
  background-color: #fff;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.calendar-header .title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.calendar-header .date {
  font-size: 26rpx;
  color: #666;
}

.festival-scroll {
  white-space: nowrap;
}

.festival-list {
  display: flex;
  padding: 10rpx 0;
}

.festival-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200rpx;
  height: 180rpx;
  margin-right: 20rpx;
  background-color: #f8f8f8;
  border-radius: 16rpx;
  padding: 20rpx;
}

.festival-item.coming-soon {
  background-color: #fff5f5;
}

.festival-date {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 10rpx;
}

.festival-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.festival-status {
  font-size: 22rpx;
  color: #d81e06;
  padding: 4rpx 16rpx;
  background-color: rgba(216, 30, 6, 0.1);
  border-radius: 20rpx;
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
  padding: 10rpx 0;
  position: relative;
}

.tab-item.active {
  color: #d81e06;
  font-weight: bold;
}

.tab-item.active::after {
  content: "";
  position: absolute;
  bottom: -10rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 40rpx;
  height: 4rpx;
  background-color: #d81e06;
  border-radius: 2rpx;
}

.activity-list {
  padding: 20rpx;
}

.activity-item {
  background-color: #fff;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
}

.activity-image {
  width: 100%;
  height: 360rpx;
}

.activity-info {
  padding: 20rpx;
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.activity-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.activity-tag {
  font-size: 24rpx;
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
}

.activity-tag.festival {
  color: #d81e06;
  background-color: rgba(216, 30, 6, 0.1);
}

.activity-tag.workshop {
  color: #2f9e44;
  background-color: rgba(47, 158, 68, 0.1);
}

.activity-tag.performance {
  color: #1971c2;
  background-color: rgba(25, 113, 194, 0.1);
}

.activity-desc {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
  margin-bottom: 16rpx;
}

.activity-footer {
  display: flex;
  justify-content: space-between;
  font-size: 24rpx;
  color: #666;
}

.location,
.time {
  display: flex;
  align-items: center;
  gap: 6rpx;
}

/* 点击效果 */
.activity-item:active {
  transform: scale(0.98);
  transition: transform 0.2s;
}

.festival-item:active {
  opacity: 0.8;
  transform: scale(0.95);
  transition: all 0.2s;
}
</style>