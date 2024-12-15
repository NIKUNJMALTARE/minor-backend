const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    item: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Item', 
        required: true 
    },
    seller: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    buyer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    purchaseDate: { 
        type: Date, 
        default: Date.now 
    },
});

module.exports = mongoose.model('Transaction', transactionSchema);
