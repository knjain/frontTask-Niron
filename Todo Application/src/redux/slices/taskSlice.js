import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTasks,
  createTask,
  deleteTask,
  updateTaskAPI,
} from "../../api/taskApi";

// Load tasks
export const loadTasks = createAsyncThunk("tasks/load", async () => {
  return await fetchTasks();
});

// Add a new task
export const addNewTask = createAsyncThunk("tasks/add", async (taskData) => {
  return await createTask(taskData);
});

// Update a task
export const modifyTask = createAsyncThunk(
  "tasks/update",
  async ({ id, data }) => {
    return await updateTaskAPI(id, data);
  }
);

// Remove a task
export const removeTask = createAsyncThunk(
  "tasks/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteTask(id);
      return id;
    } catch (error) {
      console.error("Delete API Call Failed:", error);
      return rejectWithValue(error.message);
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [], status: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Load tasks
      .addCase(loadTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })

      // Add Task
      .addCase(addNewTask.pending, (state) => {
        state.status.adding = true;
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.status.adding = false;
        if (action.payload.task) {
          state.tasks.unshift(action.payload.task);
        }
      })
      .addCase(addNewTask.rejected, (state) => {
        state.status.adding = false;
      })

      // Update Task
      .addCase(modifyTask.pending, (state, action) => {
        state.status[`updating-${action.meta.arg.id}`] = true;
      })
      .addCase(modifyTask.fulfilled, (state, action) => {
        state.status[`updating-${action.payload._id}`] = false;
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(modifyTask.rejected, (state, action) => {
        state.status[`updating-${action.meta.arg.id}`] = false;
      })

      // Delete Task
      .addCase(removeTask.pending, (state, action) => {
        state.status[`deleting-${action.meta.arg}`] = true;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.status[`deleting-${action.payload}`] = false;
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(removeTask.rejected, (state, action) => {
        state.status[`deleting-${action.meta.arg}`] = false;
      });
  },
});

export default taskSlice.reducer;
