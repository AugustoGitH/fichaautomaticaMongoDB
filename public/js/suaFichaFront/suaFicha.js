document.addEventListener("DOMContentLoaded", ()=>{
    handleFichaSelected().then(ficha=>{
        criarFicha(ficha)
    })
})
function criarFicha(ficha){
    let ficha_container = document.createElement("div")
    ficha_container.classList.add("ficha_container")
    document.body.appendChild(ficha_container)

    criarHeader_infoPessoais(ficha, ficha_container)
    criarConfigs_ficha(ficha_container)
    criarBodyInputs(ficha,ficha_container)
    criar_campoDados(ficha)
    criar_searchFicha()

}

function criarConfigs_ficha(container){

    let poop_config = document.createElement("div")
    poop_config.classList.add("poop_config")
    container.appendChild(poop_config)

    let poop_configList = document.createElement("ul")
    poop_configList.classList.add("poop_configList")
    poop_config.appendChild(poop_configList)

    let poop_configLi_sairFicha = document.createElement("li")
    poop_configLi_sairFicha.innerHTML = "Sair da ficha"
    poop_configList.appendChild(poop_configLi_sairFicha)

    poop_configLi_sairFicha.addEventListener("click", ()=>{
        window.location.href = "/console"
    })



    let poop_configLi_excluirFicha = document.createElement("li")
    poop_configLi_excluirFicha.innerHTML = "Excluir ficha"
    poop_configList.appendChild(poop_configLi_excluirFicha)

    poop_configLi_excluirFicha.addEventListener("click", ()=>{
        criar_poopLogout("Você deseja excluir sua ficha?", delete_ficha)
    })
}
function criarHeader_infoPessoais(ficha, container){
    let header_fichaInfos = document.createElement("div")
    header_fichaInfos.classList.add("header_fichaInfos")
    container.appendChild(header_fichaInfos)

    let h1_nomeFicha = document.createElement("h1")
    h1_nomeFicha.innerText = "Ficha: " + ficha.infosFicha.nome_ficha
    header_fichaInfos.appendChild(h1_nomeFicha)

    let h1_dataFicha = document.createElement("h1")
    h1_dataFicha.innerText = "Data de criação: " + ficha.infosFicha.time_create
    header_fichaInfos.appendChild(h1_dataFicha)
}

function criarBodyInputs(ficha, container){
    function filterFicha_categorias(categoria){
        let arrFilter = ficha.valores_ficha.filter(inf=>{
            return inf.categoria === categoria
        })
        return arrFilter
    }

    let categorias = {
        info_pessoais: filterFicha_categorias("Informações Pessoais"),
        atributos: filterFicha_categorias("Atributos"),
        infos_basicas: filterFicha_categorias("Informações Basicas"),
        pericias: filterFicha_categorias("Perícias"),
        armaduras: filterFicha_categorias("Armaduras"),
        habilidades: filterFicha_categorias("Habilidades"),
        magias: filterFicha_categorias("Magias"),
        historia: filterFicha_categorias("História"),
        aparencia: filterFicha_categorias("Aparência"),
        personalidade: filterFicha_categorias("Personalidade"),
    }
    Object.keys(categorias).forEach(cat=>{
        criarSections_categoria(categorias[cat], container, ficha)
    })
    wordEditButtons(ficha)

    
}
function criarSections_categoria(categoriaInfo, container, ficha){
    if(categoriaInfo[0].categoria === "Informações Pessoais"){
        let main_infosPessoais = document.createElement("div")
        main_infosPessoais.classList.add("main_infosPessoais")
        container.appendChild(main_infosPessoais)

        let img_mainInPes = document.createElement("div")
        img_mainInPes.classList.add("img_mainInPes")
        main_infosPessoais.appendChild(img_mainInPes)

        let img = document.createElement("img")
        img.src = ficha.infosFicha.perfil_ficha
        img_mainInPes.appendChild(img)

        let section_infPesInputs = document.createElement("div")
        section_infPesInputs.classList.add("section_infPesInputs")
        main_infosPessoais.appendChild(section_infPesInputs)

        let h1_categoria = document.createElement("h1")
        h1_categoria.innerText = categoriaInfo[0].categoria
        section_infPesInputs.appendChild(h1_categoria)

        let inputs_infos = document.createElement("ul")
        inputs_infos.classList.add("inputs_infos")
        section_infPesInputs.appendChild(inputs_infos)

        appendInputs(categoriaInfo, inputs_infos, ficha)
    }
    else{
        let sections_collection = document.createElement("div")
        sections_collection.classList.add("sections_collection")
        container.appendChild(sections_collection)

        let h1_categoria = document.createElement("h1")
        h1_categoria.innerText = categoriaInfo[0].categoria
        sections_collection.appendChild(h1_categoria)

        let ul_inputs = document.createElement("ul")
        ul_inputs.classList.add("ul_inputs")

        if(categoriaInfo.length === 1){
            appendInputs(categoriaInfo, sections_collection, ficha)
        }else{
            sections_collection.appendChild(ul_inputs)
            appendInputs(categoriaInfo, ul_inputs, ficha)
        }
    }
}
function appendInputs(categoria, listLabel){
    if(categoria.length === 1){
        let class_selectChave = categoria[0].chave.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        listLabel.innerHTML += `<label class="textarea_labelEdit">
        
                                 <textarea disabled></textarea><button class='button_edit-Input'><i class='bx bxs-pencil'></i></button></label>`
        listLabel.querySelector("textarea").value = categoria[0].valor
    }else{
        categoria.forEach(inf=>{
            let class_selectChave = inf.chave.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            if(isNaN(inf.valor)){
                listLabel.innerHTML += `<label> <span id="${class_selectChave}" class="chave_ficha">${inf.chave}:</span>  <input type="text" disabled value="${inf.valor}" ><button class='button_edit-Input'><i class="bx bxs-pencil"></i></button></label>`
            }else{
                listLabel.innerHTML += `<label> <span id="${class_selectChave}" class="chave_ficha">${inf.chave}:</span>  <input type="number" disabled value="${inf.valor}" ><button class='button_edit-Input'><i class="bx bxs-pencil"></i></button></label>`
            }
            
        })
    }
    
}
function wordEditButtons(ficha){
    let buttonsEdit = document.querySelectorAll(".button_edit-Input")
    buttonsEdit.forEach((butt, index)=>{
        butt.addEventListener("click", (ev)=>{
            let input = ev.target.parentNode.parentNode.querySelector("input")
            let textarea = ev.target.parentNode.parentNode.querySelector("textarea")
            let icon = ev.target.parentNode.parentNode.querySelector("i")

            if(textarea){
                disabledInputs_Edit(textarea, icon, ficha, index, "textarea")
            }else{
                disabledInputs_Edit(input, icon, ficha, index, "input")
            }
        })
    })
}
function disabledInputs_Edit(input, icon, ficha,index, inText){
    if(icon.classList.contains("bxs-pencil")){
        resetEstadoButtonInputs(input, inText)

        input.disabled = false
        icon.classList.remove("bxs-pencil")
        icon.classList.add("bx-x")
    }else if(icon.classList.contains("bx-x")){
        input.disabled = true
        icon.classList.remove("bx-x")
        icon.classList.add("bxs-pencil")
    }else if(icon.classList.contains("bx-check")){
        input.disabled = true
        alterar_campoDB(input.value, icon, ficha, index)
    }

    input.addEventListener("input", ()=>{
        icon.classList.remove("bx-x")
        icon.classList.add("bx-check")
    })
}
function resetEstadoButtonInputs(input, inText){
    document.querySelectorAll(`.ficha_container ${inText}`).forEach(input =>{
        input.parentNode.querySelector("i").classList.remove("bx-x")
        input.parentNode.querySelector("i").classList.add("bxs-pencil")
        input.disabled = true
    })
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

function criar_poopLogout(msg, fun){
    let poop_logout = document.createElement("div")
    poop_logout.classList.add("poop_logout")
    document.body.appendChild(poop_logout)

    let poop_logout_content = document.createElement("div")
    poop_logout_content.classList.add("poop_logout_content")
    poop_logout.appendChild(poop_logout_content)

    let p = document.createElement("p")
    p.innerHTML = msg
    poop_logout_content.appendChild(p)

    let span = document.createElement("span")
    poop_logout_content.appendChild(span)

    

    let button_logout = document.createElement("button")
    span.appendChild(button_logout)
    button_logout.innerHTML = "SIM"
    button_logout.addEventListener("click", ()=>{
        document.body.removeChild(poop_logout)
        fun()
    })
    

    let button_poopNone = document.createElement("button")
    span.appendChild(button_poopNone)
    button_poopNone.innerHTML = "NÃO"
    button_poopNone.onclick = ()=>{
        document.body.removeChild(poop_logout)
    }
}
function criar_campoDados(ficha){
    let iconDados = document.createElement("i")
    iconDados.classList.add("bx", "bxs-dice-5", "iconDado")
    document.body.appendChild(iconDados) 

    let campoDados = document.createElement("div")
    campoDados.classList.add("campoDados")

    iconDados.addEventListener("click", ()=>{
        if(document.querySelector(".campoDados")){
            document.body.removeChild(campoDados)
            document.body.scroll = "yes";
            document.documentElement.style.overflow = 'auto';
        }else{
            document.body.appendChild(campoDados)
    
            document.documentElement.style.overflow = 'hidden';
            document.body.scroll = "no";
        }
    })


    let campoDados_content = document.createElement("div")
    campoDados_content.classList.add("campoDados_content")
    campoDados.appendChild(campoDados_content)

    let h1 = document.createElement("h1")
    h1.innerText = "Campo de lançamento de dados"
    campoDados_content.appendChild(h1)

    let label = document.createElement("label")
    label.innerHTML += "Input de comando:" 
    campoDados_content.appendChild(label)

    let input = document.createElement("input")
    input.autocomplete = "off"
    input.type = "text"
    input.maxLength = "4"
    input.placeholder = "Ex: 2D30"
    input.autofocus = true
    label.appendChild(input)



    let button = document.createElement("button")
    button.innerHTML = "<i class='bx bxs-dice-4'></i>"
    label.appendChild(button)



    let result_campo = document.createElement("span")
    result_campo.classList.add("result_campo")
    result_campo.innerHTML += "Dados:"
    campoDados_content.appendChild(result_campo)

    let ul_history = document.createElement("ul")
    ul_history.classList.add("ul_history")
    campoDados_content.appendChild(ul_history)

    button.addEventListener("click", ()=>{
        if(!input.value){ return }
        else{
            dadosJogar(input.value, result_campo, ficha)
            input.value = ""
        }
    })
   
    input.addEventListener('keyup', function(e){
        let key = e.which || e.keyCode;
        if (key == 13) { 
            if(!input.value){ return }
            else{
                dadosJogar(input.value, result_campo)
                input.value = ""
            }
        }
      })
}

function criar_searchFicha(){
    let inputSearch_container = document.createElement("div")
    inputSearch_container.classList.add("inputSearch_container")
    document.body.appendChild(inputSearch_container) 

    let label = document.createElement("label")
    inputSearch_container.classList.add("inputSearch_label")
    inputSearch_container.appendChild(label) 


    let input_search = document.createElement("input")
    input_search.classList.add("input_search")
    input_search.autofocus
    input_search.placeholder = "Pesquisar"
    label.appendChild(input_search) 

    let icon_searchFicha = document.createElement("i")
    icon_searchFicha.classList.add("bx", "bxs-search-alt-2", "icon_searchFicha")
    label.appendChild(icon_searchFicha) 

    icon_searchFicha.addEventListener("click", ()=> map_inputs_chaves(input_search))
    input_search.addEventListener('keyup', function(e){
        let key = e.which || e.keyCode;
        if (key == 13) { 
            map_inputs_chaves(input_search)
        }
      })

}
function map_inputs_chaves(input){
    let value_input = input.value.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/ /g, "")
    if(!value_input){return}
    else{

        let spans_Geral = document.querySelectorAll(".chave_ficha")
        let chaves_ficha_name = []
        
        spans_Geral.forEach(el=>chaves_ficha_name.push(el.id))

        let chave_referent = chaves_ficha_name.filter((el =>{
            return value_input === el.replace("_", " ")
        }))
        if(chave_referent.length > 0){
            input.value = ""
            // let label_select = document.querySelector(`#${chave_referent}`).parentNode
            scrollPaging_selectEl(chave_referent.join(""))
            
        }else{
            input.value = ""
            input.placeholder = "Nada encontrado"
            setTimeout(()=>{input.placeholder = "Pesquisar"}, 1000)
        }
    }
    
    
}
function scrollPaging_selectEl(chave){
    let position_elements = inputs_positions()
    let element_select = position_elements.filter(el =>{
        return el.element_nome === chave
    })
    let position_element = element_select[0].position_element - 300
    let position_atual = window.scrollY
    
    window.scroll({
        top: position_element + position_atual,
        behavior: "smooth"
    })
    let label_select = document.querySelector(`#${element_select[0].element_nome}`).parentNode
    label_select.style.backgroundColor = "blue"
    setTimeout(()=>{
        label_select.style.backgroundColor = "black"
    }, 1800)

    
}
function inputs_positions(){
    let chaves_element = document.querySelectorAll(".chave_ficha")
    let elementos_pos = []
    chaves_element.forEach(chave =>{
        elementos_pos.push({
            element_nome: chave.id,
            position_element: chave.parentNode.getBoundingClientRect().top
        })
    })
    return elementos_pos
}