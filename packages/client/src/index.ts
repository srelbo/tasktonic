import axios from 'axios';

export interface TaskStatus {
  id: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  progress: number;
  result?: any;
}

export class TaskTonic {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async submitTask(taskType: string, params: any): Promise<string> {
    try {
      const response = await axios.post(`${this.apiUrl}/tasks`, {
        taskType,
        params,
      });
      return response.data.taskId;
    } catch (error) {
      throw new Error(`Failed to submit task: ${error.message}`);
    }
  }

  async getTaskStatus(taskId: string): Promise<TaskStatus> {
    try {
      const response = await axios.get(`${this.apiUrl}/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get task status: ${error.message}`);
    }
  }
}
