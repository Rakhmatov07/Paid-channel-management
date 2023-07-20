const { fetchOne, fetch } = require("../../libs/pg");

const payForChannel = async(req, res) => {
    try {
        const user_id = req.user;
        const {channel_id} = req.params;

        const userCard = await fetchOne('SELECT * FROM cards WHERE user_id=$1;', user_id);
        const channel = await fetchOne('SELECT * FROM channels WHERE channel_id=$1;', channel_id);

        const enough = userCard.balance - channel.pay_amount;
        if(enough < 0) return res.status(403).json({msg: 'Insufficient funds'});

        await fetch('BEGIN TRANSACTION');

        try {
            await fetchOne('UPDATE cards SET balance=$1 WHERE user_id=$2;', enough, user_id);
            await fetchOne('UPDATE channels SET balance=$1 WHERE channel_id=$2;', channel.balance + channel.pay_amount, channel_id);
            await fetch('INSERT INTO channel_user(channel_id, user_id, active) VALUES($1, $2, $3);', channel_id, user_id, true);
            await fetch('COMMIT');

            return res.status(200).json({msg: 'Payment successfully done!'})
        } catch (error) {
            console.log(error);
            await fetch('ROLLBACK');
            return res.status(500).json({msg: 'Internal Server Error'});
        }
    } catch (error) {
        console.log(error);
        fetch('ROLLBACK');
        return res.status(500).json({msg: 'Internal Server Error'});
    }
};


module.exports = payForChannel;