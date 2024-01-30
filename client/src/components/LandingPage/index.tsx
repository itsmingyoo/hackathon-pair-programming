import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import chat1 from "../../assets/images/catsCoding.png";
import PageHeader from "../ScrambleText";
import "./landingPage.css";

function LandingPage() {
  const navigate = useNavigate();
  const sessionUser = useSelector((state: RootState) => state.session.user);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (sessionUser && !sessionUser.errors) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [sessionUser]);

  const handleGetStarted = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate("/signup");
  };

  const handleJoinRoom = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate("/code-collab");
  };
  return (
    <main className="landing-page">
        <div className="landing-page-cool-image">
          <img
            src={chat1}
            alt="Cats working on DS&A"
            className="landing-page-cool-pic"
          />
        </div>
        <div className="landing-page-description">
          <PageHeader title="DevPair!" />
          <>
            <div className="landing-text-one">
              <span className="accent">Connect</span> and collaborate with
              developers worldwide.
            </div>
            <div className="landing-text-two">
              <span className="accent">Grind</span> DS&A questions to enhance
              your skills
            </div>
            <div className="landing-text-three">
              <span className="accent">Unleash</span> Your Developer Potential!
            </div>
          </>
        {loggedIn ? (
          <button className="landing-page-get-started" onClick={handleJoinRoom}>
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
    </main>
  );
}

export default LandingPage;
