import uuid
import traceback


def log_error():
    """Logs an error and returns a correlation id for reference"""
    correlation_id = str(uuid.uuid4())
    # Get exception details
    error = traceback.format_exc()
    # Simple log, just print error with correlation_id
    print(f"[{correlation_id}] Unexpected error: {error}")
    return correlation_id
