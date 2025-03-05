import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadTasks,
  removeTask,
  addNewTask,
  modifyTask,
} from "../redux/slices/taskSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks || []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    status: "Pending",
    priority: "Medium",
  });

  // Search & Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  const handleOpenModal = (task = null) => {
    if (task) {
      setTaskData(task);
      setIsEdit(true);
    } else {
      setTaskData({
        name: "",
        description: "",
        status: "Pending",
        priority: "Medium",
      });
      setIsEdit(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskData({
      name: "",
      description: "",
      status: "Pending",
      priority: "Medium",
    });
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
        await dispatch(
          modifyTask({ id: taskData._id, data: taskData })
        ).unwrap();
      } else {
        await dispatch(addNewTask(taskData)).unwrap();
        //dispatch(loadTasks());
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(removeTask(id)).unwrap();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  // Filtered Tasks Logic
  const filteredTasks = tasks.filter((task) => {
    return (
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter ? task.status === statusFilter : true) &&
      (priorityFilter ? task.priority === priorityFilter : true)
    );
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">My Tasks</h1>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          onClick={() => handleOpenModal()}
        >
          Add Task
        </button>
      </div>

      {/* Search & Filters */}
      <div className="mb-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Search tasks..."
          className="p-2 border rounded w-full sm:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border rounded w-full sm:w-1/4"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <select
          className="p-2 border rounded w-full sm:w-1/4"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Task Table */}
      {filteredTasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks match the criteria</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-orange-500 text-white">
                <th className="p-3 text-xs lg:text-base text-left">S. No</th>
                <th className="p-3 text-xs lg:text-base text-left">
                  Task Name
                </th>
                <th className="p-3 text-xs lg:text-base text-left hidden lg:table-cell">
                  Description
                </th>
                <th className="p-3 text-xs lg:text-base text-left">Status</th>
                <th className="p-3 text-xs lg:text-base text-left">Priority</th>
                <th className="p-3 text-xs lg:text-base text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task, index) => (
                <tr key={task._id} className="border-b">
                  <td className="p-3 text-xs lg:text-base">{index + 1}</td>
                  <td className="p-3 max-w-xs break-words whitespace-normal text-xs lg:text-base">
                    {task.name}
                  </td>
                  <td className="p-3 max-w-xs break-words whitespace-normal hidden lg:table-cell text-xs lg:text-base">
                    {task.description}
                  </td>
                  <td className="p-3 text-xs lg:text-base">{task.status}</td>
                  <td className="p-3 text-xs lg:text-base">{task.priority}</td>
                  <td className="p-3 ">
                    <button
                      className="bg-yellow-500 text-white w-20 py-1 mr-2 mb-2 lg:mb-0 rounded hover:bg-yellow-600"
                      onClick={() => handleOpenModal(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white w-20 py-1 rounded hover:bg-red-600"
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

      {/* Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-10 flex justify-center items-center">
          <div className="bg-orange-100 p-10 rounded-lg w-96 border border-black">
            <h2 className="text-xl font-bold mb-4">
              {isEdit ? "Edit Task" : "Add New Task"}
            </h2>
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
              <button
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                onClick={handleSubmit}
              >
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

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   loadTasks,
//   removeTask,
//   addNewTask,
//   modifyTask,
// } from "../redux/slices/taskSlice";

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const { tasks, status } = useSelector((state) => state.tasks || []);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEdit, setIsEdit] = useState(false);
//   const [taskData, setTaskData] = useState({
//     name: "",
//     description: "",
//     status: "Pending",
//     priority: "Medium",
//   });

//   useEffect(() => {
//     dispatch(loadTasks());
//   }, [dispatch]);

//   const handleOpenModal = (task = null) => {
//     if (task) {
//       setTaskData(task);
//       setIsEdit(true);
//     } else {
//       setTaskData({
//         name: "",
//         description: "",
//         status: "Pending",
//         priority: "Medium",
//       });
//       setIsEdit(false);
//     }
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setTaskData({
//       name: "",
//       description: "",
//       status: "Pending",
//       priority: "Medium",
//     });
//     setIsEdit(false);
//   };

//   const handleChange = (e) => {
//     setTaskData({ ...taskData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     if (!taskData.name) return;

//     try {
//       if (isEdit) {
//         await dispatch(
//           modifyTask({ id: taskData._id, data: taskData })
//         ).unwrap();
//       } else {
//         await dispatch(addNewTask(taskData)).unwrap();
//       }
//       handleCloseModal();
//     } catch (error) {
//       console.error("Error saving task!");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await dispatch(removeTask(id)).unwrap();
//     } catch (error) {
//       console.error("Failed to delete task!");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-4">My Tasks</h1>
//       <button
//         className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
//         onClick={() => handleOpenModal()}
//         disabled={status.adding}
//       >
//         {status.adding ? "Adding..." : "Add Task"}
//       </button>

//       <div className="overflow-x-auto bg-white shadow-lg rounded-lg mt-4">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-orange-500 text-white">
//               <th className="p-3">S. No</th>
//               <th className="p-3">Task Name</th>
//               <th className="p-3">Description</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Priority</th>
//               <th className="p-3 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.map((task, index) => (
//               <tr key={task._id} className="border-b">
//                 <td className="p-3">{index + 1}</td>
//                 <td className="p-3">{task.name}</td>
//                 <td className="p-3">{task.description}</td>
//                 <td className="p-3">{task.status}</td>
//                 <td className="p-3">{task.priority}</td>
//                 <td className="p-3 text-center space-x-2">
//                   <button
//                     className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                     onClick={() => handleOpenModal(task)}
//                     disabled={status[`updating-${task._id}`]}
//                   >
//                     {status[`updating-${task._id}`] ? "Updating..." : "Edit"}
//                   </button>
//                   <button
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     onClick={() => handleDelete(task._id)}
//                     disabled={status[`deleting-${task._id}`]}
//                   >
//                     {status[`deleting-${task._id}`] ? "Deleting..." : "Delete"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-opacity-10 flex justify-center items-center">
//           <div className="bg-orange-100 p-10 rounded-lg w-96 border border-black">
//             <h2 className="text-xl font-bold mb-4">
//               {isEdit ? "Edit Task" : "Add New Task"}
//             </h2>
//             <input
//               type="text"
//               name="name"
//               placeholder="Task Name"
//               className="w-full p-2 border rounded mb-3"
//               value={taskData.name}
//               onChange={handleChange}
//             />
//             <textarea
//               name="description"
//               placeholder="Task Description"
//               className="w-full p-2 border rounded mb-3"
//               value={taskData.description}
//               onChange={handleChange}
//             />
//             <select
//               name="status"
//               className="w-full p-2 border rounded mb-3"
//               value={taskData.status}
//               onChange={handleChange}
//             >
//               <option value="Pending">Pending</option>
//               <option value="Completed">Completed</option>
//             </select>
//             <select
//               name="priority"
//               className="w-full p-2 border rounded mb-3"
//               value={taskData.priority}
//               onChange={handleChange}
//             >
//               <option value="Low">Low</option>
//               <option value="Medium">Medium</option>
//               <option value="High">High</option>
//             </select>
//             <div className="flex justify-end space-x-3">
//               <button
//                 className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded"
//                 onClick={handleCloseModal}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
//                 onClick={handleSubmit}
//                 disabled={status.saving}
//               >
//                 {isEdit
//                   ? status.saving
//                     ? "Saving..."
//                     : "Save Changes"
//                   : "Add Task"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
