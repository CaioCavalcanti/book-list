from datetime import datetime
from .models.errors import MissingRequiredFieldError


def map_to_dto_list(table_items):
    book_dtos = []
    for table_item in table_items:
        book_dto = map_to_dto(table_item)
        book_dtos.append(book_dto)
    return book_dtos


def map_to_dto(table_item):
    return {
        "isbn": table_item.get('isbn'),
        "title": table_item.get('title'),
        "authors": table_item.get('authors'),
        "created_at": get_iso(table_item.get('created_at')),
        "updated_at": get_iso(table_item.get('updated_at')),
    }


def map_to_item(data):
    isbn = data.get('isbn')
    if isbn is None:
        raise MissingRequiredFieldError('isbn')

    return {
        "isbn": isbn,
        "title": data.get("title"),
        "authors": data.get("authors"),
        "created_at": None,
        "updated_at": None
    }


def get_iso(timestamp):
    date_time = datetime.fromtimestamp(timestamp)
    return date_time.isoformat()
