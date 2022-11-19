function handleInfosUsers(){
    return new Promise((resolve, reject)=>{
        fetch("/admin-game/api/jogador").then(res=>{
            res.json().then(users=>{
                resolve(users)
            })
        })
    })
}
function submitMessageAlert(submit, email){
    let input = submit.parentNode.querySelector("input")
    if(!input.value) return alert("Preencha o campo de mensagem!")
    if(input.value.length < 10) return alert("Sua mensagem precisa no mínimo de 10 caracteres!")
    let options = {
        method: "POST",
        headers: new Headers({"content-type": "application/json"}),
        body: JSON.stringify({
            email_player: email,
            message: input.value
        })
    }
    fetch("/admin-game/api/message-player", options).then(res=>{
        res.json().then(status=>{
            if(status.limite)  return console.log(status)
            input.value = ""
            input.placeholder = "Mensagem enviado com sucesso!"
            setTimeout(()=> input.placeholder = "Mensagem de alerta!", 2000)
       })
        
    })
}