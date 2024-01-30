import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks';
import { RootState } from '../../store';
import { getUser } from '../../store/user';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import './index.css';
import TargetUserSocials from './targetUserSocials';

function UserPage() {
    const { userId } = useParams();

    const dispatch = useAppDispatch();
    const sessionUser = useSelector((state: RootState) => state.session.user);
    const targetUser = useSelector((state: RootState) => state.user.targetUser);

    useEffect(() => {
        if (userId) dispatch(getUser(+userId));
        console.log('sessionuser', sessionUser);
    }, [userId]);
    console.log('targetuser', targetUser);

    if (userId && sessionUser && +sessionUser.id === +userId) {
        return (
            <>
                <div id="user-page-wrapper">
                    <div className="user-page">
                        <div className="user-page-content">
                            <div className="user-header">
                                <div className="user-pic-div">
                                    <img src={targetUser?.picUrl} alt="bruh"></img>
                                    Placeholder until I get AWS going
                                </div>

                                <div className="user-name-div">{targetUser?.username}</div>

                                <div className="buttons-div">
                                    {sessionUser?.id === targetUser?.id ? (
                                        <button>Edit</button>
                                    ) : (
                                        <button>Follow</button>
                                    )}
                                </div>
                            </div>

                            <div className="user-body">
                                <div className="user-details-div">
                                    <div className="summary">
                                        <div>About Me:</div>
                                        <div>{targetUser?.about}</div>
                                    </div>

                                    <div className="links">
                                        <div>Links:</div>
                                        <div>
                                            <div>
                                                <a href={targetUser?.link1} target="_blank">
                                                    LinkedIn
                                                </a>
                                            </div>

                                            <div>
                                                <a href={targetUser?.link2} target="_blank">
                                                    GitHub
                                                </a>
                                            </div>

                                            <div>
                                                <a href={targetUser?.link3} target="_blank">
                                                    Portfolio
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div id="user-profile-main">
                    <div id="user-profile-container">
                        <div id="user-profile-header">
                            <h1>
                                <span id="targetuser-username">{targetUser?.username}</span> Profile
                            </h1>
                        </div>

                        <div className="hr-line"></div>

                        <div id="user-profile-content">
                            <div id="user-about">
                                <p>{targetUser?.about}</p>
                            </div>

                            <div id="user-socials">
                                <TargetUserSocials targetUser={targetUser} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default UserPage;
