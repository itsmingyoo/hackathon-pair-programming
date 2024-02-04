import { useEffect, useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { editUser } from '../../store/user';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';

function EditUserPage() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const dispatch = useAppDispatch();

    const sessionUser = useAppSelector((state: RootState) => state.session.user);

    const [id, setId] = useState<string>(String(userId));
    const [username, setUsername] = useState<string>('');
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const [about, setAbout] = useState<string>('');
    const [linkGithub, setLinkGithub] = useState<string>('');
    const [linkLinkedIn, setLinkLinkedIn] = useState<string>('');
    const [linkPortfolio, setLinkPortfolio] = useState<string>('');
    const [linkLeetcode, setLinkLeetcode] = useState<string>('');

    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        if (sessionUser) {
            setUsername(sessionUser.username);
            setAbout(sessionUser.about);
            setLinkGithub(sessionUser.github);
            setLinkLinkedIn(sessionUser.linkedin);
            setLinkPortfolio(sessionUser.portfolio);
            setLinkLeetcode(sessionUser.leetcode);
        }
    }, [sessionUser]);

    const handleConfirmEdit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (sessionUser?.id != userId) {
            alert('Either must be logged in or must have matching id to edit profile');
            return;
        }

        if (errors.length) return;

        const formData = new FormData();

        formData.append('id', id);
        formData.append('username', username);

        if (profilePic) {
            formData.append('pic_url', profilePic);
        }
        
        formData.append('about', about);
        formData.append('link_github', linkGithub);
        formData.append('link_linkedin', linkLinkedIn);
        formData.append('link_portfolio', linkPortfolio);
        formData.append('link_leetcode', linkLeetcode);

        const editedUser = await dispatch(editUser(formData));

        setId(String(userId));
        setUsername('');
        setProfilePic(null);
        setAbout('');
        setLinkGithub('');
        setLinkLinkedIn('');
        setLinkPortfolio('');
        setLinkLeetcode('');

        setErrors([]);

        if (editedUser) {
            navigate(`/users/${userId}`);
        }
    }

    return (
        <>
            <div className='edit-user-page'>
                <div className='edit-user-page-title'>Edit your Profile</div>

                <form onSubmit={handleConfirmEdit}>
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>

                    <label>
                        Username
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </label>

                    <label>
                        Profile Picture
                        <input type="file" accept='image/*' onChange={(e) => {
                            if (e.target.files) {
                                setProfilePic(e.target.files[0])
                            }
                        }} />
                    </label>

                    <label>
                        About
                        <input type='text' value={about} onChange={(e) => setAbout(e.target.value)} required />
                    </label>

                    <label>
                        GitHub Link
                        <input type="text" value={linkGithub} onChange={(e) => setLinkGithub(e.target.value)} required />
                    </label>

                    <label>
                        LinkedIn Link
                        <input type="text" value={linkLinkedIn} onChange={(e) => setLinkLinkedIn(e.target.value)} required />
                    </label>

                    <label>
                        Portfolio Link
                        <input type="text" value={linkPortfolio} onChange={(e) => setLinkPortfolio(e.target.value)} required />
                    </label>

                    <label>
                        Leetcode Link
                        <input type="text" value={linkLeetcode} onChange={(e) => setLinkLeetcode(e.target.value)} required />
                    </label>

                    <button type="submit">Submit Edits</button>
                </form>
            </div>
        </>
    )
}

export default EditUserPage;