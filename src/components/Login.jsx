import { useState } from "react";
import Header from "./Header";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const toggleSignInForm = () => {
        setIsSignInForm((prev) => !prev);
    }

    return (
        <div>
            <Header />
            <div className="absolute">
                <img
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/fa4630b1-ca1e-4788-94a9-eccef9f7af86/web/IN-en-20250407-TRIFECTA-perspective_43f6a235-9f3d-47ef-87e0-46185ab6a7e0_small.jpg"
                    alt="background-img"/>
            </div>
            <form className="w-3/12 absolute p-12 bg-black bg-opacity-80 my-36 mx-auto right-0 left-0 text-white rounded-lg">
                <h1 className="text-3xl font-bold py-4 px-3">{ isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && <input type="text" placeholder="Full Name" className="my-2 p-3 w-full bg-gray-700" />}
                <input type="text" placeholder="Email Address" className="my-2 p-3 w-full bg-gray-700" />
                <input type="text" placeholder="Password" className="my-2 p-3 w-full bg-gray-700" />
                <button className="my-4 p-4 bg-red-700 w-full cursor-pointer">{ isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up now." : "Already have an account? Sign In now."}</p>
            </form>
        </div>
    )
}

export default Login;