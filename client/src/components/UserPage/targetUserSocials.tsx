import { User } from '../../interfaces/user';

interface Props {
    targetUser: User | null;
}

function TargetUserSocials(props: Props) {
    if (props.targetUser) {
        const { link1, link2, link3 } = props.targetUser;

        return (
            <>
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
            </>
        );
    }
}

export default TargetUserSocials;
