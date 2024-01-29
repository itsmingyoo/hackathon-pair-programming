import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from "react-router-dom";
import catsCoding from '../../assets/images/catsCoding.png';
import chat1 from "../../assets/images/chat1.png";
import chat2 from "../../assets/images/chat2.png";
import comic1 from "../../assets/images/comic1.png";
import comic2 from "../../assets/images/comic2.png";
import comic3 from "../../assets/images/comic3.png";
import PageHeader from '../ScrambleText';
import './landingPage.css';

function LandingPage() {
    const navigate = useNavigate();
    const sessionUser = useSelector((state: RootState) => state.session.user);
    const user = useRef(sessionUser);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        if (sessionUser && !sessionUser.errors) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
        console.log('LOGGEDIN????', sessionUser, loggedIn);
    }, [sessionUser, user]);

    const handleGetStarted = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        navigate('/signup');
    };

    const handleJoinRoom = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        navigate('/code-collab');
    };
    return (
      <>
        <div className="landing-page">
          <div>
            <div className="landing-page-cool-image">
                <img
                  src={chat1}
                  alt="first-cat-sitting-and-coding"
                  id="cat-one"
                  className='bouncy-cats-one'
                />
              <div className="comix-bubbles-container">
                <div className="comic-one">
                  <img
                    src={comic1}
                    alt="first-chat-bubble-from-cats"
                    id="comic1-one"
                  />
                </div>
                <div className="comic-two">
                  <img
                    src={comic2}
                    alt="second-chat-bubble-from-cats"
                    id="comic2-two"
                  />
                </div>
                <div className="comic-three">
                  <img
                    src={comic3}
                    alt="third-chat-bubble-from-cats"
                    id="comic3-three"
                  />
                </div>
              </div>
              <div className="second-cat-div">
              <img
                  src={chat2}
                  alt="second-cat-sitting-and-coding"
                  id="cat-two"
                  className='bouncy-cats-two'
                />
              </div>
              {/* <img src={catsCoding} alt="Cats working on DS&A" className="landing-page-cool-pic" /> */}
            </div>
          </div>
          <div>
            <div className="landing-page-description">
              <PageHeader title={"Welcome to DevPair!"} />
              <div className="landing-text-one">
                <span className="accent">Connect</span> and{" "}
                <span className="accent">Unleash</span> Your Developer
                Potential!
              </div>
              <div className="landing-text-two">
                Grind DS&A questions to enhance your skills
              </div>
              <div className="landing-text-three">
                Become a better developer
              </div>
              {loggedIn ? (
                <button
                  className="landing-page-get-started"
                  onClick={handleJoinRoom}
                >
                  Join a Room!
                </button>
              ) : (
                <button
                  className="landing-page-get-started"
                  onClick={handleGetStarted}
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
}

export default LandingPage;
