from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
import subprocess, sys, asyncio, pathlib, os

code_testing_routes = Blueprint('problem', __name__)

userPythonTestPath = './app/user_tests/user_test.py'
userJavascriptTestPath = './app/user_tests/user_test.js'
pythonTest = '''
if __name__ == "__main__":
    a = int(sys.argv[1])
    b = int(sys.argv[2])
    result = int(sys.argv[3])
    print(add(a, b) == result)
'''
javascriptTest = '''
if (require.main === module) {
    const a = parseInt(process.argv[2]);
    const b = parseInt(process.argv[3]);
    const expectedResult = parseInt(process.argv[4]);
    console.log(add(a, b) === expectedResult);
}
'''

@login_required
@code_testing_routes.route('/add-two-sum', methods=['POST'])
def add_two_sum():
    code = request.json.get('code')
    language = request.json.get('language')

    if code is None:
        return jsonify({'error': 'No code provided'}), 400

    if code:
        with open(userPythonTestPath if language == 'python' else userJavascriptTestPath, 'w') as file:
            if language == 'python':
                file.write('import sys\n')
                file.write(code + '\n')
            else:
                file.write(code + '\n')
        with open(userPythonTestPath if language == 'python' else userJavascriptTestPath, 'a') as file:
            file.write((pythonTest.strip() + '\n') if language == 'python' else (javascriptTest.strip() + '\n'))

        test_cases = [
        ["1", "2", "3"],
        ["4", "5", "9"],
        ["6", "7", "13"]
        ]
        test_results = []

        for case in test_cases:
            try:
                args = ['python' if language == 'python' else 'node', userPythonTestPath if language  == 'python' else userJavascriptTestPath] + case
                completed_process = subprocess.run(args, capture_output=True, text=True)
                if completed_process.returncode == 0:
                    # Process the output if needed
                    output = completed_process.stdout.strip()
                    # test_results.append({'case': case, 'result': output.strip(), 'success': True})
                    test_results.append({'passOrFail': True if output.strip() == 'True' or output.strip() == 'true' else False}) # bool() turns False into True, so we have to use a ternary
                else:
                    error_message = completed_process.stderr
                    test_results.append({'case': case, 'error': error_message, 'success': False})
            except Exception as e:
                test_results.append({'case': case, 'error': str(e), 'success': False})
        return jsonify({'message': 'Tests executed', 'results': test_results})
