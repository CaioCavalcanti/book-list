import sys
import json

sys.path.append("/opt")

from booklist import book_repository
from booklist.models.errors import NotFoundError
from booklist.utils import response_factory, logger


def lambda_handler(event, context):
    try:
        isbn = event['pathParameters']['isbn']
        book_repository.delete_book(isbn)
        return response_factory.no_content()
    except NotFoundError as not_found_ex:
        return response_factory.not_found(not_found_ex)
    except:
        correlation_id = logger.log_error()
        return response_factory.internal_server_error(correlation_id)
