<template>
	<view class="container">
		<!-- Logo区域 -->
		<view class="logo-container">
			<text class="slogan">开启你的精彩之旅</text>
		</view>

		<!-- 表单区域 -->
		<view class="form-container">
			<view class="form-group">
				<text class="label">账号</text>
				<view class="input-wrapper">
					<input type="text" class="input" placeholder="请输入账号" v-model="formData.username" maxlength="10"
						@input="handleUsernameInput" />
				</view>
			</view>

			<view class="form-group">
				<text class="label">密码</text>
				<view class="input-wrapper password-wrapper">
					<input :type="passwordType" class="input" placeholder="请输入密码" v-model="formData.password" />
					<view class="password-toggle" @click="togglePasswordVisibility">
						<text class="icon">{{ showPassword ? '👁️' : '👁️‍🗨️' }}</text>
					</view>
				</view>
			</view>

			<!-- 忘记密码 -->
			<view class="forgot-password">
				<text @click="navigateToForgotPassword">忘记密码?</text>
			</view>

			<!-- 登录按钮 -->
			<view class="button-container">
				<button class="login-button" @click="handleLogin">登录</button>
			</view>

			<!-- 注册按钮 -->
			<view class="register-container">
				<text @click="navigateToRegister">用户注册</text>
			</view>
		</view>

		<!-- 底部装饰 -->
		<view class="bottom-decoration"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					username: '',
					password: ''
				},
				showPassword: false,
				passwordType: 'password'
			}
		},
		methods: {
			// 处理用户名输入
			handleUsernameInput(e) {
				// 限制只能输入字母和数字
				const value = e.detail.value.replace(/[^a-zA-Z0-9]/g, '')
				this.formData.username = value
			},

			// 切换密码可见性
			togglePasswordVisibility() {
				this.showPassword = !this.showPassword
				this.passwordType = this.showPassword ? 'text' : 'password'
			},

			// 处理登录
			handleLogin() {
				// 表单验证
				if (!this.formData.username) {
					uni.showToast({
						title: '请输入账号',
						icon: 'none'
					})
					return
				}

				if (!this.formData.password) {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					})
					return
				}

				// 模拟API请求
				uni.showLoading({
					title: '登录中...'
				})

				// 这里使用setTimeout模拟网络请求
				setTimeout(() => {
					uni.hideLoading()

					// 默认账号密码验证
					if (this.formData.username === 'admin' && this.formData.password === '123456') {
						uni.showToast({
							title: '登录成功',
							icon: 'success'
						})

						// 登录成功后跳转到首页
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/home/home' // 这里需要替换为实际的首页路径
							})
						}, 1500)
					} else {
						uni.showToast({
							title: '账号或密码错误',
							icon: 'none'
						})
					}
				}, 1000)
			},

			// 跳转到忘记密码页面
			navigateToForgotPassword() {
				uni.navigateTo({
					url: '/pages/login/forgot' // 这里需要替换为实际的忘记密码页面路径
				})
			},

			// 跳转到注册页面
			navigateToRegister() {
				uni.navigateTo({
					url: '/pages/login/register'
				})
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

	.logo-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 100rpx;
		margin-bottom: 50rpx;
	}



	.slogan {
		font-size: 60rpx;
		color: #fff;
		margin-top: 200rpx;
		text-shadow: 0 0 10rpx rgba(0, 0, 0, 0.3);
		animation: fadeIn 2s ease-out;
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

	.label {
		display: block;
		margin-bottom: 15rpx;
		font-size: 30rpx;
		color: #333;
		font-weight: bold;
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

	.input {
		flex: 1;
		height: 100%;
		font-size: 30rpx;
	}

	.password-wrapper {
		padding-right: 90rpx;
	}

	.password-toggle {
		position: absolute;
		right: 35rpx;
		top: 50%;
		transform: translateY(-50%);
		width: 45rpx;
		height: 45rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.forgot-password {
		text-align: right;
		margin-top: 25rpx;
		margin-bottom: 70rpx;
	}

	.forgot-password text {
		font-size: 26rpx;
		color: #165DFF;
		text-decoration: underline;
		transition: color 0.3s ease;
	}

	.forgot-password text:hover {
		color: #0d3d91;
	}

	.button-container {
		margin-bottom: 40rpx;
	}

	.login-button {
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

	.login-button:hover {
		background-color: #b58b5a;
	}

	.register-container {
		text-align: center;
	}

	.register-container text {
		font-size: 30rpx;
		color: #165DFF;
		text-decoration: underline;
		transition: color 0.3s ease;
	}

	.register-container text:hover {
		color: #0d3d91;
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