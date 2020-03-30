function onOff(){
    document
    .querySelector("#modal")
    .classList
    .toggle("hide");

    document
    .querySelector("body")
    .classList
    .toggle("hideScroll");

    document
    .querySelector("#modal")
    .classList
    .toggle("addScroll");
}

function checkFields(event){
    
    const valuesToCheck = [
        "title",
        "category",
        "image",
        "description",
        "link",
    ]

    const isEmpty = valuesToCheck.find(function(value){

        const checkisString = typeof event.target[value].value === "string";
        const checkisEmpty = !event.target["title"].value.trim();

        if(checkisString && checkisEmpty){

            return true;

        }
    });

    if(isEmpty){

        event.prefentDefault();
        alert("Por Favor, preencha todos os campos!");
    }
}