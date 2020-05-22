import time


class Book:
    def __init__(self, isbn):
        self.isbn = isbn
        self.created_at = self._get_current_timestamp()
        self.updated_at = self.created_at

    def _get_current_timestamp(self):
        timestamp = str(time.time())
        return timestamp
