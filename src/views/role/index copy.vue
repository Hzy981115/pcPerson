<template>
    <div>

        <el-card style="margin:20px">
            <!-- Form -->
            <div>
                <el-row>
                    <el-button type="danger" plain @click="openadd">添加角色</el-button>
                </el-row>

                <!--  添加角色 dialog -->

                <el-dialog title="添加角色" :visible.sync="dialogFormVisible" width="35%" @click="btnClose">

                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="角色名称" prop="name">
                            <el-input v-model="ruleForm.name" size="mini"></el-input>
                        </el-form-item>
                        <el-form-item label="启用" prop="state">
                            <el-switch v-model="ruleForm.state"></el-switch>
                        </el-form-item>
                        <el-form-item label="角色描述" prop="description">
                            <el-input v-model="ruleForm.description" type="textarea"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="btnClose">取 消</el-button>
                        <el-button type="primary" @click="addListName" v-loading="loading" :abled="abled">确 定</el-button>
                    </div>
                </el-dialog>
            </div>

            <!-- 删除dialog -->
            <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                <span>确定删除?</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="ifDelete">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 分配角色 dialog' -->
            <el-dialog title="分配权限" :visible.sync="dialogGiveVisible" width="30%" :before-close="btnPermCancel">
                <el-tree :data="permissionData" ref="permTree" show-checkbox node-key="id" 
                    :default-checked-keys="permIds" :props="{ label: 'name' }" >
                </el-tree>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="btnPermCancel">取 消</el-button>
                    <el-button type="primary" @click="GivePerson">确 定</el-button>
                </span>
            </el-dialog>



            <el-table :data="tableData" stripe style="width: 100% height:600px" class="elTable" v-loading="loading">
                <el-table-column prop="name" label="角色" width="180" align="center">
                </el-table-column>
                <!-- <el-table-column prop="state" :formatter="enable" label="启用" width="180" align="center"> -->
                <el-table-column prop="state" label="启用" width="180" align="center">

                    <!--  判断是否启用 -->
                    <template slot-scope="scope">
                        <span>{{ scope.row.state === 1 ? '已启用' : '未启用' }}</span>
                    </template>

                </el-table-column>
                <el-table-column prop="description" label="描述" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleGive(scope.row.id)">分配权限</el-button>
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-pagination background layout="prev, pager, next" :page-size="page.pagesize" :current-page="page.page"
                :total="page.total" @current-change="handleCurrentChange">
            </el-pagination>
        </el-card>
    </div>
</template>
<script>
import { getList, addList, delList, updateList, assignList ,getPrem} from '@/api/role'
import { transListToTreeData } from '@/utils'
export default {

    data() {
        return {
            page: {
                page: 1,
                pagesize: 10,
                total: 0
            },
            abled: true,
            tableData: [],
            dialogGiveVisible: false,
            dialogVisible: false,
            dialogFormVisible: false,
            rules: {
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                ],
                description: [
                    { required: true, message: '请输入角色描述', trigger: 'blur' },
                ],
            },
            ruleForm: {
                name: '',
                state: 1,
                description: ''
            },
            form: {
                id: '',
                name: '',
                state: 0,
                description: ''
            },
            loading: true,
            rowId: '',
            permissionData: [],
            currentRoleId: null,
            permIds:[]
            // Give: {
            //     id: '',
            //     roleIds: []
            // }


        }
    },
    mounted() {
        this.getLists()
    },
    // computed: {
    //     // vux 获取 token
    //     // ...mapGetters(['token'])
    // },
    methods: {

        // 获取角色列表
        async getLists() {
            console.log('11');
            const res = await getList(this.page)
            console.log(res);
            // 得到的数据赋值给tableDate     渲染页面
            if (res.success) {
                this.tableData = res.data.rows
                this.page.total = res.data.total
                this.loading = false
            }

            // 循环得到的数组 将state为1的值改为 启用  为0 改为未启用
            // this.tableData.forEach(val => {
            //     if(val.state==1){
            //         console.log(val);
            //         val.state = '启用'
            //     }else{
            //         val.state = '未启用'
            //     }
            // });  
        },

        //添加角色 /  编辑角色

        addListName() {

            // 判断是添加还是编辑

            this.$refs.ruleForm.validate(async valida => {

                if (valida) {
                    if (this.abled) {
                        const res = await addList(this.ruleForm)
                        this.$message.success(`${res.message}`)
                        this.btnClose()
                        this.getLists()
                    } else {

                        this.form.name = this.ruleForm.name
                        this.form.state = this.ruleForm.state
                        this.form.description = this.ruleForm.description
                        console.log(this.form);
                        const res = await updateList(this.form)
                        console.log(res);
                        this.$message.success(`${res.message}`)
                        this.btnClose()
                        this.getLists()
                    }

                }
            })
        },
        // 打开添加窗口
        openadd() {
            this.dialogFormVisible = true
            this.abled = true
            console.log(this.abled);
        },
        //关闭添加角色窗口
        btnClose() {
            this.$refs.ruleForm.resetFields() //重置表单数据
            this.dialogFormVisible = false
        },
        //切换分页
        handleCurrentChange(val) {
            this.page.page = val
            this.getLists()
        },
        // 打开分配权限  并获取权限
        async  handleGive(id) {
            this.currentRoleId = row.id
            const res = await getRoleDetail(id)
            const { permIds } = res.data
            this.permIds = permIds
            const res1 = await getPrem()
            this.permissionData = transListToTreeData(res1.data, 0)
            this.dialogGiveVisible = true
        },
        // 发送分配权限请求
        async GivePerson() {
            const res = await assignList(this.Give)
            console.log(res);
            await assignList({
                id: this.currentRoleId,
                permIds: this.$refs.permTree.getCheckedKeys() //被选中的节点的 key 所组成的数组
            })
            this.$message.success('角色分配权限成功')
            this.showPermissionDialog = false
        },
        btnPermCancel() {
            this.permIds = []
            this.showPermissionDialog = false
        },
        // 编辑
        async handleEdit(index, row) {
            this.dialogFormVisible = true
            this.abled = false
            this.form.id = row.id
            this.ruleForm.name = row.name
            if(row.state == 1){
                this.ruleForm.state = true
            }else{
                this.ruleForm.state = false
            }
            this.ruleForm.description = row.description
            console.log(row.state,this.ruleForm.state);
            // await updateList(row.id) 
        },
        // 删除
        handleDelete(index, row) {
            this.dialogVisible = true
            console.log(row.id);
            this.ruleForm.id = row.id
        },
        async ifDelete() {
            const res = await delList(this.ruleForm.id)
            this.dialogVisible = false

            if (res.success) {
                this.$message.success(`${res.message}`)
                this.getLists()
                console.log(res.message);
            }

        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        }

        // element 方法  改变当前cellValue 值  formatter 动态绑定
        // enable(row, column, cellValue, index) {
        //     if (cellValue == '1') {
        //         return '启用'
        //     } else {
        //         return '未启用'
        //     }
        // },
    },


}
</script>
<style scoped></style>