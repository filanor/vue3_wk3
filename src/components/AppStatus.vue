<template>
  <span class="badge" :class = "className">{{ text }}</span>
</template>

<script>
import { computed } from "vue";
export default { 
  props: ["type"],
  setup( props ){
    console.log(props)

    const text = computed(() => {
      return props.type === "pending" ? "Просрочен" : 
             props.type === "cancelled" ? "Отменен" :
             props.type === "done" ? "Завершен" : "В работе";
    });
    const className = computed(() => {
      return props.type === "pending" ? "warning" : 
             props.type === "cancelled" ? "danger" : "primary"
    })
    return {
      text,
      className
    }
  }
}
</script>