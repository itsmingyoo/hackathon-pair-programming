import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../store';
import { getUser } from '../../store/user';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


function UserPage() {
    const {userId} = useParams();

    const dispatch = useAppDispatch();
    const sessionUser = useSelector((state: RootState) => state.session.user);
    const targetUser = useSelector((state: RootState) => state.user.targetUser);

    useEffect(() => {
        if (userId) dispatch(getUser(+userId));
    }, [userId])



    return (
        <>
            <div className='user-page'>
                <div className='user-page-content'>

                    <div className='user-header'>
                        <div className='user-pic-div'>
                            <img src={targetUser?.picUrl} alt="bruh"></img>
                            Placeholder until I get AWS going
                        </div>

                        <div className='user-name-div'>
                            {targetUser?.username}
                        </div>

                        <div className='buttons-div'>
                            {(sessionUser?.id === targetUser?.id ? (<button>Edit</button> ) : <button>Follow</button>)}
                        </div>
                    </div>

                    <div className='user-body'>
                        <div className='user-details-div'>
                            <div className='summary'>
                                <div>About Me:</div>
                                <div>
                                    {targetUser?.about}
                                </div>
                            </div>

                            <div className='links'>
                                <div>Links:</div>
                                <div>
                                    <div>
                                        <a href={targetUser?.link1}>LinkedIn</a>
                                    </div>

                                    <div>
                                        <a href={targetUser?.link2}>GitHub</a>
                                    </div>

                                    <div>
                                        <a href={targetUser?.link3}>Portfolio</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default UserPage;
