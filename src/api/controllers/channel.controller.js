const { fetchOne, fetch } = require("../../libs/pg");
const validateChannel = require("../../libs/validation/channel.validation");

const createChannel = async(req, res) => {
    try {
        const {channel_name, balance, pay_amount} = req.body;
        const user_id = req.user;

        const isValid = validateChannel(channel_name, balance, pay_amount);
        if(isValid) return res.status(400).json({msg: isValid});
    
        const channel = await fetchOne("SELECT * FROM channels WHERE owner_id=$1 AND channel_name=$2;", user_id, channel_name);
        if(channel) return res.status(409).json({msg: `You already have '${channel_name}' channel, create another one!`});

        const newChannel = await fetchOne("INSERT INTO channels(channel_name, balance, pay_amount, owner_id) VALUES($1, $2, $3, $4) RETURNING*;", channel_name, balance || 0, pay_amount, user_id);
        await fetchOne("INSERT INTO channel_user(channel_id, user_id, active, status) VALUES($1, $2, $3, $4);", newChannel.channel_id, user_id, true, 'owner');
        
        return res.status(201).json({msg: 'Created', newChannel});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Internal Server Error'});
    }
};

const deleteChannel = async(req, res) => {
    try {
        const user_id = req.user;
        const {channel_id} = req.params;

        const deletedChannel = await fetchOne("DELETE FROM channels WHERE channel_id=$1 AND owner_id=$2 RETURNING*;", channel_id, user_id);
        return res.status(200).json({msg: `'${deletedChannel.channel_name}' channel is deleted`});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Internal Server Error'});
    }
};

const getChannels = async(req, res) => {
    try {
        const channels = await fetch("SELECT * FROM channels;");
        return res.status(200).json({msg: 'Success', channels});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Internal Server Error'});
    }
};

const getOneChannel = async(req, res) => {
    try {
        const {channel_id} = req.params;
        const posts = await fetch('SELECT * FROM posts WHERE channel_id=$1;', channel_id);

        return res.status(200).json({msg: 'Success', posts});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Internal Server Error'});
    }
};

module.exports = {
    getChannels,
    createChannel,
    getOneChannel,
    deleteChannel
};


