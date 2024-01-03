const getProfile = (req, res, database) => {
    const { id } = req.params
    database.select("*").from("users")
        .where({
            "id": id
        }).then(user => {

            if (user.length) {
                res.json(user)
            } else {
                res.status(400).json("user not found")
            }
        }).catch(err => {
            res.status(400).json("error while fetching")
        })
}

module.exports = {
    getProfile: getProfile
}