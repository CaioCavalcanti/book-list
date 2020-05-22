class MissingRequiredFieldError(Exception):
    def __init__(self, field_name):
        super().__init__()
        self.field_name = field_name

    def get_validation_errors(self):
        errors = {}
        errors[self.field_name] = f"Field {self.field_name} is required"
        return errors


class NotFoundError(Exception):
    def __init__(self, resource_name, field_name, field_value):
        super().__init__()
        self.resource_name = resource_name
        self.field_name = field_name
        self.field_value = field_value
