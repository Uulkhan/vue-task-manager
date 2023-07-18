import { ref, computed, reactive } from "vue";
import { v4 as uuidv4 } from "uuid";
import { defineStore } from "pinia";

export const useTaksManagerStore = defineStore("task-manager", {
  state: () => ({
    data: [],
  }),

  getters: {
    projects(state) {
      return state.data.map((project) => {
        const totalTasks = project.tasks.length;
        const completedTasks = project.tasks.filter(
          (task) => task.completed
        ).length;
        const completedPercentage =
          totalTasks !== 0
            ? Math.round((completedTasks / totalTasks) * 100)
            : 0;

        return {
          ...project,
          completedPercentage,
          completed: completedPercentage === 100,
        };
      });
    },

    tasks(state) {
      const allTasks = reactive([]);
      state.data.forEach((project) => {
        project.tasks.forEach((task) => {
          const taskWithProject = {
            ...task,
            project: {
              id: project.id,
              name: project.name,
            },
          };
          allTasks.push(taskWithProject);
        });
      });
      return allTasks;
    },
  },

  actions: {
    updateTaskState(taskId, completed) {
      this.data.forEach((project) => {
        const task = project.tasks.find((task) => task.id === taskId);
        if (task) {
          task.completed = completed;
        }
      });
    },

    filterTasksByProjectsAndStates(projectIds, states) {
      if (projectIds.length === 0 && states.length === 0) return this.tasks;

      const filteredTasks = this.tasks.filter((task) => {
        const projectMatch =
          projectIds.includes(task.project.id) || projectIds.length === 0;
        const stateMatch =
          states.includes(task.completed) || states.length === 0;
        return projectMatch && stateMatch;
      });
      return filteredTasks;
    },

    filterProjectsByStates(states) {
      if (states.length === 0) return this.projects;

      const filteredProjects = this.projects.filter((project) => {
        const stateMatch = states.includes(project.completed);
        return stateMatch;
      });
      return filteredProjects;
    },

    addTask(task) {
      if (!task.name || !task.description || !task.project) {
        alert("Please fill all the fields");
        return;
      }

      const id = uuidv4();
      const newTask = {
        id,
        name: task.name,
        description: task.description,
        completed: false,
      };

      const project = this.data.find((project) => project.id === task.project);
      if (project) {
        project.tasks.push(newTask);
      }
    },

    addProject(project) {
      if (!project.name || !project.description) {
        alert("Please fill all the fields");
        return;
      }

      const id = uuidv4();
      const newProject = {
        id,
        name: project.name,
        description: project.description,
        tasks: [],
      };

      this.data.push(newProject);
    },
  },
});
