from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
import os
import pathlib
import asyncio
import sys

code_testing_routes = Blueprint('test-code', __name__)

userTestFilePath = './app/user_tests/user_test.py'

@login_required
@code_testing_routes.route('/', methods=['POST'])
def test_problem():
    code = request.json.get('code')
    if code is None:
        return jsonify({'error': 'No code provided'}), 400

    if code:
        with open(userTestFilePath, 'w') as file:
            file.write('import sys\n')
            file.write(code + '\n')  # Add a newline at the end of the user code

        testCaseFromDB = '''
import sys

def add(a, b):
  return a + b

if __name__ == "__main__":
    a = int(sys.argv[1])
    b = int(sys.argv[2])
    result = int(sys.argv[3])
    print(add(a, b) == result)
'''

        with open(userTestFilePath, 'a') as file:
            file.write(testCaseFromDB.strip() + '\n')
            # Remove leading/trailing whitespaces and add a newline

        print('🥶🥶🥶', testCaseFromDB)
