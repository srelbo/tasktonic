import { useState } from 'react';
import { useTaskTonic } from '@tasktonic/client/react';

export default function Home() {
  const { submitTask, useTaskStatus } = useTaskTonic(
    process.env.NEXT_PUBLIC_TASK_TONIC_URL
  );
  const [taskId, setTaskId] = useState<string | null>(null);
  const taskStatus = useTaskStatus(taskId);

  const handleSubmitTask = async () => {
    const newTaskId = await submitTask('example_task', { param1: 'value1' });
    setTaskId(newTaskId);
  };

  return (
    <div>
      <h1>Task Tonic Example</h1>
      <button onClick={handleSubmitTask}>Submit Task</button>
      {taskStatus && (
        <div>
          <p>Task ID: {taskStatus.id}</p>
          <p>Status: {taskStatus.status}</p>
          <p>Progress: {taskStatus.progress}%</p>
          {taskStatus.result && (
            <p>Result: {JSON.stringify(taskStatus.result)}</p>
          )}
        </div>
      )}
    </div>
  );
}
