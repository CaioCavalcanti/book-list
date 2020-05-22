
import json
import requests
from urllib.parse import quote_plus

ENDPOINT_SEARCH = "https://openlibrary.org/search.json"


def search_book_by_title(title):
    if not title:
        return []

    encoded_title = quote_plus(title)
    book_search_endpoint = f"{ENDPOINT_SEARCH}?title={encoded_title}"

    response = requests.get(book_search_endpoint)
    search_result = response.json()
    return map_to_book_list(search_result)


def map_to_book_list(search_result):
    books = []
    for ol_book in search_result['docs']:
        book = map_to_book(ol_book)
        if book is not None:
            books.append(book)
    return books


def map_to_book(ol_book):
    """Maps a book result from OpenLibrary to book"""
    try:
        return {
            'isbn': ol_book['isbn'][0],
            'title': ol_book['title'],
            'authors': ol_book['author_name'],
            'language': ol_book.get('language'),
            'publisher': ol_book.get('publisher'),
            'published_year': ol_book.get('publish_year'),
            'cover_key': ol_book.get('cover_i')
        }
    except:
        # If we can't map, just ignore the result for now
        pass
