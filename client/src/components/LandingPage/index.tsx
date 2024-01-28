import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
// import coolImage from '../../assets/images/28565598_5500_9_10.svg';
// import hacker from '../../assets/images/hacker.svg';
import catsCoding from '../../assets/images/catsCoding.png';
import PageHeader from '../ScrambleText';
import './landingPage.css';

function LandingPage() {
    const nav = useNavigate();
    const sessionUser = useSelector((state: RootState) => state.session.user);

    useEffect(() => {
        let userLoggedIn: boolean = false;
        if (sessionUser && !sessionUser.errors) {
            userLoggedIn = true;
        }

        if (userLoggedIn) {
            nav('/home');
        }
    }, [sessionUser, nav]);
    return (
        <>
            <div className="landing-page">
                <div>
                    <div className="landing-page-cool-image">
                        {/* <img src={hacker} alt="Hacker cat in green sweatshirt" id="hacker" />
                        <img src={coolImage} alt="Green coding cat" id="cool-image" /> */}
                        <img src={catsCoding} alt="Cats working on DS&A" className="landing-page-cool-pic" />
                    </div>
                </div>
                <div>
                    <div className="landing-page-description">
                        <PageHeader title={'Welcome to DevPair!'} />
                        <div className="landing-text-one">
                            <span className="accent">Connect</span> and <span className="accent">Unleash</span> Your
                            Developer Potential!
                        </div>
                        <div className="landing-text-two">Grind DS&A questions to enhance your skills</div>
                        <div className="landing-text-three">Become a better developer</div>
                        <button className="landing-page-get-started">Get Started</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LandingPage;
