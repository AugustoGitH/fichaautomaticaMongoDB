const inf_FichaGonza = {
    autor: "Gonzales",
    nome_model: "(RPG) Ficha do Gonzales"
}



const ficha_model__Gonza = [
    {
        categoria: "Informações Pessoais",
        pontos: { estado: false },
        chaves: [
            { 
                chave_string: "nome" ,
                atributosInput: ''
            },
            { 
                chave_string: "Classe",
                atributosInput: ''
            },
            {
                chave_string: "Nível",
                atributosInput: 'type="number"'
            },
             { 
                chave_string: "Jogador",
                atributosInput: ''
            },
            { 
                chave_string: "Vinculo",
                atributosInput: ''
             },
            { 
                chave_string: "Raça",
                atributosInput: ''
            }, 
            { 
                chave_string: "Nação" ,
                atributosInput: ''
            },
        ]
    },
    {
        categoria: "Atributos",
        pontos: {
            estado: true,
            quantidade_total: 5,
            quantidade_pontuada: 0
        },
        type_global: "number",
        chaves: [
            { 
                chave_string: "Força",
             },
            { 
                chave_string: "Resistencia",
             },
            { 
                chave_string: "Inteligência",
             },
            { 
                chave_string: "Agilidade",
             },
            { 
                chave_string: "Poder",
             },
            { 
                chave_string: "Carisma",
             }
        ]
    },
    {
        categoria: "Informações Basicas",
        pontos: { estado: false },
        chaves: [
            {
                chave_string: "PV",
                atributosInput:'placeholder="x/xx"'
            },
            {
                chave_string: "Mana",
                atributosInput:'placeholder="x/x"'
            },
            {
                chave_string: "Sanidade",
                atributosInput:'placeholder="x/xx"'
            },
            {
                chave_string: "Movimento",
                atributosInput:'placeholder="xx ft"'
            },
            { 
                chave_string: "Defesa",
                atributosInput:''
            },
            { 
                chave_string: "Origem",
                atributosInput:''
            },
        ]
    },
    {
        categoria: "Armaduras",
        pontos: {estado: false },
        chaves: [
            {
                chave_string: "Armaduras",
                textarea: true
            }
        ]
    },
    {
        categoria: "Perícias",
        pontos: {estado: false },
        type_global: "number",
        chaves: [
            { chave_string: "Acrobacias" },
            { chave_string: "Adestramento" },
            { chave_string: "Alquimia" },
            { chave_string: "Armas_leves" },
            { chave_string: "Armas_pesadas" },
            { chave_string: "Artes" },
            { chave_string: "Atletismo" },
            { chave_string: "Briga" },
            { chave_string: "Charme" },
            { chave_string: "Diplomacia" },
            { chave_string: "Fortitude" },
            { chave_string: "Furtividade" },
            { chave_string: "Iniciativa" },
            { chave_string: "Intimidação" },
            { chave_string: "Labia" },
            { chave_string: "Medicina" },
            { chave_string: "Percepção" },
            { chave_string: "Pesquisa" },
            { chave_string: "Psicologia" },
            { chave_string: "Presdigitação" },
            { chave_string: "Pontaria" },
            { chave_string: "Reflexo" },
            { chave_string: "Religião" },
            { chave_string: "Sobrevivência" },
            { chave_string: "Vontade" },
        ]
    },
    {
        categoria: "Habilidades",
        pontos: {estado: false },
        chaves: [
            {
                chave_string: "Habilidades",
                textarea: true
            }
        ]

    },
    {
        categoria: "Magias",
        pontos: {estado: false },
        chaves: [
            {
                chave_string: "Magias",
                textarea: true
            }
        ]
    },
    // {
    //     categoria: "Inventário",
    //     valor_carteira: { estado: true },
    //     loja: { estado: true },
    //     pontos: {
    //         estado: true,
    //         quantidade_total: 15,
    //         quantidade_pontuada: 0
    //     },
    // },
    {
        categoria: "História",
        pontos: {estado: false },
        chaves: [
            {
                chave_string: "História",
                textarea: true
            }
        ]
    },
    {
        categoria: "Aparência",
        pontos: {estado: false },
        chaves: [
            {
                chave_string: "Aparência",
                textarea: true
            }
        ]
    },
    {
        categoria: "Personalidade",
        pontos: {estado: false },
        chaves: [
            {
                chave_string: "Personalidade",
                textarea: true
            }
        ]
    }
]