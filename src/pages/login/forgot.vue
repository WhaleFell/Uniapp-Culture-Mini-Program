<template>
	<view class="container">
		<!-- 标题 -->
		<view class="title-container">
			<text class="title">找回密码</text>
		</view>

		<!-- 表单区域 -->
		<view class="form-container">
			<view class="form-group">
				<view class="input-wrapper">
					<text class="input-icon"><i class="fa fa-user"></i></text>
					<input type="text" class="input" placeholder="请输入账号" v-model="formData.username" />
				</view>
				<view class="error-message" v-if="errors.username">{{ errors.username }}</view>
			</view>

			<view class="form-group">
				<view class="input-wrapper">
					<text class="input-icon"><i class="fa fa-phone"></i></text>
					<input type="number" class="input" placeholder="请输入手机号" v-model="formData.phone" />
					<button class="get-code-btn" @click="getVerificationCode">获取验证码</button>
				</view>
				<view class="error-message" v-if="errors.phone">{{ errors.phone }}</view>
			</view>

			<view class="form-group">
				<view class="input-wrapper">
					<text class="input-icon"><i class="fa fa-key"></i></text>
					<input type="number" class="input" placeholder="请输入验证码" v-model="formData.verificationCode" />
				</view>
				<view class="error-message" v-if="errors.verificationCode">{{ errors.verificationCode }}</view>
			</view>

			<view class="form-group">
				<view class="input-wrapper">
					<text class="input-icon"><i class="fa fa-lock"></i></text>
					<input type="password" class="input" placeholder="请输入新密码" v-model="formData.newPassword" />
				</view>
				<view class="error-message" v-if="errors.newPassword">{{ errors.newPassword }}</view>
			</view>

			<view class="form-group">
				<view class="input-wrapper">
					<text class="input-icon"><i class="fa fa-lock"></i></text>
					<input type="password" class="input" placeholder="请确认新密码" v-model="formData.confirmPassword" />
				</view>
				<view class="error-message" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</view>
			</view>

			<!-- 提交按钮 -->
			<view class="button-container">
				<button class="submit-button" @click="resetPassword">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					username: '',
					phone: '',
					verificationCode: '',
					newPassword: '',
					confirmPassword: ''
				},
				errors: {},
				countdown: 0,
				timer: null
			}
		},
		methods: {
			// 获取验证码
			getVerificationCode() {
				// 验证账号
				if (!this.formData.username) {
					this.errors.username = '请输入账号'
					return
				}

				// 验证手机号
				if (!this.formData.phone) {
					this.errors.phone = '请输入手机号'
					return
				} else if (!/^1[3|5|7|8]\d{9}$/.test(this.formData.phone)) {
					this.errors.phone = '请输入有效的手机号'
					return
				}

				// 清除错误提示
				this.errors = {}

				// 开始倒计时
				this.countdown = 60
				this.timer = setInterval(() => {
					this.countdown--
					if (this.countdown <= 0) {
						clearInterval(this.timer)
					}
				}, 1000)

				// 模拟发送验证码
				uni.showToast({
					title: '验证码已发送，请注意查收',
					icon: 'none'
				})
			},

			// 重置密码
			resetPassword() {
				// 验证表单
				if (!this.validateForm()) {
					return
				}

				// 模拟API请求
				uni.showLoading({
					title: '重置密码中...'
				})

				// 这里使用setTimeout模拟网络请求
				setTimeout(() => {
					uni.hideLoading()

					// 模拟重置成功
					uni.showToast({
						title: '密码重置成功，请使用新密码登录',
						icon: 'success'
					})

					// 重置成功后跳转到登录页面
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1500)
				}, 1000)
			},

			// 表单验证
			validateForm() {
				const errors = {}
				let isValid = true

				// 验证账号
				if (!this.formData.username) {
					errors.username = '账号不能为空'
					isValid = false
				}

				// 验证手机号
				if (!this.formData.phone) {
					errors.phone = '手机号不能为空'
					isValid = false
				} else if (!/^1[3|5|7|8]\d{9}$/.test(this.formData.phone)) {
					errors.phone = '请输入有效的手机号'
					isValid = false
				}

				// 验证验证码
				if (!this.formData.verificationCode) {
					errors.verificationCode = '验证码不能为空'
					isValid = false
				}

				// 验证新密码
				if (!this.formData.newPassword) {
					errors.newPassword = '新密码不能为空'
					isValid = false
				} else if (this.formData.newPassword.length < 6 || this.formData.newPassword.length > 10) {
					errors.newPassword = '密码长度必须为6-10位'
					isValid = false
				}

				// 验证确认密码
				if (!this.formData.confirmPassword) {
					errors.confirmPassword = '请确认新密码'
					isValid = false
				} else if (this.formData.confirmPassword !== this.formData.newPassword) {
					errors.confirmPassword = '两次输入的密码不一致'
					isValid = false
				}

				this.errors = errors
				return isValid
			},

			// 返回上一页
			navigateBack() {
				if (this.timer) {
					clearInterval(this.timer)
				}
				uni.navigateBack({
					delta: 1
				})
			}
		},
		beforeDestroy() {
			// 组件销毁前清除定时器
			if (this.timer) {
				clearInterval(this.timer)
			}
		}
	}
</script>

<style lang="scss">
	@font-face {
		font-family: 'ChineseFont';
		src: url('path/to/your/chinese-font.ttf');
		/* 替换为实际的中文字体文件路径 */
	}

	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		padding: 0 30rpx;
		/* 修改为红到黄的渐变色 */
		background: linear-gradient(to bottom, #9d7b56, #e7b57f);
		font-family: 'ChineseFont', sans-serif;
		position: relative;
		overflow: hidden;
	}



	.title-container {
		text-align: center;
		margin-top: 100rpx;
		margin-bottom: 80rpx;

	}

	.title {
		font-size: 60rpx;
		color: #fff;
		margin-top: 200rpx;
		text-shadow: 0 0 10rpx rgba(0, 0, 0, 0.3);

		font-weight: bold;


	}

	.form-container {
		margin: 0 auto;
		padding: 40rpx;
		background-color: rgba(255, 255, 255, 0.8);
		border-radius: 30rpx;
		backdrop-filter: blur(20rpx);
		box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.2);
		width: 80%;
		animation: fadeInUp 1.8s ease-out;
	}

	.form-group {
		margin-bottom: 50rpx;
	}

	.input-wrapper {
		position: relative;
		height: 90rpx;
		border-radius: 45rpx;
		background-color: #fff;
		padding: 0 35rpx;
		display: flex;
		align-items: center;
		border: 2rpx solid #ccc;
		box-shadow: 0 0 15rpx rgba(0, 0, 0, 0.1);
		transition: border-color 0.3s ease;
	}

	.input-wrapper:focus-within {
		border-color: #c69c6d;
	}

	.input-icon {
		width: 40rpx;
		text-align: center;
		margin-right: 20rpx;
		color: #999;
	}

	.input {
		flex: 1;
		height: 100%;
		font-size: 30rpx;
	}

	.get-code-btn {
		position: absolute;
		right: 10rpx;
		height: 60rpx;
		line-height: 60rpx;
		padding: 0 20rpx;
		background-color: #c69c6d;
		/* 采用中国传统的棕色 */
		color: #fff;
		border-radius: 30rpx;
		font-size: 24rpx;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.2);
		transition: background-color 0.3s ease;
	}

	.get-code-btn:hover {
		background-color: #b58b5a;
	}

	.error-message {
		color: #F53F3F;
		font-size: 24rpx;
		padding-left: 90rpx;
		margin-top: 10rpx;
	}

	.button-container {
		margin-bottom: 40rpx;
	}

	.submit-button {
		width: 100%;
		height: 98rpx;
		line-height: 98rpx;
		background-color: #c69c6d;
		/* 采用中国传统的棕色 */
		color: #fff;
		border-radius: 49rpx;
		font-size: 34rpx;
		box-shadow: 0 0 15rpx rgba(0, 0, 0, 0.2);
		transition: background-color 0.3s ease;
	}

	.submit-button:hover {
		background-color: #b58b5a;
	}

	.bottom-decoration {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 200rpx;
		background: linear-gradient(to top, rgba(255, 255, 255, 0.2), transparent);
		border-top-left-radius: 50%;
		border-top-right-radius: 50%;
		animation: fadeInUp 1.5s ease-out;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(50rpx);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}
</style>