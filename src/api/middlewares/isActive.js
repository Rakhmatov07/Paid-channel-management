const { fetchOne } = require("../../libs/pg");

const isActive = async(req, res, next) => {
    try {
        const user_id = req.user;
        const {channel_id} = req.params;

        const channel_name = await fetchOne("SELECT channel_name FROM channels WHERE channel_id=$1;", channel_id);
        const channelUserInfo = await fetchOne("SELECT * FROM channel_user WHERE user_id=$1 AND channel_id=$2;", user_id, channel_id);
        if(!channelUserInfo) return res.status(403).json({msg: `You have to pay to join the '${channel_name}' channel`}); // res.redirect(/api/payment)
        if(channelUserInfo.status === 'owner') return next();

        const differenceInMilliseconds = new Date(channelUserInfo.end_date_of_subscribtion).getTime() - Date.now();
        if(differenceInMilliseconds < 0) {
            await fetchOne("UPDATE channel_user SET isActive=$1 WHERE channel_id=$2 AND user_id=$3;", false, channel_id, user_id);
            return res.status(403).json({msg: `Subscription is ended.\nPay for '${channel_name}' and Join again.`});
        };

        next();
    } catch (error) {
        console.log(error);    
    }
};

module.exports = isActive;