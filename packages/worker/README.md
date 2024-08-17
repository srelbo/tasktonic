# Task Tonic Worker

This package provides a worker library for implementing task processors in Task Tonic.

## Installation

```bash
pip install tasktonic
```

## Usage

Here's a basic example of how to use the Task Tonic worker library:

```python
from tasktonic import register_task, update_progress

@register_task('my_task')
def my_task(params, progress_callback):
    # Your task implementation here
    total_steps = 10
    for i in range(total_steps):
        # Do some work...
        progress_callback((i + 1) / total_steps * 100)  # Update progress
    
    return {"result": "Task completed successfully"}

if __name__ == "__main__":
    # Your worker main loop here
    # This would typically involve polling for new tasks and executing them
    pass
```

## API Reference

### Decorators

#### `@register_task(task_type: str)`

Registers a function as a task handler for the specified task type.

#### `update_progress(progress: float)`

Updates the progress of the current task. This function is automatically injected into your task function as the `progress_callback` parameter.

## Configuration

The library uses the following environment variables:

- `REDIS_URL`: The URL of the Redis server (default: `'redis://localhost:6379'`)

Make sure to set this environment variable before running your worker.

## License

MIT
