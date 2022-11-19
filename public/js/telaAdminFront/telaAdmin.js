
document.addEventListener("DOMContentLoaded", ()=>{
    handleInfosUsers().then(users=>{
        playersInnerHTML(users)
    })
})
function playersInnerHTML(users){
    let resultHTML = ""
    users.forEach(user=>{
        resultHTML += `
            <div class="player_card">
                <div class="perfil_player">
                    <img src="${user.imagePerfil}">
                </div>
                <article>
                    <p>Nome: ${user.nome}</p>
                    <p>Email: ${user.email}</p>
                    <p>Entrada: ${user.data}</p>
                </article>
                <span>
                    <p>Total de fichas: ${user.fichas.length}</p>
                    <button onclick="observerFichas('${user.email}')">Acessar</button>
                </span>
            </div>

        `
    })

    document.querySelector(".table_jogadores").innerHTML = resultHTML
    
}
function openFichaSelectAdmin(fichaID){
    localStorage.removeItem("IdFicha")
    localStorage.setItem("IdFicha", fichaID)
    location.href = "/admin-game/ficha-view"
}

function observerFichas(email){
    let returnFichasUser = (fichas)=>{
        let resultHTML = ""
        fichas.forEach(ficha =>{
            resultHTML += `<li>
                                <div class="img_perfil">
                                    <img src="${ficha.infosFicha.perfil_ficha}">
                                </div>
                                <span>
                                    <p>Nome: ${ficha.infosFicha.nome_ficha}</p>
                                    <span>Criação: ${ficha.infosFicha.time_create}</span>
                                </span>
                                <button onclick="openFichaSelectAdmin('${ficha.infosFicha.id_ficha}')" class="button_acessar" >Acessar</button>
                            </li>`
        })
        return resultHTML
    }
    let gerarHTML = (user)=>{
        let estruturaHTMLPopup = `
        <div class="popUp_fichasInfos translateY">
            <i class='bx bx-x iconClose' onclick="closePopUp()"></i>
            <div class="popUp_fichasInfos_content">
                <h1>Player: ${user.nome}</h1>
                <h3>Email: ${user.email}</h3>
                <h3>Quantidade de fichas criadas: ${user.fichas.length < 10 ? "0" + user.fichas.length : user.fichas.length}</h3>
                <section class="infosSection_postMessage">
                    <p>Envie um alerta em forma de mensagem para o seu jogador! <br> O alerta ficará no cabeçalho do console do jogador.</p>
                    <div class="postMessage_label">
                        <input type="text" placeholder="Mensagem de alerta!">
                        <button onclick="submitMessageAlert(this, '${user.email}')">Enviar</button>
                    </div>
                </section>
                <section class="container_fichasPresents">
                    <h1>Fichas do usuário</h1>
                    <ul class="ul_fichasPresents">
                        ${returnFichasUser(user.fichas)}
                    </ul>
                </section>
            </div>
        </div>
    `
        document.body.innerHTML += estruturaHTMLPopup
        setTimeout(()=> document.querySelector(".popUp_fichasInfos").classList.remove("translateY"), 100)
    }
    handleInfosUsers().then(users=>{
        let userSelect = users.filter(user => user.email === email)[0]
        gerarHTML(userSelect)
    })
    
    
}
function closePopUp(){
    document.querySelector(".popUp_fichasInfos").classList.add("translateY")
    setTimeout(()=> document.querySelector(".popUp_fichasInfos").remove(), 500)
}