<template>
    <view class="publish-container">
        <!-- 顶部导航栏 -->
        <view class="nav-header">
            <view class="left-btn" @tap="goBack">取消</view>
            <view class="title">发布动态</view>
            <view class="right-btn" @tap="submitPost">发布</view>
        </view>

        <!-- 内容区域 -->
        <scroll-view  class="content-scroll" scroll-y>
            <!-- 标题输入框 -->
            <view class="input-section">
                <input class="title-input" v-model="postTitle" placeholder="输入标题（选填）" maxlength="50" />
                <text class="count">{{postTitle.length}}/50</text>
            </view>

            <!-- 内容输入框 -->
            <view class="input-section content-section">
                <textarea class="content-input" v-model="postContent" placeholder="分享你的文化体验、见解或创意..." maxlength="2000"
                    auto-height />
                <text class="count">{{postContent.length}}/2000</text>
            </view>

            <!-- 图片上传 -->
            <view class="upload-section">
                <view class="image-grid">
                    <view class="image-item" v-for="(image, index) in uploadedImages" :key="index">
                        <image :src="image" mode="aspectFill"></image>
                        <view class="delete-icon" @tap="removeImage(index)">
                            <uni-icons type="close" size="20" color="#fff"></uni-icons>
                        </view>
                    </view>
                    <view class="upload-btn" @tap="chooseImage" v-if="uploadedImages.length < 9">
                        <uni-icons type="plusempty" size="40" color="#ddd"></uni-icons>
                    </view>
                </view>
            </view>

            <!-- 话题标签 -->
            <view class="tags-section">
                <view class="section-title">
                    <text>话题标签</text>
                    <view class="add-tag-btn" @tap="showTagSelector">
                        <uni-icons type="plus" size="18" color="#666"></uni-icons>
                        <text>添加</text>
                    </view>
                </view>

                <view class="tags-list" v-if="selectedTags.length > 0">
                    <view class="tag-item" v-for="(tag, index) in selectedTags" :key="index">
                        <text>#{{tag}}</text>
                        <view class="remove-tag" @tap="removeTag(index)">
                            <uni-icons type="close" size="14" color="#666"></uni-icons>
                        </view>
                    </view>
                </view>

                <view class="current-topic" v-if="currentTopic && !selectedTags.includes(currentTopic)">
                    <text>当前话题: #{{currentTopic}}#</text>
                    <button size="mini" @tap="addCurrentTopic">添加</button>
                </view>
            </view>

            <!-- 位置信息 -->
            <view class="location-section">
                <view class="section-title">
                    <text>位置信息</text>
                    <switch @change="toggleLocation" :checked="enableLocation" color="#f00"></switch>
                </view>
                <view class="location-info" v-if="enableLocation">
                    <uni-icons type="location" size="16" color="#666"></uni-icons>
                    <text>{{ locationName || '获取位置中...' }}</text>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script>
import { ref, onMounted } from 'vue'; // 保留组合式 API 导入（如果需要）

export default {
    data() {
        return {
            currentTopic: '',
            postTitle: '',
            postContent: '',
            uploadedImages: [],
            selectedTags: [],
            enableLocation: false,
            locationName: ''
        };
    },
    mounted() {
        // 获取页面参数
        const pages = getCurrentPages();
        const currentPage = pages[pages.length - 1];
        const options = currentPage.options;

        if (options && options.topic) {
            this.currentTopic = decodeURIComponent(options.topic);
        }
    },
    methods: {
        // 返回上一页
        goBack() {
            // 如果用户已经输入了内容，提示是否保存草稿
            if (this.postContent || this.uploadedImages.length > 0) {
                uni.showModal({
                    title: '提示',
                    content: '是否保存为草稿？',
                    cancelText: '不保存',
                    confirmText: '保存',
                    success: (res) => {
                        if (res.confirm) {
                            this.saveDraft();
                        }
                        uni.navigateBack();
                    }
                });
            } else {
                uni.navigateBack();
            }
        },

        // 保存草稿
        saveDraft() {
            // 实际项目中可以保存到本地存储或发送到服务器
            const draft = {
                title: this.postTitle,
                content: this.postContent,
                images: this.uploadedImages,
                tags: this.selectedTags,
                timestamp: Date.now()
            };

            try {
                const drafts = uni.getStorageSync('post_drafts') || [];
                drafts.unshift(draft);
                uni.setStorageSync('post_drafts', drafts);
                uni.showToast({
                    title: '草稿已保存',
                    icon: 'success'
                });
            } catch (e) {
                uni.showToast({
                    title: '保存失败',
                    icon: 'none'
                });
            }
        },

        // 选择图片
        chooseImage() {
            uni.chooseImage({
                count: 9 - this.uploadedImages.length,
                sizeType: ['compressed'],
                sourceType: ['album', 'camera'],
                success: (res) => {
                    this.uploadedImages = [...this.uploadedImages, ...res.tempFilePaths];
                }
            });
        },

        // 移除图片
        removeImage(index) {
            this.uploadedImages.splice(index, 1);
        },

        // 显示标签选择器
        showTagSelector() {
            uni.showActionSheet({
                itemList: [
                    '传统文化创新',
                    '非遗传承',
                    '古风穿搭',
                    '文化美食',
                    '博物馆探索',
                    '文化遗产',
                    '手工艺',
                    '民族文化'
                ],
                success: (res) => {
                    const selectedTag = [
                        '传统文化创新',
                        '非遗传承',
                        '古风穿搭',
                        '文化美食',
                        '博物馆探索',
                        '文化遗产',
                        '手工艺',
                        '民族文化'
                    ][res.tapIndex];

                    if (!this.selectedTags.includes(selectedTag)) {
                        this.selectedTags.push(selectedTag);
                    }
                }
            });
        },

        // 移除标签
        removeTag(index) {
            this.selectedTags.splice(index, 1);
        },

        // 添加当前话题作为标签
        addCurrentTopic() {
            if (this.currentTopic && !this.selectedTags.includes(this.currentTopic)) {
                this.selectedTags.push(this.currentTopic);
            }
        },

        // 切换位置信息
        toggleLocation(e) {
            this.enableLocation = e.detail.value;

            if (this.enableLocation.value) {
                // 获取位置信息
                uni.getLocation({
                    type: 'gcj02',
                    success: (res) => {
                        // 使用经纬度获取位置名称
                        uni.chooseLocation({
                            latitude: res.latitude,
                            longitude: res.longitude,
                            success: (res) => {
                                this.locationName = res.name || res.address;
                            }
                        });
                    },
                    fail: () => {
                        uni.showToast({
                            title: '获取位置失败',
                            icon: 'none'
                        });
                        this.enableLocation = false;
                    }
                });
            } else {
                this.locationName = '';
            }
        },

        // 提交发布
        submitPost() {
            // 验证表单
            if (!this.postContent.trim()) {
                uni.showToast({
                    title: '内容不能为空',
                    icon: 'none'
                });
                return;
            }

            // 模拟发布过程
            uni.showLoading({
                title: '发布中...'
            });

            uni.hideLoading();
            uni.showToast({
                title: '发布成功',
                icon: 'success'
            });
            
            // 将发布的数据添加到全局的动态列表中
            // 注意：这里需要从 discover.vue 引入 posts 数组
            // 或者使用事件总线/状态管理
            const newPost = {
                userAvatar: '/static/discover/avatar1.jpg', // 假设用户头像
                userName: '当前用户', // 假设用户名
                postTime: '刚刚',
                isFollowed: false,
                content: this.postContent,
                images: this.uploadedImages,
                tags: this.selectedTags,
                likes: 0,
                comments: 0,
                isLiked: false
            };
            
            // 注意：这里需要正确引用全局的 posts 数组
            // 例如：通过事件总线触发更新
            // 或者使用 uni.$emit('updatePosts', newPost)
            uni.$emit('updatePosts', newPost);
            setTimeout(() => {
            	// 清空表单数据
            	this.postTitle = '';
            	this.postContent = '';
            	this.uploadedImages = [];
            	this.selectedTags = [];
            	this.enableLocation = false;
            	this.locationName = '';
            	uni.navigateBack()
            },1000)
        }
    }
};
</script>

<style scoped>
.publish-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #fff;
}

.nav-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx 30rpx;
    border-bottom: 1rpx solid #f0f0f0;
    background-color: #fff;
    position: sticky;
    top: 0;
    z-index: 100;
}

.left-btn,
.right-btn {
    font-size: 32rpx;
    padding: 10rpx;
}

.left-btn {
    color: #333;
}

.right-btn {
    color: #f00;
    font-weight: bold;
}

.title {
    font-size: 36rpx;
    font-weight: bold;
    color: #000;
}

.content-scroll {
    flex: 1;
    padding: 10rpx;
}

.input-section {
    position: relative;
    margin-bottom: 30rpx;
    width: 100%;
}

.title-input {
    width: 100%;
    font-size: 34rpx;
    padding: 20rpx 0;
    border-bottom: 1rpx solid #f0f0f0;
    color: #333;
}

.content-section {
    margin-top: 20rpx;
    padding-bottom: 20rpx;
    border-bottom: 1rpx solid #f0f0f0;
}

.content-input {
    width: 100%;
    font-size: 32rpx;
    line-height: 1.6;
    min-height: 200rpx;
    padding: 20rpx 0;
    color: #333;
}

.count {
    position: absolute;
    right: 20rpx;
    bottom: 0;
    font-size: 24rpx;
    color: #999;
}

.upload-section {
    margin: 30rpx 0 50rpx 0;
}

.image-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 15rpx;
    padding-top: 20rpx;
}

.image-item {
    position: relative;
    width: 220rpx;
    height: 220rpx;
    border-radius: 8rpx;
    overflow: hidden;
    border: 1px solid #f0f0f0;
}

.image-item image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.delete-icon {
    position: absolute;
    top: 6rpx;
    right: 6rpx;
    width: 36rpx;
    height: 36rpx;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.upload-btn {
    width: 220rpx;
    height: 220rpx;
    border: 1rpx dashed #ddd;
    border-radius: 8rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f9f9f9;
}

.section-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;
    font-size: 32rpx;
    color: #333;
    font-weight: 500;
}

.add-tag-btn {
    display: flex;
    align-items: center;
    font-size: 28rpx;
    color: #666;
}

.add-tag-btn text {
    margin-left: 10rpx;
    margin-right: 20rpx;
}

.tags-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20rpx;
    margin-bottom: 24rpx;
}

.tag-item {
    display: flex;
    align-items: center;
    background-color: #f5f5f5;
    padding: 12rpx 24rpx;
    border-radius: 30rpx;
    font-size: 28rpx;
    color: #333;
}

.remove-tag {
    margin-left: 10rpx;
    display: flex;
    align-items: center;
}

.current-topic {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f8f8f8;
    padding: 24rpx;
    border-radius: 8rpx;
    margin-bottom: 24rpx;
}

.current-topic text {
    font-size: 28rpx;
    color: #333;
}

.current-topic button {
    margin: 0;
    background-color: #f0f0f0;
    border: none;
    color: #333;
    font-size: 26rpx;
    padding: 0 24rpx;
    height: 56rpx;
    line-height: 56rpx;
    border-radius: 28rpx;
}

.location-section {
    margin: 40rpx 0 120rpx 0;
    /* 增加底部间距 */
}

.location-info {
    display: flex;
    align-items: center;
    gap: 10rpx;
    font-size: 28rpx;
    color: #666;
    margin-top: 16rpx;
    background-color: #f8f8f8;
    padding: 20rpx;
    border-radius: 8rpx;
}

.tags-section,
.location-section {
    margin-top: 40rpx;
    padding-top: 40rpx;
    border-top: 1rpx solid #f0f0f0;
}

/* 开关按钮样式覆盖 */
:deep(.uni-switch-input) {
    background-color: #f5f5f5 !important;
}

:deep(.uni-switch-input.uni-switch-input-checked) {
    background-color: #f00 !important;
}

/* 提高textarea的可点击区域 */
:deep(.uni-textarea-textarea) {
    width: 100%;
    min-height: 200rpx;
}

/* 改进占位符颜色 */
:deep(.uni-textarea-placeholder),
:deep(.uni-input-placeholder) {
    color: #bbb;
}
</style>