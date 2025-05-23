import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import Header from "./Header";
import { validateLoginForm } from "../utils/validate";
import { auth } from "../utils/firebase";
import {addUser} from "../utils/userSlice";

const Login = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const toggleSignInForm = () => {
        setIsSignInForm((prev) => !prev);
    }

    useEffect(() => {
        if(user) {
            navigate('/browse');
        }
    })

    const handleLogin = () => {
        const errorMessage = validateLoginForm(name?.current?.value, email?.current?.value, password?.current?.value, isSignInForm);
        setErrorMessage(errorMessage);
        if (errorMessage) return;

        if(!isSignInForm) {
            // sign up the user
            createUserWithEmailAndPassword(auth, email?.current?.value, password?.current?.value)
                .then((userCredential) => {
                    // Signed up
                    const user = userCredential.user;
                    updateProfile(auth.currentUser, {
                        displayName: name?.current?.value,
                    }).then(() => {
                        const { accessToken, email, displayName, uid } = auth.currentUser;
                        dispatch(addUser({
                            accessToken,
                            email,
                            displayName,
                            uid
                        }));
                    }).catch((error) => {
                        setErrorMessage(error.message);
                    });
                    navigate('/browse');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorMessage);
                });
        } else {
            // sign in the user
            signInWithEmailAndPassword(auth, email?.current?.value, password?.current?.value)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    navigate('/browse');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorMessage);
                });
        }

    }

    return (
        <div>
            <Header />
            <div className="absolute">
                <img
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/fa4630b1-ca1e-4788-94a9-eccef9f7af86/web/IN-en-20250407-TRIFECTA-perspective_43f6a235-9f3d-47ef-87e0-46185ab6a7e0_small.jpg"
                    alt="background-img"/>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="w-3/12 absolute p-12 bg-black bg-opacity-80 my-36 mx-auto right-0 left-0 text-white rounded-lg">
                <h1
                    className="text-3xl font-bold py-4 px-3"
                >
                    {
                        isSignInForm ?
                        "Sign In" :
                        "Sign Up"
                    }
                </h1>
                { !isSignInForm && <input
                    ref={name}
                    type="text"
                    placeholder="Full Name"
                    className="my-2 p-3 w-full bg-gray-700"
                /> }
                <input
                    ref={email}
                    type="text"
                    placeholder="Email Address"
                    className="my-2 p-3 w-full bg-gray-700"
                />
                <input
                    ref={password}
                    type="text"
                    placeholder="Password"
                    className="my-2 p-3 w-full bg-gray-700"
                />
                <p className="text-red-500 font-bold p-2"> { errorMessage }</p>
                <button
                    onClick={handleLogin}
                    className="my-4 p-4 bg-red-700 w-full cursor-pointer"
                >
                    { isSignInForm ? "Sign In" : "Sign Up" }
                </button>
                <p
                    className="py-4 cursor-pointer"
                    onClick={toggleSignInForm}>
                    { isSignInForm ? "New to Netflix? Sign Up now." : "Already have an account? Sign In now." }
                </p>
            </form>
        </div>
    )
}

export default Login;