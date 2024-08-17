# Task Tonic System Architecture

```
[Client Side]                   [Server Side]                      [Data & Processing]

+----------------+               +----------------+               +----------------+
|                |               |                |               |                |
|  Next.js       | 1. HTTP/WS    |   Nginx        |               |     Redis      |
|  React App     +--------------->   (with Lua    |               |                |
|                |               |   scripts)     |               +--------+-------+
|                |               |                |                        ^
|                |               +--------+-------+                        |
|                |                        |                                |
|                |               +--------v-------+               +--------+-------+
|                |               |                |               |                |
|                |               |   Next.js      |               |    Worker 1    |
|                | 2. Server     |   Server       |               |                |
|                |    Actions    |                |               +----------------+
|                <---------------+                |
|                |               |                |               +----------------+
|                |               |                |               |                |
|                |               |                |               |    Worker 2    |
|                |               |                |               |                |
|                |               |                |               +----------------+
+----------------+               +----------------+
                                         |                        +----------------+
                                         |                        |                |
                                         |                        |    Worker N    |
                                         |                        |                |
                                         |                        +----------------+
                                         |
                                         |
                                  3. Task Submission
                                         |
                                         v
                                 +----------------+
                                 |                |
                                 |  Task Queue    |
                                 |  (Redis List)  |
                                 |                |
                                 +----------------+
```

## Components:

1. **Client Side:**

   - Next.js React App: The frontend application that users interact with.

2. **Server Side:**

   - Nginx: Acts as a reverse proxy and handles JWT authentication.
   - Next.js Server: Processes server-side logic and server actions.

3. **Data & Processing:**
   - Redis: Stores task data, acts as a message broker, and handles pub/sub.
   - Workers: Process tasks asynchronously.
   - Task Queue: A Redis list that holds pending tasks.

## Data Flow:

1. The client communicates with the server via HTTP requests or WebSocket connections. All requests pass through Nginx.

2. Nginx authenticates requests using JWT and forwards them to the Next.js server.

3. The Next.js server processes requests:

   - For task submissions, it adds tasks to the Redis task queue.
   - For status updates, it queries Redis directly.

4. Workers continuously poll the task queue for new tasks.

5. When a worker picks up a task:

   - It processes the task.
   - It updates the task status in Redis.
   - It publishes progress updates via Redis pub/sub.

6. The Next.js server listens for pub/sub messages and forwards updates to the client via WebSocket.

7. The client receives real-time updates and updates its UI accordingly.

## Security:

- All client-server communication is authenticated using JWT.
- Nginx acts as a security layer, validating tokens before forwarding requests.
- Redis keys are namespaced by user ID to ensure data isolation.

## Scalability:

- Multiple workers can be added to handle increased load.
- Redis can be clustered for higher throughput and availability.
- The Next.js server can be scaled horizontally behind a load balancer.
