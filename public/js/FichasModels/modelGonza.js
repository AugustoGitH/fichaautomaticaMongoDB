const inf_FichaGonza = {
    autor: "Gonzales",
    nome_model: "(RPG) Ficha do Gonzales"
}


class CamposChaves {
    constructor({chave_string, atributosInput, textarea}){
        return {
            chave_string,
            atributosInput,
            textarea,
        }
    }
}


class ModelsChaves {
    constructor({categoria, pontos, att_global, chaves}){
        return {
            categoria,
            pontos: !pontos ? {estado: false} : pontos,
            att_global: !att_global ? "" : att_global,
            chaves,

        }
    }
}
const ficha_model__Gonza = [
    new ModelsChaves({
        categoria: "Informações Pessoais",
        chaves: [
            new CamposChaves({chave_string: "Nome"}),
            new CamposChaves({chave_string: "Classe"}),
            new CamposChaves({chave_string: "Nível", atributosInput: 'type="number"'}),
            new CamposChaves({chave_string: "Jogador"}),
            new CamposChaves({chave_string: "Vinculo"}),
            new CamposChaves({chave_string: "Raça"}),
            new CamposChaves({chave_string: "Nação"}),
        ]
    }),
    new ModelsChaves({
        categoria: "Atributos", 
        pontos: {
            estado: true,
            quantidade_total: 5,
            quantidade_pontuada: 0
        },
        att_global: "type='number' max='5'",
        chaves: [
            new CamposChaves({chave_string: "Força"}),
            new CamposChaves({chave_string: "Resistencia"}),
            new CamposChaves({chave_string: "Inteligência"}),
            new CamposChaves({chave_string: "Agilidade"}),
            new CamposChaves({chave_string: "Poder"}),
            new CamposChaves({chave_string: "Carisma"}),
        ]
    }),
    new ModelsChaves({
        categoria: "Informações Basicas",
        pontos: { estado: false },
        chaves: [
            new CamposChaves({chave_string: "PV", atributosInput:'placeholder="x/xx"'}),
            new CamposChaves({chave_string: "Mana", atributosInput:'placeholder="x/x"'}),
            new CamposChaves({chave_string: "Sanidade", atributosInput:'placeholder="x/xx"'}),
            new CamposChaves({chave_string: "Movimento", atributosInput:'placeholder="xx ft"'}),
            new CamposChaves({chave_string: "Defesa"}),
            new CamposChaves({chave_string: "Origem"}),
        ]
    }),
    new ModelsChaves({
        categoria: "Armaduras",
        pontos: {estado: false },
        chaves: [new CamposChaves({chave_string: "Armaduras", textarea: true})]
    }),
    new ModelsChaves({
        categoria: "Perícias",
        att_global: "type='number'",
        chaves: [
            new CamposChaves({chave_string: "Acrobacias"}),
            new CamposChaves({chave_string: "Adestramento"}),
            new CamposChaves({chave_string: "Alquimia"}),
            new CamposChaves({chave_string: "Armas_leves"}),
            new CamposChaves({chave_string: "Armas_pesadas"}),
            new CamposChaves({chave_string: "Artes"}),
            new CamposChaves({chave_string: "Atletismo"}),
            new CamposChaves({chave_string: "Briga"}),
            new CamposChaves({chave_string: "Charme"}),
            new CamposChaves({chave_string: "Diplomacia"}),
            new CamposChaves({chave_string: "Fortitude"}),
            new CamposChaves({chave_string: "Furtividade"}),
            new CamposChaves({chave_string: "Iniciativa"}),
            new CamposChaves({chave_string: "Intimidação"}),
            new CamposChaves({chave_string: "Labia"}),
            new CamposChaves({chave_string: "Medicina"}),
            new CamposChaves({chave_string: "Percepção"}),
            new CamposChaves({chave_string: "Pesquisa"}),
            new CamposChaves({chave_string: "Psicologia"}),
            new CamposChaves({chave_string: "Presdigitação"}),
            new CamposChaves({chave_string: "Pontaria"}),
            new CamposChaves({chave_string: "Reflexo"}),
            new CamposChaves({chave_string: "Religião"}),
            new CamposChaves({chave_string: "Sobrevivência"}),
            new CamposChaves({chave_string: "Vontade"}),
        ]
    }),
    new ModelsChaves({
        categoria: "Habilidades",
        chaves: [new CamposChaves({chave_string: "Habilidades", textarea: true}),]
    }),
    new ModelsChaves({
        categoria: "Magias",
        chaves: [new CamposChaves({chave_string: "Magias", textarea: true}),]
    }),
    new ModelsChaves({
        categoria: "História",
        chaves: [new CamposChaves({chave_string: "História", textarea: true}),]
    }),
    new ModelsChaves({
        categoria: "Aparência",
        chaves: [new CamposChaves({chave_string: "Aparência", textarea: true}),]
    }),
    new ModelsChaves({
        categoria: "Personalidade",
        chaves: [new CamposChaves({chave_string: "Aparência", textarea: true}),]
    })
]