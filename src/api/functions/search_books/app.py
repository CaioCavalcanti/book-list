import sys

sys.path.append("/opt")

from booklist.clients import openlibrary
from booklist.utils import response_factory, logger


def lambda_handler(event, context):
    try:
        book_title = get_book_title(event)
        books = openlibrary.search_book_by_title(book_title)
        return response_factory.ok(books)
    except:
        correlation_id = logger.log_error()
        return response_factory.internal_server_error(correlation_id)


def get_book_title(event):
    query_parameters = event.get('queryStringParameters')
    if query_parameters is None:
        query_parameters = {}
    book_title = query_parameters.get('title')
    return book_title
