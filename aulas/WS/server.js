// Criando Servidor
// USando o express para criar e configurar os ervidor
const express = require("express");
const server = express();

const db = require("./db"); //Pegando o arquivo db da raíz do projeto

/* const ideas = [
    {
        img: "/images/programming.png",
        title: "Cursos de Programação",
        category: "Estudo",
        description: "Lorem ipsum dolor sit amet consectetur adipsicing elit. Rerun nisi alias ipsum, fugiat sed quasi ab minus illum veniam dicta, quae, ipsa corporis. Amet vel quos a, alias accusantium enim!",
        url: "https://rocketseat.com.br"
    },
    {
        img: "/images/sing.png",
        title: "Karaokê",
        category: "Diversão em Família",
        description: "Lorem ipsum dolor sit amet consectetur adipsicing elit. Rerun nisi alias ipsum, fugiat sed quasi ab minus illum veniam dicta, quae, ipsa corporis. Amet vel quos a, alias accusantium enim!",
        url: "https://rocketseat.com.br"
    },
    {
        img: "/images/read.png",
        title: "Ler um bom Livro",
        category: "Passatempo",
        description: "Lorem ipsum dolor sit amet consectetur adipsicing elit. Rerun nisi alias ipsum, fugiat sed quasi ab minus illum veniam dicta, quae, ipsa corporis. Amet vel quos a, alias accusantium enim!",
        url: "https://rocketseat.com.br"
    },
    {
        img: "/images/meditate.png",
        title: "Meditação",
        category: "Mentalidade",
        description: "Lorem ipsum dolor sit amet consectetur adipsicing elit. Rerun nisi alias ipsum, fugiat sed quasi ab minus illum veniam dicta, quae, ipsa corporis. Amet vel quos a, alias accusantium enim!",
        url: "https://rocketseat.com.br"
    },
    {
        img: "/images/painting.png",
        title: "Pintura",
        category: "Criatividade",
        description: "Lorem ipsum dolor sit amet consectetur adipsicing elit. Rerun nisi alias ipsum, fugiat sed quasi ab minus illum veniam dicta, quae, ipsa corporis. Amet vel quos a, alias accusantium enim!",
        url: "https://rocketseat.com.br"
    },
    {
        img: "/images/cooking.png",
        title: "Aprender novas receitas",
        category: "Gastronomia",
        description: "Lorem ipsum dolor sit amet consectetur adipsicing elit. Rerun nisi alias ipsum, fugiat sed quasi ab minus illum veniam dicta, quae, ipsa corporis. Amet vel quos a, alias accusantium enim!",
        url: "https://rocketseat.com.br"
    },
] */


// Configurar arquivos estáticos(css, scripts, imagnes)
server.use(express.static("Backup"))

//Habilitar o uso do req.body
server.use(express.urlencoded({extended: true }))

// Configuração do nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
    express: server,
    noCache: true, 
    
})

//Cria uma rota / e capturo o pedido do cliente para responder
server.get("/",function(req, res){

    


        //CONSULTAR DADOS NA TABELA
    db.all(`SELECT * FROM ideas`,function(err,rows){
        if(err) {
            console.log(err);
            return res.send("Houve um Erro no Banco de Dados!");
        }

        const reversedIdeas = [...rows].reverse(); //Espalhandoa s ideas
        let lastIdeas = [];
    
        for (let idea of reversedIdeas){
            if(lastIdeas.length < 2){
                lastIdeas.push(idea);
            }
        }
    
        return res.render("index.html", {ideas: lastIdeas});
    })


});

server.get("/ideias",function(req, res){

            //CONSULTAR DADOS NA TABELA
            db.all(`SELECT * FROM ideas`,function(err,rows){

                if(err) {
                    console.log(err);
                    return res.send("Houve um Erro no Banco de Dados!");
                }

                const reversedIdeas = [...rows].reverse(); //Espallhandoa s ideas

                return res.render("ideias.html", {ideas: reversedIdeas});

            })

});

server.post("/", function(req, res){

     //INSERIR DADOS NA TABELA
     const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES(?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    db.run(query,values,function(err){
        if(err){
            console.log(err);
            return res.send("Houve um erro no banco de dados!");
        }

        return res.redirect("/ideias");
        
    }) 
})

// Ligueio meu servidor na porta 3000
server.listen(3000);


