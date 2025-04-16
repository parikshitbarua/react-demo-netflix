import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import Login from "./Login";
import Browse from "./Browse";
import { addUser, removeUser } from "../utils/userSlice";

const Body = () => {
    const dispatch = useDispatch();

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/browse",
            element: <Browse />
        }
    ])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const { accessToken, uid, email, displayName} = user;
                dispatch(addUser({
                    accessToken,
                    uid,
                    email,
                    displayName
                }));
            } else {
                console.log("Logged out");
                dispatch(removeUser());
            }
        });
    },[]);

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
};

export default Body;