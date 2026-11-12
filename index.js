
        // 1. Pegando os elementos do HTML pelo ID
        const formulario = document.getElementById('formulario-pokemon');
        const inputNome = document.getElementById('input-pokemon');
        const mensagem = document.getElementById('mensagem');
        const listaPokemon = document.getElementById('lista-pokemon');

        // Pegando os spans onde os dados vão aparecer
        const spanNome = document.getElementById('info-nome');
        const spanId = document.getElementById('info-id');
        const spanAltura = document.getElementById('info-altura');
        const spanPeso = document.getElementById('info-peso');
        const spanHabilidades = document.getElementById('info-habilidades');

        // 2. Criando o evento de clique no botão (submit do formulário)
        formulario.addEventListener('submit', function(evento) {
            // Evita que a página recarregue ao enviar o formulário
            evento.preventDefault();

            // Pega o valor digitado, transforma em minúsculo e tira os espaços
            const nomePokemon = inputNome.value.toLowerCase().trim();

            // Limpa a tela antes de fazer a requisição
            listaPokemon.style.display = 'none';
            mensagem.textContent = 'Buscando na API...';

            // 3. Exigência: Consumo da API utilizando fetch()
            fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`)
                .then(function(resposta) {
                    // Verifica se a API retornou erro (ex: Erro 404 - Não encontrado)
                    if (!resposta.ok) {
                        throw new Error('Não encontrado');
                    }
                    // Transforma a resposta em JSON
                    return resposta.json();
                })
                .then(function(dados) {
                    // Preenche os spans do HTML com os dados da API
                    spanNome.textContent = dados.name;
                    spanId.textContent = dados.id;
                    spanAltura.textContent = dados.height;
                    spanPeso.textContent = dados.weight;

                    // As habilidades vêm em um array, precisamos extrair os nomes
                    let nomesHabilidades = [];
                    for (let i = 0; i < dados.abilities.length; i++) {
                        nomesHabilidades.push(dados.abilities[i].ability.name);
                    }
                    // Junta as habilidades com vírgula
                    spanHabilidades.textContent = nomesHabilidades.join(', ');

                    // Mostra a lista e tira a mensagem de "Buscando"
                    mensagem.textContent = '';
                    listaPokemon.style.display = 'block';
                })
                .catch(function(erro) {
                    // 4. Exigência: Tratamento de situações (Não encontrado ou Erro de API)
                    listaPokemon.style.display = 'none';
                    
                    if (erro.message === 'Não encontrado') {
                        mensagem.textContent = 'Pokémon não encontrado!';
                    } else {
                        mensagem.textContent = 'Erro na comunicação com a API.';
                    }
                });
        });