<template>
  <ul class="nav justify-content-center">
    <li class="nav-item title">
      <a class="nav-link"><i class="fab fa-korvue fa-2x"></i> anban</a>
    </li>
    <li class="nav-item">
      <button class="btn btn-custom" data-toggle="modal" data-target="#addTask"><i class="far fa-plus-square"></i> Add Task</button>
    </li>
    <add-task :title='title' :description='description' :point='point' :assigned='assigned' :status='status' :tasks='tasks'></add-task>
  </ul>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return { }
  }
}
</script>

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
</style>
