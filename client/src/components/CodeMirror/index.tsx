import { useState, useCallback, MouseEventHandler, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { IAgoraRTCClient } from 'agora-rtc-react';
import ShareScreenComponent from '../../AgoraManager/screenShare';
import config from '../../AgoraManager/config';
import { FetchRoutes, fetchTestResults } from '../../utility/fetchTestResults';
import { fetchRTCToken } from '../../utility/fetchRTCToken';
import './index.css';

interface TestResult {
    passOrFail?: boolean;
    success?: boolean;
    error?: string;
}

interface Props {
    problemId: keyof FetchRoutes;
    problemTitle?: string;
    route?: string;
    client?: IAgoraRTCClient;
    channelName: string;
}

function IDE(props: Props) {
    const { problemId, problemTitle, channelName } = props;
    const [value, setValue] = useState<string>('# Your Python Code Here');
    const [userResults, setUserResults] = useState<boolean[]>([]);
    const [language, setLanguage] = useState<string>('python');
    const [screenSharing, setScreenSharing] = useState<boolean>(false);

    const toggleScreenShare = () => {
        setScreenSharing(!screenSharing);
    };
    useEffect(() => {
        const fetchTokenFunction = async () => {
            if (config.serverUrl !== '' && channelName !== '') {
                try {
                    const token = (await fetchRTCToken(channelName)) as string;
                    config.rtcToken = token;
                    config.channelName = channelName;
                } catch (error) {
                    console.error(error);
                }
            } else {
                console.log('Please make sure you specified the token server URL in the configuration file');
            }
        };

        fetchTokenFunction();

        console.log('😎screenSharing😎: ', screenSharing ? screenSharing : screenSharing);
    }, [screenSharing]);

    // Conditional rendering based on screen sharing state
    const renderContent = () => {
        if (screenSharing === true) {
            return (
                <>
                    <h1>Screen Sharing</h1>
                    <ShareScreenComponent setScreenSharing={setScreenSharing} />
                </>
            );
        } else {
            // Default view with CodeMirror component
            return (
                <>
                    <h1>
                        Problem: {problemId === undefined ? 'Please enter a problem name for props' : `${problemTitle}`}
                    </h1>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <div id="user-results">
                            {userResults && userResults[0] === true ? (
                                <div>✔ Test Case 1</div>
                            ) : (
                                <div>❌ Test Case 1</div>
                            )}
                            {userResults && userResults[1] === true ? (
                                <div>✔ Test Case 2</div>
                            ) : (
                                <div>❌ Test Case 2</div>
                            )}
                            {userResults && userResults[2] === true ? (
                                <div>✔ Test Case 3</div>
                            ) : (
                                <div>❌ Test Case 3</div>
                            )}
                        </div>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            <div>Language: </div>
                            <button onClick={handlePythonButton}>Python</button>
                            <button onClick={handleJavascriptButton}>JavaScript</button>
                        </div>
                    </div>
                    <CodeMirror
                        value={value}
                        height="400px"
                        extensions={language === 'python' ? [python()] : [javascript({ jsx: true })]}
                        onChange={onChange}
                        theme={dracula}
                    />
                    <button onClick={handleClick}>Submit!</button>
                </>
            );
        }
    };
    const onChange = useCallback((val: string) => {
        console.log('val:', val);
        setValue(val);
    }, []);
    const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        const results = await fetchTestResults(value, problemId, language);
        console.log('Finished Fetching...', results);

        // Handles All Edge Cases if there are errors, then return the state as false for correct rendering of elements
        if (results && results.results[0].error) {
            setUserResults(
                results.results.map((result: TestResult) => {
                    if (result.error) return false;
                })
            );
        }

        // Main Test Case
        if (results && results.results && !results.results[0].error) {
            console.log('😁😁😁 results', results.results);
            setUserResults(results.results.map((result: TestResult) => result.passOrFail));
        }
    };
    const handlePythonButton: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        setLanguage('python');
        setValue('# Your Python Code Here');
    };
    const handleJavascriptButton: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        setLanguage('javascript');
        setValue('// Your JavaScript Code Here');
    };

    useEffect(() => {
        console.log('😁😁😁 state', userResults);
        console.log('😁😁😁 state', language);
        console.log('😁😁😁 state', screenSharing);
    });

    return (
        <>
            <div>
                <button onClick={toggleScreenShare}>{screenSharing ? 'Stop Sharing' : 'Start Sharing'}</button>
                {renderContent()}
            </div>
        </>
    );
}
export default IDE;
