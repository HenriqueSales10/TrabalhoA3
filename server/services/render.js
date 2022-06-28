const axios = require('axios');

exports.homeRoutes = (req, res)=>{
    //Make a get request to api/compromissos
    axios.get('http://localhost:3000/api/compromissos')
    .then(function(response){
        res.render('index', {compromissos: response.data});
    })

    .catch(err =>{
        res.send(err);
    })
}

exports.add_compromisso = (req, res) =>{
    res.render('add_compromisso');
}

exports.update_compromisso = (req,res) =>{
    axios.get('http://localhost:3000/api/compromissos', {params:{id:req.query.id}})
    .then(function(compromissodata){
        res.render('update_compromisso', {compromisso:compromissodata.data})
    })
    .catch(err=>{
        res.send(err);
    })
}

exports.ir_compromisso = (req,res) =>{
    axios.get('http://localhost:3000/api/compromissos', {params:{id:req.query.id}})
    .then(function(compromissodata){
        res.render('irParaDestino', {compromisso:compromissodata.data})
    })
    .catch(err=>{
        res.send(err);
    })
}

exports.irParaPostoSaude = (req, res) =>{
    res.render('irParaPostoSaude');
}