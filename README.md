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
- [System Architecture ](system-architecture.md)

## Why We Built Task Tonic This Way

We created Task Tonic with a few simple goals in mind:

1. **Keep it simple**: We used tech that most devs already know - Next.js, Redis, and Nginx. This means it's easier to understand and fix if something goes wrong.

2. **Save money**: We know serverless can get expensive if functions run too long. So, we moved the heavy lifting to separate workers and use Redis to quickly fetch data. This keeps your server functions short and cheap.

3. **Easy to manage**: We use Docker, which makes it super easy to set up and update Task Tonic. You can also add or change parts without messing up the whole system.

4. **Real-time updates**: We use WebSockets and Redis pub/sub to give you instant updates. This means your app feels snappy and responsive, without overloading your server.

5. **Grows with you**: Need to handle more tasks? Just add more workers. Need to support more users? Scale up your Next.js servers. It's that easy.

6. **Keeps things safe**: We handle security upfront with JWT auth in Nginx and keep each user's data separate in Redis. It's not an afterthought - it's baked in from the start.

7. **Dev-friendly**: We've made a simple client library and straightforward APIs. This means you can add long-running tasks to your Next.js apps without wrestling with complex setups.

In short, we've tried to make Task Tonic powerful enough to handle tough jobs, but simple enough that you're not pulling your hair out trying to use it. It's all about making your life easier while keeping your app fast and your bills low.

## Contributing

We welcome contributions! Please see our [Contributing Guide](.github/CONTRIBUTING.md) for more details.

## Plan

- [ ] Define System Architecture
- [ ] Define APIs
- [ ] MVP

## License

Task Tonic is [MIT licensed](LICENSE).
