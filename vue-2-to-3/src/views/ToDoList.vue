<template>
  <div clasee="todoView">
    <h1>To-Do List</h1>
    <to-do-form @todo-added="addToDo"></to-do-form>
    <h2 id="list-summary" ref="listSummary" tabindex="-1">{{ listSummary }}</h2>
    <ul aria-labelledby="list-summary" class="stack-large">
      <li v-for="item in ToDoItems" :key="item.id">
        <to-do-item
          :label="item.label"
          :done="item.done"
          :id="item.id"
          @checkbox-changed="updateDoneStatus(item.id)"
          @item-deleted="deleteToDo(item.id)"
          @item-edited="editToDo(item.id, $event)"
        >
        </to-do-item>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import ToDoItem from "@/components/ToDoItem.vue";
import ToDoForm from "@/components/ToDoForm.vue";
import uniqueId from "lodash.uniqueid";

const ToDoItems = ref([
  {
    id: uniqueId("todo-"),
    label: "Create the Vue 2 todo project",
    done: false,
  },
  {
    id: uniqueId("todo-"),
    label: "Migrate the Vue 2 todo project to Vue 3 with Composition API",
    done: false,
  },
  { id: uniqueId("todo-"), label: "Migrate the Vue 3 comp", done: false },
  {
    id: uniqueId("todo-"),
    label: "Migrate the Vue 3 to Nuxt.js SSR",
    done: false,
  },
]);

const listSummary = computed(() => {
  const numberFinishedItems = ToDoItems.value.filter(
    (item) => item.done
  ).length;
  return `${numberFinishedItems} out of ${ToDoItems.value.length} items completed`;
});

const addToDo = (toDoLabel) => {
  ToDoItems.value.push({
    id: uniqueId("todo-"),
    label: toDoLabel,
    done: false,
  });
};

const updateDoneStatus = (toDoId) => {
  const toDoToUpdate = ToDoItems.value.find((item) => item.id === toDoId);
  toDoToUpdate.done = !toDoToUpdate.done;
};

const deleteToDo = (toDoId) => {
  const itemIndex = ToDoItems.value.findIndex((item) => item.id === toDoId);
  ToDoItems.value.splice(itemIndex, 1);
};

const editToDo = (toDoId, newLabel) => {
  const toDoToEdit = ToDoItems.value.find((item) => item.id === toDoId);
  toDoToEdit.label = newLabel;
};
</script>

<style>
.todoView {
  margin: 0 auto;
  max-width: 40rem;
  padding: 0 1rem;
  align-items: center;
  justify-content: ;
}
/* Global styles */
.btn {
  padding: 0.8rem 1rem 0.7rem;
  border: 0.2rem solid #4d4d4d;
  cursor: pointer;
  text-transform: capitalize;
}
.btn__danger {
  color: #fff;
  background-color: #ca3c3c;
  border-color: #bd2130;
}
.btn__filter {
  border-color: lightgrey;
}
.btn__danger:focus {
  outline-color: #c82333;
}
.btn__primary {
  color: #fff;
  background-color: #000;
}
.btn-group {
  display: flex;
  justify-content: space-between;
}
.btn-group > * {
  flex: 1 1 auto;
}
.btn-group > * + * {
  margin-left: 0.8rem;
}
.label-wrapper {
  margin: 0;
  flex: 0 0 100%;
  text-align: center;
}
[class*="__lg"] {
  display: inline-block;
  width: 100%;
  font-size: 1.9rem;
}
[class*="__lg"]:not(:last-child) {
  margin-bottom: 1rem;
}
@media screen and (min-width: 620px) {
  [class*="__lg"] {
    font-size: 2.4rem;
  }
}
.visually-hidden {
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
}
[class*="stack"] > * {
  margin-top: 0;
  margin-bottom: 0;
}
.stack-small > * + * {
  margin-top: 1.25rem;
}
.stack-large > * + * {
  margin-top: 2.5rem;
}
@media screen and (min-width: 550px) {
  .stack-small > * + * {
    margin-top: 1.4rem;
  }
  .stack-large > * + * {
    margin-top: 2.8rem;
  }
}
</style>
