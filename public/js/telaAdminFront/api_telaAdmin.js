function handleInfosUsers(){
    return new Promise((resolve, reject)=>{
        fetch("/DB/admin/jogador").then(res=>{
            res.json().then(users=>{
                resolve(users)
            })
        })
    })
}