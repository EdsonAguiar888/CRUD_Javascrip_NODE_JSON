const fs = require('fs/promises');
// const FILE_PATH = './db.json';

// // Função auxiliar para ler o arquivo
// async function readDB() {
//     const data = await fs.readFile(FILE_PATH, 'utf-8');
//     return JSON.parse(data);
// }

// // Função auxiliar para salvar no arquivo
// async function writeDB(data) {
//     await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));
// }

// // --- OPERAÇÕES CRUD ---

// // 1. CREATE (Criar)
// async function create(item) {
//     const db = await readDB();
//     item.id = Date.now(); // Gera um ID simples baseado no timestamp
//     db.push(item);
//     await writeDB(db);
//     console.log("Item criado com sucesso!");
// }

// // 2. READ (Ler)
// async function read() {
//     const db = await readDB();
//     return db;
// }

// // 3. UPDATE (Atualizar)
// async function update(id, newData) {
//     let db = await readDB();
//     const index = db.findIndex(item => item.id === id);
    
//     if (index !== -1) {
//         db[index] = { ...db[index], ...newData };
//         await writeDB(db);
//         console.log("Item atualizado!");
//     } else {
//         console.log("Item não encontrado.");
//     }
// }

// // 4. DELETE (Deletar)
// async function remove(id) {
//     const db = await readDB();
//     const newDb = db.filter(item => item.id !== id);
    
//     if (db.length !== newDb.length) {
//         await writeDB(newDb);
//         console.log("Item removido!");
//     } else {
//         console.log("Item não encontrado.");
//     }
// }

// // --- TESTANDO O CRUD ---
// (async () => {
//     // Criando
//     await create({ nome: "Teclado Mecânico", preco: 250 });
    
//     // Lendo
//     const produtos = await read();
//     console.log("Produtos:", produtos);

//     // Atualizando (usando o ID do primeiro item da lista)
//     if (produtos.length > 0) {
//         const idParaEditar = produtos[0].id;
//         await update(idParaEditar, { preco: 230 });
        
//         // Deletando
//         // await remove(idParaEditar);
//     }
// })();