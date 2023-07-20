const { fetchOne } = require("../../libs/pg");
const validateCard = require("../../libs/validation/card.validation");

const addCard = async(req, res) => {
    try {
        const {card_number, balance} = req.body;
        const user_id = req.user;

        const isValid = validateCard(card_number, balance);
        if(isValid) return res.status(400).json({msg: isValid});
    
        const card = await fetchOne("SELECT * FROM cards WHERE user_id=$1;", user_id);
        if(card) return res.status(409).json({msg: 'You already have a card!'});
    
        const newCard = await fetchOne("INSERT INTO cards(card_number, balance, user_id) VALUES($1, $2, $3) RETURNING*;", card_number, balance || 0, user_id);
        return res.status(201).json({msg: 'Created', newCard});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Internal Server Error'});
    }
};

const updateCardBalance = async(req, res) => {
    try {
        const {balance} = req.body;
        const user_id = req.user;
        if(!user_id) return res.status(404).json({msg: 'Card Owner Not Found'});
    
        const card = await fetchOne("SELECT * FROM cards WHERE user_id=$1;", user_id);
        const updBalance = await fetchOne("UPDATE cards SET balance = $1 WHERE card_id = $2 RETURNING*;", card.balance + balance, card.card_id);

        return res.status(200).json({msg: 'Balance updated', updBalance});
    } catch (error) {
        console.log(error); 
        return res.status(500).json({msg: 'Internal Server Error'});   
    }    
};

const deleteCard = async(req, res) => {
    try {
        const user_id = req.user;
        if(!user_id) return res.status(404).json({msg: 'Card Owner Not Found'});

        const deletedCard = await fetchOne("DELETE FROM cards WHERE user_id=$1 RETURNING*;", user_id);

        return res.status(200).json({msg: 'Card deleted', deletedCard});
    } catch (error) {
        console.log(error);  
        return res.status(500).json({msg: 'Internal Server Error'});  
    }
};


module.exports = {
    addCard,
    updateCardBalance,
    deleteCard
};
