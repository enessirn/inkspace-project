function checkPassword(password,confirmPassword) {
    if (password == confirmPassword) {
        return true;
    }
    else{
        return false
    }
}

export default checkPassword
