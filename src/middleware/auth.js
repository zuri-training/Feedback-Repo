const isAuth = (req, res, next) => {
    if(req.session.user){
        next();
    }else{
        res.redirect('/student_login')
    }
}


module.exports = isAuth