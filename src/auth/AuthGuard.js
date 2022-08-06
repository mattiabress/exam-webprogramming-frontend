
export const authGuard = (to, from, next) => {
    console.log("I'm here")
    console.log(localStorage.getItem("isAuthenticated") === null)
    if (localStorage.getItem("isAuthenticated") === null) { //isLogin
        console.log("I'm inside the ")
        next('/login');
    }else{
        const isAuthenticated=localStorage.getItem('isAuthenticated');
        if(isAuthenticated=="true")
            return next();
    }
  };