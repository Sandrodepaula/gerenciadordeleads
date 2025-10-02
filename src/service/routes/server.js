import express, { json } from 'express';
import cors from 'cors'; // Permite que o React Native se comunique com a API

const app = express();
const PORT  = 3000; // Porta onde a API vai rodar

// Middlewares
app.use(cors());
app.use(json()); // Permite que a API entenda JSON no corpo das requisições

app.get('/', (req, res) => {
    res.status(200).send({ message: 'API está funcionando' });
});
    console.log('Usuário adicionado com sucesso:');

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http: //localhost:${PORT}`);
});
//------------------------------------------------------------------------------
/*Dados MOCK - Em um cenário real, esses dados viriam de um banco de dados
let leads = [
    { id: 1, name: 'João Silva', email: 'joao@yahoo.com', cell: '11999999999', city: 'São Paulo', stateUf: 'SP' },
    { id: 2, name: 'Maria Souza', email: 'maria@yahoo.com', cell: '21988888888', city: 'Rio de Janeiro', stateUf: 'RJ' },
];

//Rotas de clientes ------------------------------------------------------------
app.get('/clients', async (req, res) => {
    const clients = await fetchClients();
    res.status(200).send(clients);
});

app.post('/clients', async (req, res) => {
    const { name, email, cell, city, stateUf } = req.body;
    if (!name || !email || !cell || !city || !stateUf) {
        return res.status(400).send({ message: 'Todos os campos são obrigatórios' });
    }   
    try {
        await addClient(name, email, cell, city, stateUf);
        res.status(201).send({ message: 'Cliente adicionado com sucesso' });
    } catch (error) {
        console.error('Erro ao adicionar cliente:', error);
        res.status(500).send({ message: 'Erro ao adicionar cliente' });
    }   
});

app.delete('/clients/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await deleteClient(parseInt(id));
        res.status(200).send({ message: 'Cliente deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar cliente:', error);
        res.status(500).send({ message: 'Erro ao deletar cliente' });
    }
});
//------------------------------------------------------------------------------
*/
