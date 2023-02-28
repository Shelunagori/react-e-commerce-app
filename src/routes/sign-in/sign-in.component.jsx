import { singInWithGooglePopup } from "../../utils/firebase/firebase.utils"
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {

    const logGoogleUser = async () => {
        const { user } = await singInWithGooglePopup();
        const userDocRef = createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>Sign-in</h1>
            <button onClick={logGoogleUser}> Sign in with Google Popup </button>
        </div>
    )
}

export default SignIn