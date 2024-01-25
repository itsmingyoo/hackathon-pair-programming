import { useState, useCallback, MouseEventHandler, useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { FetchRoutes, fetchTestResults } from '../../utility/fetchTestResults';
import { AgoraRTCScreenShareProvider, useRTCScreenShareClient } from '../../context/Screenshare';
import { IAgoraRTCClient } from 'agora-rtc-react';
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
}

function IDE(props: Props) {
    const { problemId, problemTitle } = props;
    const [value, setValue] = useState<string>('# Your Python Code Here');
    const [userResults, setUserResults] = useState<boolean[]>([]);
    const [language, setLanguage] = useState<string>('python');

    // Use the screen share context
    const { startScreenShare, stopScreenShare, screenTrack } = useRTCScreenShareClient();
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const screenShareRef = useRef(null);

    const toggleScreenShare = async () => {
        if (!isScreenSharing) {
            await startScreenShare();
        } else {
            await stopScreenShare();
        }
        setIsScreenSharing(!isScreenSharing);
    };

    useEffect(() => {
        // Whenever screenTrack changes and is not null, attach it to the screen share container
        if (screenTrack && screenShareRef.current) {
            screenTrack.play(screenShareRef.current);
        }

        // Cleanup function to stop screen sharing when the component unmounts or screenTrack changes
        return () => {
            if (screenTrack) {
                screenTrack.stop();
            }
        };
    }, [screenTrack, screenShareRef]);

    // Conditional rendering based on screen sharing state
    const renderContent = () => {
        if (isScreenSharing && screenTrack) {
            return (
                <>
                    {/* <AgoraRTCScreenShareProvider client={props.client}> */}
                    <h1>Screen Sharing</h1>
                    <div
                        ref={screenShareRef}
                        className="screen-share-container"
                        style={{
                            width: '500px', // Set the width explicitly
                            height: '500px', // Set the height explicitly
                            position: 'relative', // Add position style
                            zIndex: 1, // Ensure it's above other content
                        }}
                    ></div>
                    {/* </AgoraRTCScreenShareProvider> */}
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
        console.log('😁😁😁 state', isScreenSharing);
        console.log('😁😁😁 state', screenTrack);
    });

    return (
        <>
            <div>
                <button onClick={toggleScreenShare}>{isScreenSharing ? 'Stop Sharing' : 'Start Sharing'}</button>
                {renderContent()}
            </div>
        </>
    );
}
export default IDE;
