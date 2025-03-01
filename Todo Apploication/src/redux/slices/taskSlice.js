import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTasks, updateTask, deleteTask } from "../../api/taskApi";

export const loadTasks = createAsyncThunk("tasks/load", async () => {
  return await fetchTasks();
});

export const modifyTask = createAsyncThunk("tasks/update", async ({ id, data }) => {
  return await updateTask(id, data);
});

export const removeTask = createAsyncThunk("tasks/delete", async (id) => {
  await deleteTask(id);
  return id;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(removeTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    });
  },
});

export default taskSlice.reducer;
