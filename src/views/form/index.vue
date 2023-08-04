<template>
  <div>
    <el-card style="margin:15px">
      <span>
        <el-button size="mini" type="primary" @click="dialogFormVisible = true, addmode = true, addsubmode = false">
          添加权限
        </el-button>
      </span>
      <el-table :data="tableData" row-key="id" default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" style="width: 100%">
        <el-table-column prop="name" label="名称">
        </el-table-column>
        <el-table-column prop="code" label="标识">
        </el-table-column>
        <el-table-column prop="description" label="描述">
        </el-table-column>
        <el-table-column prop="setting" label="操作">
          <template slot-scope="scope">
            <el-link v-if="scope.row.pid === 0" :underline="false" type="primary"
              @click="dialogFormVisible = true, addmode = true, addsubmode = true, form.pid = scope.row.id"><el-button type="primary" size="mini" >添加</el-button></el-link>
            <el-link :underline="false" type="primary"
              @click="set(scope.row.id), addmode = false, dialogFormVisible = true"><el-button size="mini">编辑</el-button></el-link>

            <el-popconfirm confirmButtonText='确定' cancelButtonText='取消' icon="el-icon-info" iconColor="red" title="确定删除吗？"
              @onConfirm=del(scope.row.id)>
              <el-link slot="reference" :underline="false" type="primary"><el-button type="danger" size="mini">删除</el-button></el-link>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>

      <el-dialog :title="str" :visible.sync="dialogFormVisible" width="45%">
        <el-form :model="form" :rules="rules" ref="form">

          <el-form-item label="权限名称" label-width="80px" prop="name">
            <el-input v-model="form.name" style="width: 330px;"></el-input>
          </el-form-item>

          <el-form-item label="权限标识" label-width="80px" prop="code">
            <el-input v-model="form.code" style="width: 330px;"></el-input>
          </el-form-item>

          <el-form-item label="权限描述" label-width="80px" prop="description">
            <el-input v-model="form.description" style="width: 330px;"></el-input>
          </el-form-item>

          <el-form-item label="开启" label-width="80px">
            <el-switch v-model="form.enVisible" active-color="#13ce66" inactive-color="#DCDFE6" active-value="1"
              inactive-value="0">
            </el-switch>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center;">
          <el-button @click="btnClose">取 消</el-button>
          <el-button :loading="loading" type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getPermission, addPermission, getPermissiondetails, setPermission, delPermission } from '@/api/permission'
export default {
  name: 'Index',
  data() {
    return {
      tableData: [],
      form: {
        name: '',
        code: '',
        description: '',
        enVisible: "1",
        pid: 0,
        type: 0
      },
      loading: false,
      rules: {
        name: [
          { required: true, message: '请输入权限名称', trigger: 'blur' },
        ],
        description: [
          { required: true, message: '请输入权限描述', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入权限标识', trigger: 'blur' }
        ]
      },
      dialogFormVisible: false,
      addmode: true,
      addsubmode: false,
      str: '新增权限点'
    }
  },
  mounted() {
    this.getper()
  },
  methods: {
    // 获取 权限点列表  并渲染页面
    async getper() {
      const res = await getPermission();
      console.log(res);
      this.tableData = [];
      let parentPermissions = res.data.filter((val) => val.pid === 0);
      parentPermissions.forEach((val) => {
        let children = res.data.filter(child => child.pid === val.id);
        if (children.length > 0) {
          val.children = children.map(child => ({
            id: child.id,
            name: child.name,
            label: child.name,
            code: child.code,
            pid: child.pid,
            description: child.description,
          }));
        }
        this.tableData.push({
          id: val.id,
          name: val.name,
          code: val.code,
          pid: val.pid,
          description: val.description,
          children: val.children || []
        });
      });
    },
    // 添加权限点
    async add() {
      if (this.addmode === true) {
        if (this.addsubmode !== true) {
          await addPermission(this.form)
          this.dialogFormVisible = false
          this.$message.success('新增权限成功')
          this.getper()
          this.form = {
            name: '',
            code: '',
            description: '',
            enVisible: 0,
            pid: 0,
            type: 0
          }
        } else {
          await addPermission(this.form)
          this.dialogFormVisible = false
          this.$message.success('新增子权限成功')
          this.getper()
          this.form = {
            name: '',
            code: '',
            description: '',
            enVisible: 0,
            pid: 0,
            type: 0
          }
        }
      } else {
        await setPermission(this.form.id, this.form)
        this.getper()
        this.form = {
          name: '',
          code: '',
          description: '',
          enVisible: 0,
          pid: 0,
          type: 0
        }
        this.dialogFormVisible = false
        this.$message.success('修改权限成功')
      }
    },
    async set(id) {
      const res = await getPermissiondetails(id)
      console.log(res);
      this.form = {
        id: res.data.id,
        name: res.data.name,
        code: res.data.code,
        description: res.data.description,
        enVisible: res.data.enVisible,
        pid: res.data.pid,
        type: res.data.type
      }
    },
    async del(id) {
      await delPermission(id)
      this.getper()
      this.$message.success('删除权限成功')
    },
    btnClose() {
      this.form = {
        name: '',
        code: '',
        description: '',
        enVisible: "1",
        pid: 0,
        type: 0
      },
        this.dialogFormVisible = false
    }
  },

  watch: {
    addmode() {
      if (this.addmode === true) {
        this.str = '新增权限点'
      } else {
        this.str = '编辑权限点'
      }
    }
  }
}
</script>

<style scoped>
.el-table {
  text-align: center;
}

.el-link {
  margin-right: 5px;
}
</style>