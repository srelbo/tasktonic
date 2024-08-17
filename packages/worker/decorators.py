import functools
import json
import redis
import os

redis_client = redis.Redis.from_url(os.environ.get('REDIS_URL', 'redis://localhost:6379'))

def register_task(task_type):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(task_id, params):
            def update_progress(progress):
                redis_client.publish('task_updates', json.dumps({
                    'taskId': task_id,
                    'status': 'running',
                    'progress': progress
                }))
            
            try:
                result = func(params, update_progress)
                redis_client.publish('task_updates', json.dumps({
                    'taskId': task_id,
                    'status': 'completed',
                    'result': result
                }))
            except Exception as e:
                redis_client.publish('task_updates', json.dumps({
                    'taskId': task_id,
                    'status': 'failed',
                    'error': str(e)
                }))
        
        redis_client.set(f'task:{task_type}', wrapper.__name__)
        return wrapper
    return decorator

def update_progress(progress):
    # This function will be replaced by the one in the wrapper
    pass