<template>
  <div>

    <el-container>
      <el-header class="bg">XXX管理系统</el-header>

      <el-main class="head">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号" prop="username">
            <el-input v-model.number="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" class="btn">登录</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>

  </div>
</template>

<script>
// import axios from 'axios';

export default {
  // 这里引入context是上下文参数，代替了this，
  // 因为在asyncData方法是在组件初始化时调用，所以没法通过this来引用组件实例对象。
  // asyncData(context) {
  //   return context.$axios.get(`/json/testLogin.json`)
  //     .then(res => {
  //     //获取到内容
  //     console.log(res.data);
  //     //赋值
  //     return {txt:res.data};
  //    })
  // },

  //如何同时发起多个请求,如果通过接收route的参数，发送带参数的请求
  // async asyncData ({params,$axios}) {
  //   //这里有几个巨坑的地方 这里的params 就是指route.params
  //   //这里的store就是指 $store,?id=${params.id}
  //   let res = await $axios.get(`/json/testLogin.json`);
  //   return {
  //     data: res.data
  //   }
  // },

  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'));
      }
      setTimeout(() => {
        callback();
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        username: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        username: [
          { validator: checkAge, trigger: 'blur' }
        ]
      },

    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = this.ruleForm;
          console.log(obj.username, obj.pass)
          console.log(this.ruleForm.username, this.ruleForm.pass)
          this.getLogin(obj);
          // alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getLogin(obj) {
      return this.$axios.get(`/json/testLogin.json`, {
        params:{
          email: obj.username,
          password: obj.pass
        }
      })
        .then(res => {
        //获取到内容
        console.log(res.data);
        //赋值
        return {txt:res.data};
       })
    },
  }
}
</script>

<style scoped>
.head{
  position: absolute;
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bg{
  background-color: #409EFF;
  color: #FFFFFF;
}

.btn{
  width: 100%;
}
</style>
