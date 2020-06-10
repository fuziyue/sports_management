<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="8"><div class="grid-content bg-purple">体育赛事管理系统</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">欢迎：admin超级管理员</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"><el-button type="primary" round @click="openChangePassword()">修改密码</el-button></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"><el-button type="primary" round @click="exitLogin()">退出登录</el-button></div></el-col>
      </el-row>
    </el-header>

    <!-- 修改密码弹窗 -->
    <div class="changePassword-form" v-if="changePassIsOff">
      <h3 class="changePassword-h3 cf">
        <p>修改密码</p>
        <i class="el-icon-close" @click="closeChangePassword"></i>
      </h3>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="submitForm('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-container>
      <el-aside width="200px">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu default-active="1-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">赛事管理</span>
            </template>
            <el-menu-item-group>
              <span slot="title">发布</span>
              <el-menu-item index="1-1" @click="click_index(1)">比赛信息</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="数据导入">
              <el-menu-item index="1-2" @click="click_index(2)">比赛安排</el-menu-item>
              <el-menu-item index="1-3" @click="click_index(3)">学校、成绩换算</el-menu-item>
              <el-menu-item index="1-4" @click="click_index(4)">成绩信息</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="数据导出">
              <el-menu-item index="1-5" @click="click_index(5)">会员报名</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <div v-if="index===1">
            <h2 class="release-h2">发布比赛信息</h2>
            <table border="1">
              <thead>
                <tr>
                  <th>赛事名称</th>
                  <th>时间</th>
                  <th>赛事内容</th>
                </tr>
              </thead>
              
              <tbody>
                <tr>
                  <td>100米</td>
                  <td>2020-01-01</td>
                  <td>100米内容</td>
                </tr>
                <tr>
                  <td>200米</td>
                  <td>2020-01-02</td>
                  <td>200米内容</td>
                </tr>
              </tbody>
            </table>
            <!-- <el-table
              :data="tableData1"
              border
              style="width: 100%">
              <el-table-column
                prop="name"
                label="赛事名称"
                width="180">
              </el-table-column>
              <el-table-column
                prop="time"
                label="时间">
              </el-table-column>
              <el-table-column
                prop="content"
                label="赛事内容">
              </el-table-column>
            </el-table> -->
          </div>
          <div v-if="index===2">比赛安排内容</div>
          <div v-if="index===3">学校成绩换算内容</div>
          <div v-if="index===4">成绩内容</div>
          <div v-if="index===5">
            <h2 class="release-h2">会员报名信息</h2>
            <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                prop="wxid"
                label="微信ID"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="80">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="手机号">
              </el-table-column>
              <el-table-column
                prop="school"
                label="学校">
              </el-table-column>
              <el-table-column
                prop="identityCard"
                label="身份证号">
              </el-table-column>
            </el-table>
          </div>
        </el-main>

        <el-footer>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage3"
              :page-size="10"
              :hide-on-single-page="value"
              layout="prev, pager, next, jumper"
              :total="100">
            </el-pagination>
          </div>
        </el-footer>

      </el-container>
    </el-container>

  </el-container>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined;

export default {
  //使用middleware引入中间件
  middleware: 'auth',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      changePassIsOff: false,

      isCollapse: true,
      index: 1,

      //会员报名信息
      tableData: [{
        wxid: '1111',
        name: '小符',
        phone: '18023674442',
        school: '清华学校',
        identityCard: '4400XXX11'
      }, {
        wxid: '2222',
        name: '小李',
        phone: '18011114442',
        school: '清华学校',
        identityCard: '4400XXX22'
      }],

      currentPage3: 5,
      value: false,

    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    click_index(index){
      console.log("index",index)
      this.index = index;
    },
    openChangePassword(){
      this.changePassIsOff = !this.changePassIsOff;
    },
    closeChangePassword(){
      this.changePassIsOff = !this.changePassIsOff;
      this.ruleForm.pass = '';
      this.ruleForm.checkPass = '';
    },
    exitLogin(){
      Cookie.remove('token');
      this.$router.push('/login/login');
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          return this.$axios.get(`/json/testChangePassword.json`, {
              params:{
                token: Cookie.get('token'),
                password: this.ruleForm.pass,
                newPassword: this.ruleForm.checkPass
              }
            })
            .then(res => {
              //获取到内容
              console.log(res.data);

              let status = res.data.status;
              if (status === 'successful') {
                this.$message({
                  message: '修改密码成功',
                  type: 'success'
                });
                this.closeChangePassword();
              } else{
                this.$message.error('修改密码失败');
              }
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style scoped>
.el-row {
  padding-top: 20px;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  line-height: 40px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}


.el-header, .el-footer {
  color: #333;
  text-align: center;
  border-bottom: 1px solid #EBEEF5;
  height: 80px !important;
}

.el-aside {
  color: #333;
  text-align: center;
  border-right: 1px solid #EBEEF5;
  border-bottom: 1px solid #EBEEF5;
}

.el-main {
  color: #333;
  text-align: center;
  line-height: 60px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
   width: 200px;
   min-height: 400px;
 }

.release-h2{
  border: 1px solid #EBEEF5;
}

.changePassword-form{
  position: fixed;
  left: 40%;
  top: 30%;
  border: 1px solid #EBEEF5;
  border-radius: 10px;
  padding-right: 40px;
}

.changePassword-h3{
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;

}

.cf::after{
  display: block;
  clear: both;
  content: "";
}

.changePassword-h3 p{
  float: left;
}

.changePassword-h3 i{
  position: absolute;
  right: 0;
  top: 0;
  font-size: 20px;
  padding: 10px 10px;
}

.btn{
  width: 100%;
}
</style>
