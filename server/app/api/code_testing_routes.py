from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
import subprocess, sys, asyncio, pathlib, os

code_testing_routes = Blueprint('problem', __name__)

userTestFilePath = './app/user_tests/user_test.py'

@login_required
@code_testing_routes.route('/add-two-sum', methods=['POST'])
def add_two_sum():
    code = request.json.get('code')
    if code is None:
        print('🥶🥶🥶')
        return jsonify({'error': 'No code provided'}), 400

    if code:
        with open(userTestFilePath, 'w') as file:
            file.write('import sys\n')
            file.write(code + '\n')

        testCaseFromDB = '''
if __name__ == "__main__":
    a = int(sys.argv[1])
    b = int(sys.argv[2])
    result = int(sys.argv[3])
    print(add(a, b) == result)
'''

        with open(userTestFilePath, 'a') as file:
            file.write(testCaseFromDB.strip() + '\n')

        print('🥶🥶🥶', testCaseFromDB)

        test_cases = [
        ["1", "2", "3"],
        ["4", "5", "9"],
        ["6", "7", "13"]
        ]

        test_results = []

        for case in test_cases:
            try:
                args = ["python", userTestFilePath] + case
                completed_process = subprocess.run(args, capture_output=True, text=True)
                print('🙄🙄🙄🙄🙄🙄', completed_process)

                if completed_process.returncode == 0:
                    # Process the output if needed
                    output = completed_process.stdout.strip()
                    # test_results.append({'case': case, 'result': output.strip(), 'success': True})
                    test_results.append({'passOrFail': False if output.strip() == 'False' else True}) # bool() turns False into True, so we have to use a ternary
                else:
                    # Handle the error
                    error_message = completed_process.stderr
                    test_results.append({'case': case, 'error': error_message, 'success': False})
                    # test_results.append({'passOrFail': False if output.strip() == 'False' else True})


            except Exception as e:
                test_results.append({'case': case, 'error': str(e), 'success': False})

        return jsonify({'message': 'Tests executed', 'results': test_results})
