const input_email_login = document.querySelector("#input_email_Login")
const input_pass_login = document.querySelector("#input_pass_login")

document.querySelector("#submit_form_login").addEventListener("click", login)

function login(ev){
    ev.preventDefault()
    if(!input_email_login.value ||
        !input_pass_login.value){
            alert("campo vazio")
    }else{
        telaLogando.preLoad()
        let options = {
            method: "POST",
            headers: new Headers({
                "content-type": "application/json",
            }), 
            body: JSON.stringify({
                email: input_email_login.value,
                password: input_pass_login.value,
            })
        }

        fetch("/user/login", options).then(res=>{
            res.json().then(objRes=>{
                if(res.ok){
                    console.log("Usuario salvo com sucesso!")
                    location.href = "/console"
               }else{
                    telaLogando.encerrar()
                    alert(objRes.message)
               }
            })
        })
    }
}
const telaLogando = {
    preLoad(){
        let container_carregar = document.createElement("div")
        container_carregar.classList.add("class_carregar")
        document.body.appendChild(container_carregar)
        
        let p = document.createElement("p")
        p.classList.add("p_carregando", "gif_carregando")
        p.innerText = "Logando..."
        container_carregar.appendChild(p)
    },
    encerrar(){
        document.querySelector(".class_carregar").remove()
    }

}