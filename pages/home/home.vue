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
              <el-menu-item index="1-1" @click="click_index(1)">赛事发布</el-menu-item>
              <el-menu-item index="1-2" @click="click_index(2)">赛事信息</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="数据导入">
              <el-menu-item index="1-3" @click="click_index(3)">比赛安排</el-menu-item>
              <el-menu-item index="1-4" @click="click_index(4)">学校、成绩换算</el-menu-item>
              <el-menu-item index="1-5" @click="click_index(5)">成绩信息</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="数据导出">
              <el-menu-item index="1-6" @click="click_index(6)">会员报名</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <div v-if="index===1">
            <h2 class="release-h2">赛事发布</h2>
            <table class="table-box" border="0" cellspacing="0" cellpadding="0">
              <thead>
                <tr>
                  <th>赛事名称</th>
                  <th>比赛时间</th>
                  <th>比赛地点</th>
                  <th>赛事内容</th>
                  <th>操作</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <el-input
                      type="text"
                      placeholder="请输入内容"
                      v-model="text"
                      maxlength="50"
                      show-word-limit
                    >
                    </el-input>
                  </td>
                  <td>
                    <el-date-picker
                      v-model="value1"
                      type="datetime"
                      format="yyyy-MM-dd HH:mm"
                      value-format="timestamp"
                      placeholder="选择日期">
                    </el-date-picker>
                  </td>
                  <td>
                    <el-input
                      type="text"
                      placeholder="请输入内容"
                      v-model="text2"
                      maxlength="50"
                      show-word-limit
                    >
                    </el-input>
                  </td>
                  <td>
                    <el-input
                      type="textarea"
                      placeholder="请输入内容"
                      v-model="textarea"
                      maxlength="1000"
                      show-word-limit
                      id="content"
                    >
                    </el-input>
                  </td>
                  <td><el-button type="primary" round @click="click_release">点击发布</el-button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="index===2">
            <h2 class="release-h2">赛事信息</h2>
            <el-table
              :data="sports_list.filter(date => !search || date.time.toLowerCase().includes(search.toLowerCase()) || date.name.toLowerCase().includes(search.toLowerCase()) || date.site.toLowerCase().includes(search.toLowerCase()) || date.content.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%">
              <el-table-column
                label="时间"
                prop="time">
              </el-table-column>
              <el-table-column
                label="姓名"
                prop="name">
              </el-table-column>
              <el-table-column
                label="比赛地点"
                prop="site">
              </el-table-column>
              <el-table-column
                label="比赛内容"
                prop="content">
              </el-table-column>
              <el-table-column
                align="right">
                <template slot="header" slot-scope="scope">
                  <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="index===3">比赛安排内容</div>
          <div v-if="index===4">学校成绩换算内容</div>
          <div v-if="index===5">成绩内容</div>
          <div v-if="index===6">
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
              :total="total">
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

      isCollapse: false,
      index: 2,

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

      //赛事信息
      sports_list: [],
      // tableData2: [{
      //   time: '2020-01-03 18:20:30',
      //   name: '女子高一组100米预赛第一组'
      // }, {
      //   time: '2020-02-02 18:20:30',
      //   name: '男子高一组200米预赛第一组'
      // }],
      search: '',

      currentPage3: 1,
      value: false,
      text: '',
      text2: '',
      textarea: '',
      value1: 0,

      page: '1',
      total: 0,

    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row, "点击编辑按钮");
    },
    handleDelete(index, row) {
      console.log(index, row, "点击删除按钮");
      this.click_delete(row.name, row.time, row.site);
    },
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

      if(index === 2){  //点击的是：赛事信息
        console.log('点击的是：赛事信息')
        this.click_eventInfo(this.page);
      }
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
          //修改密码API：http://127.0.0.1:5000/api/v1/changePassword
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
    click_release(){
      if(this.text === '' || this.value1 === 0 || this.text2 === '' || this.textarea === ''){
        return this.$message.error('请补充发布必填内容');
      }else{
        //赛事发布API：http://127.0.0.1:5000/api/v1/public
        return this.$axios.post(`/json/testPublic.json`, {
          params:{
            token: Cookie.get('token'),
            name: this.text,
            time: this.value1,
            content: this.textarea,
            site: this.text2
          }
        })
        .then(res => {
          //获取到内容
          console.log(res.data);

          let status = res.data.status;
          if (status === 'successful') {
            this.$message({
              message: '发布成功，请到赛事信息进行查看',
              type: 'success'
            });

          } else{
            this.$message.error('发布失败，请重新发布');
          }
        })
      }
    },
    click_eventInfo(page){
      //赛事查询API：http://127.0.0.1:5000/api/v1/sportsQuery
      return this.$axios.get(`/json/testSportsQuery.json`, {
        params:{
          token: Cookie.get('token'),
          page
        }
      })
      .then(res => {
        //获取到内容
        console.log(res.data);
        this.sports_list = res.data.sports_list;
      })
    },
    click_delete(name, time, site){
      //赛事删除API：http://127.0.0.1:5000/api/v1/public
      return this.$axios.get(`/json/testPublic.json`, {
        params:{
          token: Cookie.get('token'),
          name,
          time,
          site
        }
      })
      .then(res => {
        //获取到内容
        console.log(res.data);

        if (res.data.status === 'successful') {
          this.$message({
            message: '删除成功',
            type: 'success'
          });

        } else{
          this.$message.error('删除失败');
        }
      })
    }
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
  z-index: 100;
  border: 1px solid #EBEEF5;
  background-color: #FFFFFF;
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

.table-box{
  border: 1px solid #EBEEF5;
  box-sizing: border-box;
  width: 100%;
}

.table-box th, .table-box td{
  border: 1px solid #EBEEF5;
  box-sizing: border-box;
}

.table-box td{
  padding: 10px;
}

</style>
