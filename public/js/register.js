
const input_nome = document.querySelector("#input_nome")
const input_email_register = document.querySelector("#input_email_register")
const input_pass_register = document.querySelector("#input_pass_register")

document.querySelector("#submit_form_register").addEventListener("click", register)

function register(ev){

    ev.preventDefault()
    if(!input_nome.value || 
        !input_email_register.value ||
        !input_pass_register.value){
            alert("campo vazio")
    }else{
        telaRegistrando.preLoad()
        let options = {
            method: "POST",
            headers: new Headers({"content-type": "application/json"}), 
            body: JSON.stringify({
                nome: input_nome.value,
                email: input_email_register.value,
                password: input_pass_register.value
            })
        }
        fetch("/user/register", options).then(res=>{
           if(res.ok){
                console.log(res)
                setTimeout(telaRegistrando.success, 2000)
           }else{
                res.json().then(error=>{
                    telaRegistrando.encerrar()
                    alert(error.message)
                })
           }
        })
    }
    
}
const telaRegistrando = {
    preLoad(){
        let container_carregar = document.createElement("div")
        container_carregar.classList.add("class_carregar")
        document.body.appendChild(container_carregar)
         
        let p = document.createElement("p")
        p.classList.add("p_carregando", "gif_carregando")
        p.innerText = "Registrando..."
        container_carregar.appendChild(p)
    },
    success(){
        const p_carregando = document.querySelector(".p_carregando")
        let atualizarEstado = ()=>{
            return new Promise((response)=>{
                setTimeout(()=>{
                    p_carregando.innerText = "Conta registrada!"
                    p_carregando.classList.remove("gif_carregando")
                    p_carregando.classList.add("gif_sucess")
                }, 700)
                setTimeout(this.encerrar, 2000)
                response()
            })
        }
        atualizarEstado().then(()=> setTimeout(()=>{
            location.href = "/login"
        }, 2000))
    },
    encerrar(){
        document.querySelector(".class_carregar").remove()
    }

}

