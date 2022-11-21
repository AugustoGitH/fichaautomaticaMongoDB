
function visibleImage_perfil(url){
    const container = document.querySelector(".content_input-imgPerfil")
    let estruturaHTML = `
        <div class="imgPerfil_container">
            <img class="imageAm_perfil" src="${url}">
        </div>
    `

    if(document.querySelector(".image_preview")){
        document.querySelector(".image_preview").remove()
        container.innerHTML += estruturaHTML
    }else{
        document.querySelector(".imgPerfil_container").remove()
        container.innerHTML += estruturaHTML
    }
}



document.addEventListener("DOMContentLoaded", ()=>{
    appendFichaGonza(ficha_model__Gonza)
})



function createHeaderFicha(){

    let estruturaHTML = `
        <section class="criar_ficha_header">
            <div class="content_createFicha">
                <div class="inputs_createName">
                    <label>
                        Nome da Ficha:
                        <input id="nome_ficha" maxLength="20" autofocus type="text" placeholder="Digite o nome da sua ficha">
                    </label>
                </div>
                <div class="content_input-imgPerfil">
                    <img class="image_preview" src="https://cdna.artstation.com/p/assets/images/images/031/209/428/original/krzysztof-pixel-matys-96-idle-v5.gif?1602934264">
                    <label class="label-input_image">
                        <input type="file" accept="image/*" class="input-image">Escolha uma imagem
                    </label>
                </div>
            </div>
        </section>
    `

    document.body.innerHTML += estruturaHTML
    document.querySelector(".label-input_image").addEventListener("change", ev=>{
        let input_value = ev.target.files[0]
        if(input_value){
            let reader = new FileReader()
            reader.addEventListener("load", ev=> visibleImage_perfil(ev.target.result))
            reader.readAsDataURL(input_value)
        }
    })
}


function appendFichaGonza(ficha_infos){

    createHeaderFicha()

    let ficha_container = document.createElement("section")
    ficha_container.classList.add("ficha_container")
    document.body.appendChild(ficha_container)

    let title_ficha = document.createElement("h1")
    title_ficha.innerText = inf_FichaGonza.nome_model
    ficha_container.appendChild(title_ficha)


    //Criando setores de edição de acordo com a predefinição do modelo de ficha
    ficha_infos.forEach(info => createFichaEdit_window(info, ficha_container))


    //Botão para enviar os dados da ficha para o Banco de dados
    let button_enviarFichaDb = document.createElement("button")
    button_enviarFichaDb.classList.add("button_enviarFichaDb")
    button_enviarFichaDb.innerText = "CRIAR SUA FICHA"
    button_enviarFichaDb.addEventListener("click",  enviar_dadosFichaDb)
    ficha_container.appendChild(button_enviarFichaDb)


    //Definindo que todos os inputs numéricos receberão valor 0
    let inputsNumber_global = document.querySelectorAll("input[type='number']")
    let inputsText_global = document.querySelectorAll("input[type='text]")

    inputsNumber_global.forEach(input => input.value = 0)
    inputsText_global.forEach(input => {
        input.autocomplete = "off"
        input.maxLength = "40"
    })

    configsInputsNumber(".inputs_atributos", ".inputs_pericias")
}



function configsInputsNumber(...inputsNumber_class){
    inputsNumber_class.forEach(classe=>{
        let inputs = document.querySelectorAll(classe)
        inputs.forEach(input=>{
            input.addEventListener("input", ()=>{
                if(input.value > 5) input.value = input.innerHTML
            })
        })
    })  
}



function createFichaEdit_window(info, container){
    let head_fichaCont = document.createElement("div")
    head_fichaCont.classList.add("section_ficha")
    container.appendChild(head_fichaCont)

    let categoriaInP = document.createElement("h2")

    if(info.pontos.estado){
        categoriaInP.id = "idh2_" + info.categoria.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '_').toLowerCase()
        categoriaInP.innerText = info.categoria + " ["+ info.pontos.quantidade_pontuada + "/" + info.pontos.quantidade_total + "]"
    }else{
        categoriaInP.innerText = info.categoria
    }
    head_fichaCont.appendChild(categoriaInP)


    let ul_inputs = document.createElement("ul")
    head_fichaCont.appendChild(ul_inputs)

    info.chaves.forEach(chave=>{    
        let class_inputs = "inputs_" + info.categoria.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '_').toLowerCase()
        if(chave.textarea){
            head_fichaCont.innerHTML += `<label class="label_textarea">
                                            <div class="textarea_cont">
                                                <textarea oninput="countCaracteresTextarea(this)" class="textarea_values ${class_inputs}" id="${chave.chave_string}" name="${info.categoria}"></textarea><span class="count_caracteres">0/800</span>
                                            </div>
                                        </label>`
        }else{
            ul_inputs.innerHTML += `<label>
                                        <span>${chave.chave_string}:</span>
                                        <input id="${chave.chave_string}" ${info.att_global} class="input_values ${class_inputs}" ${chave.atributosInput} name="${info.categoria}">
                                    </label>`
        }
        
    })

}
function countCaracteresTextarea(textarea){
    let countDisplay = textarea.parentNode.querySelector(".count_caracteres")
    let maxLength = 800
    let length = textarea.value.length
    if(length > maxLength){
        countDisplay.style.color = "red"
        textarea.value = textarea.value.substring(0, maxLength)
    }else{
        countDisplay.innerHTML = `${length}/${maxLength}`
    }
}



