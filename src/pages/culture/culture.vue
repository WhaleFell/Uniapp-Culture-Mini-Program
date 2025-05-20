<template>
  <view class="culture-container">
    <!-- 顶部搜索 -->
    <view class="search-box">
      <uni-search-bar 
        v-model="searchValue"
        placeholder="搜索文化知识"
        @confirm="handleSearch"
        @clear="resetSearch"
        radius="100"
        cancelButton="none"
      />
    </view>

    <!-- 搜索状态提示 -->
    <view class="search-info" v-if="isSearchMode">
      <text>搜索结果: {{ searchResults.length }}个</text>
      <text class="reset-link" @tap="resetSearch">清除搜索</text>
    </view>

    <!-- 知识分类导航 -->
    <scroll-view class="nav-scroll" scroll-x="true" v-if="!isSearchMode">
      <view class="nav-list">
        <view 
          class="nav-item" 
          v-for="(item, index) in categories" 
          :key="index"
          :class="{ active: currentCategory === index }"
          @tap="changeCategory(index)"
        >
          <text>{{ item.name }}</text>
        </view>
      </view>
    </scroll-view>

    <!-- 知识内容列表 -->
    <scroll-view 
      class="content-scroll"
      scroll-y
      @scrolltolower="loadMore"
      refresher-enabled
      @refresherrefresh="onRefresh"
      :refresher-triggered="isRefreshing"
    >
      <!-- 搜索无结果提示 -->
      <view class="no-result" v-if="isSearchMode && searchResults.length === 0">
        <image src="/static/images/no-result.png" mode="aspectFit"></image>
        <text>没有找到相关内容</text>
        <text class="sub-text">请尝试其他关键词</text>
      </view>

      <!-- 推荐专题 -->
      <view class="special-section" v-if="currentCategory === 0 && !isSearchMode">
        <view class="section-title">推荐专题</view>
        <scroll-view class="special-scroll" scroll-x="true">
          <view class="special-list">
            <view 
              class="special-item" 
              v-for="(item, index) in specialTopics" 
              :key="index"
              @tap="goToSpecial(item)"
            >
              <image :src="item.imageUrl" mode="aspectFill"></image>
              <text class="special-title">{{ item.title }}</text>
            </view>
          </view>
        </scroll-view>
      </view>

      <!-- 知识卡片列表 -->
      <view class="knowledge-list">
        <view 
          class="knowledge-item" 
          v-for="(item, index) in displayList" 
          :key="index"
          @tap="goToDetail(item)"
        >
          <view class="knowledge-content">
            <view class="content-main">
              <text class="title">{{ item.title }}</text>
              <text class="desc">{{ item.description }}</text>
              <view class="tags">
                <text 
                  class="tag" 
                  v-for="(tag, tagIndex) in item.tags" 
                  :key="tagIndex"
                >{{ tag }}</text>
              </view>
            </view>
            <image 
              v-if="item.imageUrl" 
              :src="item.imageUrl" 
              mode="aspectFill"
              class="content-image"
            ></image>
          </view>
          <view class="knowledge-footer">
            <view class="stats">
              <view class="stat-item">
                <uni-icons type="eye" size="14" color="#666"></uni-icons>
                <text>{{ item.views }}</text>
              </view>
              <view class="stat-item">
                <uni-icons type="heart" size="14" color="#666"></uni-icons>
                <text>{{ item.likes }}</text>
              </view>
            </view>
            <button 
              class="share-btn" 
              size="mini" 
              @tap.stop="shareKnowledge(item)"
            >分享</button>
          </view>
        </view>
      </view>

      <!-- 加载更多提示 -->
      <view class="loading-more" v-if="isLoading">
        <uni-load-more status="loading"></uni-load-more>
      </view>

      <!-- 没有更多内容提示 -->
      <view class="no-more" v-if="loadMoreStatus === 'noMore' && displayList.length > 0">
        <uni-load-more status="noMore" :contentText="{ contentnomore: '已经到底了' }"></uni-load-more>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

// 搜索值
const searchValue = ref('')
// 当前分类
const currentCategory = ref(0)
// 刷新状态
const isRefreshing = ref(false)
// 加载更多状态
const loadMoreStatus = ref('more')
// 是否在搜索模式
const isSearchMode = ref(false)
// 搜索结果
const searchResults = ref([])
// 加载状态
const isLoading = ref(false)

// 知识分类
const categories = ref([
  { name: '推荐文化', id: 'recommend' },
  { name: '传统节日', id: 'festival' },
  { name: '古代文学', id: 'literature' },
  { name: '传统艺术', id: 'art' },
  { name: '民间习俗', id: 'custom' },
  { name: '建筑文化', id: 'architecture' },
  { name: '饮食文化', id: 'food' },
  { name: '服饰文化', id: 'clothing' }
])

// 推荐专题
const specialTopics = ref([
  {
    imageUrl: '/static/culture/special1.jpg',
    title: '二十四节气的智慧'
  },
  {
    imageUrl: '/static/culture/special2.jpg',
    title: '诗词中的文化意境'
  },
  {
    imageUrl: '/static/culture/special3.jpg',
    title: '传统建筑之美'
  }
])

// 各分类的知识数据
const allKnowledgeData = reactive({
  // 推荐文化
  recommend: [
    {
      title: '端午节的文化内涵',
      description: '端午节不仅是纪念屈原的节日，更承载着中华民族深厚的文化内涵...',
      tags: ['传统节日', '民俗文化'],
      imageUrl: '/static/culture/knowledge1.jpg',
      views: '12.5k',
      likes: '2.3k'
    },
    {
      title: '唐诗宋词中的文化意象',
      description: '探索古典诗词中的文化符号与意象表达，感受古人的诗意人生...',
      tags: ['古代文学', '诗词鉴赏'],
      imageUrl: '/static/culture/knowledge2.jpg',
      views: '15.8k',
      likes: '3.1k'
    },
    {
      title: '中国传统园林艺术',
      description: '江南园林的布局特点与艺术造诣，体现了中国传统审美观念...',
      tags: ['建筑文化', '艺术鉴赏'],
      imageUrl: '/static/culture/knowledge3.jpg',
      views: '10.2k',
      likes: '1.8k'
    }
  ],
  // 传统节日
  festival: [
    {
      title: '春节习俗的地域差异',
      description: '从北方的贴春联、放鞭炮到南方的舞狮子、扭秧歌，了解不同地域的春节特色...',
      tags: ['传统节日', '地域文化'],
      imageUrl: '/static/culture/festival1.png',
      views: '18.7k',
      likes: '4.2k'
    },
    {
      title: '中秋节的历史演变',
      description: '中秋节从古代的祭月仪式到今天的团圆佳节，探索其文化内涵和历史变迁...',
      tags: ['传统节日', '历史文化'],
      imageUrl: '/static/culture/festival2.png',
      views: '14.3k',
      likes: '3.5k'
    },
    {
      title: '清明节的文化价值',
      description: '清明不仅是祭祖扫墓的时节，更是中华民族慎终追远、寄托哀思的文化传统...',
      tags: ['传统节日', '礼仪文化'],
      imageUrl: '/static/culture/festival3.png',
      views: '9.6k',
      likes: '2.1k'
    }
  ],
  // 古代文学
  literature: [
    {
      title: '《红楼梦》的文化解析',
      description: '透过《红楼梦》看清代贵族生活与文化审美，解读小说中的文学价值...',
      tags: ['古典小说', '文学鉴赏'],
      imageUrl: '/static/culture/literature1.png',
      views: '22.1k',
      likes: '5.7k'
    },
    {
      title: '李白诗歌中的侠义精神',
      description: '浪漫主义诗人李白笔下的侠客形象与豪放情怀，体现了唐代文人的精神追求...',
      tags: ['唐诗', '文学鉴赏'],
      imageUrl: '/static/culture/literature2.png',
      views: '16.9k',
      likes: '4.3k'
    },
    {
      title: '《论语》的现代价值',
      description: '儒家经典《论语》中的智慧对当代社会和个人修养的启示与思考...',
      tags: ['儒家经典', '哲学思想'],
      imageUrl: '/static/culture/literature3.png',
      views: '13.4k',
      likes: '3.8k'
    }
  ],
  // 传统艺术
  art: [
    {
      title: '京剧脸谱的色彩象征',
      description: '京剧脸谱中的红、黑、白等色彩所代表的人物性格特征和文化内涵...',
      tags: ['戏曲艺术', '非物质文化遗产'],
      imageUrl: '/static/culture/art1.png',
      views: '11.3k',
      likes: '2.7k'
    },
    {
      title: '中国传统水墨画技法',
      description: '水墨画的用笔、用墨和构图技巧，体验传统绘画艺术的独特魅力...',
      tags: ['传统绘画', '艺术鉴赏'],
      imageUrl: '/static/culture/art2.png',
      views: '10.8k',
      likes: '2.9k'
    },
    {
      title: '古琴艺术的文化底蕴',
      description: '作为文人雅士必修的技艺，古琴不仅是乐器，更承载着深厚的文化内涵...',
      tags: ['传统音乐', '文人雅集'],
      imageUrl: '/static/culture/art3.png',
      views: '8.7k',
      likes: '2.2k'
    }
  ],
  // 民间习俗
  custom: [
    {
      title: '婚礼习俗的地域特色',
      description: '从北方的热闹喜庆到南方的精细讲究，探索中国不同地区的传统婚礼习俗...',
      tags: ['婚嫁文化', '地域习俗'],
      imageUrl: '/static/culture/custom1.png',
      views: '19.5k',
      likes: '4.6k'
    },
    {
      title: '传统手工艺的保护与传承',
      description: '从剪纸、泥塑到刺绣、陶艺，了解中国传统手工艺的现状与未来...',
      tags: ['非遗保护', '民间工艺'],
      imageUrl: '/static/culture/custom2.png',
      views: '12.6k',
      likes: '3.3k'
    },
    {
      title: '祭祀礼仪的文化意义',
      description: '中国传统祭祀活动中的仪式、器物和习俗，反映了中华民族的文化价值观...',
      tags: ['礼仪文化', '民间信仰'],
      imageUrl: '/static/culture/custom3.png',
      views: '9.8k',
      likes: '2.4k'
    }
  ],
  // 建筑文化
  architecture: [
    {
      title: '故宫建筑的设计奥秘',
      description: '探索紫禁城的宫殿布局、结构特点和设计理念，了解古代建筑的智慧...',
      tags: ['宫殿建筑', '古代建筑'],
      imageUrl: '/static/culture/architecture1.png',
      views: '21.3k',
      likes: '5.2k'
    },
    {
      title: '苏州园林的美学价值',
      description: '通过假山、水系、植物和建筑的巧妙结合，营造出"咫尺之内，再现自然"的艺术境界...',
      tags: ['园林艺术', '江南文化'],
      imageUrl: '/static/culture/architecture2.png',
      views: '15.7k',
      likes: '3.9k'
    },
    {
      title: '中国古桥的工艺与艺术',
      description: '从赵州桥到卢沟桥，中国古桥不仅是交通枢纽，更是工艺和艺术的结晶...',
      tags: ['古代建筑', '工程技术'],
      imageUrl: '/static/culture/architecture3.png',
      views: '11.6k',
      likes: '2.8k'
    }
  ],
  // 饮食文化
  food: [
    {
      title: '中国八大菜系的特点',
      description: '从鲁菜的咸香到川菜的麻辣，了解中国不同菜系的历史渊源和烹饪特色...',
      tags: ['美食文化', '地域饮食'],
      imageUrl: '/static/culture/food1.png',
      views: '25.4k',
      likes: '6.1k'
    },
    {
      title: '茶文化与茶道精神',
      description: '茶不仅是饮品，更是中国人生活美学和精神追求的体现，探索茶道背后的文化意蕴...',
      tags: ['茶文化', '生活美学'],
      imageUrl: '/static/culture/food2.png',
      views: '18.2k',
      likes: '4.7k'
    },
    {
      title: '传统节气与饮食养生',
      description: '二十四节气对应的传统饮食习惯，体现了中国古人的养生智慧和对自然的敬畏...',
      tags: ['节气文化', '养生饮食'],
      imageUrl: '/static/culture/food3.png',
      views: '14.9k',
      likes: '3.6k'
    }
  ],
  // 服饰文化
  clothing: [
    {
      title: '汉服的历史演变',
      description: '从先秦到明朝，汉服的款式变化与设计特点，反映了不同时期的审美观念...',
      tags: ['传统服饰', '历史文化'],
      imageUrl: '/static/culture/clothing1.png',
      views: '17.6k',
      likes: '4.5k'
    },
    {
      title: '旗袍的文化符号',
      description: '作为中国女性服饰的代表，旗袍的设计元素和文化内涵，展现了东方女性的独特魅力...',
      tags: ['传统服饰', '文化符号'],
      imageUrl: '/static/culture/clothing2.png',
      views: '16.3k',
      likes: '4.1k'
    },
    {
      title: '少数民族服饰的特色',
      description: '从蒙古族的长袍到藏族的藏袍，少数民族服饰中的材质、色彩和图案所蕴含的文化意义...',
      tags: ['民族服饰', '多元文化'],
      imageUrl: '/static/culture/clothing3.png',
      views: '13.8k',
      likes: '3.4k'
    }
  ]
})

// 当前显示的知识列表
const knowledgeList = computed(() => {
  const categoryId = categories.value[currentCategory.value].id
  return allKnowledgeData[categoryId] || []
})

// 实际显示列表（搜索结果或常规分类内容）
const displayList = computed(() => {
  return isSearchMode.value ? searchResults.value : knowledgeList.value
})

// 搜索处理
const handleSearch = () => {
  if (!searchValue.value.trim()) {
    uni.showToast({
      title: '请输入搜索内容',
      icon: 'none'
    })
    return
  }
  
  const keyword = searchValue.value.toLowerCase().trim()
  const results = []
  
  // 搜索所有分类的数据
  Object.values(allKnowledgeData).forEach(categoryItems => {
    categoryItems.forEach(item => {
      if (
        item.title.toLowerCase().includes(keyword) || 
        item.description.toLowerCase().includes(keyword) ||
        item.tags.some(tag => tag.toLowerCase().includes(keyword))
      ) {
        results.push(item)
      }
    })
  })
  
  // 更新搜索状态和结果
  isSearchMode.value = true
  searchResults.value = results
  
  // 根据搜索结果提供反馈
  if (results.length > 0) {
    uni.showToast({
      title: `找到${results.length}个结果`,
      icon: 'none'
    })
  } else {
    uni.showToast({
      title: '未找到相关内容',
      icon: 'none'
    })
  }
}

// 重置搜索
const resetSearch = () => {
  searchValue.value = ''
  isSearchMode.value = false
  searchResults.value = []
  
  // 如果是从其他页面返回，可能需要恢复之前的分类选择
  if (currentCategory.value !== 0) {
    // 触发一次分类切换的动画反馈
    uni.showLoading({
      title: '加载中'
    })
    setTimeout(() => {
      uni.hideLoading()
    }, 300)
  }
}

// 高亮搜索关键词（用于将来扩展）
const highlightKeyword = (text, keyword) => {
  if (!keyword || !text) return text
  const regex = new RegExp(`(${keyword})`, 'gi')
  return text.replace(regex, '<span class="highlight">$1</span>')
}

// 切换分类
const changeCategory = (index) => {
  currentCategory.value = index
  // 如果在搜索模式下切换分类，退出搜索模式
  if (isSearchMode.value) {
    resetSearch()
  }
  
  // 切换分类时，加载提示
  uni.showLoading({
    title: '加载中'
  })
  
  // 模拟加载数据的延迟
  setTimeout(() => {
    uni.hideLoading()
  }, 300)
}

// 下拉刷新
const onRefresh = () => {
  isRefreshing.value = true
  
  // 模拟刷新当前分类的数据
  setTimeout(() => {
    if (isSearchMode.value) {
      // 如果在搜索模式下刷新，重新执行搜索
      handleSearch()
    } else {
      // 这里可以实现真正的数据刷新逻辑
      // 例如：重新从服务器获取数据，或者更新本地缓存
    }
    
    // 刷新完成
    isRefreshing.value = false
    uni.showToast({
      title: '刷新成功',
      icon: 'success'
    })
  }, 1000)
}

// 加载更多
const loadMore = () => {
  if (loadMoreStatus.value === 'noMore' || isLoading.value) return
  
  isLoading.value = true
  loadMoreStatus.value = 'loading'
  
  // 模拟加载更多数据
  setTimeout(() => {
    // 这里可以实现加载更多数据的逻辑
    // 例如：根据页码获取下一页数据，并添加到当前列表中
    
    // 模拟已加载全部数据
    loadMoreStatus.value = 'noMore'
    isLoading.value = false
    
    uni.showToast({
      title: '已加载全部内容',
      icon: 'none'
    })
  }, 1000)
}

// 跳转到专题详情
const goToSpecial = (item) => {
  uni.navigateTo({
    url: `/pages/culture/special?title=${encodeURIComponent(item.title)}`
  })
}

// 跳转到知识详情
const goToDetail = (item) => {
  uni.navigateTo({
    url: `/pages/culture/detail?title=${encodeURIComponent(item.title)}`
  })
}

// 分享知识
const shareKnowledge = (item) => {
  uni.showActionSheet({
    itemList: ['分享到微信', '分享到朋友圈', '复制链接'],
    success: (res) => {
      uni.showToast({
        title: '分享成功',
        icon: 'success'
      })
    }
  })
}
</script>

<style scoped>
.culture-container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #9d7b56, #e7b57f);
}

.search-box {
  padding: 20rpx;
  
  position: sticky;
  top: 0;
  z-index: 100;
}

.search-info {
  display: flex;
  justify-content: space-between;
  padding: 16rpx 30rpx;
  background-color: #f0f8ff;
  font-size: 24rpx;
  color: #666;
}

.reset-link {
  color: #1677ff;
}

.no-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100rpx 0;
}

.no-result image {
  width: 200rpx;
  height: 200rpx;
  margin-bottom: 30rpx;
}

.no-result text {
  font-size: 30rpx;
  color: #333;
}

.no-result .sub-text {
  font-size: 24rpx;
  color: #999;
  margin-top: 10rpx;
}

.nav-scroll {
  
  padding: 20rpx 0;
  white-space: nowrap;
}

.nav-list {
  display: flex;
  padding: 0 20rpx;
}

.nav-item {
  padding: 10rpx 30rpx;
  margin-right: 20rpx;
  background-color: #f0f0f0;
  border-radius: 100rpx;
  font-size: 28rpx;
  color: #666;
}

.nav-item.active {
  background-color: #d81e06;
  color: #fff;
}

.content-scroll {
  height: calc(100vh - 200rpx);
}

.special-section {
  padding: 20rpx;
  background-color: #fff;
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.special-scroll {
  white-space: nowrap;
}

.special-list {
  display: flex;
  padding: 10rpx 0;
}

.special-item {
  width: 300rpx;
  margin-right: 20rpx;
  border-radius: 16rpx;
  overflow: hidden;
  position: relative;
}

.special-item image {
  width: 100%;
  height: 200rpx;
}

.special-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx;
  color: #fff;
  font-size: 28rpx;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
}

.knowledge-list {
  padding: 20rpx;
}

.knowledge-item {
  background-color: #fff;
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
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.desc {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.tags {
  margin-top: 16rpx;
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
}

.tag {
  font-size: 24rpx;
  color: #d81e06;
  background-color: rgba(216, 30, 6, 0.1);
  padding: 4rpx 16rpx;
  border-radius: 100rpx;
}

.knowledge-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20rpx;
  padding-top: 20rpx;
  border-top: 1rpx solid #f0f0f0;
}

.stats {
  display: flex;
  gap: 30rpx;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 6rpx;
  font-size: 24rpx;
  color: #666;
}

.share-btn {
  font-size: 24rpx;
  color: #666;
  background-color: #f5f5f5;
  border: none;
}

.loading-more {
  padding: 20rpx 0;
  text-align: center;
}

.no-more {
  padding: 30rpx 0;
  text-align: center;
}

.highlight {
  color: #d81e06;
  font-weight: bold;
}

/* 点击效果 */
.nav-item:active,
.special-item:active,
.knowledge-item:active {
  opacity: 0.8;
  transform: scale(0.98);
  transition: all 0.2s;
}
</style>