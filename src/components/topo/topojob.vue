<template>
  <div >
    <dash-header ></dash-header>
    <sidebar />
    <div class="content-wrapper" style="min-height: 1200px">
      <div id="topo-container" style="border: 1px solid #daecf5;">
        <item-list id="item-list-left" :stepList="list"></item-list>
        <div id="chart-container" style="position: relative;float:left ">
          <div class="toolbar" style="width:100%">
            <div  style="float:left;" v-show="!visible">
              <h3>
                <label for="name" class="label label-success" style="width:150px;height:34px">转换名称</label>
                <input type="text"  id="name" class="form_input" placeholder="请输入转换名称" v-model="title"/>
              </h3>
            </div>
            <div  style="float:right;margin-top:18px">
              <button type="button" class="btn btn-warning" @click="save">保存</button>
            </div>
          </div>
          <svg id="topo-chart" width="1300px" height="880px">
            <defs>
              <marker
                id="arrow"
                markerUnits="strokeWidth"
                markerWidth="10"
                markerHeight="10"
                viewBox="0 0 12 12"
                refX="10"
                refY="6"
                orient="auto"
              >
                <path d="M2,2 L10,6 L2,10 L6,6 L2,2" style="fill: #0d69a9;"></path>
              </marker>
            </defs>
          </svg>
        </div>
        <div class="modal fade" id="myModal">
          <div class="modal-dialog">
            <div class="modal-content"    style="width:500px;margin-left: -82px;" >
              <dialog-trans
                v-if="dialog.TRANS"
                :item="editItem"
                @on-close="onCloseDialog"
              ></dialog-trans>
              <dialog-start
                v-if="dialog.SPECIAL"
                :item="editItem"
                @on-close="onCloseDialog">
              </dialog-start>
              <dialog-success
                v-if="dialog.SUCCESS"
                :item="editItem"
                @on-close="onCloseDialog">
              </dialog-success>
              <dialog-write-file
                v-if="dialog.WRITE_TO_FILE"
                :item="editItem"
                @on-close="onCloseDialog">
              </dialog-write-file>
              <dialog-mkdir
                v-if="dialog.CREATE_FOLDER"
                :item="editItem"
                @on-close="onCloseDialog">
              </dialog-mkdir>
              <dialog-create-file
                v-if="dialog.CREATE_FILE"
                :item="editItem"
                @on-close="onCloseDialog">
              </dialog-create-file>
              <dialog-delete-file
                v-if="dialog.DELETE_FILE"
                :item="editItem"
                @on-close="onCloseDialog"
              ></dialog-delete-file>
              <dialog-delete-files
                v-if="dialog.DELETE_FILES"
                :item="editItem"
                @on-close="onCloseDialog">
              </dialog-delete-files>
              <dialog-deletefolders
                v-if="dialog.DELETE_FOLDERS"
                :item="editItem"
                @on-close="onCloseDialog">
              </dialog-deletefolders>
              <dialog-shell
                v-if="dialog.SHELL"
                :item="editItem"
                @on-close="onCloseDialog">>

              </dialog-shell>
              <dialog-s-q-l
                v-if="dialog.SQL"
                :item="editItem"
                @on-close="onCloseDialog">
              </dialog-s-q-l>
              <dialog-ping
                v-if="dialog.PING"
                :item="editItem"
                @on-close="onCloseDialog">

              </dialog-ping>
              <dialog-writo-log
                v-if="dialog.WRITE_TO_LOG"
                :item="editItem"
                @on-close="onCloseDialog"
              ></dialog-writo-log>
              <dialog-telnet
                v-if="dialog.TELNET"
                :item="editItem"
                @on-close="onCloseDialog"
              ></dialog-telnet>
              <dialog-ftp-put
                v-if="dialog.FTP_PUT"
                :item="editItem"
                @on-close="onCloseDialog"
              ></dialog-ftp-put>
              <dialog-ftp
                v-if="dialog.FTP"
                :item="editItem"
                @on-close="onCloseDialog">

              </dialog-ftp>
              <dialog-mail
                v-if="dialog.MAIL"
                :item="editItem"
                @on-close="onCloseDialog">
              </dialog-mail>
              <dialog-pop
                v-if="dialog.GET_POP"
                :item="editItem"
                @on-close="onCloseDialog">
              </dialog-pop>
              <dialog-webservice-availble
                v-if="dialog.WEBSERVICE_AVAILABLE"
                :item="editItem"
                @on-close="onCloseDialog">
              </dialog-webservice-availble>
              <dialog-file-exists
                v-if="dialog.FILE_EXISTS"
                :item="editItem"
                @on-close="onCloseDialog">
              </dialog-file-exists>
              <dialog-check-column
                v-if="dialog.COLUMNS_EXIST"
                :item="editItem"
                @on-close="onCloseDialog">
              </dialog-check-column>
              <dialog-files-exists
                v-if="dialog.FILES_EXIST"
                :item="editItem"
                @on-close="onCloseDialog"
              >
              </dialog-files-exists>
              <dialog-check-file-lock
                v-if="dialog.CHECK_FILES_LOCKED"
                :item="editItem"
                @on-close="onCloseDialog">
              </dialog-check-file-lock>
              <dialog-check-folder-empty
                v-if="dialog.FOLDER_IS_EMPTY"
                :item="editItem"
                @on-close="onCloseDialog"
              ></dialog-check-folder-empty>
              <dialog-check-table
                v-if="dialog.TABLE_EXISTS"
                :item="editItem"
                @on-close="onCloseDialog"
              ></dialog-check-table>
              <dialog-hadoop-copy-file
                v-if="dialog.HadoopCopyFilesPlugin"
                :item="editItem"
                @on-close="onCloseDialog">
              </dialog-hadoop-copy-file>
              <dialog-ftpremove
                v-if="dialog.FTP_DELETE"
                :item="editItem"
                @on-close="onCloseDialog">
              </dialog-ftpremove>
              <dialog-pgp-encry
                v-if="dialog.PGP_ENCRYPT_FILES"
                :item="editItem"
                @on-close="onCloseDialog">
              </dialog-pgp-encry>
              <dialog-pgp-decry
                v-if="dialog.PGP_DECRYPT_FILES"
                :item="editItem"
                @on-close="onCloseDialog"
              ></dialog-pgp-decry>
              <dialog-export-repository
                v-if="dialog.EXPORT_REPOSITORY"
                :item="editItem"
                @on-close="onCloseDialog">
              </dialog-export-repository>
              <dialog-connection-to-repository
                v-if="dialog.CONNECTED_TO_REPOSITORY"
                :item="editItem"
                @on-close="onCloseDialog">
              </dialog-connection-to-repository>
              <dialog-table-batch-mysql-export
                v-if="dialog.MYSQL_BULK_FILE"
                :item="editItem"
                @on-close="onCloseDialog">
              </dialog-table-batch-mysql-export>
              <dialog-table-batch-mysql-load
                v-if="dialog.MYSQL_BULK_LOAD"
                :item="editItem"
                @on-close="onCloseDialog">

              </dialog-table-batch-mysql-load>

            </div>
          </div>
        </div>
      </div>

      <router-view></router-view>
    </div>
    <dash-footer></dash-footer>
  </div>
</template>

<script>
import * as d3 from 'd3'
import DashFooter from '../layout/DashFooter'
import DashHeader from '../layout/DashHeader'
import Sidebar from '../layout/Sidebar'
import Chart from './chart'
import itemList from './item-list.vue'

import dialogTrans from './dialog/table-trans'
import dialogStart from './dialog/table-start'
import dialogSuccess from './dialog/table-succes'
import dialogWriteFile from './dialog/table-job-writefile'
import dialogMkdir from './dialog/table-mkdir'
import dialogCreateFile from './dialog/table-createfile'
import dialogDeleteFile from './dialog/table-deletefile'
import dialogDeleteFiles from './dialog/table-deletefiles'
import dialogDeletefolders from './dialog/table-deletefolder'
import dialogShell from './dialog/table-shell'
import dialogSQL from './dialog/table-sql'
import dialogPing from './dialog/table-ping'
import dialogWritoLog from './dialog/table-write_to_log'
import dialogTelnet from './dialog/table-telnet'
import dialogFtpPut from './dialog/table-ftpput'
import dialogFtp from './dialog/table-ftp'
import dialogMail from './dialog/table-mail'
import dialogPop from './dialog/table-mail-pop'
import dialogWebserviceAvailble from './dialog/table-webserviceavailable'
import dialogFileExists from './dialog/table-fileexists'
import dialogCheckColumn from './dialog/table-checkcolumn'
import dialogFilesExists from './dialog/table-filesexists'
import dialogCheckFileLock from './dialog/table-checkfilelock'
import dialogCheckFolderEmpty from './dialog/table-checkfolderEmpty'
import dialogCheckTable from './dialog/table-chectable'
import dialogHadoopCopyFile from './dialog/table-hadoop-copy-file'
import dialogFtpremove from './dialog/table-ftp-remove'
import dialogPgpEncry from './dialog/table-pgp-encry'
import dialogPgpDecry from './dialog/table-pgp-decry'
import dialogExportRepository from './dialog/table-export-repository'
import dialogConnectionToRepository from './dialog/table-connect-to-repository'
import dialogTableBatchMysqlExport from './dialog/table-batch-mysql-exoprt'
import dialogTableBatchMysqlLoad from './dialog/table-batch-mysql-load'




let chart = null
export default {
  components: {
      itemList,
      dialogTrans,
      dialogStart,
      dialogSuccess,
      dialogWriteFile,
      dialogMkdir,
      dialogCreateFile,
      dialogDeleteFile,
      dialogDeleteFiles,
      dialogDeletefolders,
      dialogShell,
      dialogSQL,
      dialogPing,
      dialogWritoLog,
      dialogTelnet,
      dialogFtpPut,
      dialogFtp,
      dialogMail,
      dialogPop,
      dialogWebserviceAvailble,
      dialogFileExists,
      dialogCheckColumn,
      dialogFilesExists,
      dialogCheckFileLock,
      dialogCheckFolderEmpty,
      dialogCheckTable,
      dialogHadoopCopyFile,
      dialogFtpremove,
      dialogPgpEncry,
      dialogPgpDecry,
      dialogExportRepository,
      dialogConnectionToRepository,
      dialogTableBatchMysqlExport,
      dialogTableBatchMysqlLoad,
      DashFooter,
      DashHeader,
      Sidebar
  },
  name: 'topo',
  data() {
    return {
      editItem: null,
      visible: false,
      title: '',
      list: [],
      dialog: {
          TRANS: false,
          SPECIAL:false,
          SUCCESS:false,
          WRITE_TO_FILE:false,
          CREATE_FOLDER:false,
          CREATE_FILE:false,
          DELETE_FILE:false,
          DELETE_FILES:false,
          DELETE_FOLDERS:false,
          SHELL:false,
          SQL:false,
          PING:false,
          WRITE_TO_LOG:false,
          TELNET:false,
          FTP_PUT:false,
          FTP:false,
          MAIL:false,
          GET_POP:false,
          WEBSERVICE_AVAILABLE:false,
          FILE_EXISTS:false,
          COLUMNS_EXIST:false,
          FILES_EXIST:false,
          CHECK_FILES_LOCKED:false,
          FOLDER_IS_EMPTY:false,
          TABLE_EXISTS:false,
          HadoopCopyFilesPlugin:false,
          FTP_DELETE:false,
          PGP_ENCRYPT_FILES:false,
          PGP_DECRYPT_FILES:false,
          EXPORT_REPOSITORY:false,
          CONNECTED_TO_REPOSITORY:false,
          MYSQL_BULK_FILE:false,
          MYSQL_BULK_LOAD:false
      },
      result: null
    }
  },
  mounted() {
    let container = d3.select('#topo-chart')
    chart = new Chart({
      container: container,
      onItemDblclick: this.onItemDblclick
    })
    this.init()
  },
  methods: {
    init() {
        let that=this;
      this.$axios.get('/api/kettleJobApi/getJobType').then(res => {
        if (res.data.code === 200) {
            that.list = res.data.data
          this.$nextTick(() => {
            this.bindDragEvent()
          })
        }
      })
      // 详情
      if (this.$route.query.id) {
          let that=this;
        this.$axios
          .get('/api/kettleJobApi/getJobById', {
            id: this.$route.query.id
          })
          .then(res => {
            if (res.data.code === 200) {
              let result = res.data.data
              let obj = {}
              that.title = result.jobName
              for (let k in result.step) {
                  var a=result.step[k];
                  debugger;
                obj[result.step[k].frontId] = {
                // obj[k] = {
                  id: result.step[k].frontId,
                  inputIds: result.step[k].inputIds
                    ? result.step[k].inputIds.split(',')
                    : '',
                  inputPathIds: result.step[k].inputPath
                    ? result.step[k].inputPath.split(',')
                    : '',
                  name: result.step[k].name,
                  outputIds: result.step[k].outputIds
                    ? result.step[k].outputIds.split(',')
                    : '',
                  outputPathIds: result.step[k].outputPath
                    ? result.step[k].outputPath.split(',')
                    : '',
                  data: result.step[k].para,
                  code: result.step[k].stepTypeCode,
                  x: result.step[k].x,
                  y: result.step[k].y,
                  type: 'FUNCTION'
                }
              }
              chart.setItems(obj)
            }
          })
      }
    },
    bindDragEvent() {
      let dragDeltaX, dragDeltaY, dragItem, $dragItem
      let items = d3.selectAll('.item-list .item')
      let drag = d3
        .drag()
        .on('start', function() {
          let mousePosition = d3.mouse(this)
          dragDeltaX = mousePosition[0]
          dragDeltaY = mousePosition[1]
          dragItem = this.cloneNode(true)

          // document.getElementsByTagName('body')[0].append(dragItem)
          document.getElementById('chart-container').append(dragItem)

          $dragItem = d3.select(dragItem)
          getItemPosition(
            $dragItem,
            // d3.event.sourceEvent.x - dragDeltaX,
            // d3.event.sourceEvent.y - dragDeltaY
            d3.event.sourceEvent.x - dragDeltaX - 235,
            d3.event.sourceEvent.y - dragDeltaY - 95
          )
        })
        .on('drag', function() {
          getItemPosition(
            $dragItem,
            // d3.event.sourceEvent.x - dragDeltaX,
            // d3.event.sourceEvent.y - dragDeltaY
            d3.event.sourceEvent.x - dragDeltaX - 235,
            d3.event.sourceEvent.y - dragDeltaY - 95
          )
        })
        .on('end', function() {
          // let $container = document.getElementById('chart-container')
          let position = {
            // x: d3.event.sourceEvent.x - dragDeltaX - $container.offsetLeft,
            // y: d3.event.sourceEvent.y - dragDeltaY - $container.offsetTop
            x: d3.event.sourceEvent.x - dragDeltaX - 395,
            y: d3.event.sourceEvent.y - dragDeltaY - 95
          }
          if (position.x > 0) {
            chart.addItem({
              x: position.x,
              y: position.y,
              name: $dragItem.attr('data-name'),
              type: $dragItem.attr('data-type'),
              code: $dragItem.attr('data-code')
            })
          }
          $dragItem.remove()
        })
      items.call(drag)

      let getItemPosition = function($item, x, y) {
        $item.attr(
          'style',
          `position:absolute;transform:translate(${x}px, ${y}px)`
          // `position:absolute;x:${x}px;y:${y}px)`
        )
      }
    },
    getData({ val, id = null }) {
      let map = []
      for (let k in chart.getItems()) {
          console.log(chart.getItems()[k])
        map.push(
          Object.assign(
            {},
            {
              id: chart.getItems()[k].id,
              name: chart.getItems()[k].data
                ? chart.getItems()[k].data.name
                : chart.getItems()[k].name,
              stepTypeCode: chart.getItems()[k].code,
              x: chart.getItems()[k].x,
              y: chart.getItems()[k].y,
              para: chart.getItems()[k].data ? chart.getItems()[k].data : {},
              order: [...chart.getItems()[k].outputIds],
              inputIds: chart.getItems()[k].inputIds.join(),
              outputIds: chart.getItems()[k].outputIds.join(),
              inputPath: chart.getItems()[k].inputPathIds.join(),
              outputPath: chart.getItems()[k].outputPathIds.join()
            }
          )
        )
      }
      this.result = Object.assign({ id }, { jobName: val, step: map ,enableLog:true})
      return this.result
    },
    save() {
      if (!this.title) {
        this.$alert('job名称不能为空');
        return;
      } else {
        this.$axios
          .post(
            '/api/kettleJobApi/makeKettleJob',
            this.getData({
              val: this.title,
              id: this.$route.query.id ? this.$route.query.id : null
            }),
            { type: 'json' }
          )
          .then(res => {
            if (res.code === 200) {
              this.visible = false
              this.$alert('保存成功');
              this.$router.push('/index/job_list')
            } else {
              this.$alert(res.message);
            }
          })
      }

      // 项目中替换为持久存储
      // localStorage.setItem('items', JSON.stringify(chart.getItems()))
    },
    loadData() {
      chart.setItems(JSON.parse(localStorage.getItem('items')))
    },
    onItemDblclick(item) {
      this.editItem = item
      this.dialog[item.code] = true
      $('#myModal').modal('show')
    },
    onCloseDialog(item) {
      this.dialog[item.code] = false
        debugger;
        $('#myModal').modal('hide')
    }
  }
}
</script>

