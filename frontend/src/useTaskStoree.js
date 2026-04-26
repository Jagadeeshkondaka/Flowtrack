import { create } from "zustand";

export const useTaskStore = create((set) => ({
  tasks: [],

  setTasks: (tasks) => set({ tasks }),

  updateTask: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t._id === updatedTask._id ? { ...t, ...updatedTask } : t
      ),
    })),
}));