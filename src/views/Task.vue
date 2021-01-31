<template>
  <div class="card" v-if="task">
    <h2> {{ task.title }}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="task.status" /></p>
    <p><strong>Дэдлайн</strong>: {{ new Date().toLocaleDateString() }}</p>
    <p><strong>Описание</strong>: {{ task.description }}</p>
    <div>
      <button class="btn" @click.prevent="changeStatus('active')">Взять в работу</button>
      <button class="btn primary" @click.prevent="changeStatus('done')">Завершить</button>
      <button class="btn danger" @click.prevent="changeStatus('cancelled')">Отменить</button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{ id }}</strong> нет.
  </h3>
</template>

<script>
import AppStatus from "../components/AppStatus";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
  setup(){
    const route = useRoute();
    const store = useStore();

    const id = route.params.id;

    const task = computed(() => store.getters.getTask(id));

    function changeStatus(status){
      const newTask = { ...task.value, status }
      store.dispatch("updateTask", newTask);
    };

    return {
      task,
      id,
      changeStatus
    }
  },
  components: { AppStatus }
}
</script>