import { useEffect, useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { editUser } from '../../store/session';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import './editProfile.css';

function EditUserPage() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const dispatch = useAppDispatch();

    const sessionUser = useAppSelector((state: RootState) => state.session.user);

    const [id, setId] = useState<string>(String(userId));
    const [username, setUsername] = useState<string>('');
    const [profilePic, setProfilePic] = useState<File| string>('');
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

        // Reset errors state at the beginning of validation
    setErrors([]);

    let validationErrors = [];

    // Username validation
    if (!username.trim()) {
        validationErrors.push('Username cannot be empty.');
    }

    // ProfilePic validation - assuming you want to allow both File and string types
    if (typeof profilePic === 'object' && profilePic.size > 1024 * 1024) { // Example file size check (1MB)
        validationErrors.push('Profile picture must be smaller than 1MB.');
    } else if (typeof profilePic === 'string' && profilePic && !profilePic.startsWith('http')) {
        validationErrors.push('Profile picture URL must be valid.');
    }

    // About validation - example: checking length
    if (about.length > 500) { // Assuming max 500 characters
        validationErrors.push('About section must be less than 500 characters.');
    }

    // Links validation
    const urlPattern = /^https?:\/\/[^\s$.?#].[^\s]*$/;
    if (linkGithub && !urlPattern.test(linkGithub)) {
        validationErrors.push('GitHub link must be a valid URL.');
    }
    if (linkLinkedIn && !urlPattern.test(linkLinkedIn)) {
        validationErrors.push('LinkedIn link must be a valid URL.');
    }
    if (linkPortfolio && !urlPattern.test(linkPortfolio)) {
        validationErrors.push('Portfolio link must be a valid URL.');
    }
    if (linkLeetcode && !urlPattern.test(linkLeetcode)) {
        validationErrors.push('LeetCode link must be a valid URL.');
    }

    if (validationErrors.length) {
        setErrors(validationErrors);
        return;
    }

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

        console.log('Result from edit dispatch', editedUser);


    };

    return (
        <>
            <div className="edit-user-page">
                <div className="edit-user-page-title">Edit your Profile</div>

                <form onSubmit={handleConfirmEdit} id="edit-user-profile-form">
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>

                    <div className="edit-form">
                        <label>
                            Username
                            <input
                                className="edit-input"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <span className="input-border"></span>
                        </label>
                    </div>
                    <div className="edit-form">
                        <label>
                            Profile Picture
                            <input
                                className="edit-input"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files) {
                                        setProfilePic(e.target.files[0]);
                                    }
                                }}
                            />
                            <span className="input-border"></span>
                        </label>
                    </div>

                    <div className="edit-form">
                        <label>
                            About
                            <input
                                className="edit-input"
                                type="text"
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                required
                            />
                            <span className="input-border"></span>
                        </label>
                    </div>

                    <div className="edit-form">
                        <label>
                            GitHub Link
                            <input
                                className="edit-input"
                                type="url"
                                value={linkGithub}
                                onChange={(e) => setLinkGithub(e.target.value)}
                                required
                            />
                            <span className="input-border"></span>
                        </label>
                    </div>

                    <div className="edit-form">
                        <label>
                            LinkedIn Link
                            <input
                                className="edit-input"
                                type="text"
                                value={linkLinkedIn}
                                onChange={(e) => setLinkLinkedIn(e.target.value)}
                                required
                            />
                            <span className="input-border"></span>
                        </label>
                    </div>

                    <div className="edit-form">
                        <label>
                            Portfolio Link
                            <input
                                className="edit-input"
                                type="text"
                                value={linkPortfolio}
                                onChange={(e) => setLinkPortfolio(e.target.value)}
                                required
                            />
                            <span className="input-border"></span>
                        </label>
                    </div>

                    <div className="edit-form">
                        <label>
                            Leetcode Link
                            <input
                                className="edit-input"
                                type="text"
                                value={linkLeetcode}
                                onChange={(e) => setLinkLeetcode(e.target.value)}
                                required
                            />
                            <span className="input-border"></span>
                        </label>
                    </div>

                    <button id="edit-button" type="submit">
                        Submit Changes
                    </button>
                </form>
            </div>
        </>
    );
}

export default EditUserPage;
