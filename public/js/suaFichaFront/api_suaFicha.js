function handleFichaSelected(){
    return new Promise((resolve, reject)=>{
        let fichaId = localStorage.getItem("IdFicha")
        fetch(`DB/ficha/${fichaId}`).then(res=>{
            res.json().then(ficha=> resolve(ficha))
        }).catch(err=> reject(err))
    })
}

function delete_ficha(){
    
    let options = {
        method: "DELETE",
        headers: new Headers({"content-type": "application/json"}),
        body: JSON.stringify({idFicha: localStorage.getItem("IdFicha")})
    }
    fetch("DB/deletar-ficha", options).then(()=>{
        location.href = "/console"
    }).catch(err=>{
        console.log(err)
    })
}

function alterar_campoDB(value, icon, ficha, index){
    ficha.valores_ficha[index].valor = value
    let fichaInfo = {
            infosFicha: ficha.infosFicha,
            valores_ficha: ficha.valores_ficha,
            idFicha: localStorage.getItem("IdFicha")
    }
    let options = {
        method: "POST",
        headers: new Headers({"content-type": "application/json"}),
        body: JSON.stringify(fichaInfo)
    }
    fetch("/DB/alterar-ficha", options).then(res=>{
        console.log(res)
        icon.classList.add("bxs-pencil")
    }).catch(err=>{
        console.log(err)
    })
}