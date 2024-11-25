import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import Projetos from "./db.js"; // Importa o modelo do Projeto
import { where } from "sequelize";

const server = express();
const __dirname = path.resolve();

// Middlewares
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// ** CREATE - Rota para criar um novo Projeto **
server.get("/criar/:nome/:descricao/:data/:funcionarios", async (req, res) => {
  let nomeDig = req.params.nome;
  let descricaoDig = req.params.descricao;
  let dataDig = req.params.data;
  let funcionarioDig = req.params.funcionarios;

   Projetos.create({ 
    nome: nomeDig,
    descricao: descricaoDig,
    data: dataDig,
    funcionarios: funcionarioDig,
  });
    res.send('Seu projeto foi criado com sucesso !!');
  
});

// ** READ - Rota para listar todos os projetos **
server.get("/consultar", async (req, res) => {
    const projetos = await Projetos.findAll();
    res.send(projetos);
 
});

// ** READ - Rota para pegar um projeto **
server.get("/pegar/:id", async (req, res) => {
    const { id } = req.params;
   res.send(await Projetos.findOne({ where: { id } }));
});

// ** DELETE - Rota para excluir um projeto **
server.get("/delete/:id", async (req, res) => {
    const  id  = req.params.id;
    Projetos.destroy({ where: { id: `${id}` }});
    res.json({ message: "Projeto excluído com sucesso" });
});

// ** UPDATE - Rota para atualizar um projeto**
server.get("/update/:id/:nome/:descricao/:data/:funcionarios", (req, res) => {
  let idDig = req.params.id;
  let nomeDig = req.params.nome;
  let descricaoDig = req.params.descricao;
  let dataDig = req.params.data;
  let funcionarioDig = req.params.funcionarios;
  Projetos.update(
      { 
        nome: nomeDig,
        descricao: descricaoDig,
        data: dataDig,
        funcionarios: funcionarioDig
       },
      { where: { id: idDig } })
  res.send("atualização bem sucedida");
})

//SEMPRE MANTENHA NO FINAL DO CÒDIGO 
server.listen(3031, function () {
  console.log("Server is running on port 3031");
});
