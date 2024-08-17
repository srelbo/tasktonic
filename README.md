# TaskTonic 🧃

## This is a work in progress

A distributed task processing framework for ML workloads.

## What is it?

Task Tonic is a distributed task processing system designed for seamless integration with Next.js applications, allowing easy management of long-running tasks and real-time updates.

## Repository Structure

- `packages/client`: TypeScript client package for use in Next.js applications
- `packages/worker`: Python worker library package for implementing task processors
- `server`: Node.js server implementation for task management
- `examples`: Sample applications demonstrating Task Tonic usage
- `docker`: Dockerfiles for server and worker components

## Features

- **Reduce Function Duration Costs**: Reduces function duration for APIs and Server Actions on Serverless platforms like Vercel.
- **Real-Time Progress Tracking**: Get near real-time updates on task progress.
- **Frontend Integration**: High-level SDKs for NextJS/React to integrate AI/ML task management into your applications.
- **Resource Management**: Intelligent resource allocation to optimize performance and minimize costs.
- **Dynamic Multi-Job GPU Utilization**: Efficiently batch and run multiple AI/ML tasks on a single worker to maximize GPU memory and compute usage.

## Quick Start

### Client (Next.js)

1. Install the client package:

   ```bash
   npm install @tasktonic/client
   ```

2. Use in your Next.js application:

   ```typescript
   import { useTaskTonic } from '@tasktonic/client/react';

   export default function MyComponent() {
     const { submitTask, useTaskStatus } = useTaskTonic();
     // ... (rest of the component code)
   }
   ```

### Server

1. Install Docker and Docker Compose

2. Create a `docker-compose.yml` file:

   ```yaml
   version: '3.8'

   services:
     tasktonic-server:
       image: tasktonic/server:latest
       ports:
         - '8000:8000'
       environment:
         - REDIS_URL=redis://redis:6379
       depends_on:
         - redis

     redis:
       image: redis:latest

     tasktonic-worker:
       image: tasktonic/worker:latest
       volumes:
         - ./tasks:/app/tasks
       environment:
         - REDIS_URL=redis://redis:6379
       depends_on:
         - redis
   ```

3. Start the Task Tonic backend:
   ```bash
   docker-compose up -d
   ```

### Worker (Python)

1. Install the worker package:

   ```bash
   pip install tasktonic
   ```

2. Implement a task:

   ```python
   from tasktonic import register_task

   @register_task('my_task')
   def my_task(params):
       # Task implementation
       return {"result": "Task completed"}
   ```

## Documentation

For detailed documentation, please refer to:

- [Client Documentation](packages/client/README.md)
- [Worker Documentation](packages/worker/README.md)
- [Server Documentation](server/README.md)

## Contributing

We welcome contributions! Please see our [Contributing Guide](.github/CONTRIBUTING.md) for more details.

## Plan

- [ ] Define System Architecture
- [ ] Define APIs
- [ ] MVP

## License

Task Tonic is [MIT licensed](LICENSE).
