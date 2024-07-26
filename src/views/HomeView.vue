<template>
  <div class="container mx-auto flex flex-col gap-5 pt-5">
    <div class="flex gap-3 py-5 bg-black rounded p-6">
      <div class="w-32">
        <select
          v-model="newWork.projectId"
        >
          <option
            v-for="project in projects"
            :key="project.id"
            :value="project.id"
          >
            {{ project.name }}
          </option>
        </select>
      </div>
      <div class="w-52">
        <select
          v-model="newWork.taskId"
        >
          <option
            v-for="task in tasks"
            :key="task.id"
            :value="task.id"
          >
            {{ task.name }}
          </option>
        </select>
      </div>
      <div class="w-64">
        <input
          v-model="newWork.startedAt"
          type="datetime-local"
        >
      </div>
      <div class="w-64">
        <input
          v-model="newWork.endedAt"
          type="datetime-local"
        >
      </div>
      <div>
        <input
          v-model="newWork.description"
          type="text"
          placeholder="Description"
        >
      </div>
      <div class="flex items-center justify-end ">
        <button
          @click="addWork"
        >
          Add
        </button>
      </div>
    </div>
    <div class="flex flex-col gap-3 bg-black rounded p-6">
      <div class="flex gap-4 font-bold py-3">
        <div class="w-32">
          Project
        </div>
        <div class="w-52">
          Task
        </div>
        <div class="w-64">
          Started at
        </div>
        <div class="w-64">
          Ended at
        </div>
        <div>
          Description
        </div>
      </div>
      <div
        v-for="work in works"
        :key="work.id"
        class="flex gap-4 py-1"
      >
        <div class="w-32">
          {{ work.project.name }}
        </div>
        <div class="w-52">
          {{ work.task.name }}
        </div>
        <div class="w-64">
          {{ $dayjs(work.startedAt).fromNow() }}
        </div>
        <div class="w-64">
          {{ $dayjs(work.endedAt).fromNow() }}
        </div>
        <div>
          {{ work.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import tasksApi from '@/api/tasks';
import worksApi from '@/api/works';
import projectsApi from '@/api/projects';

export default {
  data() {
    return {
      newWork: {
        projectId: 1,
        taskId: null,

        description: '',
        startedAt: this.$dayjs().format('YYYY-MM-DDTHH:mm'),
        endedAt: null,

      },
      projects: [ ],
      tasks: [ ],
      works: [],
    };
  },
  mounted() {
    this.fetchProjects();
    this.fetchTasks();
    this.fetchWorks();
  },
  methods: {
    async addWork() {
      await tasksApi.works.create(this.newWork.taskId, this.newWork);
      this.fetchWorks();
    },
    async fetchProjects() {
      this.projects = (await projectsApi.getAll()).data.data;
    },
    async fetchTasks() {
      this.tasks = (await projectsApi.tasks.getAll(this.newWork.projectId)).data.data;
    },
    async fetchWorks() {
      this.works = (await worksApi.mine()).data.data;
    },
  },
};

</script>
