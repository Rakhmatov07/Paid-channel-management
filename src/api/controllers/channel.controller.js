const { fetchOne, fetch } = require("../../libs/pg");

const createChannel = async(req, res) => {
    try {
        const {channel_name, balance, pay_amount} = req.body;
        const user_id = req.user;
    
        const channel = await fetchOne("SELECT * FROM channels WHERE owner_id=$1 AND channel_name=$2;", user_id, channel_name);
        if(channel) return res.status(409).json({msg: 'You already have a this channel, create another one!'});

        const newChannel = await fetchOne("INSERT INTO channels(channel_name, balance, pay_amount, owner_id) VALUES($1, $2, $3, $4) RETURNING*;", channel_name, balance || 0, pay_amount, user_id);
        await fetchOne("INSERT INTO channel_user(channel_id, user_id, active, status) VALUES($1, $2, $3, $4);", newChannel.channel_id, user_id, true, 'owner');
        
        return res.status(201).json({msg: 'Created'});
    } catch (error) {
        console.log(error);
    }
};

const deleteChannel = async(req, res) => {
    try {
        const user_id = req.user;
        const {channel_id} = req.params;

        await fetchOne("DELETE FROM channels WHERE channel_id=$1 AND owner_id=$2;", channel_id, user_id);

        return res.status(200).json({msg: 'Channel deleted'});
    } catch (error) {
        console.log(error);
    }
};

const getChannels = async(req, res) => {
    try {
        const channels = await fetch("SELECT * FROM channels;");
        return res.status(200).json({msg: 'Success', channels});
    } catch (error) {
        console.log(error);
    }
};

const getOneChannel = async(req, res) => {
    try {
        const {channel_id} = req.params;
        const allInfo = await fetch('SELECT * FROM channel_user WHERE channel_id=$1;', channel_id);

        return res.status(200).json({msg: 'Success', allInfo});
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getChannels,
    createChannel,
    getOneChannel,
    deleteChannel
};


