import API from "./api";

// get all workspaces
export const getWorkspaces = () =>
  API.get("/workspaces");

// create workspace
export const createWorkspace = (data) =>
  API.post("/workspaces", data);

// invite members
export const inviteMembers = (workspaceId, emails) =>
  API.post(`/workspaces/${workspaceId}/invite`, { emails });