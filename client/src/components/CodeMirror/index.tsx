import { useState, useCallback, MouseEventHandler } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { ViewUpdate } from '@codemirror/view';

function IDE() {
    const [value, setValue] = useState<string>('# Your Python Code Here');

    const onChange = useCallback((val: string, viewUpdate: ViewUpdate) => {
        // viewUpdate replaced with _ and type unknown might need to be changed.
        console.log('viewUpdate:', viewUpdate);
        console.log('val:', val);
        setValue(val);
    }, []);

    const fetchResults = async (value: string) => {
        const response = await fetch('/api/test-code/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: value }),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.log('Error fetching to the backend');
            return { error: 'Fetch failed', statusCode: response.status };
        }
    };

    const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        const result = await fetchResults(value);
        console.log('Finished Fetching...', result);
    };

    return (
        <>
            <h1>Welcome to the code editor</h1>
            <CodeMirror
                value={value}
                height="400px"
                extensions={[javascript({ jsx: true })]}
                onChange={onChange}
                theme={dracula}
            />
            <button onClick={handleClick}>Submit!</button>
        </>
    );
}
export default IDE;
