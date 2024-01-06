const handleSign = async (req, res, supabase, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('its a bad signin request over here');
    }
    const { data, error3 } = await supabase
        .from('login')
        .select()
        .eq('email', email)
    if (error3) {

        return res.status(400).json("failed to sign in")

    }


    const isTrue = bcrypt.compareSync(password, data[0]['hash']);
    if (isTrue) {
        const { data1, error3 } = await supabase
            .from('users')
            .select()
            .eq('email', email)
        if (error3) {

            return res.status(400).json("sign in error")

        }
        res.json(data.toString())
    } else {
        res.status(400).json('Wrong credentials')
    }


}

module.exports = {
    handleSign: handleSign
}