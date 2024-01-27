import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../store';


function UserPage() {
    const dispatch = useAppDispatch();
    const sessionUser = useSelector((state: RootState) => state.session.user);

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