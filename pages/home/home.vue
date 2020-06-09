<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="8"><div class="grid-content bg-purple">XXX管理系统</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">欢迎：admin超级管理员</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"><el-button round>修改密码</el-button></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"><el-button round>退出登录</el-button></div></el-col>
      </el-row>
    </el-header>

    <el-container>
      <el-aside width="200px">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu default-active="1-5" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
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
          <div v-show="index===1">比赛信息发布内容</div>
          <div v-show="index===2">比赛安排内容</div>
          <div v-show="index===3">学校成绩换算内容</div>
          <div v-show="index===4">成绩内容</div>
          <div v-show="index===5">会员报名内容</div>
        </el-main>

        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,
      index: 1,
    };
  },
  methods: {
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
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
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
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  /* line-height: 60px; */
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  /* line-height: 200px; */
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
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
</style>
