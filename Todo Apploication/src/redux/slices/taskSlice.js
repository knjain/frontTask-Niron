import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTasks, createTask, deleteTask, updateTaskAPI } from "../../api/taskApi"; 

// Load tasks
export const loadTasks = createAsyncThunk("tasks/load", async () => {
  return await fetchTasks();
});

// Add a new task
export const addNewTask = createAsyncThunk("tasks/add", async (taskData) => {
  return await createTask(taskData);
});

// ✅ Update a task
export const modifyTask = createAsyncThunk("tasks/update", async ({ id, data }) => {
  return await updateTaskAPI(id, data);
});

// Remove a task
export const removeTask = createAsyncThunk("tasks/delete", async (id, { rejectWithValue }) => {
  try {
    await deleteTask(id);
    return id;
  } catch (error) {
    console.error("Delete API Call Failed:", error);
    return rejectWithValue(error.message); // Ensure error is passed to Redux
  }
});


const taskSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [] },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(loadTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(addNewTask.fulfilled, (state, action) => {
      state.tasks.unshift(action.payload);
    });
    builder.addCase(modifyTask.fulfilled, (state, action) => { 
      const index = state.tasks.findIndex(task => task._id === action.payload._id);
      if (index !== -1) state.tasks[index] = action.payload;
    });
    builder.addCase(removeTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter(task => task._id !== action.payload);
    });      
  },
});

export default taskSlice.reducer;
