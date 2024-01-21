import { useState, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { ViewUpdate } from '@codemirror/view';

function IDE() {
    const [value, setValue] = useState<string>('// Your Code Here');
    const onChange = useCallback((val: string, viewUpdate: ViewUpdate) => {
        // viewUpdate replaced with _ and type unknown might need to be changed.
        console.log('val:', val);
        setValue(val);
    }, []);
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
            )
        </>
    );
}
export default IDE;
