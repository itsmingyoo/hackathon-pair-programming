import { useNavigate } from "react-router-dom";
import "./landingPage.css"
import { useSelector } from "react-redux";
import { RootState } from "../../store";


function LandingPage() {

  const nav = useNavigate()
  const sessionUser = useSelector((state: RootState) => state.session.user);

  let userLoggedIn: boolean = false;
  if(sessionUser && !sessionUser.errors) {
      userLoggedIn = true;
  }


  if(userLoggedIn) {
    nav("/home")
  }
  return (
    <>
      <div className="landing-page">
        <div className="landing-page-content">
          <div>
            <div className="landing-page-cool-image">
              This will be a cool image
            </div>
          </div>
          <div>
            <div className="landing-page-description">
              <div>This will be a couples lines of description</div>
              <div>This will be the second line</div>
              <div>and possibly the last</div>
              <button>Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
