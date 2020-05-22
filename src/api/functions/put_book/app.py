import sys
import json

sys.path.append("/opt")

from booklist import book_repository, book_mapper
from booklist.models.errors import MissingRequiredFieldError
from booklist.utils import response_factory, logger


def lambda_handler(event, context):
    try:
        isbn = event['pathParameters']['isbn']
        existing_book = book_repository.get_book(isbn)
        data = json.loads(event['body'])
        book_changes = book_mapper.map_to_update_item(existing_book, data)
        updated_book = book_repository.update_book(book_changes)
        updated_book_dto = book_mapper.map_to_dto(updated_book)
        return response_factory.ok(updated_book_dto)
    except MissingRequiredFieldError as ex:
        return response_factory.bad_request(ex.get_validation_errors())
    except:
        correlation_id = logger.log_error()
        return response_factory.internal_server_error(correlation_id)
