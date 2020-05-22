class BaseErrorResult():
    def __init__(self, code, message):
        self.code = code
        self.message = message


class BadRequestResult(BaseErrorResult):
    def __init__(self, validation_errors):
        message = "Bad request, check validation errors for more details"
        super().__init__(code=400, message=message)
        self.validation_errors = validation_errors


class InternalServerErrorResult(BaseErrorResult):
    def __init__(self, correlation_id):
        super().__init__(code=500, message="Request could not be processed")
        self.correlation_id = correlation_id


class NotFoundResult(BaseErrorResult):
    def __init__(self, not_found_error):
        resource = not_found_error.resource_name
        field = not_found_error.field_name
        value = not_found_error.field_value
        message = f"Could not find {resource} with {field} '{value}'"
        super().__init__(code=404, message=message)
