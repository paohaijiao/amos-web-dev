<template>
  <div class="basic-style">
    <div class="coll-h">
      <div></div>
      <div class="search">
        <el-input placeholder="请输入查询名称" v-model="search" class="input-with-select">
          <el-button type="primary" class="buttonBg" slot="append" @click="searchList">查询</el-button>
        </el-input>
      </div>
    </div>
    <div>
      <template>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column
            prop="id"
            label="批次"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="logdate"
            label="日志日期"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="transName"
            label="任务名称"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="stepName"
            label="步骤名称"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="linesRead"
            label="读取量"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="linesWritten"
            label="写入量"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="linesUpdated"
            label="修改量"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="linesInput"
            label="输入量"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="linesOutput"
            label="输出量"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="linesRejected"
            label="拒绝量"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="errors"
            label="错误量"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="inputBufferRows"
            label="输入缓冲区条数"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="onputBufferRows"
            label="输出缓冲区条数"
            align="center"
          ></el-table-column>
          <el-table-column prop="logField" label="日志详细内容" align="center">
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="light"
                :content="scope.row.logField"
                placement="left"
                v-if="scope.row.logField"
              >
                <el-button type="text">查看</el-button>
              </el-tooltip>
              <div v-else>-</div>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="currentChange"
        :current-page="currentPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'monitor',
  data() {
    return {
      search: '',
      tableData: [],
      total: 0,
      currentPage: 0
    }
  },
  methods: {
    init({ name, page = 0, size = 10 }) {
      this.$axios
        .get('/api/taskManager/getRunLogList', { name, page, size })
        .then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.data.content
            this.total = res.data.data.totalElements
          }
        })
    },
    currentChange(page) {
      this.init({
        name: this.search ? this.search : null,
        page: page - 1
      })
    },
    searchList() {
      this.currentPage = 1
      this.init({ name: this.search ? this.search : null })
    }
  },
  created() {
    this.init({})
  }
}
</script>

<style >
.basic-style{
  height: 100%;
}
.coll-h {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  .search {
    display: flex;
  }
}
.pagination {
  padding: 20px 0;
  text-align: right;
}
</style>
