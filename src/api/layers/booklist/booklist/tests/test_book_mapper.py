import pytest

from booklist import book_mapper
from booklist.models.errors import MissingRequiredFieldError


def test_map_to_item_raises_MissingRequiredFieldError_when_isbn_is_invalid():
    data = {}
    with pytest.raises(MissingRequiredFieldError):
        book_mapper.map_to_item(data)


def test_map_to_item():
    data = {
        "isbn": "1234567890123",
        "field": "not_mapped"
    }
    expected_book_item = {
        "isbn": data['isbn'],
        "createdAt": None,
        "updatedAt": None
    }
    book_item = book_mapper.map_to_item(data)
    assert book_item == expected_book_item
