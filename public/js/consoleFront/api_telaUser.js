function verifyUser(){
    return new Promise((resolve, reject)=>{
        fetch("/DB/jogador", {
        }).then(res=>{
            res.json().then(dbUser=>{
                resolve(dbUser)
            })
        })
    })
}



function logout(){
    fetch("/user/logout", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({logout: true})
    }).then(()=>{
        location.href = "/"
    }).catch(err=>{
        console.log(err)
    })
}

function salvarImg_PerfilDb(imgHTML){
    let url = imgHTML.src

    fetch("/user/alterar-imgPerfil", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({urlImgPerfil: url})
    }).then((res)=>{
        console.log(res)
        location.reload()
    }).catch(err=>{
        console.log(err)
    })
}
function alterar_nomeConsole(button){
    let valueName = button.parentNode.querySelector("input").value
    if(!valueName) return alert("Campo vazio!")
    fetch("/user/alterar-nomePerfil", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({nome: valueName})
    }).then(()=>{
        location.reload()
    })
}
function carregarFichasDB(){
    let ul_fichasPresents = document.querySelector(".ul_fichasPresents")
    fetch("/DB/fichas").then(res=>{
        res.json().then(fichas=>{
            fichas.forEach(ficha => {
                ul_fichasPresents.innerHTML += `
                <li>
                    <div class="img_perfil">
                        <img src="${ficha.infosFicha.perfil_ficha}">
                    </div>
                    <span>
                        <p>Nome: ${ficha.infosFicha.nome_ficha}</p>
                        <span>Criação: ${ficha.infosFicha.time_create}</span>
                    </span>
                    <button onclick="openFichaSelect('${ficha.infosFicha.id_ficha}')" class="button_acessar" >Acessar</button>
                </li>
                `
            })
        })
    })
}
function openFichaSelect(fichaID){
    localStorage.removeItem("IdFicha")
    localStorage.setItem("IdFicha", fichaID)
    location.href = "/suaFicha"
}
