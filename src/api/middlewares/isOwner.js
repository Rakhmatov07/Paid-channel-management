const { fetchOne } = require("../../libs/pg");

const isOwner = async(req, res) => {
    try {
        const user_id = req.user;
        const {channel_id} = req.params;

        const channel_name = await fetchOne("SELECT channel_name FROM channels WHERE channel_id=$1;", channel_id);
        const channelUserInfo = await fetchOne("SELECT * FROM channel_user WHERE user_id=$1 AND channel_id=$2;", user_id, channel_id);
        if(channelUserInfo.status !== 'owner') return res.status(403).json({msg: `You are not owner of ${channel_name}`});

        next();
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = isOwner;