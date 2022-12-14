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
            if(fichas.length === 0) {
                ul_fichasPresents.innerHTML = `
                    <div class="block_fichaClear">
                        <img src="https://i.pinimg.com/originals/41/60/61/416061b9d95e206d7bbeb51e644cca6e.gif">
                        <p>Você não possui nenhuma ficha. Crie a sua agora mesmo viajante!</p>
                    </div>
                `
            }
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
function deletePopUpALert(index, popup){
    let options = {
        method: "DELETE",
        headers: new Headers({"content-type": "application/json"}),
        body: JSON.stringify({indexMessage: index})
    }
    fetch("/admin-game/api/delete-message", options).then(()=>{
        console.log("Mensagem deletada com sucesso!")
        popup.parentNode.style.opacity = 0
        setTimeout(()=> popup.parentNode.remove(), 200)

        let quantityPop = document.querySelectorAll(".popUp_message").length

        if(quantityPop === 1) popup.parentNode.parentNode.remove()
    })
}