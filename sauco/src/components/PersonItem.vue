<template>
  <li class="liItem">
    {{people.nombre}} de 
    {{people.edad}} años,  
    {{people.sexo}}
    <button class="button" @click="editMe"><i class="material-icons fs18">{{editBtn}}</i></button>
    <button class="button" @click="deleteMe"><i class="material-icons fs18">delete</i></button>
  </li>
</template>
<script>
export default {
  name: 'person-item',
  data(){
    return{
      editBtn : "edit"
    }
  },
  props: {
    people: Object,
  },
  methods: {
    editMe(){
      this.$emit('edit',this.people.id);
      if(this.editBtn === "edit"){
        this.editBtn = "cancel";
      } else {
        this.editBtn = "edit";
      }
    },
    deleteMe(){
      this.$emit('delete', this.people.id);
    }
  }
}
</script>

<style>
  .fs18{
    font-size: 18px;
  }
  .button{
    cursor: pointer;
    margin-left:5px;
  }
</style>

