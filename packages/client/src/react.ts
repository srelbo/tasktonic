import { useState, useEffect, useCallback } from 'react';
import { TaskTonic, TaskStatus } from './index';

export function useTaskTonic(apiUrl: string) {
  const [client] = useState(() => new TaskTonic(apiUrl));

  const submitTask = useCallback(
    (taskType: string, params: any) => client.submitTask(taskType, params),
    [client]
  );

  const useTaskStatus = (taskId: string | null): TaskStatus | null => {
    const [status, setStatus] = useState<TaskStatus | null>(null);

    useEffect(() => {
      if (!taskId) return;

      let isMounted = true;
      const fetchStatus = async () => {
        try {
          const newStatus = await client.getTaskStatus(taskId);
          if (isMounted) setStatus(newStatus);
        } catch (error) {
          console.error('Failed to fetch task status:', error);
        }
      };

      fetchStatus();
      const intervalId = setInterval(fetchStatus, 1000);

      return () => {
        isMounted = false;
        clearInterval(intervalId);
      };
    }, [taskId]);

    return status;
  };

  return { submitTask, useTaskStatus };
}
