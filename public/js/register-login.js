
function focusInputPass(el){
    el.parentNode.querySelector("i").classList.add("iconVision_visible")
}


function pass_visible(el){
    let input = el.parentNode.querySelector("input")
    if(input.type === "text"){
        input.type = "password"
        el.style.color = "black"
    }else{
        input.type = "text"
        el.style.color = "red"
    }
} 