import sys

sys.path.append("/opt")

from booklist import book_repository, book_mapper
from booklist.utils import response_factory, logger


def lambda_handler(event, context):
    try:
        book_items = book_repository.get_books()
        book_dtos = book_mapper.map_to_dto_list(book_items)
        return response_factory.ok(book_dtos)
    except:
        correlation_id = logger.log_error()
        return response_factory.internal_server_error(correlation_id)
