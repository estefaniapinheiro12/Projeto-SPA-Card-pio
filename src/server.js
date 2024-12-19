const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const menu = {
    principais: [
        { titulo: "Bife Acebolado", descricao: "Carne suculenta com cebolas caramelizadas", preco: 25.99 },
        { titulo: "Frango Grelhado", descricao: "Acompanhado de arroz e legumes", preco: 19.99 }
    ],
    sobremesas: [
        { titulo: "Pudim", descricao: "Delicioso pudim de leite condensado", preco: 7.99 },
        { titulo: "Brownie", descricao: "Com calda quente de chocolate", preco: 9.99 }
    ]
};

app.get('/menu', (req, res) => {
    res.json(menu);
});

app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});
