const imageUpdate = async (req, res, database) => {
    const { id } = req.body
    const { data, error } = await supabase
        .from('users')
        .select()
        .eq('id', id)
    if (error) {

        return res.status(400).json("failed to update")

    } else {
        const currentEntries = data[0]['entries']++
        const { error } = await supabase
            .from('users')
            .update({
                entries: currentEntries,

            })
            .eq('id', id)
        if (error) {
            res.send(error);
        } else {
            res.json(currentEntries)
        }

    }
    database('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {

            res.json(entries[0].entries)
        })

}

module.exports = {
    imageUpdate
}


