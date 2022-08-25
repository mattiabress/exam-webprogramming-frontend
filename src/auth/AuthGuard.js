
export const authGuard = (to, from, next) => {
    if (localStorage.getItem("isAuthenticated") === null) {
        next('/login');
    } else {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated == "true")
            return next();
    }
};