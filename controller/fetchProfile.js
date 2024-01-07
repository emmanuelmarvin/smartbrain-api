const getProfile = async (req, res, database) => {
    const { id } = req.params
    const { data, error } = await supabase
        .from('users')
        .select()
        .eq('id', id)
    if (error) {

        res.status(400).json("user not found")
        return;
    }
    res.json(data[0])
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