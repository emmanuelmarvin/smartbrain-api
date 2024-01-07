const handleSign = async (req, res, supabase, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('its a bad signin request over here');
    }
    const { data, error } = await supabase
        .from('login')
        .select()
        .eq('email', email)
    if (error) {

        return res.status(400).json("failed to sign in")

    }


    const isTrue = bcrypt.compareSync(password, data[0]['hash']);
    if (isTrue) {
        const { data, error } = await supabase
            .from('users')
            .select()
            .eq('email', email)
        if (error) {

            res.status(400).json(error)
            return;
        }

        res.json(data[0])
        console.log(data)

    } else {
        res.status(400).json('Wrong credentials')
    }


}

module.exports = {
    handleSign: handleSign
}