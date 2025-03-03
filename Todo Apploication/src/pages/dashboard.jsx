import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTasks, removeTask, addNewTask, modifyTask } from "../redux/slices/taskSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const {tasks} = useSelector((state) => state.tasks || []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    status: "Pending",
    priority: "Medium",
  });

  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  const handleOpenModal = (task = null) => {
    if (task) {
      setTaskData(task);
      setIsEdit(true);
    } else {
      setTaskData({ name: "", description: "", status: "Pending", priority: "Medium" });
      setIsEdit(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskData({  name: "", description: "", status: "Pending", priority: "Medium" });
    setIsEdit(false);
  };

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!taskData.name) {
      alert("Task name is required");
      return;
    }

    try {
      if (isEdit) {
        await dispatch(modifyTask({ id: taskData._id, data: taskData })).unwrap();
      } else {
        await dispatch(addNewTask(taskData)).unwrap();
        dispatch(loadTasks());
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(removeTask(id)).unwrap(); // ✅ Immediately removes from Redux state
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => handleOpenModal()}
        >
          Add Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks added</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-3 text-left">S. No</th>
                <th className="p-3 text-left">Task Name</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Priority</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task,index) => (
                <tr key={task._id} className="border-b">
                  <td className="p-3">{index+1}</td>
                  <td className="p-3">{task.name}</td>
                  <td className="p-3">{task.description}</td>
                  <td className="p-3">{task.status}</td>
                  <td className="p-3">{task.priority}</td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      onClick={() => handleOpenModal(task)}
                    >
                      Edit
                    </button>
                  <button
  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
  onClick={() => handleDelete(task._id)}
>
  Delete
</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-20 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">{isEdit ? "Edit Task" : "Add New Task"}</h2>
            <input
              type="text"
              name="name"
              placeholder="Task Name"
              className="w-full p-2 border rounded mb-3"
              value={taskData.name}
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Task Description"
              className="w-full p-2 border rounded mb-3"
              value={taskData.description}
              onChange={handleChange}
            />
            <select
              name="status"
              className="w-full p-2 border rounded mb-3"
              value={taskData.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
            <select
              name="priority"
              className="w-full p-2 border rounded mb-3"
              value={taskData.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <div className="flex justify-end space-x-3">
              <button className="px-4 py-2 bg-gray-400 rounded" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleSubmit}>
                {isEdit ? "Save Changes" : "Add Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
