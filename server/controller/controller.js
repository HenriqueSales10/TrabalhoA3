const { is } = require('express/lib/request');
var Compromissodb = require('../model/model');

//Criar e salvar um novo compromisso
exports.create=(req,res)=>{  
    //Validação da requisição
    if(!req.body){
        res.status(400).send({message: "O conteúdo não pode estar vazio"});
        return;
    }

    //Definindo os dados do novo compromisso
    const compromisso = new Compromissodb({
        tipo: req.body.tipo,
        endereco: req.body.endereco,
        telefone: req.body.telefone,
        data_compromisso: req.body.data_compromisso,
        hora_compromisso: req.body.hora_compromisso
    })

    // Salvar compromisso na base de dados
    compromisso
        .save(compromisso)
        .then(data =>{
            //res.send(data)
            res.redirect('/add-compromisso');
        })

        .catch(err =>{
            res.status(500).send({              
                message: err.message || "Ocorreu um erro no cadastro do compromisso"
            });
        });

}

//Recupera/retorna um determinado compromisso
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Compromissodb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Compromisso de id "+ id + "não encontrado"})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro ao recuperar compromisso com id " + id})
            })

    }else{
        Compromissodb.find()
            .then(compromisso => {
                res.send(compromisso)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Ocorreu um erro enquanto o servidor estava tentando recuprar o compromisso" })
            })
    }

}

// Atualizar um novo compromisso pelo id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Para atualizar os dados, eles não devem estar nulos"})
    }

    const id = req.params.id;
    Compromissodb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Não foi possível encontrar o compromisso de id: ${id}. Talvez o compromisso não exista!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Erro ao atualizar informações do compromisso"})
        })

}

//Deleta um determinado compromisso através do id informado na requisição
exports.delete = (req, res)=>{
    const id = req.params.id;

    Compromissodb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Não foi possível deletar o registro de id ${id}. Talvez você tenha digitado errado ! :(`})
            }else{
                res.send({
                    message : "Compromisso excluído com sucesso!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Não foi possível deletar o compromisso de id=" + id
            });
        });
        
}