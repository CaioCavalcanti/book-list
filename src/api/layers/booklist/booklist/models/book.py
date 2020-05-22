import time


class Book:
    def __init__(self, isbn):
        self.isbn = isbn
        self.createdAt = self._get_current_timestamp()
        self.updatedAt = self.createdAt

    def _get_current_timestamp(self):
        timestamp = str(time.time())
        return timestamp
