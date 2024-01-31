import { TargetUserProps } from '../../interfaces/user';

function TargetUserSocials(props: TargetUserProps) {
    const { link1, link2, link3 } = props.targetUser;

    return (
        <>
            <div id="target-user-socials">
                <h3>My Socials:</h3>
                <div>
                    <a href={link1 ? link1 : '#'} target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                </div>

                <div>
                    <a href={link2 ? link2 : '#'} target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                </div>

                <div>
                    <a href={link3 ? link3 : '#'} target="_blank" rel="noopener noreferrer">
                        Portfolio
                    </a>
                </div>
            </div>
        </>
    );
}

export default TargetUserSocials;
