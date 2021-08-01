<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Activity zone">
        <el-select v-model="form.uid" placeholder="please select your zone">
          <el-option v-for="item in form.options" :value="item.value" :key="item.value" :label="item.label"></el-option>
        </el-select>
        <el-button type="primary" @click="getList">Create</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" prop="created_at" label="日期" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.d }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色id"  width="50" >
        <template slot-scope="scope">
          {{ scope.row.ids_id }}
        </template>
      </el-table-column>
      <el-table-column label="成功次数" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.succ }}</span>
        </template>
      </el-table-column>
      <el-table-column label="失败次数" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.fail }}
        </template>
      </el-table-column>
      <el-table-column label="购买总量" width="300" align="center">
        <template slot-scope="scope">
          {{ scope.row.num }}
        </template>
      </el-table-column>
      <el-table-column label="金币收益" width="300" align="center">
        <template slot-scope="scope">
          {{ scope.row.gain }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import request from "@/utils/request";
  import {serverDomain} from "@/settings"; // secondary package based on el-pagination
  export default {
    components: {Pagination},
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        form: {
          uid: 1,
          options: [{
            value: 1,
            label: 'uid 1'
          }, {
            value: 2,
            label: 'uid 2'
          }, {
            value: 3,
            label: 'uid 3'
          }, {
            value: 4,
            label: 'uid 4'
          }],
        },
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true

        var params = {uid: this.form.uid, limit: this.listQuery.limit, page: this.listQuery.page}
        request({
          url: serverDomain + 'api/buy_status/search',
          method: 'get',
          params
        }).then(response => {
          console.log(response)
          this.list = response.data.items
          this.total = response.data.total
          setTimeout(() => {
            this.listLoading = false
          }, 0.5 * 1000)
        })

      }
    }
  }
</script>
