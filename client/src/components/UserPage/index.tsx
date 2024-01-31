import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { useAppDispatch } from '../../hooks';
import { RootState } from '../../store';
import { getUser } from '../../store/user';
import TargetUserSocials from './targetUserSocials';
import TargetUserHeader from './targetUserHeader';
import TargetUserInfoBox from './targetUserInfoBox';
import TargetUserAbout from './targetUserAbout';
import './index.css';

function UserPage() {
    const { userId } = useParams();
    const dispatch = useAppDispatch();
    const sessionUser = useAppSelector((state: RootState) => state.session.user);
    const targetUser = useAppSelector((state: RootState) => state.user.targetUser);
    // const following = useAppSelector((state: RootState) => state.userFollowing);

    useEffect(() => {
        if (userId) dispatch(getUser(+userId));
    }, [userId]);
    // console.log('sessionuser', sessionUser);
    // console.log('targetuser', targetUser);
    // console.log('storeState', storeState);
    // console.log('following', following);

    // Render Current User's Profile ELSE Render Target User's Profile
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
                <div id="target-profile-main">
                    <div id="target-profile-container">
                        {targetUser && <TargetUserHeader targetUser={targetUser} />}

                        <div className="hr-line"></div>

                        <div id="targetuser-profile-split">
                            <div id="user-profile-content">
                                {targetUser && <TargetUserInfoBox targetUser={targetUser} />}

                                {targetUser && <TargetUserAbout targetUser={targetUser} />}

                                {targetUser && <TargetUserSocials targetUser={targetUser} />}
                            </div>
                            <div id="targetuser-friends-container">
                                <div>Following</div>
                                <div>Followers</div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default UserPage;
