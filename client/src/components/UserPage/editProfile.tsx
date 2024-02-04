import {
  useEffect,
  useState,
  FormEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { editUser } from "../../store/session";
import { useAppDispatch, useAppSelector } from "../../hooks";
import "./editProfile.css";

interface EditUserProps {
  setEditMode: Dispatch<SetStateAction<boolean>>;
}

function EditUserPage({ setEditMode }: EditUserProps) {
  const dispatch = useAppDispatch();

  const sessionUser = useAppSelector((state) => state.session.user);

  const [username, setUsername] = useState<string>("");
  const [profilePic, setProfilePic] = useState<File | string>("");
  const [about, setAbout] = useState<string>("");
  const [linkGithub, setLinkGithub] = useState<string>("");
  const [linkLinkedIn, setLinkLinkedIn] = useState<string>("");
  const [linkPortfolio, setLinkPortfolio] = useState<string>("");
  const [linkLeetcode, setLinkLeetcode] = useState<string>("");
  const urlPattern = /^https?:\/\/[^\s$.?#].[^\s]*$/;

  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  // Populate form fields when sessionUser changes
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

  // Handler for file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      // ProfilePic validation for file size
      if (file.size > 1024 * 1024) {
        // Example file size check (1MB)
        setErrors((prevErrors) => ({
          ...prevErrors,
          pic_url: "Profile picture must be smaller than 1MB",
        }));
      } else {
        setErrors((prev) => {
          const err = { ...prev };
          delete err.pic_url;
          return err;
        });
        setProfilePic(file);
      }
    }
  };

  // Handler for form submission
  const handleConfirmEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(errors).length) {
      return;
    }

    const formData = new FormData();

    formData.append("username", username);

    if (profilePic) {
      formData.append("pic_url", profilePic);
    }

    formData.append("about", about);
    formData.append("link_github", linkGithub);
    formData.append("link_linkedin", linkLinkedIn);
    formData.append("link_portfolio", linkPortfolio);
    formData.append("link_leetcode", linkLeetcode);

    const actionResult = await dispatch(editUser(formData));

    if (editUser.fulfilled.match(actionResult)) {
      // Handle the fulfilled case
      setEditMode(false);
    } else if (editUser.rejected.match(actionResult)) {
      // Handle the rejected case
      const errors =
        typeof actionResult.payload === "object"
          ? actionResult.payload
          : { other: "An unexpected error occurred" };
      setErrors({ ...errors });
    }
  };
  const errorClass = Object.values(errors).length
    ? "login-form-error login-form-input"
    : "login-form-input";

  return (
    <>
      <div className="edit-user-page">
        <div className="edit-user-page-title">Edit Profile</div>

        <form onSubmit={handleConfirmEdit} id="edit-user-profile-form">
          <div id="edit-form-content-wrapper">
            <div>
              <div className="edit-form">
                <label className="image-label">
                  <div className="image-upload">
                    {profilePic  && typeof profilePic !== 'string' ? (
                      <p className="upload-name">{profilePic.name}</p>
                    ) : (
                      <>
                        <p>Upload</p>
                      </>
                    )}
                    <div className="image-dot">
                      <p>+</p>
                    </div>
                  </div>
                  <input
                    className="image-upload-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <span className="input-border"></span>
                </label>
              </div>
              {errors.pic_url ? (
                <p className="errors">* {errors.pic_url}</p>
              ) : null}
              <div className="edit-form">
                <label>
                  Username
                  <input
                    className={errorClass}
                    type="text"
                    value={username}
                    onChange={(e) => {
                      if (!username.trim()) {
                        setErrors((prev) => {
                          const err = { ...prev };
                          err.username = "Username cannot be empty.";
                          return err;
                        });
                      } else {
                        setErrors((prev) => {
                          const err = { ...prev };
                          delete err.username;
                          return err;
                        });
                      }
                      setUsername(e.target.value);
                    }}
                    required
                  />
                  <span className="input-border"></span>
                </label>
              </div>
              {errors.username ? (
                <p className="errors">* {errors.username}</p>
              ) : null}

              <div className="edit-form">
                <label>
                  About
                  <input
                    className="edit-input"
                    type="text"
                    value={about}
                    maxLength={500}
                    onChange={(e) => setAbout(e.target.value)}
                    required
                  />
                  <span className="input-border"></span>
                </label>
              </div>
              {errors.about ? <p className="errors">* {errors.about}</p> : null}
            </div>
            <div>
              <div className="edit-form">
                <label>
                  GitHub Link
                  <input
                    className="edit-input"
                    type="url"
                    value={linkGithub}
                    onChange={(e) => {
                      // try to validate the url
                      if (!urlPattern.test(linkGithub)) {
                        setErrors((prev) => {
                          const err = { ...prev };
                          err.link_github = "Link must be a valid url!";
                          return err;
                        });
                      } else {
                        setErrors((prev) => {
                          const err = { ...prev };
                          delete err.link_github;
                          return err;
                        });
                      }
                      setLinkGithub(e.target.value);
                    }}
                    required
                  />
                  <span className="input-border"></span>
                </label>
              </div>
              {errors.link_github ? (
                <p className="errors">* {errors.link_github}</p>
              ) : null}

              <div className="edit-form">
                <label>
                  LinkedIn Link
                  <input
                    className="edit-input"
                    type="text"
                    value={linkLinkedIn}
                    onChange={(e) => {
                      // try to validate the url
                      if (!urlPattern.test(linkLinkedIn)) {
                        setErrors((prev) => {
                          const err = { ...prev };
                          err.link_linkedin = "Link must be a valid url!";
                          return err;
                        });
                      } else {
                        setErrors((prev) => {
                          const err = { ...prev };
                          delete err.link_linkedin;
                          return err;
                        });
                      }
                      setLinkLinkedIn(e.target.value);
                    }}
                    required
                  />
                  <span className="input-border"></span>
                </label>
              </div>
              {errors.link_linkedin ? (
                <p className="errors">* {errors.link_linkedin}</p>
              ) : null}
              <div className="edit-form">
                <label>
                  Portfolio Link
                  <input
                    className="edit-input"
                    type="text"
                    value={linkPortfolio}
                    onChange={(e) => {
                      // try to validate the url
                      if (!urlPattern.test(linkPortfolio)) {
                        setErrors((prev) => {
                          const err = { ...prev };
                          err.link_portfolio = "Link must be a valid url!";
                          return err;
                        });
                      } else {
                        setErrors((prev) => {
                          const err = { ...prev };
                          delete err.link_portfolio;
                          return err;
                        });
                      }
                      setLinkPortfolio(e.target.value);
                    }}
                    required
                  />
                  <span className="input-border"></span>
                </label>
              </div>
              {errors.link_portfolio ? (
                <p className="errors">* {errors.link_portfolio}</p>
              ) : null}
              <div className="edit-form">
                <label>
                  Leetcode Link
                  <input
                    className="edit-input"
                    type="text"
                    value={linkLeetcode}
                    onChange={(e) => {
                      // try to validate the url
                      if (!urlPattern.test(linkLeetcode)) {
                        setErrors((prev) => {
                          const err = { ...prev };
                          err.link_leetcode = "Link must be a valid url!";
                          return err;
                        });
                      } else {
                        setErrors((prev) => {
                          const err = { ...prev };
                          delete err.link_leetcode;
                          return err;
                        });
                      }
                      setLinkLeetcode(e.target.value);
                    }}
                    required
                  />
                  <span className="input-border"></span>
                </label>
              </div>
              {errors.link_leetcode ? (
                <p className="errors">* {errors.link_leetcode}</p>
              ) : null}
            </div>
          </div>
          <button className="profile-buttons" type="submit">
            Submit Changes
          </button>
        </form>
      </div>
    </>
  );
}

export default EditUserPage;
