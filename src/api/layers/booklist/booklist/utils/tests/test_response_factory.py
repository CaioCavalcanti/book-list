import sys
import pytest
import json

from booklist.utils import response_factory

CORS_ALLOWED_ORIGINS = "'https://*.test.com','http://localhost:4200'"


@pytest.fixture
def mock_env(monkeypatch):
    monkeypatch.setenv("CORS_ALLOWED_ORIGINS", CORS_ALLOWED_ORIGINS)


@pytest.fixture
def mock_result():
    return {
        "data": [
            {"id": 123},
            {"id": 456}
        ]
    }


def test_default_headers(mock_env):
    default_headers = response_factory.get_default_headers()
    expected_headers = {
        "Access-Control-Allow-Origin": CORS_ALLOWED_ORIGINS,
        "Content-Type": "application/json"
    }
    assert default_headers == expected_headers


def test_response_is_json(mock_env, mock_result):
    expected_body = json.dumps(mock_result)
    response = response_factory.create_response(200, mock_result)
    assert response['body'] == expected_body


def test_ok_response_status_code_is_200(mock_env, mock_result):
    response = response_factory.ok(mock_result)
    assert response['statusCode'] == 200


def test_created_response_status_code_is_201(mock_env, mock_result):
    response = response_factory.created(mock_result)
    assert response['statusCode'] == 201
