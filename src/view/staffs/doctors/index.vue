<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="formInline.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="formInline.address" placeholder="地址"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryInfo">查询</el-button>
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="dialogVisible = true">添加员工</el-button>
    <el-button type="primary" @click="rolevisible = true">职位管理</el-button>
    <el-dialog
      title="添加员工"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form :model="addForm" class="demo-form-inline" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="addForm.dname" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model="addForm.davatar" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-select
            v-model="addForm.rid"
            placeholder="请选择"
            @change="rolesChange"
          >
            <el-option
              v-for="item in roles"
              :key="item.rid"
              :label="item.rname"
              :value="item.rid"
            >
            </el-option>
          </el-select>
          <!-- {{ permission }}
          <el-select v-model="permission" multiple placeholder="请选择">
            <el-option
              v-for="item in roles[index].permissionsList"
              :key="item.pnickname"
              :label="item.pnickname"
              :value="item.pnickname"
            >
            </el-option>
          </el-select> -->
        </el-form-item>

        <el-form-item label="身份证">
          <el-input
            v-model="addForm.didentified"
            placeholder="身份证号"
          ></el-input>
        </el-form-item>
        <el-form-item label="居住地址">
          <el-input v-model="addForm.daddress" placeholder="地址"></el-input>
        </el-form-item>
        <el-form-item label="学历">
          <el-input v-model="addForm.ddgree" placeholder="学历"></el-input>
        </el-form-item>
        <el-form-item label="挂诊费用">
          <el-input v-model="addForm.doutRegister" placeholder="挂诊费用">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDoctors">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="职位设置"
      :visible.sync="rolevisible"
      width="40%"
      :before-close="handleClose"
    >
      <!-- 选择职位 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-select
          v-model="role.rid"
          v-if="!addRoleJudge"
          placeholder="请选择职位"
          @change="rolesChange"
        >
          <el-option
            v-for="item in roles"
            :key="item.rid"
            :label="item.rname"
            :value="item.rid"
            >{{ item.rname }}
            <el-button size="mini" type="danger">删除</el-button>
          </el-option>
        </el-select>

        <!-- 添加职位 -->
        <el-form-item v-if="addRoleJudge" label="请输入职位名称">
          <el-input
            v-model="role.rname"
            placeholder="请输入职位名称"
            label="请输入职位名称"
            clearable
          ></el-input>
        </el-form-item>

        <!-- <el-button type="primary" @click="editRole">编辑职位</el-button> -->
        <el-button
          type="primary"
          @click="submitRole"
          v-if="!addPermissionsJudge"
          >添加职位</el-button
        >
        <el-button
          type="primary"
          @click="submitPermissions"
          v-if="!addRoleJudge"
          >添加权限</el-button
        >
        <el-button
          type="primary"
          @click="cancelEdit"
          v-if="addRoleJudge || addPermissionsJudge"
          >取消</el-button
        >
        <el-select
          v-if="addPermissionsJudge"
          v-model="role.permissionsList.pid"
          multiple
          placeholder="请选择"
        >
          <el-option
            v-for="item in roles[index].permissionsList"
            :key="item.pid"
            :label="item.pnickname"
            :value="item.pid"
          >
          </el-option>
        </el-select>
      </el-form>

      <el-table :data="permissions" border style="width: 100%">
        <el-table-column prop="pnickname" label="权限名称" width="180">
        </el-table-column>
        <el-table-column label="编辑" width="180">
          <el-button size="mini" type="danger">删除</el-button>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="did" label="工号" width="50"> </el-table-column>
      <el-table-column prop="dname" label="姓名" width="50"> </el-table-column>
      <el-table-column prop="dage" label="年龄" width="50"> </el-table-column>
      <el-table-column prop="rname" label="职位" width="50"> </el-table-column>
      <el-table-column prop="depts.name" label="部门名" width="50">
      </el-table-column>
      <el-table-column prop="depts.address" label="部门地址"> </el-table-column>
      <el-table-column prop="didentified" label="身份证"> </el-table-column>
      <el-table-column label="学历">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="毕业院校:"
            width="200"
            trigger="hover"
          >
            <ul class="tips-content">
              <li>{{ scope.row.scGraduation }}</li>
            </ul>
            <p slot="reference">{{ scope.row.ddegree }}</p>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="doutRegister" label="挂诊费用"> </el-table-column>
      <el-table-column prop="dentryTime" label="入职时间"> </el-table-column>
      <el-table-column prop="dresignTime" label="辞职时间"> </el-table-column>
      <el-table-column prop="modTime" label="最后修改时间"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="1000">
    </el-pagination>
  </div>
</template>

<script>
import { getRolesPList, addRole } from "@/api/admin/roles";
import pageUtils from "@/util/pageUtils";
import { queryDoctorsInfo, addDoctorsInfo } from "@/api/staffs/doctors";
export default {
  data() {
    return {
      formInline: {
        name: "",
        region: "",
      },
      addForm: {
        dname: "",
        daddress: "",
        rid: "",
        ddgree: "",
        davatar: "",
        doutRegister: "",
        didentified: "",
      },
      tableData: [],
      dialogVisible: false,
      rolevisible: false,
      roles: [{ permissionsList: [] }],
      role: {
        rid: null,
        rname: "",
        permissionsList: [],
      },
      permissions: [],
      permission: "",
      index: 0,
      addRoleJudge: false,
      addPermissionsJudge: false,
      options: {
        label: "rname",
        value: "rid",
        children: "permissionsList",
      },
    };
  },
  created() {
    this.queryInfo();
    this.getRolesPList();
    pageUtils.registerTag(this.$store, this.$route);
  },
  methods: {
    cancelEdit() {
      this.addRoleJudge = false;
      this.addPermissionsJudge = false;
    },
    // editRole() {
    //   this.editJudge = !this.editJudge;
    //   console.log("role ", this.role);
    // },
    submitRole() {
      console.log("role ", this.role);
      if (this.addRoleJudge) {
        addRole(this.role).then((response) => {
          console.log(response);
        });
      }
      this.addRoleJudge = !this.addRoleJudge;
    },
    submitPermissions() {
      this.addPermissionsJudge = !this.addPermissionsJudge;
    },
    cascaderChange() {
      console.log("cascader");
    },
    rolesChange(rid) {
      for (let i = 0; i < this.roles.length; i++) {
        if (rid === this.roles[i].rid) {
          this.index = i;
        }
      }
      this.permissions = this.roles[this.index].permissionsList;
      // console.log(
      //   "ASDASD",
      //   rid,
      //   this.roles.length,
      //   this.roles[this.index].permissionsList
      // );
    },
    getRolesPList() {
      getRolesPList().then((response) => {
        console.log("resp ", response);
        this.roles = response.data.rolesVo;
      });
    },
    addDoctors() {
      this.dialogVisible = false;
      addDoctorsInfo(this.addForm).then((response) => {
        conosle.log("add REs ", response);
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    queryInfo() {
      queryDoctorsInfo().then((response) => {
        console.log("resp=========>", response);
        this.tableData = response.data.doctorsList;
      });
    },
  },
};
</script>
<style scoped>
.el-pagination {
  margin-top: 10px;
}
</style>
