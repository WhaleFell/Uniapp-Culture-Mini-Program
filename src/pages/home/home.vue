<template>
	<view class="home-container">
		<!-- 顶部轮播图 -->
		<uni-swiper-dot :info="bannerList" :current="current" field="content" :mode="mode">
			<swiper class="banner" circular :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
				@change="change">
				<swiper-item v-for="(item, index) in bannerList" :key="index">
					<image :src="item.url" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>

		<!-- 文化分类导航 -->
		<view class="nav-section">
			<view class="nav-row">
				<view class="nav-item" v-for="(item, index) in navList" :key="index" @click="navigateTo(index)">
					<uni-icons :type="item.icon" size="30" :color="item.color"></uni-icons>
					<text class="text">{{ item.name }}</text>
				</view>
			</view>
		</view>

		<!-- 推荐内容 -->
		<view class="recommend-section">
			<view class="section-title">精选推荐</view>
			<view class="recommend-list">
				<view class="recommend-item" v-for="(item, index) in recommendList" :key="index"
					@click="goToDetail(item)">
					<image :src="item.imageUrl" mode="aspectFill" class="item-image"></image>
					<view class="item-info">
						<text class="item-title">{{ item.title }}</text>
						<text class="item-desc">{{ item.description }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'

	const current = ref(0)
	const mode = ref('dot')

	// 轮播图数据
	const bannerList = ref([{
			url: '/static/banner/banner1.jpg',
			content: '传统文化展览'
		},
		{
			url: '/static/banner/banner2.jpg',
			content: '非遗传承活动'
		},
		{
			url: '/static/banner/banner3.jpg',
			content: '民俗文化节'
		}
	])

	// 导航菜单数据
	const navList = ref([{
			name: '非遗文化',
			icon: 'star-filled',
			path: '/pages/feiyi/feiyi',
			color: '#ff6b6b'
		},
		{
			name: '传统艺术',
			icon: 'hand-up-filled',
			path: '/pages/art/art',
			color: '#4ecdc4'
		},
		{
			name: '民俗活动',
			icon: 'flag-filled',
			path: '/pages/folk/folk',
			color: '#45b7d1'
		},
		{
			name: '文化展览',
			icon: 'calendar-filled',
			path: '/pages/exhibition/exhibition',
			color: '#96ceb4'
		}
	])

	// 推荐内容数据
	const recommendList = ref([{
			id: 1,
			imageUrl: '/static/recommend/item1.jpg',
			title: '京剧艺术',
			description: '中国传统戏曲艺术的瑰宝'
		},
		{
			id: 2,
			imageUrl: '/static/recommend/item2.jpg',
			title: '剪纸技艺',
			description: '传统手工艺术的精髓'
		},
		{
			id: 3,
			imageUrl: '/static/recommend/item3.jpg',
			title: '中国茶道',
			description: '茶文化的传承与发展'
		}
	])

	// 轮播图切换事件
	const change = (e) => {
		current.value = e.detail.current
	}

	// 导航跳转方法
	const navigateTo = (index) => {
		const item = navList.value[index]
		uni.navigateTo({
			url: item.path
		})
	}

	// 推荐内容详情跳转方法
	const goToDetail = (item) => {
		uni.navigateTo({
			url: `/pages/detail/detail?id=${item.id}&title=${encodeURIComponent(item.title)}`
		})
	}
</script>

<style scoped>
	.home-container {
		min-height: 100vh;
		background: linear-gradient(to bottom, #9d7b56, #e7b57f);
	}

	/* 轮播图样式 */
	.banner {
		width: 100%;
		height: 400rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
	}

	.banner image {
		width: 100%;
		height: 100%;
		border-radius: 0 0 20rpx 20rpx;
	}

	/* 导航菜单样式 */
	.nav-section {
		margin: 20rpx;
		padding: 20rpx;
		background-color: #ffffff;
		border-radius: 16rpx;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
	}

	.nav-row {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20rpx;
	}

	.nav-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40rpx 0;
		border-radius: 12rpx;
		transition: all 0.3s;
		position: relative;
		overflow: hidden;
	}

	.nav-item:nth-child(1) {
		background-color: rgba(255, 107, 107, 0.1);
	}

	.nav-item:nth-child(2) {
		background-color: rgba(78, 205, 196, 0.1);
	}

	.nav-item:nth-child(3) {
		background-color: rgba(69, 183, 209, 0.1);
	}

	.nav-item:nth-child(4) {
		background-color: rgba(150, 206, 180, 0.1);
	}

	.nav-item::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent);
		transform: translateX(-100%);
		transition: 0.3s;
	}

	.nav-item:active::after {
		transform: translateX(100%);
	}

	.nav-item:active {
		transform: scale(0.98);
	}

	.nav-item .text {
		font-size: 28rpx;
		color: #333333;
		margin-top: 16rpx;
		font-weight: 500;
	}

	/* 推荐内容样式 */
	.recommend-section {
		margin: 20rpx;
		padding: 20rpx;
		background-color: #ffffff;
		border-radius: 16rpx;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
	}

	.section-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 20rpx;
		padding-left: 20rpx;
		border-left: 4rpx solid #d81e06;
	}

	.recommend-list {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}

	.recommend-item {
		display: flex;
		gap: 20rpx;
		padding: 20rpx;
		background-color: #f8f8f8;
		border-radius: 12rpx;
	}

	.item-image {
		width: 200rpx;
		height: 150rpx;
		border-radius: 8rpx;
	}

	.item-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.item-title {
		font-size: 30rpx;
		font-weight: 500;
		color: #333;
	}

	.item-desc {
		font-size: 26rpx;
		color: #666;
		line-height: 1.4;
	}

	/* 点击效果 */
	.recommend-item:active {
		transform: scale(0.98);
		transition: transform 0.2s;
	}
</style>