import json
from os import environ

from ..models.error_results import InternalServerErrorResult, BadRequestResult, NotFoundResult


def ok(result):
    return create_response(200, result)


def created(result):
    return create_response(201, result)


def not_found(not_found_error):
    not_found_result = NotFoundResult(not_found_error)
    return create_response(not_found_result.code, not_found_result.__dict__)


def bad_request(validation_errors):
    bad_request_result = BadRequestResult(validation_errors)
    return create_response(bad_request_result.code, bad_request_result.__dict__)


def internal_server_error(correlation_id):
    error_result = InternalServerErrorResult(correlation_id)
    return create_response(error_result.code, error_result.__dict__)


def no_content():
    return create_response(204)


def create_error_result(code, message):
    return {
        "code": code,
        "message": message
    }


def create_response(status_code, data=None):
    response = {
        "statusCode": status_code,
        "headers": get_default_headers()
    }
    if data is not None:
        response['body'] = json.dumps(data)
    return response


def get_default_headers():
    return {
        "Access-Control-Allow-Origin": environ["CORS_ALLOWED_ORIGINS"],
        "Content-Type": "application/json"
    }
