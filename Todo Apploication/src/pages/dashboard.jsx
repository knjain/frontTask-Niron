import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTasks, removeTask } from "../redux/slices/taskSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  useEffect(() => {
    dispatch(loadTasks()); 
  }, [dispatch]);

  return (
    <div>
      <h1>My Tasks</h1>
      {tasks.map((task) => (
        <div key={task._id}>
          <h3>{task.name}</h3>
          <p>Status: {task.status}</p>
          <p>Priority: {task.priority}</p>
          <button onClick={() => dispatch(removeTask(task._id))}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
