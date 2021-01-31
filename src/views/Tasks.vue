<template>
  <h1 v-if = "!tasksList" class="text-white center">Задач пока нет</h1>
  <template v-else>
    <h3 class="text-white">Всего активных задач: {{ activeTask }}</h3>
    <!-- <task v-for = "task in tasksList" :key="task.title" :task="task"></task> -->
    <div class="card" v-for = "task in tasksList" :key="task.id">
      <h2 class="card-title">
        {{ task.title }}
        <AppStatus :type="task.status" />
      </h2>
      <p>
        <strong>
          <small>
            {{ new Date().toLocaleDateString() }}
          </small>
        </strong>
      </p>
      <button class="btn primary" @click="$router.push(`/task/${task.id}`)">Посмотреть</button>
    </div>
  </template>
</template>

<script>
import AppStatus from "../components/AppStatus";
// import Task from "./Task"
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    const store = useStore();

    const tasksList = computed(() => store.getters.getTasks);
    const activeTask = computed(() => store.getters.getActiveCount);

    return {
      tasksList,
      activeTask,
    }
  },
  components: { AppStatus }
}
</script>
