import boto3
import os
from datetime import datetime
from decimal import Decimal


def get_books():
    books_table = get_books_table()
    books_scan_result = books_table.scan()
    return books_scan_result['Items']


def add_book(new_book):
    # Set created and updated dates
    new_book['created_at'] = Decimal(datetime.utcnow().timestamp())
    new_book['updated_at'] = new_book['created_at']
    books_table = get_books_table()
    books_table.put_item(Item=new_book)
    return new_book


def delete_book(isbn):
    key = {'isbn': isbn}
    books_table = get_books_table()
    books_table.delete_item(Key=key)


def get_books_table():
    table_name = os.environ['DYNAMODB_TABLE_NAME']
    endpoint_url = os.environ['DYNAMODB_ENDPOINT']
    dynamodb = boto3.resource('dynamodb', endpoint_url=endpoint_url)
    return dynamodb.Table(table_name)
