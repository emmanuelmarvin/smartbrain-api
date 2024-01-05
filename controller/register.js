const handleRegister = async (req, res, supabase, bcrypt) => {
    const { email, name, password } = req.body
    const hash = bcrypt.hashSync(password);
    if (!email || !name || !password) {
        return res.status(400).json('its a bad request over here');
    }

    const { error } = await supabase
        .from('login')
        .insert({
            hash: hash,
            email: email,

        })
    if (error) {
        console.log(error)
        res.status(400).json(error)
        return;
    } else {
        const { error2 } = await supabase
            .from('users')
            .insert({
                name: "test",
                email: 'test@test.com',
                entries: 0,

            })
        if (error2) {
            console.log(error)
            res.status(400).json("unable to register er00x02 ")
        } else {
            const { data, error } = await supabase
                .from('users')
                .select()
                .is('email', email)
            if (error) {

                res.status(400).json(error)
                return;
            } else {
                res.json(data)
            }
        }

        console.log('done')

    }


}


module.exports = {
    handleRegister: handleRegister
}