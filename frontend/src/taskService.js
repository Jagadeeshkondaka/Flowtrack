import API from "./api";

// get all tasks
export const getTasks = (projectId) =>
  API.get(`/tasks/${projectId}`);

// update status
export const updateTaskStatus = (taskId, status) =>
  API.patch(`/tasks/${taskId}/status`, { status });