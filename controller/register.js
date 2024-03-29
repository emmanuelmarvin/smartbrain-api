const handleRegister = async (req, res, supabase, bcrypt) => {
    const { email, name, password } = req.body
    const hash = bcrypt.hashSync(password);
    if (!email || !name || !password) {
        return res.status(400).json('its a bad request over here');
    }

    const { data1, error } = await supabase
        .from('login')
        .upsert({
            hash: hash,
            email: email,

        })


    if (error) {
        console.log(error)
        res.status(400).json(error)
        return;
    }




    const { error2 } = await supabase
        .from('users')
        .insert({
            name: name,
            email: email,
            entries: 0,

        })
    if (error2) {
        console.log(error2)
        res.status(400).json("unable to register er00x02 ")
        return
    }
    const { data, error3 } = await supabase
        .from('users')
        .select()
        .eq('email', email)
    if (error3) {

        res.status(400).json(error)
        return;
    }

    res.json(data[0])



    console.log('done')




}


module.exports = {
    handleRegister: handleRegister
}