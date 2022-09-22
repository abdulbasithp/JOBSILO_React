
export const getCurrentUser = () => {
    const currentUser = localStorage.getItem('user')
    if (currentUser){
        return currentUser
    }
}



