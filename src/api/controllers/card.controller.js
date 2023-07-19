const { fetchOne } = require("../../libs/pg");
const validateCard = require("../../libs/validation/card.validation");

const addCard = async(req, res) => {
    try {
        const {card_number, balance} = req.body;
        const user_id = req.user;

        const isValid = validateCard(card_number, balance);
        if(isValid) return res.status(400).json({msg: 'Input Error'})
    
        const card = await fetchOne("SELECT * FROM cards WHERE user_id=$1;", user_id);
        if(card) return res.status(409).json({msg: 'You already have a card!'});
    
        await fetchOne("INSERT INTO cards(card_number, balance, user_id) VALUES($1, $2, $3);", card_number, balance || 0, user_id);
        return res.status(201).json({msg: 'Created'});
    } catch (error) {
        console.log(error);
    }
};

const updateCardBalance = async(req, res) => {
    try {
        const {balance} = req.body;
        const user_id = req.user;
        if(!user_id) return res.status(404).json({msg: 'Card Owner Not Found'});
    
        const card = await fetchOne("SELECT * FROM cards WHERE user_id=$1;", user_id);
        await fetchOne("UPDATE cards SET balance = $1 WHERE card_id = $2;", card.balance + balance, card.card_id);

        return res.status(200).json({msg: 'Balance added'});
    } catch (error) {
        console.log(error);    
    }    
};

const deleteCard = async(req, res) => {
    try {
        const user_id = req.user;
        if(!user_id) return res.status(404).json({msg: 'Card Owner Not Found'});

        await fetchOne("DELETE FROM cards WHERE user_id=$1;", user_id);

        return res.status(200).json({msg: 'Card deleted'});
    } catch (error) {
        console.log(error);    
    }
};


module.exports = {
    addCard,
    updateCardBalance,
    deleteCard
};
