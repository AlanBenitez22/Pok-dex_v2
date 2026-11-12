    const formulario = document.getElementById('formulario-pokemon');
    const inputNome = document.getElementById('input-pokemon');
    const mensagem = document.getElementById('mensagem');
    const listaPokemon = document.getElementById('lista-pokemon');

    const spanNome = document.getElementById('info-nome');
    const spanId = document.getElementById('info-id');
    const spanAltura = document.getElementById('info-altura');
    const spanPeso = document.getElementById('info-peso');
    const spanHabilidades = document.getElementById('info-habilidades');

    formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const nomePokemon = inputNome.value.toLowerCase().trim();
    
    listaPokemon.style.display = 'none';
    mensagem.textContent = 'Consultando...';

            fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`)
                .then(function(resposta) {
                    if (!resposta.ok) {
                        throw new Error('Não encontrado');
                    }
                    return resposta.json();
                })
                .then(function(dados) {

                    spanNome.textContent = dados.name;
                    spanId.textContent = dados.id;
                    spanAltura.textContent = dados.height;
                    spanPeso.textContent = dados.weight;


                    let nomesHabilidades = [];
                    for (let i = 0; i < dados.abilities.length; i++) {
                        nomesHabilidades.push(dados.abilities[i].ability.name);
                    }
                    
                    spanHabilidades.textContent = nomesHabilidades.join(', ');

                   
                    mensagem.textContent = '';
                    listaPokemon.style.display = 'block';
                })
                .catch(function(erro) {
                    
                    listaPokemon.style.display = 'none';
                    
                    if (erro.message === 'Não encontrado') {
                        mensagem.textContent = 'Pokémon não encontrado. Verifique se digitou o nome corretamente e tente novamente.';
                    } else {
                        mensagem.textContent = 'Erro na comunicação com a API.';
                    }
                });
        });