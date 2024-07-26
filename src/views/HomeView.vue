<template>
  <div class="container mx-auto flex flex-col gap-5 pt-5">
    <div class="flex flex-col gap-3 py-5 bg-black dark:bg-gray-950 dark:text-white rounded p-6">
      <div class="flex gap-4 font-bold">
        <div class="w-52">
          Project
        </div>
        <div class="w-52">
          Task
        </div>
        <div class="w-60">
          Started at
        </div>
        <div class="w-60">
          Ended at
        </div>
        <div class="flex-grow">
          Description
        </div>
      </div>
      <div class="flex gap-4 font-bold">
        <div class="w-52">
          <select
            v-model="newWork.projectId"
            class="w-full dark:bg-slate-900 dark:border-0 rounded"
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
            class="w-full dark:bg-slate-900 dark:border-0 rounded"
          >
            <option
              v-for="task in newWork.tasks"
              :key="task.id"
              :value="task.id"
            >
              {{ task.name }}
            </option>
          </select>
        </div>
        <div class="w-60">
          <input
            v-model="newWork.startedAt"
            class="dark:bg-slate-900 dark:border-0 rounded w-full"
            type="datetime-local"
          >
        </div>
        <div class="w-60">
          <input
            v-model="newWork.endedAt"
            class="dark:bg-slate-900 dark:border-0 rounded w-full"
            type="datetime-local"
          >
        </div>
        <div class="flex-grow">
          <textarea
            v-model="newWork.description"
            class="dark:bg-slate-900 dark:border-0 rounded min-h-10 h-20 w-full"
            type="text"
            placeholder="Description"
            @keypress.ctrl.enter="addWork"
          />
        </div>
        <div class="flex items-center justify-center w-10">
          <button
            @click="addWork"
          >
            add
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-3 bg-black dark:bg-gray-950 dark:text-white rounded p-6">
      <div class="flex gap-4 font-bold py-3">
        <div class="w-52">
          Project
        </div>
        <div class="w-52">
          Task
        </div>
      </div>
      <div
        class="flex gap-4 py-1"
      >
        <div class="w-52">
          <select
            v-model="newTask.projectId"
            class="min-w-full dark:bg-slate-900 dark:border-0 rounded"
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
          <input
            v-model="newTask.name"
            type="text"
            placeholder="Task name"
            class="w-full dark:bg-slate-900 dark:border-0 rounded"
          >
        </div>
        <div class="flex items-center justify-end ">
          <button
            @click="createTask"
          >
            Add
          </button>
        </div>
      </div>
      <div
        v-for="task in tasks"
        :key="task.id"
        class="flex gap-4 py-1"
      >
        <div class="w-52">
          {{ task.project.name }}
        </div>
        <div class="w-52">
          {{ task.name }}
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-3 bg-black dark:bg-gray-950 dark:text-white rounded p-6">
      <div class="flex gap-4 font-bold py-3">
        <div class="w-52">
          Project
        </div>
        <div class="w-52">
          Task
        </div>
        <div class="w-60">
          Started at
        </div>
        <div class="w-60">
          Ended at
        </div>
        <div>
          Description
        </div>
      </div>
      <div
        v-for="day in worksByDay"
        :key="day.id"
        class="flex flex-col gap-4 py-1"
      >
        <div class="font-bold pt-4 pb-1 flex gap-3 items-center">
          <div class="">
            {{ day.date }}
          </div>
          <div class="dark:bg-white flex-grow h-[1px]" />
        </div>
        <div
          v-for="work in day.works"
          :key="work.id"
          class="flex gap-4 py-1"
        >
          <div class="min-w-52 flex items-center">
            {{ work.project.name }}
          </div>
          <div class="min-w-52 flex items-center">
            {{ work.task.name }}
          </div>
          <div class="min-w-60 flex items-center">
            {{ $dayjs(work.startedAt).format('HH:mm') }}
          </div>
          <div class="min-w-60 flex items-center gap-1">
            <div
              v-if="$dayjs(work.endedAt).format('HH') === '00'"
              class="dark:text-green-800 text-sm font-bold"
            >
              +1
            </div>
            <div>
              {{ $dayjs(work.endedAt).format('HH:mm') }}
            </div>
          </div>
          <div class="text-wrap h-full w-max flex items-center">
            {{ work.description }}
          </div>
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
        projectId: null,
        taskId: null,

        description: '',
        startedAt: this.$dayjs().format('YYYY-MM-DDTHH:mm'),
        endedAt: null,

      },
      newTask: {
        name: null,
        projectId: 1,
      },
      projects: [ ],
      tasks: [ ],
      worksByDay: [],
    };
  },
  computed: {
    defaultSelectedProject() {
      return 1;
    },
  },
  watch: {
    'newWork.projectId': function() {
      this.fetchProjectTasks();
    },
    'newWork.startedAt': function() {
      if (this.newWork.endedAt) {
        return;
      }
      this.newWork.endedAt = this.$dayjs(this.newWork.startedAt).add(1, 'hour').format('YYYY-MM-DDTHH:mm');
    },
  },
  mounted() {
    this.newWork.projectId = this.defaultSelectedProject;
    this.newTask.projectId = this.defaultSelectedProject;

    this.fetchProjects();
    this.fetchAllTasks();
    this.fetchProjectTasks();
    this.fetchWorks();
  },
  methods: {
    async addWork() {
      const newWork = {
        ...this.newWork,
        startedAt: this.$dayjs(this.newWork.startedAt).utc().format(),
        endedAt: this.$dayjs(this.newWork.endedAt).utc().format(),
      };

      await tasksApi.works.create(this.newWork.taskId, newWork);
      this.fetchWorks();

      this.newWork = {
        projectId: this.defaultSelectedProject,
        taskId: this.newWork.taskId,
        description: null,
        startedAt: this.newWork.endedAt,
        endedAt: null,
        tasks: this.newWork.tasks,
      };
    },
    async fetchProjects() {
      this.projects = (await projectsApi.getAll()).data.data;
    },
    async fetchProjectTasks() {
      this.newWork.tasks = (await projectsApi.tasks.getAll(this.newWork.projectId)).data.data;
    },
    async fetchAllTasks() {
      this.tasks = (await tasksApi.getAll({'with_project': true})).data.data;
    },
    async createTask() {
      await projectsApi.tasks.create(this.newTask.projectId, this.newTask);
      this.fetchAllTasks();

      if (this.newWork.projectId === this.newTask.projectId) {
        this.fetchProjectTasks();
      }
    },
    async fetchWorks() {
      let works = (await worksApi.mine()).data.data;

      // group by day

      works = works.reduce((acc, work) => {
        const date = this.$dayjs(work.startedAt).format('YYYY-MM-DD');
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(work);
        return acc;
      }, {});

      works = Object.entries(works).map(([date, works]) => {
        return {
          date,
          'works': works.sort((a, b) => {
            return a.startedAt < b.startedAt ? 1 : -1;
          }),
        };
      });

      this.worksByDay = works.sort((a, b) => {
        return a.date < b.date ? 1 : -1;
      });
    },
  },
};

</script>
