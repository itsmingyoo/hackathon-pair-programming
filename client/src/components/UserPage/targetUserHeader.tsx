import { TargetUserProps } from '../../interfaces/user';
function TargetUserHeader(props: TargetUserProps) {
    if (props.targetUser) {
        const { username } = props.targetUser;
        return (
            <>
                <div id="user-profile-header">
                    <span id="targetuser-username">{username}'s </span>
                    <span id="profile-text"> Profile</span>
                    <button id="dm-button" onClick={() => alert('Feature coming soon!')}>
                        Direct Message
                    </button>
                </div>
            </>
        );
    }
}

export default TargetUserHeader;
