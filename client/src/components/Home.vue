<template>
<div>
  <!-- nav -->
  <ul class="nav justify-content-center">
    <li class="nav-item title">
      <a class="nav-link"><i class="fab fa-korvue fa-2x"></i> anban</a>
    </li>
    <li class="nav-item">
      <button class="btn btn-custom" data-toggle="modal" data-target="#addTask"><i class="far fa-plus-square"></i> Add Task</button>
    </li>
  </ul>
  <!-- card -->
  <div class="container menu row">
    <div class="col-sm-3" v-for='(list, index) in lists' :key=index>
      <div class="card">
        <div class="card-header back-log">
          {{list}}
        </div>
        <!-- <div class="card-body collapse" id="task" v-for='task in taskfire' :key='task[".key"]' style="margin-bottom:20px;"> -->
          <!-- <task :tasks='tasks'></task> -->
          <div class="card" v-if="task.status === list" v-for='task in taskfire' :key='task[".key"]' style="margin-bottom:20px;">
            <div class="card-header title">
              {{ task.title }}
            </div>
              <div class="card-body task">
                  <p class="card-text">Point :</p>
                  <p class="card-text">{{task.point}}</p>
                  <p class="card-text">Assigned to :</p>
                  <p class="card-text">{{task.assigned}}</p>
                  <div class="row">
                    <div class="col-md-3">
                      <a href="#" class="btn btn-danger" v-if="task.status === 'backlog'"> <i class="far fa-trash-alt"></i> </a>
                      <a href="#" class="btn btn-danger" v-if="task.status === 'todo'" @click="move(task, lists[0])"><i class="fas fa-chevron-circle-left"></i> </a>
                      <a href="#" class="btn btn-danger" v-if="task.status === 'doing'" @click="move(task, lists[1])"><i class="fas fa-chevron-circle-left"></i> </a>
                      <a href="#" class="btn btn-danger" v-if="task.status === 'done'" @click="move(task, lists[2])"><i class="fas fa-chevron-circle-left"></i> </a>
                    </div>
                    <div class="col-md-5">
                      <a href="#" class="btn btn-primary">detail</a>
                    </div>
                    <div class="col-md-3">
                      <a href="#" class="btn btn-warning" v-if='task.status === "backlog"' @click="move(task, lists[1])"><i class="fas fa-chevron-circle-right"></i> </a>
                      <a href="#" class="btn btn-warning" v-if='task.status === "todo"' @click="move(task, lists[2])"><i class="fas fa-chevron-circle-right"></i> </a>
                      <a href="#" class="btn btn-warning" v-if='task.status === "doing"' @click="move(task, lists[3])"><i class="fas fa-chevron-circle-right"></i> </a>
                      <a href="#" class="btn btn-success" v-if='task.status === "done"' @click="move(task, lists[3])"><i class="far fa-check-circle"></i> </a>
                    </div>
                  </div>
              </div>
            </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
  <!-- modal -->
  <div class="modal fade" id="addTask" tabindex="-1" role="dialog" aria-labelledby="addTaskLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addTaskLabel">Add Task</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="title" class="col-form-label">Title:</label>
              <input type="text" class="form-control" id="title" v-model='title' placeholder="title" required>
            </div>
            <div class="form-group">
              <label for="description" class="col-form-label">Description:</label>
              <textarea class="form-control" id="description" v-model='description' placeholder="description" required></textarea>
            </div>
            <div class="form-group">
              <label for="point" class="col-form-label">Point:</label>
              <input type="number" class="form-control" id="point" v-model='point' placeholder="point" required>
            </div>
            <div class="form-group">
              <label for="assigned" class="col-form-label">Assigned to:</label>
              <input type="text" class="form-control" id="assigned" v-model='assigned' placeholder="assigned to" required>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-warning" data-dismiss="modal" @click="addTask">Add Task</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Navbar from '../components/Navbar'
import Task from '../components/Task'
import {db} from '../Firebase'
let taskRef = db.ref('tasks')

export default {
  name: 'Home',
  components: {
    Navbar,
    Task
  },
  data () {
    return {
      title: null,
      description: null,
      point: null,
      assigned: null,
      status: 'backlog',
      tasks: [],
      lists: ['backlog', 'todo', 'doing', 'done']
    }
  },
  firebase: {
    taskfire: taskRef
  },
  created () {
    this.getData()
  },
  methods: {
    addTask: function () {
      this.$firebaseRefs.taskfire.push({
        title: this.title,
        description: this.description,
        point: this.point,
        assigned: this.assigned,
        status: 'backlog'
      })
    },
    getData: function () {
      let self = this
      this.$firebaseRefs.taskfire.on('value', function (snapshot) {
        self.tasks = snapshot.val()
      })
    },
    move: function (task, target) {
      // console.log(task)
      // console.log(target)
      // console.log(this.$firebaseRefs.taskfire)
      this.$firebaseRefs.taskfire.child(task['.key']).child('status').set(target)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
ul
{
  background-color: #602F6B;
  color: #ffcc00;
  font-weight: bolder;
  padding-top: 10px;
  padding-left: 10px;
}
.title
{
  font-weight: bolder;
}
.btn-custom {
    color: #ffcc00!important;
    background-color: transparent;
    border-color: #ffcc00!important; /*set the color you want here*/
}
.btn-custom:hover, .btn-custom:focus, .btn-custom:active, .btn-custom.active, .open>.dropdown-toggle.btn-custom {
    color: #003399!important;
    background-color: #ffcc00!important;
    border-color: #ffcc00!important; /*set the color you want here*/
}
.menu
{
  margin: 30px auto;
  padding: 0 0;
}
.back-log
{
  background-color: red;
  color: whitesmoke;
  font-weight: bold;
}
.to-do
{
  background-color: orange;
  color: whitesmoke;
  font-weight: bold;
}
.doing
{
  background-color: cornflowerblue;
  color: whitesmoke;
  font-weight: bold;
}
.done
{
  background-color: lawngreen;
  color: whitesmoke;
  font-weight: bold;
}
form
{
  text-align: left;
}
</style>
