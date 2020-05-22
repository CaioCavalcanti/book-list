import sys
import json

sys.path.append("/opt")

from booklist import book_repository, book_mapper
from booklist.models.errors import MissingRequiredFieldError
from booklist.utils import response_factory, logger


def lambda_handler(event, context):
    try:
        data = json.loads(event['body'])
        new_book = book_mapper.map_to_item(data)
        created_book = book_repository.add_book(new_book)
        created_book_dto = book_mapper.map_to_dto(created_book)
        return response_factory.created(created_book_dto)
    except MissingRequiredFieldError as ex:
        return response_factory.bad_request(ex.get_validation_errors())
    except:
        correlation_id = logger.log_error()
        return response_factory.internal_server_error(correlation_id)
