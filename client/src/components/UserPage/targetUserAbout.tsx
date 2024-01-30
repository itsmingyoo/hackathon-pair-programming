import { TargetUserProps } from '../../interfaces/user';
function TargetUserAbout(props: TargetUserProps) {
    if (props.targetUser) {
        const { about } = props.targetUser;
        return (
            <>
                <div id="user-about">
                    <h3>About Me: </h3>
                    <p>{about ? about : 'This is a default description about me.'}</p>
                </div>
            </>
        );
    }
}

export default TargetUserAbout;
