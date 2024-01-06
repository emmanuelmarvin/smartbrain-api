const handleSign = async (req, res, supabase, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('its a bad signin request over here');
    }
    const { data, error3 } = await supabase
        .from('users')
        .select()
        .eq('email', email)
    if (error3) {

        res.status(400).json("failed to sign in")
        return;
    }
    const isTrue = bcrypt.compareSync(password, data[0]['hash']);
    if (isTrue) {
        res.json(data[0])
    } else {
        res.status(400).json('Wrong credentials')
    }


}

module.exports = {
    handleSign: handleSign
}