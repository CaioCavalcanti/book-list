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
        "state": table_item.get('state'),
        "createdAt": get_iso(table_item.get('createdAt')),
        "updatedAt": get_iso(table_item.get('updatedAt')),
    }


def map_to_new_item(data):
    isbn = get_required_field(data, 'isbn')
    title = get_required_field(data, 'title')
    authors = get_required_field(data, 'authors')
    return {
        "isbn": isbn,
        "title": title,
        "authors": authors,
        "state": data.get("state", "shelved"),
        "createdAt": None,
        "updatedAt": None
    }


def map_to_update_item(existing_item, changes):
    state = get_required_field(changes, 'state')
    return {
        "isbn": existing_item['isbn'],
        "title": existing_item['title'],
        "authors": existing_item['authors'],
        "state": state,
        "createdAt": existing_item['createdAt'],
        "updatedAt": None  # Repository will handle this
    }


def get_required_field(data, field_name):
    value = data.get(field_name)
    if value is None:
        raise MissingRequiredFieldError(field_name)
    return value


def get_iso(timestamp):
    date_time = datetime.fromtimestamp(timestamp)
    return date_time.isoformat()
