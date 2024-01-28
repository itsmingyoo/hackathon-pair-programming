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

    console.log('hi', targetUser);

    return (
        <>
            <div className='user-page'>
                <div className='user-page-content'>
                    <div className='user-header'>
                        <div className='user-pic-div'>
                            <img src="iMadeItUp" alt="bruh"></img>
                            Placeholder until I get AWS going
                        </div>

                        <div className='user-name-div'>
                            Put username here
                        </div>
                    </div>

                    <div className='user-body'>

                    </div>
                </div>
            </div>
        </>
    )
}

export default UserPage;