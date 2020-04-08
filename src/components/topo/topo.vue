<template>
    <div class="content-wrapper" >
      <div class="toolbar" style="height:37px;;margin-top: 18px;" >
        <div v-show="!visible">
          <h3 style="display:flex">
            <label for="name" class="label label-primary" style="width:160px;height:34px">转换名称</label>
            <input type="text"  id="name" class="form_input" placeholder="请输入转换名称" v-model="title" style="height:37px;margin-left:30px"/>
            <div  style="float:right">
              <button type="button" class="btn btn-warning" @click="save" style=";margin-left:10px">保存</button>
            </div>
          </h3>
        </div>
      </div>
      <div id="topo-container" >

          <div id="chart-container" >
            <item-list id="item-list-left" :stepList="list" style="width:10%;float:left"></item-list>
            <svg id="topo-chart" style="width:90%;height:720px" >
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
              <div class="modal-content"    style="width:1200px;margin-left: -82px;" >
          <dialog-csv-input
            v-if="dialog.CsvInput"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog"
          ></dialog-csv-input>
          <dialog-excel-input
            v-if="dialog.ExcelInput"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog"
          ></dialog-excel-input>
          <dialog-text-file-input
            v-if="dialog.TextFileInput"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog"
          ></dialog-text-file-input>
          <dialog-row-generator
            v-if="dialog.RowGenerator"
            :item="editItem"
            @on-close="onCloseDialog"
          ></dialog-row-generator>
          <dialog-json-input
            v-if="dialog.JsonInput"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog"
          ></dialog-json-input>
          <dialog-access-input
            v-if="dialog.AccessInput"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog">
          </dialog-access-input>
          <dialog-input
            v-if="dialog.TableInput"
            :item="editItem"
            @on-close="onCloseDialog"
          ></dialog-input>
          <dialog-output
            v-if="dialog.TableOutput"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog"
          ></dialog-output>
          <dialog-delete
            v-if="dialog.Delete"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog"
          ></dialog-delete>
          <dialog-textfileoutput
            v-if="dialog.TextFileOutput"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog"
          ></dialog-textfileoutput>
          <dialog-sqlfileoutput
            v-if="dialog.SQLFileOutput"
            :item="editItem"
            @on-close="onCloseDialog"
          ></dialog-sqlfileoutput>
          <dialog-update
            v-if="dialog.Update"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog"
          ></dialog-update>
          <dialog-insert-update
            v-if="dialog.InsertUpdate"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog"
          ></dialog-insert-update>
          <dialog-json-output
            v-if="dialog.JsonOutput"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog"
          ></dialog-json-output>
          <dialog-constant
            v-if="dialog.Constant"
            :item="editItem"
            @on-close="onCloseDialog"
          ></dialog-constant>
          <dialog-valuemapper
            v-if="dialog.ValueMapper"
            :item="editItem"
            @on-close="onCloseDialog"
          ></dialog-valuemapper>
          <dialog-codesplitfieldtorows3
            v-if="dialog.SplitFieldToRows3"
            :item="editItem"
            @on-close="onCloseDialog"
          ></dialog-codesplitfieldtorows3>
          <dialog-stringcut
            v-if="dialog.StringCut"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog"
          ></dialog-stringcut>
          <dialog-unique
            v-if="dialog.Unique"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog"
          ></dialog-unique>
          <dialog-uniquerowsbyhashset
            v-if="dialog.UniqueRowsByHashSet"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog"
          ></dialog-uniquerowsbyhashset>
          <dialog-sequence
            v-if="dialog.Sequence"
            :item="editItem"
            @on-close="onCloseDialog"
          ></dialog-sequence>
          <dialog-replacestring
            v-if="dialog.ReplaceString"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog"
          ></dialog-replacestring>
          <dialog-setvaluefield
            v-if="dialog.SetValueField"
            :item="editItem"
            @on-close="onCloseDialog"
          ></dialog-setvaluefield>
          <dialog-ifnull
            v-if="dialog.IfNull"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog"
          ></dialog-ifnull>
          <dialog-nullif
            v-if="dialog.NullIf"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog"
          ></dialog-nullif>
          <dialog-rest
            v-if="dialog.Rest"
            :item="editItem"
            @on-close="onCloseDialog"
          ></dialog-rest>
          <dialog-h-t-t-p
            v-if="dialog.HTTP"
            :item="editItem"
            @on-close="onCloseDialog"
          ></dialog-h-t-t-p>
          <dialog-parquet-input
            v-if="dialog.ParquetInput"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog"
          ></dialog-parquet-input>
          <dialog-avro-input-new
            v-if="dialog.AvroInputNew"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog"
          ></dialog-avro-input-new>
          <dialog-avro-output
            v-if="dialog.AvroOutput"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog"
          ></dialog-avro-output>
          <dialog-hadoop-file-input-plugin
            v-if="dialog.HadoopFileInputPlugin"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog"
          ></dialog-hadoop-file-input-plugin>
          <dialog-hadoop-file-output-plugin
            v-if="dialog.HadoopFileOutputPlugin"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog"
          ></dialog-hadoop-file-output-plugin>
          <dialog-parquet-output
            v-if="dialog.ParquetOutput"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog"
          ></dialog-parquet-output>
          <dialog-h-base-output
            v-if="dialog.HBaseOutput"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog"
          ></dialog-h-base-output>
          <dialog-h-base-input
            v-if="dialog.HBaseInput"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog"
          ></dialog-h-base-input>
          <dialog-hadoop-enter-plugin
            v-if="dialog.HadoopEnterPlugin"
            :item="editItem"
            @on-close="onCloseDialog"
          ></dialog-hadoop-enter-plugin>
          <dialog-hadoop-exit-plugin
            v-if="dialog.HadoopExitPlugin"
            :item="editItem"
            @on-close="onCloseDialog"
          ></dialog-hadoop-exit-plugin>
          <dialog-access-output
            v-if="dialog.AccessOutput"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-access-output>
          <dialog-elastic-search
            v-if="dialog.ElasticSearchBulk"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog">
          </dialog-elastic-search>
          <dialog-pg-load
            v-if="dialog.PGBulkLoader"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog"></dialog-pg-load>
          <dialog-calculator
            v-if="dialog.Calculator"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-calculator>
          <dialog-abort
            v-if="dialog.Abort"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-abort>
          <dialog-switch-case
            v-if="dialog.SwitchCase"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-switch-case>
          <dialog-detect-empty-stream
            v-if="dialog.DetectEmptyStream"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-detect-empty-stream>
          <dialog-dummy
            v-if="dialog.Dummy"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-dummy>
          <dialog-append
            v-if="dialog.Append"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-append>
          <dialog-web-service-available
            v-if="dialog.WebServiceAvailable"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-web-service-available>
          <dialog-file-exists
            v-if="dialog.FileExists"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-file-exists>
          <dialog-file-locked
            v-if="dialog.FileLocked"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-file-locked>
          <dialog-table-exists
            v-if="dialog.TableExists"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-table-exists>
          <dialog-column-exists
            v-if="dialog.ColumnExists"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-column-exists>
          <dialog-rows-to-result
            v-if="dialog.RowsToResult"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-rows-to-result>
          <dialog-files-to-result
            v-if="dialog.FilesToResult"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-files-to-result>
          <dialog-trans-pgp-encry
            v-if="dialog.PGPEncryptStream"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-trans-pgp-encry>
          <dialog-trans-pgp-decry
            v-if="dialog.PGPDecryptStream"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-trans-pgp-decry>
          <dialog-reservoir-sampling
            v-if="dialog.ReservoirSampling"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-reservoir-sampling>
          <dialog-sample-rows
            v-if="dialog.SampleRows"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-sample-rows>
          <dialog-step-metrics
            v-if="dialog.StepsMetrics"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-step-metrics>
          <dialog-univariate-stats
            v-if="dialog.UnivariateStats"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-univariate-stats>
          <dialog-validator
            v-if="dialog.Validator"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog">
          </dialog-validator>
          <dialog-java-script
            v-if="dialog.ScriptValueMod"
            :item="editItem"
            @on-close="onCloseDialog">

          </dialog-java-script>
          <dialog-random-value
            v-if="dialog.RandomValue"
            :item="editItem"
            @on-close="onCloseDialog">

          </dialog-random-value>
          <dialog-get-sub-folder
            v-if="dialog.GetSubFolders"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-get-sub-folder>
          <dialog-get-file-names
            v-if="dialog.GetFileNames"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-get-file-names>
          <dialog-get-file-row-count
            v-if="dialog.GetFilesRowsCount"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-get-file-row-count>
          <dialog-exec-s-q-l
            v-if="dialog.ExecSQL"
            :item="editItem"
            @on-close="onCloseDialog">

          </dialog-exec-s-q-l>
          <dialog-user-defined-classes
            v-if="dialog.UserDefinedJavaClass"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-user-defined-classes>
          <dialog-set-variable
            v-if="dialog.SetVariable"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-set-variable>
          <dialog-get-variable
            v-if="dialog.GetVariable"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-get-variable>
          <dialog-db-join
            v-if="dialog.DBJoin"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-db-join>
          <dialog-ssh
            v-if="dialog.SSH"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-ssh>
          <dialog-step-meta-structure
            v-if="dialog.StepMetastructure"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-step-meta-structure>
          <dialog-select-fields
            v-if="dialog.SelectValues"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog">
          </dialog-select-fields>
          <dialog-tika-step
            v-if="dialog.TikaStep"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-tika-step>
          <dialog-hive-operator
            v-if="dialog.HiveOperatorStep"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-hive-operator>
          <dialog-table-hadoop-cat
            v-if="dialog.HadoopCatStep"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-table-hadoop-cat>
          <dialog-copy-from-local
            v-if="dialog.HadoopCopyFromLocalStep"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-copy-from-local>
          <dialog-get-from-hdfs
            v-if="dialog.HadoopGetFileFromHdfsStep"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-get-from-hdfs>
          <dialog-hadoop-chmod-privige
            v-if="dialog.HadoopChmodStep"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-hadoop-chmod-privige>
          <dialog-hadoop-delete
            v-if="dialog.HadoopDeleteStep"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-hadoop-delete>
          <dialog-hadoop-mkdir
            v-if="dialog.HadoopMkdirStep"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-hadoop-mkdir>
          <dialog-hadoop-move
            v-if="dialog.HadoopMoveStep"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-hadoop-move>
          <dialog-hbase-create-table
            v-if="dialog.HbaseCreateTableStep"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-hbase-create-table>
          <dialog-kafka-consumer
            v-if="dialog.KafkaConsumerStep"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-kafka-consumer>
          <dialog-sqoop
            v-if="dialog.SqoopImportStep"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-sqoop>
           <dialog-group-by
             v-if="dialog.GroupBy"
             :item="editItem"
             @on-close="onCloseDialog"
           ></dialog-group-by>
          <dialog-excel-out-put
            v-if="dialog.ExcelOutput"
            :item="editItem"
            @on-close="onCloseDialog">
          </dialog-excel-out-put>
          <dialog-sorted-merge
            v-if="dialog.SortedMerge"
            :item="editItem"
            :title="title"
            @on-close="onCloseDialog">

          </dialog-sorted-merge>
           <dialog-db-look-up
             v-if="dialog.DBLookup"
             :item="editItem"
             :title="title"
             @on-close="onCloseDialog"
           ></dialog-db-look-up>
           <dialog-sort-row
             v-if="dialog.SortRows"
             :item="editItem"
             :title="title"
             @on-close="onCloseDialog">
          </dialog-sort-row>
           <dialog-jion-rows
             v-if="dialog.JoinRows"
             :item="editItem"
             @on-close="onCloseDialog">
                </dialog-jion-rows>
           <dialog-merge-join
                  v-if="dialog.MergeJoin"
                  :item="editItem"
                  @on-close="onCloseDialog">
           </dialog-merge-join>
           <dialog-synchronize-after-merge
             v-if="dialog.SynchronizeAfterMerge"
             :item="editItem"
             :title="title"
             @on-close="onCloseDialog">
           </dialog-synchronize-after-merge>
           <dialog-db-pross
                  v-if="dialog.DBProc"
                  :item="editItem"
                  :title="title"
                  @on-close="onCloseDialog">
           </dialog-db-pross>
           <dialog-concat-fields
             v-if="dialog.ConcatFields"
             :item="editItem"
             :title="title"
             @on-close="onCloseDialog"
           ></dialog-concat-fields>
           <dialog-mapping-input
             v-if="dialog.MappingInput"
             :item="editItem"
             :title="title"
           ></dialog-mapping-input>
            <dialog-mapping-output
                  v-if="dialog.MappingOutput"
                  :item="editItem"
                  :title="title"
            ></dialog-mapping-output>
            <dialog-mongo-db-output
                  v-if="dialog.MongoDbOutput"
                  :item="editItem"
                  :title="title"
            ></dialog-mongo-db-output>
            <dialog-mongo-db-input
              v-if="dialog.MongoDbInput"
              :item="editItem"
              :title="title">
            </dialog-mongo-db-input>
             <dialog-files-from-result
               v-if="dialog.FilesFromResult"
               :item="editItem"
               :title="title">
             </dialog-files-from-result>
             <dialog-rows-from-result
               v-if="dialog.RowsFromResult"
               :item="editItem"
               :title="title"
             ></dialog-rows-from-result>
             <dialog-get-x-m-l-data
                  v-if="dialog.getXMLData"
                  :item="editItem"
                  :title="title"
             ></dialog-get-x-m-l-data>
             <dialog-property-output
               v-if="dialog.PropertyOutput"
               :item="editItem"
               :title="title"
             >
             </dialog-property-output>
                <dialog-delay
                  v-if="dialog.Delay"
                  :item="editItem"
                  :title="title"
                ></dialog-delay>
             <dialog-clone-row
               v-if="dialog.CloneRow"
               :item="editItem"
               :title="title">
             </dialog-clone-row>
             <dialog-mapping
                  v-if="dialog.Mapping"
                  :item="editItem"
                  :title="title">
             </dialog-mapping>
             <dialog-number-range
               v-if="dialog.NumberRange"
               :item="editItem"
               :title="title"
             ></dialog-number-range>
                <dialog-trans-exec
                  v-if="dialog.TransExecutor"
                  :item="editItem"
                  :title="title">
                </dialog-trans-exec>
                <dialog-jobs-exec
                  v-if="dialog.JobExecutor"
                  :item="editItem"
                  :title="title">
                </dialog-jobs-exec>
                <dialog-detect-flow
                  v-if="dialog.DetectLastRow"
                  :item="editItem"
                  :title="title">
                </dialog-detect-flow>
                <dialog-block-until-steps-finish
                  v-if="dialog.BlockUntilStepsFinish"
                  :item="editItem"
                  :title="title">
                </dialog-block-until-steps-finish>
                <dialog-orc-output
                  v-if="dialog.OrcOutput"
                  :item="editItem"
                  :title="title">
                </dialog-orc-output>
                <dialog-xml-output
                  v-if="dialog.XMLOutput"
                  :item="editItem"
                  :title="title">
                </dialog-xml-output>

              </div>
            </div>
          </div>
        </div>

      <router-view></router-view>
    </div>
</template>

<script>
import * as d3 from 'd3'
import DashFooter from '../layout/DashFooter'
import DashHeader from '../layout/DashHeader'
import Sidebar from '../layout/Sidebar'
import Chart from './chart'
import itemList from './item-list.vue'
import dialogPgLoad from './dialog/table-pg-load'
import dialogCsvInput from './dialog/table-csvinput'
import dialogExcelInput from './dialog/table-excelinput'
import dialogTextFileInput from './dialog/table-textfileinput'
import dialogRowGenerator from './dialog/table-rowgenerator'
import dialogJsonInput from './dialog/table-jsoninput'
import dialogCalculator from './dialog/table-calculator'
import dialogAbort from './dialog/table-abort'
import dialogInput from './dialog/table-input'
import dialogOutput from './dialog/table-output'
import dialogDelete from './dialog/table-delete'
import dialogInsertUpdate from './dialog/table-insert-update'
import dialogTextfileoutput from './dialog/table-textfileoutput'
import dialogSqlfileoutput from './dialog/table-sqlfileoutput'
import dialogUpdate from './dialog/table-update'
import dialogJsonOutput from './dialog/table-jsonoutput'
import dialogSwitchCase from './dialog/table-swith-case'
import dialogDetectEmptyStream from './dialog/table-detect-empty-stream'
import dialogDummy from './dialog/table-dummy'
import dialogConstant from './dialog/table-constant'
import dialogValuemapper from './dialog/table-valuemapper'
import dialogCodesplitfieldtorows3 from './dialog/table-codesplitfieldtorows3'
import dialogStringcut from './dialog/table-stringcut'
import dialogUnique from './dialog/table-unique'
import dialogUniquerowsbyhashset from './dialog/table-uniquerowsbyhashset'
import dialogSequence from './dialog/table-sequence'
import dialogReplacestring from './dialog/table-replacestring'
import dialogSetvaluefield from './dialog/table-setvaluefield'
import dialogIfnull from './dialog/table-ifnull'
import dialogNullif from './dialog/table-nullif'
import dialogAppend from './dialog/table-append'
import dialogWebServiceAvailable from './dialog/table-web-service-available'
import dialogFileExists from './dialog/table-file-exists'
import dialogRest from './dialog/table-rest'
import dialogHTTP from './dialog/table-http'
import dialogFileLocked from './dialog/table-file-locked'
import dialogTableExists from './dialog/table-table-exists'
import dialogColumnExists from './dialog/table-column-exists'
import dialogParquetInput from './dialog/table-parquet-input'
import dialogAvroInputNew from './dialog/table-avro-inputNew'
import dialogAvroOutput from './dialog/table-avro-output'
import dialogHadoopFileInputPlugin from './dialog/table-hadoopfileinputplugin'
import dialogHadoopFileOutputPlugin from './dialog/table-hadoopfileoutputplugin'
import dialogParquetOutput from './dialog/table-parquetoutput'
import dialogHBaseOutput from './dialog/table-hbaseoutput'
import dialogHBaseInput from './dialog/table-hbaseinput'
import dialogHadoopEnterPlugin from './dialog/table-hadoopenterplugin'
import dialogHadoopExitPlugin from './dialog/table-hadoopexitplugin'
import dialogAccessInput from './dialog/table-acess-input'
import dialogAccessOutput from './dialog/table-acess-output'
import dialogElasticSearch from './dialog/table-elasticsearch'
import dialogRowsToResult from './dialog/table-rows-to-result'
import dialogFilesToResult from './dialog/table-files-to-result'
import dialogTransPgpEncry from './dialog/table-trans-pgp-encry'
import dialogTransPgpDecry from './dialog/table-trans-pgp-decry'
import dialogReservoirSampling from './dialog/table-reservoir-sampling'
import dialogSampleRows from './dialog/table-sample-rows'
import dialogStepMetrics from './dialog/table-step-metrics'
import dialogUnivariateStats from './dialog/table-univariate-stats'
import dialogValidator from './dialog/table-validator'
import dialogJavaScript from './dialog/table-javascript'
import dialogRandomValue from './dialog/table-random-value'
import dialogGetSubFolder from './dialog/table-get-sub-folder'
import dialogGetFileNames from './dialog/table-get-file-names'
import dialogGetFileRowCount from './dialog/table-get-file-row-count'
import dialogExecSQL from './dialog/table-exec-sql'
import dialogUserDefinedClasses from './dialog/table-user-defined-classes'
import dialogSetVariable from './dialog/table-set-variable'
import dialogGetVariable from './dialog/table-get-variable'
import dialogDbJoin from './dialog/table-db-join'
import dialogSsh from './dialog/table-ssh'
import dialogStepMetaStructure from './dialog/table-step-meta-structure'
import dialogSelectFields from './dialog/table-select-fields'
import dialogTikaStep from './dialog/table-tika-step'
import dialogHiveOperator from './dialog/table-hive-operator'
import dialogTableHadoopCat from './dialog/table-hadoop-cat'
import dialogCopyFromLocal from './dialog/table-copy-from-local'
import dialogGetFromHdfs from './dialog/table-get-from-hdfs'
import dialogHadoopChmodPrivige from './dialog/table-hadoop-chmod-privige'
import dialogHadoopDelete from './dialog/table-hadoop-delete'
import dialogHadoopMkdir from './dialog/table-hadoop-mkdir'
import dialogHadoopMove from './dialog/table-hadoop-move'
import dialogHbaseCreateTable from './dialog/table-hbase-create-table'
import dialogKafkaConsumer from './dialog/table-kafka-consumer'
import dialogSqoop from './dialog/table-sqoop'
import dialogExcelOutPut from './dialog/table-excel-output'
import dialogGroupBy from './dialog/table-group-by'
import dialogSortedMerge from './dialog/table-sorted-merge'
import dialogDbLookUp from './dialog/table-db-lookup'
import dialogSortRow from './dialog/table-sort-rows'
import dialogJionRows from './dialog/table-join-rows'
import dialogMergeJoin from './dialog/table-merge-join'
import dialogSynchronizeAfterMerge from './dialog/table-synchronize-AfterMerge'
import dialogDbPross from './dialog/table-db-process'
import dialogConcatFields from './dialog/table-concatFields'
import dialogMappingInput from './dialog/table-mapping-input'
import dialogMappingOutput from './dialog/table-mapping-output'
import dialogMongoDbOutput from './dialog/table-mongodb-output'
import dialogMongoDbInput from './dialog/table-mongodb-input'
import dialogFilesFromResult from './dialog/table-files-from-result'
import dialogRowsFromResult from './dialog/table-rows-from-result'
import dialogGetXMLData from './dialog/tablegetXMLData'
import dialogPropertyOutput from './dialog/table-PropertyOutput'
import dialogDelay from './dialog/table-delay'
import dialogCloneRow from './dialog/table-clone-row'
import dialogMapping from './dialog/table-mapping'
import dialogNumberRange from './dialog/table-number-range'
import dialogTransExec from './dialog/table-trans-exec'
import dialogJobsExec from './dialog/table-job-exec'
import dialogDetectFlow from './dialog/table-detect-flow'
import dialogBlockUntilStepsFinish from './dialog/table-blockUntilStepsFinish'
import dialogOrcOutput from './dialog/table-orc-output.vue'
import dialogXmlOutput from './dialog/table-xml-output'


let chart = null
export default {
  components: {
    itemList,
    dialogPgLoad,
    dialogCsvInput,
    dialogExcelInput,
    dialogTextFileInput,
    dialogRowGenerator,
    dialogJsonInput,
    dialogCalculator,
    dialogInput,
    dialogOutput,
    dialogDelete,
    dialogTextfileoutput,
    dialogSqlfileoutput,
    dialogUpdate,
    dialogInsertUpdate,
    dialogJsonOutput,
    dialogConcatFields,
    dialogAbort,
    dialogConstant,
    dialogValuemapper,
    dialogCodesplitfieldtorows3,
    dialogStringcut,
    dialogUnique,
    dialogUniquerowsbyhashset,
    dialogSequence,
    dialogReplacestring,
    dialogSetvaluefield,
    dialogIfnull,
    dialogNullif,
    dialogXmlOutput,
    dialogSwitchCase,
    dialogDetectEmptyStream,
    dialogRest,
    dialogHTTP,
    dialogDummy,
    dialogParquetInput,
    dialogAvroInputNew,
    dialogAvroOutput,
    dialogHadoopFileInputPlugin,
    dialogHadoopFileOutputPlugin,
    dialogParquetOutput,
    dialogHBaseOutput,
    dialogHBaseInput,
    dialogHadoopEnterPlugin,
    dialogHadoopExitPlugin,
    dialogAccessInput,
    dialogAccessOutput,
    dialogElasticSearch,
    dialogAppend,
    dialogWebServiceAvailable,
    dialogFileExists,
    dialogFileLocked,
    dialogTableExists,
    dialogColumnExists,
    dialogRowsToResult,
    dialogFilesToResult,
    dialogTransPgpEncry,
    dialogTransPgpDecry,
    dialogReservoirSampling,
    dialogSampleRows,
    dialogStepMetrics,
    dialogUnivariateStats,
    dialogValidator,
    dialogJavaScript,
    dialogRandomValue,
    dialogGetSubFolder,
    dialogGetFileNames,
    dialogGetFileRowCount,
    dialogExecSQL,
    dialogUserDefinedClasses,
    dialogSetVariable,
    dialogGetVariable,
    dialogDbJoin,
    dialogSsh,
    dialogStepMetaStructure,
    dialogSelectFields,
    dialogTikaStep,
    dialogHiveOperator,
    dialogTableHadoopCat,
    dialogCopyFromLocal,
    dialogGetFromHdfs,
    dialogHadoopChmodPrivige,
    dialogHadoopDelete,
    dialogHadoopMkdir,
    dialogHadoopMove,
    dialogHbaseCreateTable,
    dialogKafkaConsumer,
    dialogSqoop,
    dialogExcelOutPut,
    dialogGroupBy,
    dialogSortedMerge,
    dialogDbLookUp,
    dialogSortRow,
    dialogJionRows,
    dialogMergeJoin,
    dialogSynchronizeAfterMerge,
    dialogDbPross,
    dialogMappingInput,
    dialogMappingOutput,
    dialogMongoDbOutput,
    dialogMongoDbInput,
    dialogFilesFromResult,
    dialogRowsFromResult,
    dialogGetXMLData,
    dialogPropertyOutput,
    dialogDelay,
    dialogCloneRow,
    dialogMapping,
    dialogNumberRange,
    dialogTransExec,
    dialogJobsExec,
    dialogDetectFlow,
    dialogBlockUntilStepsFinish,
    dialogOrcOutput,
    DashFooter,
    DashHeader,
    Sidebar
  },
  name: 'topo',
  data() {
    return {
      userInfo:{},
      classes: {
        fixed_layout: false,
        hide_logo: false
      },
      editItem: null,
      visible: false,
      title: null,
      title1:'hahah',
      list: [],
      dialog: {
        CsvInput: false,
        ExcelInput: false,
        TextFileInput: false,
        RowGenerator: false,
        JsonInput: false,
        AccessInput:false,
        XMLOutput: false,
        ElasticSearchBulk:false,
        TableInput: false,
        TableOutput: false,
        Delete: false,
        InsertUpdate: false,
        TextFileOutput: false,
        SQLFileOutput: false,
        Update: false,
        JsonOutput: false,
        AccessOutput:false,
        PGBulkLoader:false,
        Constant: false,
        TransExecutor:false,
        ValueMapper: false,
        SplitFieldToRows3: false,
        StringCut: false,
        Unique: false,
        UniqueRowsByHashSet: false,
        Sequence: false,
        ReplaceString: false,
        SetValueField: false,
        IfNull: false,
        OrcOutput:false,
        NullIf: false,
        Calculator:false,
        Rest: false,
        HTTP: false,
        Abort:false,
        SwitchCase:false,
        ParquetInput: false,
        AvroInputNew: false,
        AvroOutput: false,
        BlockUntilStepsFinish:false,
        HadoopFileInputPlugin: false,
        HadoopFileOutputPlugin: false,
        ParquetOutput: false,
        HBaseOutput: false,
        HBaseInput: false,
        HadoopEnterPlugin: false,
        HadoopExitPlugin: false,
        DetectEmptyStream:false,
        Dummy:false,
        Append:false,
        WebServiceAvailable:false,
        FileExists:false,
        FileLocked:false,
        TableExists:false,
        ColumnExists:false,
        RowsToResult:false,
        FilesToResult:false,
        PGPEncryptStream:false,
        PGPDecryptStream:false,
        ReservoirSampling:false,
        SampleRows:false,
        StepsMetrics:false,
        UnivariateStats:false,
        Validator:false,
        ScriptValueMod:false,
        RandomValue:false,
        GetSubFolders:false,
        GetFileNames:false,
        GetFilesRowsCount:false,
        ExecSQL:false,
        UserDefinedJavaClass:false,
        SetVariable:false,
        GetVariable:false,
        DBJoin:false,
        SSH:false,
        StepMetastructure:false,
        SelectValues:false,
        TikaStep:false,
        HiveOperatorStep:false,
        HadoopCatStep:false,
        HadoopCopyFromLocalStep:false,
        HadoopGetFileFromHdfsStep:false,
        HadoopChmodStep:false,
        HadoopDeleteStep:false,
        HadoopMkdirStep:false,
        HadoopMoveStep:false,
        HbaseCreateTableStep:false,
        KafkaConsumerStep:false,
        SqoopImportStep:false,
        ExcelOutput:false,
        GroupBy:false,
        SortedMerge:false,
        DBLookup:false,
        SortRows:false,
        JoinRows:false,
        MergeJoin:false,
        SynchronizeAfterMerge:false,
        DBProc:false,
        ConcatFields:false,
        MappingInput:false,
        MappingOutput:false,
        MongoDbOutput:false,
        MongoDbInput:false,
        FilesFromResult:false,
        RowsFromResult:false,
        PropertyOutput:false,
        getXMLData:false,
        Mapping:false,
        DetectLastRow:false,
        Delay:false,
        NumberRange:false,
        JobExecutor:false,
        CloneRow:false
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
      let param=new Object();
      this.$api.getTransMenuList(param,res => {
        if (res.code === 200) {
          that.list = res.data
          that.$nextTick(() => {
            that.bindDragEvent()
          })
        }
      })
      // 详情
      if (this.$route.query.id) {
          let param=new Object();
          param.id= this.$route.query.id;
        this.$api.getTransById(param,res => {
            if (res.code === 200) {
              let result = res.data
              let obj = {}
              this.title = result.jobName
              for (let k in result.step) {
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
        )
      }
    },
    getData({ val, id = null }) {
      let map = []
      for (let k in chart.getItems()) {
        map.push(
          Object.assign(
            {},
            {
              id: chart.getItems()[k].id,
              name: chart.getItems()[k].data
                ? chart.getItems()[k].data.name
                : '',
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
      this.result = Object.assign({ id }, { jobName: val, step: map })
      return this.result
    },
    save() {
      if (!this.title) {
        this.$alert('请输入转换名称')
      } else {
          let that=this;
        this.$api
          .getCreateTrans(
                  this.getData({
                  val: this.title,
                  id: this.$route.query.id ? this.$route.query.id : null
              })
        , res => {
            if (res.code === 200) {
              this.visible = false
              this.$alert('保存成功');
              this.$router.push('/index/trans')
            } else {
                that.$alert(res.message);
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
     // $('#identifier').modal('show')
    },
    onCloseDialog(item) {
      this.dialog[item.code] = false
        $('#myModal').modal('hide')
    }
  },
  computed: {
  },
}
</script>
<style>
  .port {
    fill: #ddd;
    stroke: #999;
    stroke-width: 1;
    cursor: crosshair;
  }
  .line {
    fill: none;
    stroke: #999;
    stroke-width: 3px;
  }
  .item_label {
    font-size: 13px;
    fill: #fff;
    stroke-width: 0;
    user-select: none;
  }

</style>

