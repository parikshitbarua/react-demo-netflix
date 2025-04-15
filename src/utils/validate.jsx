export const validateLoginForm = (name, email, password, isSignInForm) => {
    let isNameValid = true;
    if (!isSignInForm) {
        // validate name only if it is the sign-in form
        isNameValid = /^[a-zA-Z ]{2,30}$/.test(name);
    }
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isPasswordValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);

    if (!isNameValid) return "Please enter a valid name";
    if(!isEmailValid) return "Please enter a valid email";
    if(!isPasswordValid) return "Please enter a valid password";

    return null;
}