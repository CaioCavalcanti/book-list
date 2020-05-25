import boto3
import os
from datetime import datetime
from decimal import Decimal


def get_book(isbn):
    key = {'isbn': isbn}
    books_table = get_books_table()
    return books_table.get_item(Key=key)


def get_books():
    books_table = get_books_table()
    books_scan_result = books_table.scan()
    return books_scan_result['Items']


def add_book(new_book):
    # Set created and updated dates
    new_book['createdAt'] = Decimal(datetime.utcnow().timestamp())
    new_book['updatedAt'] = new_book['createdAt']
    books_table = get_books_table()
    books_table.put_item(Item=new_book)
    return new_book


def update_book(updated_book):
    key = {'isbn': updated_book['isbn']}
    updated_book["updatedAt"] = Decimal(datetime.utcnow().timestamp())
    books_table = get_books_table()
    books_table.update_item(Key=key, Item=updated_book)
    return updated_book


def delete_book(isbn):
    key = {'isbn': isbn}
    books_table = get_books_table()
    books_table.delete_item(Key=key)


def get_books_table():
    table_name = os.environ['DYNAMODB_TABLE_NAME']
    dynamo_kwargs = {}
    region = os.environ['DYNAMODB_REGION']
    if region == 'local':
        dynamo_kwargs['endpoint_url'] = os.environ['DYNAMODB_ENDPOINT']
    else:
        dynamo_kwargs['region_name'] = region
    dynamodb = boto3.resource('dynamodb', **dynamo_kwargs)
    return dynamodb.Table(table_name)
