<template>
  <view class="container">
    
    <!-- 标题 -->
    <view class="title-container">
      <text class="title">用户注册</text>
    </view>

    <!-- 表单区域 -->
    <view class="form-container">
      <view class="form-group">
        <view class="input-wrapper">
          <text class="input-icon"><i class="fa fa-user"></i></text>
          <input 
            type="text" 
            class="input" 
            placeholder="请输入账号" 
            v-model="formData.username" 
            @input="handleUsernameInput"
            maxlength="10"
          />
        </view>
        <view class="error-message" v-if="errors.username">{{ errors.username }}</view>
      </view>

      <view class="form-group">
        <view class="input-wrapper">
          <text class="input-icon"><i class="fa fa-id-card"></i></text>
          <input 
            type="text" 
            class="input" 
            placeholder="请输入姓名" 
            v-model="formData.name" 
            @input="handleNameInput"
            maxlength="12"
          />
        </view>
        <view class="error-message" v-if="errors.name">{{ errors.name }}</view>
      </view>

      <view class="form-group">
        <view class="input-wrapper">
          <text class="input-icon"><i class="fa fa-phone"></i></text>
          <input 
            type="number" 
            class="input" 
            placeholder="请输入手机号" 
            v-model="formData.phone" 
            maxlength="11"
          />
        </view>
        <view class="error-message" v-if="errors.phone">{{ errors.phone }}</view>
      </view>

      <view class="form-group">
        <view class="input-wrapper">
          <text class="input-icon"><i class="fa fa-envelope"></i></text>
          <input 
            type="text" 
            class="input" 
            placeholder="请输入邮箱" 
            v-model="formData.email" 
          />
        </view>
        <view class="error-message" v-if="errors.email">{{ errors.email }}</view>
      </view>

      <view class="form-group">
        <view class="input-wrapper">
          <text class="input-icon"><i class="fa fa-lock"></i></text>
          <input 
            type="password" 
            class="input" 
            placeholder="请输入密码" 
            v-model="formData.password" 
            @input="handlePasswordInput"
          />
        </view>
        <view class="error-message" v-if="errors.password">{{ errors.password }}</view>
      </view>

      <view class="form-group">
        <view class="input-wrapper">
          <text class="input-icon"><i class="fa fa-lock"></i></text>
          <input 
            type="password" 
            class="input" 
            placeholder="请确认密码" 
            v-model="formData.confirmPassword" 
          />
        </view>
        <view class="error-message" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</view>
      </view>

      <!-- 注册按钮 -->
      <view class="button-container">
        <button 
          class="register-button" 
          @click="handleRegister"
        >提交</button>
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
        name: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      errors: {}
    }
  },
  methods: {
    // 处理账号输入
    handleUsernameInput(e) {
      // 限制只能输入字母和数字
      const value = e.detail.value.replace(/[^a-zA-Z0-9]/g, '')
      this.formData.username = value
    },
    
    // 处理姓名输入
    handleNameInput(e) {
      // 限制只能输入字母和数字
      const value = e.detail.value.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '')
      this.formData.name = value
    },
    
    // 处理密码输入
    handlePasswordInput(e) {
      // 限制只能输入字母和数字
      const value = e.detail.value.replace(/[^a-zA-Z0-9]/g, '')
      this.formData.password = value
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
      
      // 验证姓名
      if (!this.formData.name) {
        errors.name = '姓名不能为空'
        isValid = false
      } else if (this.formData.name.length > 12) {
        errors.name = '姓名长度不能超过12位'
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
      
      // 验证邮箱
      if (!this.formData.email) {
        errors.email = '邮箱不能为空'
        isValid = false
      } else if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.formData.email)) {
        errors.email = '请输入有效的邮箱'
        isValid = false
      }
      
      // 验证密码
      if (!this.formData.password) {
        errors.password = '密码不能为空'
        isValid = false
      } else if (this.formData.password.length < 6 || this.formData.password.length > 10) {
        errors.password = '密码长度必须为6-10位'
        isValid = false
      }
      
      // 验证确认密码
      if (!this.formData.confirmPassword) {
        errors.confirmPassword = '请确认密码'
        isValid = false
      } else if (this.formData.confirmPassword !== this.formData.password) {
        errors.confirmPassword = '两次输入的密码不一致'
        isValid = false
      }
      
      this.errors = errors
      return isValid
    },
    
    // 处理注册
    handleRegister() {
      // 验证表单
      if (!this.validateForm()) {
        return
      }
      
      // 模拟API请求
      uni.showLoading({
        title: '注册中...'
      })
      
      // 这里使用setTimeout模拟网络请求
      setTimeout(() => {
        uni.hideLoading()
        
        // 模拟注册成功
        uni.showToast({
          title: '注册成功',
          icon: 'success'
        })
        
        // 注册成功后跳转到登录页面
        setTimeout(() => {
          uni.navigateBack({
            delta: 1
          })
        }, 1500)
      }, 1000)
    },
    
    // 返回上一页
    navigateBack() {
      uni.navigateBack({
        delta: 1
      })
    }
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: 'ChineseFont';
  src: url('path/to/your/chinese-font.ttf'); /* 替换为实际的中文字体文件路径 */
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
  font-weight: bold;
  color: #fff; /* 采用中国传统的棕色 */
  text-shadow: 0 0 10rpx rgba(255, 255, 255, 0.3);
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

.error-message {
  color: #F53F3F;
  font-size: 24rpx;
  padding-left: 90rpx;
  margin-top: 10rpx;
}

.button-container {
  margin-bottom: 40rpx;
}

.register-button {
  width: 100%;
  height: 98rpx;
  line-height: 98rpx;
  background-color: #c69c6d; /* 采用中国传统的棕色 */
  color: #fff;
  border-radius: 49rpx;
  font-size: 34rpx;
  box-shadow: 0 0 15rpx rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}

.register-button:hover {
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