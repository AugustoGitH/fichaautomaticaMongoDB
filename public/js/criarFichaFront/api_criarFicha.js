function randomId(){
    let par = "ABCDEFGHIJKLMNOPQRSTUVWXYZabc12345".split("")
    let idR = []
    for( let i = 0; i < 30; i++){
        idR.push(par[Math.round(Math.random()*par.length)])
    }
    return idR.join("")
}



function enviar_dadosFichaDb(){
    const inputs_infosFicha = document.querySelectorAll(".input_values")
    const textAreas_infos = document.querySelectorAll(".textarea_values")

    const nome_fichaInput = document.querySelector("#nome_ficha")
    const input_imgFicha = document.querySelector(".input-image")
    const img_ficha = document.querySelector(".imageAm_perfil")
    
    let geralInputs = [...inputs_infosFicha, ...textAreas_infos]
    let inputsVazios = 0
    geralInputs.forEach(input => !input.value ? inputsVazios++ : false )
    if(inputsVazios === 0 && input_imgFicha.value && nome_fichaInput.value ){
        tela_carregamento(true)
       
        let ficha_valores = []
        geralInputs.forEach((input)=>{
            let valor_ficha = {
                chave: input.id,
                valor: input.value,
                categoria: input.name
            }
            ficha_valores.push(valor_ficha)
        })

        let options = {
            method: "POST",
            headers: new Headers({"content-type": "application/json"}),
            body: JSON.stringify({
                infosFicha: {
                    nome_ficha: nome_fichaInput.value,
                    perfil_ficha: img_ficha.src,
                    time_create: new Date().toLocaleDateString(),
                    tipo_ficha: inf_FichaGonza.nome_model,
                    id_ficha: randomId()
                },
                valores_ficha: ficha_valores
            })
        }
        fetch("/user/create-ficha", options).then(()=>{
            console.log("Ficha criada com sucesso!")
            location.href = "/console"
        })
    }
    else alert("Você deixou algum campo vazio...")
   
}
function tela_carregamento(bool){
    let telaBlur = document.createElement("div")
    telaBlur.classList.add("telaBlur")

    let telaBlur_content = document.createElement("div")
    telaBlur_content.classList.add("telaBlur_content")
    telaBlur.appendChild(telaBlur_content)

    let gif = document.createElement("img")
    gif.src = "https://i.gifer.com/N8dP.gif"
    telaBlur_content.appendChild(gif)

    let h1_mensagem = document.createElement("h1")
    h1_mensagem.innerHTML = "Carregando..."
    telaBlur_content.appendChild(h1_mensagem)

    if(bool){
        document.body.appendChild(telaBlur)
        document.body.classList.add("retirairPadding")
    }else{
        document.querySelector(".telaBlur").remove()
        document.body.classList.remove("retirairPadding")
    }
}