<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/**
全局滚动条样式
*/
 .el-table__body-wrapper::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
 .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 3px;
  }

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: #a1a3a9;
  border-radius: 3px;
}

.treeScrollbar::-webkit-scrollbar-track-piece {
  background-color: #f1f1f1;
}
 
.treeScrollbar::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
 
.treeScrollbar::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  background-clip: padding-box;
  min-height: 28px;
  border-radius: 8px;
}
 
.treeScrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #a8a8a8;
}
</style>