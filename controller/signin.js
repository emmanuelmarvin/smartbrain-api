const handleSign = (req, res, database, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('its a bad signin request over here');
    }
    database.select('email', 'hash').from("login")
        .where('email', '=', email)
        .then(data => {

            const isTrue = bcrypt.compareSync(password, data[0]['hash']);
            if (isTrue) {
                return database.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Unable to get user'))
            } else {
                res.json('wrong outPut')
            }
        }).catch(err => res.status(400).json('Wrong credentials'))
}

module.exports = {
    handleSign: handleSign
}