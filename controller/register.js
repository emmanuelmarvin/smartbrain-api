const handleRegister = (req, res, database, bcrypt) => {
    const { email, name, password } = req.body
    const hash = bcrypt.hashSync(password);
    if (!email || !name || !password) {
        return res.status(400).json('its a bad request over here');
    }
    database.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        }).into('login')
            .returning('email')
            .then(loginEmail => {
                return trx("users")
                    .returning("*")
                    .insert({
                        "email": loginEmail[0].email,
                        "name": name,
                        "joined": new Date()
                    }).then(users => {
                        if (users.length) {
                            res.json(users[0])
                        } else {
                            res.status(400).json("unable to register")
                        }
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    }).
        catch(err => {
            res.status(400).json("unable to register // " + err + " // " + process.env.DB_CONNECT)
        })


}


module.exports = {
    handleRegister: handleRegister
}