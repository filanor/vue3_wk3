<template>
  <form class="card">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="title" />
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="date" />
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="description"></textarea>
    </div>

    <button class="btn primary" :disabled="!readyToSave" @click.prevent="saveTask">
      Создать
    </button>
  </form>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    const title = ref("");
    const date = ref("");
    const description = ref("");

    function saveTask() {
      const today =  new Date();
      const taskdate = new Date(date.value);
      const newTask = {
        id: Math.random().toString(36).substr(2, 9),
        title: title.value,
        date: date.value,
        description: description.value,
        status: today.getTime() <= taskdate.getTime() ? "active" : "pending"
      }
      store.dispatch('saveTask', newTask);
      router.push('/');
    }

    const readyToSave = computed( () => {
      return title.value.trim() != "" &&
        description.value.trim() != "" &&
        date.value != "" ? true : false
    });

    return {
      title,
      date,
      description,
      readyToSave,
      saveTask
    }
  }
}
</script>