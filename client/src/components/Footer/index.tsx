import './Footer.css';
import GitHubIcon from "../../assets/icons/svg/github.svg";
import LinkedInIcon from "../../assets/icons/svg/linkedin.svg";
//should change github and linkedin names to icons

function Footer() {
    return (
      <div className="footer-container">
        <div className="all-developers">
          <div className="developer-container">
            <div className="developer-name">Minh Tran</div>
            <div className="developer-links-container">
              <div className="developer-github">
                <a
                  className="github"
                  href="https://github.com/itsmingyoo"
                  target="_blank"
                >
                  <img
                    src={GitHubIcon}
                    alt="GitHub Icon"
                    style={{ width: "18px", height: "18px" }}
                  />
                </a>
              </div>
              <div className="developer-linkedin">
                <a
                  className="linkedin"
                  href="https://www.linkedin.com/in/minh-tran-36501a251"
                  target="_blank"
                >
                  <img
                    src={LinkedInIcon}
                    alt="GitHub Icon"
                    style={{ width: "18px", height: "18px" }}
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="developer-container">
            <div className="developer-name">John Wofford</div>
            <div className="developer-links-container">
              <div className="developer-github">
                <a
                  className="github"
                  href="https://github.com/jwoff1991"
                  target="_blank"
                >
                  <img
                    src={GitHubIcon}
                    alt="GitHub Icon"
                    style={{ width: "18px", height: "18px" }}

                  />
                </a>
              </div>
              <div className="developer-linkedin">
                <a
                  className="linkedin"
                  href="https://www.linkedin.com/in/jonathanbwofford/"
                  target="_blank"
                >
                  <img
                    src={LinkedInIcon}
                    alt="GitHub Icon"
                    style={{ width: "18px", height: "18px" }}

                  />
                </a>
              </div>
            </div>
          </div>
          <div className="developer-container">
            <div className="developer-name">Melinda Cortez</div>
            <div className="developer-links-container">
              <div className="developer-github">
                <a className="github" href="#" target="_blank">
                  <img
                    src={GitHubIcon}
                    alt="GitHub Icon"
                    style={{ width: "18px", height: "18px" }}

                  />
                </a>
              </div>
              <div className="developer-linkedin">
                <a className="linkedin" href="#" target="_blank">
                  <img
                    src={LinkedInIcon}
                    alt="GitHub Icon"
                    style={{ width: "18px", height: "18px" }}

                  />
                </a>
              </div>
            </div>
          </div>
          <div className="developer-container">
            <div className="developer-name">Saad Anwer</div>
            <div className="developer-links-container">
              <div className="developer-github">
                <a className="github" href="#" target="_blank">
                  <img
                    src={GitHubIcon}
                    alt="GitHub Icon"
                    style={{ width: "18px", height: "18px" }}

                  />
                </a>
              </div>
              <div className="developer-linkedin">
                <a className="linkedin" href="#" target="_blank">
                  <img
                    src={LinkedInIcon}
                    alt="GitHub Icon"
                    style={{ width: "18px", height: "18px" }}

                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="copywrite">
          App Academy Winter Hackathon 2024
          <div>
            "Empowering Collaboration, Anytime, Anywhere."
          </div>
        </div>
      </div>
    );
}

export default Footer;
