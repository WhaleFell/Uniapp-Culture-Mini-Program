<template>
  <view class="detail-container">
    <view class="header-image">
      <image :src="currentActivity.imageUrl" mode="aspectFill"></image>
    </view>
    
    <view class="title-section">
      <text class="title">{{ currentActivity.title }}</text>
      <view class="tag-container">
        <text class="tag" v-if="currentActivity.typeText">{{ currentActivity.typeText }}</text>
      </view>
    </view>
    
    <view class="info-section">
      <view class="info-item">
        <text class="label">地点：</text>
        <text class="value">{{ currentActivity.location }}</text>
      </view>
      <view class="info-item">
        <text class="label">时间：</text>
        <text class="value">{{ currentActivity.time }}</text>
      </view>
      <view class="info-item" v-if="currentActivity.organizer">
        <text class="label">主办方：</text>
        <text class="value">{{ currentActivity.organizer }}</text>
      </view>
      <view class="info-item" v-if="currentActivity.cost">
        <text class="label">费用：</text>
        <text class="value">{{ currentActivity.cost }}</text>
      </view>
    </view>
    
    <view class="content-section">
      <view class="section-title">活动介绍</view>
      <text class="content-text">{{ currentActivity.description }}</text>
      
      <view class="section-title" v-if="currentActivity.details">活动详情</view>
      <text class="content-text" v-if="currentActivity.details">{{ currentActivity.details }}</text>
      
      <view class="section-title" v-if="currentActivity.history">历史渊源</view>
      <text class="content-text" v-if="currentActivity.history">{{ currentActivity.history }}</text>
      
      <view class="section-title" v-if="currentActivity.tips">参与提示</view>
      <text class="content-text" v-if="currentActivity.tips">{{ currentActivity.tips }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const currentActivity = ref({
  title: '春节庙会',
  imageUrl: '/static/folk/activity1.jpg',
  typeText: '节日庆典',
  type: 'festival',
  location: '北京地坛公园',
  time: '2024-02-10 ~ 2024-02-16',
  organizer: '北京市文化和旅游局',
  cost: '免费入场，部分活动需购票',
  description: '体验传统庙会文化，品尝特色小吃，观看民俗表演，感受浓浓年味。',
  details: '春节期间，地坛公园将举办大型传统庙会，包括非遗文化展示、民俗表演、特色小吃、传统手工艺展示等多项内容。现场有皮影戏、京剧表演、杂技等传统艺术表演，还有糖画、泥人等民间工艺现场制作。',
  history: '北京庙会起源于明清时期，是北京市民过年的重要活动。地坛庙会历史悠久，已成为北京过年的文化符号之一，每年吸引数十万市民和游客参与。',
  tips: '建议乘坐公共交通前往，避开客流高峰；可提前通过官方微信公众号了解活动安排；带好现金，部分小吃摊位可能不支持移动支付。'
})

onMounted(() => {
  // 获取当前页面实例
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  
  // 获取路由参数
  const options = currentPage.$page.options
  
  // 如果URL中有标题参数，则根据标题显示对应活动
  if (options && options.title) {
    const title = decodeURIComponent(options.title)
    console.log('查找活动标题:', title)
    
    // 静态活动数据
    const activities = [
      {
        title: '春节庙会',
        imageUrl: '/static/folk/activity1.jpg',
        typeText: '节日庆典',
        type: 'festival',
        location: '北京地坛公园',
        time: '2024-02-10 ~ 2024-02-16',
        organizer: '北京市文化和旅游局',
        cost: '免费入场，部分活动需购票',
        description: '体验传统庙会文化，品尝特色小吃，观看民俗表演，感受浓浓年味。',
        details: '春节期间，地坛公园将举办大型传统庙会，包括非遗文化展示、民俗表演、特色小吃、传统手工艺展示等多项内容。现场有皮影戏、京剧表演、杂技等传统艺术表演，还有糖画、泥人等民间工艺现场制作。',
        history: '北京庙会起源于明清时期，是北京市民过年的重要活动。地坛庙会历史悠久，已成为北京过年的文化符号之一，每年吸引数十万市民和游客参与。',
        tips: '建议乘坐公共交通前往，避开客流高峰；可提前通过官方微信公众号了解活动安排；带好现金，部分小吃摊位可能不支持移动支付。'
      },
      {
        title: '非遗手工艺体验',
        imageUrl: '/static/folk/activity2.jpg',
        typeText: '手工体验',
        type: 'workshop',
        location: '苏州博物馆',
        time: '每周六 14:00-16:00',
        organizer: '苏州博物馆非遗保护中心',
        cost: '50元/人（含材料费）',
        description: '跟随非遗传承人学习传统手工艺，体验制作过程，传承匠人精神。',
        details: '每周六下午，苏州博物馆将邀请不同非遗项目的传承人，为公众提供互动体验课程。课程包括苏绣、核雕、剪纸、香囊制作等多种传统手工艺。每次活动时长约2小时，参与者可在专业指导下完成一件作品并带回家。',
        history: '苏州是中国传统手工艺的重要发源地，苏绣、核雕、缂丝等工艺闻名于世。苏州博物馆自2018年起开展非遗体验活动，旨在推广传统文化，让更多人了解并参与到非遗保护中来。',
        tips: '需提前一周在苏州博物馆官网或微信公众号预约；建议穿着舒适，部分手工艺可能会弄脏衣物；适合8岁以上人群参与。'
      },
      {
        title: '龙舟竞渡表演',
        imageUrl: '/static/folk/activity3.jpg',
        typeText: '传统表演',
        type: 'performance',
        location: '杭州西湖',
        time: '2024-06-10 09:00-17:00',
        organizer: '杭州市文化广电旅游局',
        cost: '免费观赛',
        description: '端午节特别活动，现场体验划龙舟，观看专业队伍比赛。',
        details: '端午节当天，西湖将举行盛大的龙舟赛事，包括专业组和民间组比赛。活动现场还有划龙舟体验区，观众可在教练指导下体验划龙舟的乐趣。同时，现场还有包粽子比赛、民俗表演等丰富活动。',
        history: '龙舟竞渡是中国传统端午节习俗，相传起源于楚国人为纪念屈原。杭州西湖龙舟赛已有百年历史，是浙江地区规模最大的端午民俗活动之一。',
        tips: '活动当天西湖周边交通管制，建议乘坐公共交通；观赛最佳位置在湖滨公园，建议提前到场占位；准备防晒用品和饮用水，现场可能人流较大。'
      },
      {
        title: '元宵灯会',
        imageUrl: '/static/folk/activity4.jpg',
        typeText: '节日庆典',
        type: 'festival',
        location: '南京夫子庙',
        time: '2024-02-24 ~ 2024-02-26',
        organizer: '南京市秦淮区文化局',
        cost: '免费',
        description: '欣赏各式花灯展示，猜灯谜，品尝元宵，感受传统元宵节的欢乐氛围。',
        details: '元宵节期间，夫子庙秦淮河畔将布置数百盏彩灯，包括传统宫灯、动物造型灯、历史人物灯等多种类型。现场设有猜灯谜活动，正确答题可获得精美礼品。此外，还有民间艺人表演和特色小吃市集，游客可品尝各式元宵和地方美食。',
        history: '元宵观灯始于汉代，南京夫子庙灯会已有上千年历史。明清时期，秦淮灯会规模宏大，被誉为"天下第一灯会"。如今，这一传统得到传承和发展，成为江南地区最具代表性的元宵庆典。',
        tips: '夜间人流量大，注意保管好随身物品；部分区域需提前在官方平台预约；建议乘坐地铁3号线到夫子庙站，避开拥堵。'
      },
      {
        title: '中秋民俗文化节',
        imageUrl: '/static/folk/activity5.jpg',
        typeText: '节日庆典',
        type: 'festival',
        location: '广州市越秀公园',
        time: '2024-09-17 ~ 2024-09-19',
        organizer: '广州市文化馆',
        cost: '免费入场',
        description: '赏月、吃月饼、制作花灯，体验传统中秋节日氛围，传承思乡文化。',
        details: '中秋节期间，越秀公园将举办为期三天的民俗文化节。活动包括广式月饼品鉴会、花灯制作工坊、传统音乐演奏会和"中秋诗会"等内容。园内五羊广场将设置大型赏月台，游客可参与集体拜月仪式，共同祈福。',
        history: '中秋节源于唐代，是中国传统的"三大节日"之一。广州的中秋习俗独具岭南特色，包括舞火龙、赏花灯、吃合家欢等。越秀公园中秋活动已连续举办十余年，致力于保护和弘扬传统文化。',
        tips: '晚间活动人流量大，建议提前到场；部分互动体验项目需提前预约；现场提供传统服饰租赁，可穿汉服参与活动增添节日氛围。'
      },
      {
        title: '二月二龙抬头',
        imageUrl: '/static/folk/activity6.jpg',
        typeText: '民间习俗',
        type: 'custom',
        location: '河南开封',
        time: '2024-03-02 08:00-17:00',
        organizer: '开封市非物质文化遗产保护中心',
        cost: '免费',
        description: '体验农耕文化中的重要节气，参与剃龙头、祭农神等传统活动，祈求丰收。',
        details: '农历二月初二，开封将举办"龙抬头"民俗文化活动。主要内容包括祭祀农神仪式、民间剃头活动、打春牛仪式等。现场还将展示传统农具，演示古老的农耕技法，并有龙灯表演和地方戏曲演出。',
        history: '"二月二龙抬头"是中国农耕社会重要的节日，象征着春耕开始。在中国北方尤其盛行，人们会理发、吃炒豆、祭祀等，祈求一年风调雨顺。河南开封作为古都，这一习俗保存得尤为完整。',
        tips: '活动主会场在包公祠，分会场遍布市区多个历史景点；可品尝当地特色的"龙须面"和"发财饼"；摄影爱好者可捕捉到精彩的民俗场景。'
      },
      {
        title: '泼水节',
        imageUrl: '/static/folk/activity7.jpg',
        typeText: '民间习俗',
        type: 'custom',
        location: '云南西双版纳',
        time: '2024-04-13 ~ 2024-04-15',
        organizer: '西双版纳傣族自治州旅游发展委员会',
        cost: '免费参与',
        description: '参与傣族传统节日活动，体验泼水祈福、放飞孔明灯等民族特色习俗。',
        details: '每年农历四月，西双版纳举行为期三天的泼水节庆典。活动包括盛大的游行表演、佛像沐浴仪式、傣族歌舞表演、美食品尝会等。最具特色的是全民参与的泼水活动，游客可以与当地人一同泼水，寓意洗去过去一年的不顺，迎接新的一年。',
        history: '泼水节是傣族、德昂族、布朗族等少数民族的传统新年，已有1300多年历史。最初是一种宗教仪式，如今已成为民族文化的象征和西双版纳重要的旅游活动。',
        tips: '请准备防水袋保护电子设备；穿着易干的衣物；尊重当地文化，参与泼水时注意安全；傍晚可参加放飞孔明灯活动，别具特色。'
      },
      {
        title: '京剧专场演出',
        imageUrl: '/static/folk/activity8.jpg',
        typeText: '传统表演',
        type: 'performance',
        location: '北京梅兰芳大剧院',
        time: '每周日 19:30-21:30',
        organizer: '北京京剧院',
        cost: '80-380元不等',
        description: '欣赏国粹京剧表演，了解脸谱、行当等知识，与名家近距离交流。',
        details: '每周日晚，梅兰芳大剧院定期举办京剧专场演出，由北京京剧院资深演员主演。演出前设有30分钟的京剧知识讲座，介绍脸谱含义、角色行当等基础知识。演出结束后，观众可与演员互动交流，近距离了解这门传统艺术。',
        history: '京剧形成于清代乾隆年间，距今已有200多年历史，被誉为"国粹"。梅兰芳是京剧史上的杰出艺术家，对京剧艺术的发展做出了巨大贡献。梅兰芳大剧院以其名字命名，致力于弘扬和传承京剧艺术。',
        tips: '建议提前半小时到场，可在一楼大厅参观京剧文化展；初次接触京剧的观众可租用解说耳机，帮助理解剧情；演出过程中请勿拍照摄影，演出结束后可与演员合影。'
      },
      {
        title: '傩舞表演',
        imageUrl: '/static/folk/activity9.jpg',
        typeText: '传统表演',
        type: 'performance',
        location: '江西南昌傩舞文化园',
        time: '2024-05-05 15:00-17:00',
        organizer: '江西省非物质文化遗产保护中心',
        cost: '120元/人',
        description: '观赏古老的傩舞表演，了解驱鬼纳福的民间信仰，感受神秘面具的魅力。',
        details: '傩舞文化园将举办特别傩舞表演，内容包括"神灵出巡"、"驱邪仪式"和"祈福舞蹈"三个部分。表演者将佩戴传统手工制作的木质面具，伴随着古老的乐器演奏，展示这一原始而神秘的民间艺术。演出结束后，观众可参观面具制作工坊，了解傩面具的制作工艺。',
        history: '傩舞起源于原始社会的驱鬼祭祀活动，距今已有3000多年历史。江西是中国傩文化的重要发源地之一，傩舞在民间宗教仪式和祭祀活动中扮演重要角色。2006年，江西傩舞被列入第一批国家级非物质文化遗产名录。',
        tips: '表演中会有响亮的锣鼓声和烟火效果，不建议幼儿和对声音敏感的人士观看；拍照时请不要使用闪光灯；可在文化园内购买傩面具纪念品。'
      },
      {
        title: '传统陶艺制作',
        imageUrl: '/static/folk/activity10.jpg',
        typeText: '手工体验',
        type: 'workshop',
        location: '景德镇陶瓷文化创意园',
        time: '每天 10:00-16:00',
        organizer: '景德镇陶瓷文化研究所',
        cost: '150元/人起',
        description: '在景德镇陶瓷艺人指导下，体验拉坯、上釉、烧制等工艺，制作专属陶瓷作品。',
        details: '陶瓷文化创意园提供全天候的陶艺体验课程，由景德镇资深陶艺师指导。基础课程包括陶土准备、拉坯成型、修坯、绘制装饰四个环节，时长约2小时。高级课程还包括上釉和烧制环节，需要3-5天完成。完成的作品经过烧制后将邮寄给参与者，作为永久纪念。',
        history: '景德镇有着1700多年的制瓷历史，被誉为"瓷都"。宋代起被定为御窑所在地，生产的瓷器供皇家使用。景德镇陶瓷以"白如玉、明如镜、薄如纸、声如磬"的特点闻名于世，是中国重要的文化符号之一。',
        tips: '建议穿着宽松衣物，会提供围裙；基础体验可当天完成，但作品需等待7-15天烧制完成后邮寄；可提前在官网预约以避免排队等待；园区内有陶瓷博物馆可参观。'
      },
      {
        title: '传统木版年画制作',
        imageUrl: '/static/folk/activity11.jpg',
        typeText: '手工体验',
        type: 'workshop',
        location: '天津杨柳青年画馆',
        time: '每周六、日 13:00-16:00',
        organizer: '天津民间艺术保护协会',
        cost: '100元/人',
        description: '学习中国传统木版年画技艺，亲手刻版印刷，体验非遗文化的魅力。',
        details: '每周末下午，杨柳青年画馆开设年画制作体验课。课程分为木版年画历史讲解、印刷技法演示和实际操作三个部分。参与者可以在传承人指导下，学习使用传统工具进行印刷，完成一幅杨柳青木版年画。体验结束后，可参观年画博物馆，了解年画的发展历史。',
        history: '杨柳青年画起源于明代，鼎盛于清代，是中国最著名的木版年画之一。传统的杨柳青年画以色彩艳丽、构图饱满、寓意吉祥为特点，常用于春节期间装饰家居，祈求来年平安喜乐。2006年，杨柳青木版年画被列入第一批国家级非物质文化遗产名录。',
        tips: '体验时间约2小时，建议提前半小时到场；可能会弄脏衣物，建议穿深色衣服；完成的作品需要晾干后才能带走，约需30分钟；馆内有年画纪念品出售，可购买收藏。'
      }
    ]
    
    const activity = activities.find(item => item.title === title)
    if (activity) {
      currentActivity.value = activity
      console.log('找到匹配活动:', activity)
    } else {
      console.error('未找到匹配活动:', title)
    }
  }
})
</script>

<style scoped>
.detail-container {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20rpx;
}

.header-image {
  width: 100%;
  height: 400rpx;
  border-radius: 10rpx;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-image image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.title-section {
  background-color: #ffffff;
  padding: 24rpx;
  border-radius: 10rpx;
  margin-top: -30rpx;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.tag-container {
  margin-top: 16rpx;
  display: flex;
  flex-wrap: wrap;
}

.tag {
  font-size: 24rpx;
  color: #d81e06;
  background-color: rgba(216, 30, 6, 0.1);
  padding: 6rpx 16rpx;
  border-radius: 20rpx;
  margin-right: 10rpx;
  margin-top: 6rpx;
}

.info-section {
  background-color: #ffffff;
  padding: 24rpx;
  border-radius: 10rpx;
  margin-top: 20rpx;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.info-item {
  display: flex;
  margin-bottom: 16rpx;
}

.info-item:last-child {
  margin-bottom: 0;
}

.label {
  color: #666;
  width: 120rpx;
  font-size: 26rpx;
}

.value {
  color: #333;
  font-size: 26rpx;
  flex: 1;
}

.content-section {
  background-color: #ffffff;
  padding: 24rpx;
  border-radius: 10rpx;
  margin-top: 20rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 16rpx;
  margin-top: 24rpx;
  position: relative;
  padding-left: 20rpx;
}

.section-title:first-child {
  margin-top: 0;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 4rpx;
  height: 28rpx;
  width: 6rpx;
  background-color: #d81e06;
  border-radius: 3rpx;
}

.content-text {
  font-size: 26rpx;
  color: #666;
  line-height: 1.6;
}
</style> 