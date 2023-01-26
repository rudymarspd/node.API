const express = require('express');

const server = express();

server.use(express.json());

// Query params = ?nome=Node JS
// Route Params = /curso/2
// Request Body = {nome: 'Nodejs', tipo: 'Backend'}

//CRUD> Create, Read, Update, Delete

const cursos = ['Node JS', 'JavaScript', 'React Native'];

//middleware Global
server.use ((req, res, next)=>{
  console.log(`URL CHAMADA: ${req.url}`);

  return next();
})

function checkcurso (req, res, next){
  if(!req.body.name){
    return res.status(400).json({error: "Nome do curso é obrigatório"})
  }
  
  return next();
}

function checkindexcurso (req, res, next){
  const curso = cursos[req.params.index];
  if(!curso){
    return res.status(400).json ({ error: "O usuário não existe"})
  }

  req.curso = curso;

  return next();
}

server.get('/cursos', (req, res)=> {
  return res.json(cursos);

  return next();
})

server.get('/curso/:index', checkindexcurso, (req, res) => {
  return res.json(req.curso);

})


//Criando um novo curso
server.post ('/cursos', checkcurso, (req, res)=> {
  const { name } = req.body;
  cursos.push(name);

  return res.json(cursos);
}),

//Atualizando um curso
server.put('/cursos/:index', checkcurso, (req, res)=>{
  const { index } = req.params;
  const { name } = req.body;

  cursos[index] = name

  return res.json(cursos);

});


//Excluindo cursos
server.delete('/cursos/:index', checkindexcurso, (req, res) => {
  const { index } = req.params;

  cursos.splice(index, 1);
  return res.json({ message: "Curso deletado com sucesso!"});
})

server.listen(3000);