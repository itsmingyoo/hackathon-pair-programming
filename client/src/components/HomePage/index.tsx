
import "./homePage.css"


function HomePage() {
  return (
    <>
      <div className="landing-page">
        <div className="landing-page-content">
          <div>
            <div className="landing-page-description">
              <div className="text-one">
                <span className="accent">Connect</span> and{" "}
                <span className="accent">Unleash</span> Your Developer
                Potential!
              </div>
              <div className="text-two">
                Grind DS&A questions to enhance your skills
              </div>
              <div className="text-three">Become a better developer</div>
              <button className="home-page-get-started">Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
