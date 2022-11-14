document.addEventListener("DOMContentLoaded", ()=>{
    verifyUser().then(user=>{
        addInfosUser(user)
        carregarFichasDB()
        setTimeout(()=> document.querySelector(".tela_preload").remove(), 2000)
    }).catch(err=>{
        console.log(err)
    })
})




function addInfosUser(user){
    let inputsNome = {
        nomeHeader: document.querySelector(".name_user"),
        nomeSaudation: document.querySelector(".saudacao_user")
    }
    let inputImage = {
        imageHeader: document.querySelector(".image_user")
    }
    infosMethods.addName(inputsNome, user)
    infosMethods.addImage(inputImage, user)
}
let infosMethods = {
    addName(inputs, user){ for(const key in inputs) inputs[key].innerHTML = user.nome },
    addImage(inputs, user){ for(const key in inputs) inputs[key].innerHTML = `<img src="${user.imagePerfil}">`}
}














function removeContainer(container){
    document.querySelector(`.${container}`).remove()
}


function criar_poopLogout(msg, fun){
    let estruturaHTML = `
    <div class="poop_logout">
        <div class="poop_logout_content">
            <p>${msg}</p>
            <span>
                <button onclick="${fun}()">SIM</button>
                <button onclick="removeContainer('poop_logout')">NÃO</button>
            </span>
        </div>
    <div>
    `
    document.body.innerHTML += estruturaHTML
}

function openlist_perfil(){
    const container = document.querySelector(".user_perfil_cont")

    let list_menuPerfil = document.createElement("ul")
    list_menuPerfil.classList.add("list_menuPerfil")

    let LI_alterar_nomePerfil = document.createElement("li")
    LI_alterar_nomePerfil.addEventListener("click", ()=>{
        container.removeChild(list_menuPerfil)
        mostrarInput_alterarNome()
    })
    LI_alterar_nomePerfil.innerText = "ALTERAR NOME DE PERFIL"

    let LI_alterar_fotoPerfil = document.createElement("li")
    LI_alterar_fotoPerfil.addEventListener("click", ()=>{
        container.removeChild(list_menuPerfil)
        criarMap_optionsPerfil(urlsOptions)
    })
    LI_alterar_fotoPerfil.innerText = "ALTERAR FOTO DE PERFIL"

    let LI_logout = document.createElement("li")
    LI_logout.addEventListener("click", ()=>{
        container.removeChild(list_menuPerfil)
        criar_poopLogout("Você deseja sair da sua conta?", "logout")
    })
    LI_logout.innerText = "SAIR DA CONTA"

    if(!document.querySelector(".list_menuPerfil")){
        container.appendChild(list_menuPerfil)
        list_menuPerfil.appendChild(LI_alterar_nomePerfil)
        list_menuPerfil.appendChild(LI_alterar_fotoPerfil)
        list_menuPerfil.appendChild(LI_logout)

    }
    else if(document.querySelector(".options_FotosPerfil")) removeContainer("options_FotosPerfil")
    else document.querySelector(".list_menuPerfil").remove()
    
}


function criarMap_optionsPerfil(collection){
    let gerarImgs = ()=>{
        let result = ""
        collection.forEach(img => result += `<img onclick="salvarImg_PerfilDb(this)" src="${img.url}">`)
        return result
    }
    let estruturaHTML = `
    <div class="options_FotosPerfil">
        ${gerarImgs()}
    </div>
    `
    document.querySelector(".user_perfil_cont").innerHTML += estruturaHTML
}



function mostrarInput_alterarNome(){
    let estruturaHTML = `
    <div class="Page_contInput_alterarnome">
        <label class="input_alterarnome">
            <p>Digite seu novo nome:</p>
            <input class="alterarNome_input" type="text" autofocus minLength="5"  maxLength="20">
            <button onclick="alterar_nomeConsole(this)">Alterar</button>
            <button onclick="removeContainer('Page_contInput_alterarnome')">Cancelar</button>
        </label>
    </div>
    
    `
    document.body.innerHTML += estruturaHTML
}
