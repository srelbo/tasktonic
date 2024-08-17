from tasktonic import register_task, update_progress
import time

@register_task('example_task')
def example_task(params, progress_callback):
    total_steps = 10
    for i in range(total_steps):
        time.sleep(1)  # Simulate work
        progress_callback((i + 1) / total_steps * 100)
    
    return {"message": "Task completed successfully", "params": params}

if __name__ == "__main__":
    print("Worker is running. Press Ctrl+C to exit.")
    while True:
        time.sleep(1)