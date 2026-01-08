const fs = require('fs/promises');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const FILE_PATH = './db.json';

// --- CONFIGURAÇÃO DE COMPATIBILIDADE ---
const rl = readline.createInterface({ input, output });
const question = (str) => new Promise(resolve => rl.question(str, resolve));

// --- FUNÇÕES AUXILIARES ---
async function readDB() {
    try {
        const data = await fs.readFile(FILE_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

async function writeDB(data) {
    await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));
}

// --- OPERAÇÕES CRUD E BUSCA ---

async function create(item) {
    const db = await readDB();
    item.id = Date.now();
    db.push(item);
    await writeDB(db);
    console.log("\n✅ Produto cadastrado com sucesso!");
}

async function read(filtro = null) {
    const db = await readDB();
    let dadosParaExibir = db;

    if (filtro) {
        dadosParaExibir = db.filter(item => 
            item.nome.toLowerCase().includes(filtro.toLowerCase()) || 
            item.id.toString() === filtro
        );
    }

    if (dadosParaExibir.length === 0) {
        console.log("\n⚠️ Nenhum produto encontrado.⚠️");
    } else {
        console.table(dadosParaExibir);
    }
}

async function update(id, newData) {
    let db = await readDB();
    const index = db.findIndex(item => item.id === Number(id));
    if (index !== -1) {
        db[index] = { ...db[index], ...newData };
        await writeDB(db);
        console.log("\n✅ Campo atualizado com sucesso!");
    } else {
        console.log("\n❌ Produto não encontrado.❌");
    }
}

async function remove(id) {
    const db = await readDB();
    const novoDb = db.filter(item => item.id !== Number(id));
    await writeDB(novoDb);
    console.log("\n✅ Produto removido com sucesso!");
}

// --- MENU PRINCIPAL ---
async function main() {
    let sair = false;

    while (!sair) {
        console.log("\n==============================");
        console.log("         AgilStore      ");
        console.log("   CONTROLE DE INVENTÁRIO");
        console.log("==============================");
        console.log("1. Listar TODOS os Produtos");
        console.log("2. Buscar Produto (Nome ou ID)");
        console.log("3. Adicionar Novo Produto");
        console.log("4. Editar Produto");
        console.log("5. Remover Produto");
        console.log("6. Sair");
        
        const opcao = await question("\nEscolha uma opção:\n ");

        switch (opcao) {
            case '1':
                console.log("\n--- TODOS OS PRODUTOS ---");
                await read();
                break;

            case '2':
                const termo = await question("\nDigite o Nome ou ID para buscar: ");
                await read(termo);
                break;

            case '3':
                const nome = await question("Nome do produto: ");
                const categoria = await question("Categoria: ");
                const preco = await question("Preço: ");
                const estoque = await question("Quantidade em estoque: ");
                await create({ nome, categoria, preco: parseFloat(preco), estoque: parseInt(estoque) });
                break;

            case '4':
                await read();
                const idUpdate = await question("Digite o ID do produto para editar: ");        
                console.log("\nAlterar: 1.Nome | 2.Categoria | 3.Preço | 4.Estoque");
                const campo = await question("Escolha: ");
                
                if (campo === '1') await update(idUpdate, { nome: await question("Novo Nome: ") });                
                else if (campo === '2') await update(idUpdate, { categoria: await question("Nova Categoria: ") });
                else if (campo === '3') await update(idUpdate, { preco: parseFloat(await question("Novo Preço: ")) });
                else if (campo === '4') await update(idUpdate, { estoque: parseInt(await question("Novo Estoque: ")) });
                break;

            case '5':
                await read();
                const idDelete = await question("Digite o ID do produto para remover: ");
                const dbAtual = await readDB();
                const produto = dbAtual.find(p => p.id === Number(idDelete));

                if (produto) {
                    const confirmacao = await question(`\n⚠️ Tem certeza que deseja excluir "${produto.nome}"? (S/N): `);
                    if (confirmacao.toUpperCase() === 'S') {
                        await remove(idDelete);
                    } else {
                        console.log("\nExclusão cancelada.");
                    }
                } else {
                    console.log("\n❌ ID não encontrado.");
                }
                break;

            case '6':
                console.log("Saindo...");
                sair = true;
                break;

            default:
                console.log("Opção inválida.");
        }
    }
    rl.close();
}

main();
