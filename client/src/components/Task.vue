<template>
<div>
  <div class="card" v-for='(task, index) in taskfire' :key=index style="margin-bottom:20px;">
    <div class="card-header title">
      {{task.title}}
    </div>
      <div class="card-body task">
          <p class="card-text">Point :</p>
          <p class="card-text">{{task.point}}</p>
          <p class="card-text">Assigned to :</p>
          <p class="card-text">{{task.assigned}}</p>
          <div class="row">
            <div class="col-md-3">
              <a href="#" class="btn btn-outline-danger" v-if="task.status === 'backlog'"> <i class="far fa-trash-alt"></i> </a>
              <a href="#" class="btn btn-outline-danger" v-if="task.status === 'todo'"> <i class="fas fa-chevron-circle-left"></i> </a>
            </div>
            <div class="col-md-5">
              <a href="#" class="btn btn-primary">detail</a>
            </div>
            <div class="col-md-3">
              <a href="#" class="btn btn-warning" v-if='task.status === "backlog"' @click="move(task, lists[1])"> <i class="fas fa-chevron-circle-right"></i> </a>
              <a href="#" class="btn btn-warning" v-if='task.status === "todo"' @click="move(task, lists[2])"> <i class="fas fa-chevron-circle-right"></i> </a>
              <a href="#" class="btn btn-warning" v-if='task.status === "doing"' @click="move(task, lists[3])"> <i class="fas fa-chevron-circle-right"></i> </a>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import {db} from '../Firebase'
let taskRef = db.ref('tasks')

export default {
  name: 'Task_List',
  data () {
    return {
      lists: ['backlog', 'todo', 'doing', 'done']
    }
  },
  firebase: {
    taskfire: taskRef
  },
  methods: {
    move: function (task, target) {
      // console.log(task)
      // console.log(target)
      // console.log(this.$firebaseRefs.taskfire)
      this.$firebaseRefs.taskfire.child(task['.key']).child('status').set(target)
    }
  }
}
</script>

<style>
.task
{
  text-align: left;
}
</style>
