<template>
  <li class="liItem">
    {{people.nombre}} de 
    {{people.edad}} años,  
    {{people.sexo}}
    <button @click="editMe"><i class="material-icons fs18">edit</i></button>
    <button @click="deleteMe"><i class="material-icons fs18">delete</i></button>
  </li>
</template>
<script>
export default {
  name: 'person-item',
  props: {
    people: Object,
    i: Number
  },
  methods: {
    editMe(){
      this.$emit('edit',this.i);
    },
    deleteMe(){
      this.$emit('delete', this.i);
    }
  }
}
</script>

<style>
  .fs18{
    font-size: 18px;
  }
</style>

