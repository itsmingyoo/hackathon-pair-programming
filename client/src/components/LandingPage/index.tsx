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
              <div>Connect with other developers anywhere to work on DS&A</div>
              <div>Simply login click connect and go</div>
              <div>Become a better developer</div>
              <button className="landing-page-get-started">Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
