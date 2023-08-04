<template>
  <div class="dashboard-container">
    <el-card class="box-card">
      <div class="dashboard-text"><img src="../../assets/head.b6c3427.jpg" alt="">早安,{{ name }},祝你开心每一天</div>
    </el-card>
    <div class="oneMiddle">

      <!--  左侧 -->
      <div class="oneLeft">
        <!-- 日历 -->
        <el-card class="box-card">
          <el-calendar v-model="value"></el-calendar>
        </el-card>
        <!-- 公告 -->
        <el-card class="box-card">
        <span>公告</span>
        </el-card>
      </div>
      <!-- 右侧 -->
      <div class="oneRight">
        <!-- 流程申请 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <p> <span class="title"> <i>流程申请</i></span></p>
          </div>
          <el-row class="btn">
            <el-button type="success" round style="margin-left:10px">成功按钮</el-button>
            <el-button type="info" round>信息按钮</el-button>
            <el-button type="warning" round>警告按钮</el-button>
            <el-button type="danger" round>危险按钮</el-button>
          </el-row>
        </el-card>
        <!-- 绩效指数 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>绩效指数</span>
          </div>
          <div id="main" style="width: 350px;height:300px;"></div>
        </el-card>
        <!-- 帮助链接 -->
        <el-card class="box-card">
          <span>帮助链接</span>
        </el-card>
      </div>



    </div>




  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as echarts from 'echarts';
export default {
  data() {
    return {
      value: new Date(),
      name: 'Dashboard',
    }
  },

  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 绘制图表
    myChart.setOption({
      title: {
        text: ''
      },
      legend: {
        data: ['Allocated Budget', 'Actual Spending']
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: '能力', max: 6500 },
          { name: '管理', max: 16000 },
          { name: '周边', max: 30000 },
          { name: '贡献', max: 38000 },
          { name: '态度', max: 52000 },
        ]
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000],
              name: ''
            },
            {
              value: [5000, 14000, 28000, 26000, 42000],
              name: ''
            }
          ]
        }
      ]
    });
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 25px;
    // line-height: 100px;
    margin-left: 10px;
  }
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}


.imgs {
  width: 130px;
  height: 150px;
  // position: relative;
}

.oneTop img {
  margin-left: 20px;
  width: 110px;
  height: 110px;
  // position: absolute;
  // top: 50%;
  // transform: translate(0, -50%);
}

.oneMiddle {
  margin-top: 20px;
  min-width: 100%;
  background-color: #333;
}

.oneLeft {
  border-radius: 5px;
  width: 55%;
  float: left;

}

.oneLeftone {
  border-radius: 5px;
  width: 100%;
  box-shadow: 0 0 5px #b4b1b1;
  background-color: #fff;
  overflow: hidden;
}

.oneLefttwo {
  border-radius: 5px;
  width: 100%;
  height: 500px;
  box-shadow: 0 0 5px #b4b1b1;
  background-color: #fff;
  margin-top: 20px;
  margin-bottom: 30px;
}

.oneRight {
  border-radius: 5px;
  width: 44%;
  height: 500px;
  float: right;
}

.oneRightone {
  border-radius: 5px;
  width: 100%;
  height: auto;
  box-shadow: 0 0 5px #b4b1b1;
  background-color: #fff;
  margin-bottom: 20px;
}

p {
  // height: 50px;
  margin: 0;
}


i {
  line-height: 50px;
  font-size: 24px;
  font-style: normal;
}

.smallTitle-f {
  margin: 20px auto;
  min-height: 80px;
}

.box-card {
  margin-bottom: 20px;
}
.btn {
  max-width: 460px;
  margin: 10px auto;
}

.oneRightone a {
  display: inline-block;
  width: 135px;
  height: 50px;
  border: 1px solid #777777;
  border-radius: 5px;
  text-align: center;
  line-height: 50px;
  margin: 0 15px 10px 0;
}

.smallTitle {
  font-size: 16px;
  color: #777777;
}

.oneRighttwo {
  border-radius: 5px;
  width: 100%;
  height: auto;
  box-shadow: 0 0 5px #b4b1b1;
  background-color: #fff;
  margin-bottom: 20px;
}

.oneRightthree {
  border-radius: 5px;
  height: 300px;
  width: 100%;
  box-shadow: 0 0 5px #b4b1b1;
  background-color: #fff;
}

#main {
  margin: 0 auto;
  margin-top: 20px;
}
</style>
