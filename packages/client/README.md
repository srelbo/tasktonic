# Task Tonic Client

This package provides a client library for interacting with Task Tonic from Next.js applications.

## Installation

```bash
npm install @tasktonic/client
```

## Usage

### Basic usage

```typescript
import { TaskTonic } from '@tasktonic/client';

const client = new TaskTonic('http://your-tasktonic-server.com');

// Submit a task
const taskId = await client.submitTask('myTaskType', { param1: 'value1' });

// Get task status
const status = await client.getTaskStatus(taskId);
console.log(status);
```

### Usage with React Hooks

```typescript
import { useTaskTonic } from '@tasktonic/client/react';

function MyComponent() {
  const { submitTask, useTaskStatus } = useTaskTonic(
    'http://your-tasktonic-server.com'
  );
  const [taskId, setTaskId] = useState(null);
  const taskStatus = useTaskStatus(taskId);

  const handleSubmitTask = async () => {
    const newTaskId = await submitTask('myTaskType', { param1: 'value1' });
    setTaskId(newTaskId);
  };

  return (
    <div>
      <button onClick={handleSubmitTask}>Submit Task</button>
      {taskStatus && (
        <div>
          <p>Status: {taskStatus.status}</p>
          <p>Progress: {taskStatus.progress}%</p>
        </div>
      )}
    </div>
  );
}
```

## API Reference

### `TaskTonic`

The main class for interacting with the Task Tonic server.

#### Methods

- `submitTask(taskType: string, params: any): Promise<string>`
  Submits a new task to the server and returns the task ID.

- `getTaskStatus(taskId: string): Promise<TaskStatus>`
  Retrieves the current status of a task.

### `useTaskTonic`

A React hook that provides Task Tonic functionality.

#### Returns

- `submitTask`: Function to submit a new task
- `useTaskStatus`: Hook to get and subscribe to task status updates

## License

MIT
