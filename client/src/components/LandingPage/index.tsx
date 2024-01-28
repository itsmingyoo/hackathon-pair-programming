import { useNavigate } from "react-router-dom";
import "./landingPage.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import catsCoding from "../../assets/images/catsCoding.png";
// import coolImage from '../../assets/images/28565598_5500_9_10.svg';
// import hacker from '../../assets/images/hacker.svg';
import PageHeader from "../ScrambleText";

function LandingPage() {
  const nav = useNavigate();
  const sessionUser = useSelector((state: RootState) => state.session.user);

  let userLoggedIn: boolean = false;
  if (sessionUser && !sessionUser.errors) {
    userLoggedIn = true;
  }

  if (userLoggedIn) {
    nav("/home");
  }
  return (
    <>
      <div className="landing-page">
        <div className="landing-page-cool-image">
          <img
            src={catsCoding}
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
          <button className="landing-page-get-started">Get Started</button>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
