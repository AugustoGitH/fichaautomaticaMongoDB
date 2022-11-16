
function visibleImage_perfil(url){
    const container = document.querySelector(".Continput_imgPerfil")
    let img_container = document.createElement("div")
    img_container.classList.add("imgPerfil_container")

    let img = document.createElement("img")
    img.classList.add("imageAm_perfil")
    img_container.appendChild(img)

    img.src = url
    if(document.querySelector(".image_amoster")){
        document.querySelector(".image_amoster").remove()
        container.appendChild(img_container)
    }else{
        document.querySelector(".imgPerfil_container").remove()
        container.appendChild(img_container)
    }
}



document.addEventListener("DOMContentLoaded", ()=>{
    appendFichaGonza(ficha_model__Gonza)
})



function criar_infoFicha(){
    let criar_fichaCreate = document.createElement("section")
    criar_fichaCreate.classList.add("criar_ficha_criate")
    document.body.appendChild(criar_fichaCreate)


    let content_createFicha = document.createElement("div")
    content_createFicha.classList.add("content_criateFicha")
    criar_fichaCreate.appendChild(content_createFicha)


    let inputs_createName = document.createElement("div")
    inputs_createName.classList.add("inputs_criateName")
    content_createFicha.appendChild(inputs_createName)

    let label = document.createElement("label")
    inputs_createName.appendChild(label)

    label.innerHTML = 'Nome da Ficha:<input id="nome_ficha" autofocus type="text" placeholder="Digite o nome da sua ficha" >'


    let cont_input_imgPerfil = document.createElement("div")
    cont_input_imgPerfil.classList.add("Continput_imgPerfil")
    content_createFicha.appendChild(cont_input_imgPerfil)

    let image_amoster = document.createElement("img")
    image_amoster.classList.add("image_amoster")
    image_amoster.src = "https://cdna.artstation.com/p/assets/images/images/031/209/428/original/krzysztof-pixel-matys-96-idle-v5.gif?1602934264"
    cont_input_imgPerfil.appendChild(image_amoster)

    let Label_input_image = document.createElement("label")

    Label_input_image.addEventListener("change",(ev)=>{
        let input_value = ev.target.files[0]
        if(input_value){
            let reader = new FileReader()
            reader.addEventListener("load", (ev)=>{
                let readerTarget = ev.target
                visibleImage_perfil(readerTarget.result)
                url_img = readerTarget.result
            })
            reader.readAsDataURL(input_value)
        }else{{
            console.log("Deu ruim")
        }}
    })
    
    Label_input_image.classList.add("Label-input_image")
    cont_input_imgPerfil.appendChild(Label_input_image)

    Label_input_image.innerHTML = '<input type="file" accept="image/*" class="input-image">Escolha uma imagem'
}

function appendFichaGonza(ficha_infos){

    criar_infoFicha()

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
    button_enviarFichaDb.addEventListener("click",  ()=> {
        enviar_dadosFichaDb()
    })
    ficha_container.appendChild(button_enviarFichaDb)

    //Definindo que todos os inputs numéricos receberão valor 0
    let inputsNumber_global = document.querySelectorAll("input[type='number']")
    let inputsText_global = document.querySelectorAll("input")

    inputsNumber_global.forEach(input => input.value = 0)
    inputsText_global.forEach(input => input.autocomplete = "off")

    changeInput_addPonto(ficha_infos)
}



function changeInput_addPonto(ficha_infos){
    const inputs_Atributos = document.querySelectorAll(".inputs_atributos")
    const inputs_Pericia = document.querySelectorAll(".inputs_pericias")
    
    inputs_Atributos.forEach(input =>{
        let inputs_Atributos_valores = []
        input.addEventListener("input", ()=>{
            if(input.value > 5){
                input.value = input.innerHTML
            }
            inputs_Atributos_valores.push(Number(input.value))
            let soma_pontos = inputs_Atributos_valores.reduce((acc, val)=>{
                return val + acc
            })
            input.addEventListener("reset", ()=>{
                console.log(input.value)
            })
        })

        
    })
    inputs_Pericia.forEach(input =>{
        input.addEventListener("input", ()=>{
            if(input.value > 5){
                input.value = input.innerHTML
            }
        })
    })     
}



function createFichaEdit_window(info, container){
    let head_fichaCont = document.createElement("div")
    head_fichaCont.classList.add("head_ficha")
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

    info.chaves.forEach((chave)=>{    
        let class_inputs = "inputs_" + info.categoria.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '_').toLowerCase()
        if(chave.textarea){
            head_fichaCont.innerHTML += `<label class="label_textarea "><span>${chave.chave_string}:</span><textarea class="textarea_values ${class_inputs}" id="${chave.chave_string}" name="${info.categoria}" ></textarea></label>`
        }else if(info.type_global === "number"){
            ul_inputs.innerHTML += `<label><span>${chave.chave_string}:</span><input id="${chave.chave_string}" type="number" class="input_values ${class_inputs}" ${chave.atributosInput} name="${info.categoria}"></label>`
        }
        else{
            ul_inputs.innerHTML += `<label><span>${chave.chave_string}:</span><input id="${chave.chave_string}" class="input_values ${class_inputs}"  ${chave.atributosInput} name="${info.categoria}"></label>`
        }
    })

}



