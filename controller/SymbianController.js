//IMPORTA O MÓDULO DO EXPRESS
const express = require('express');

const SymbianModel = require('../model/SymbianModel');

//CONFIGUAR UM RECURSO DE ROTEAMENTO (Router)
const router = express.Router();

//ROTA DE LISTAGEM DE pacientes
router.get('/listar-pacientes', (req, res)=>{

    //res.send('ROTA DE LISTAGEM DE pacientes');
    SymbianModel.findAll()
    .then(
        (pacientes)=>{
            res.status(200).send(pacientes);
        }
    )
    .catch(
        (error)=>{
            res.status(500).json({"MSG":error});
        }
    );
});

//ROTA DE LISTAGEM DE pacientes POR CÓDIDO DO LIVRO
router.get('/listar-paciente/:cod_paciente', (req, res)=>{

    let { cod_paciente } = req.params;

    SymbianModel.findAll({
        where:{
            cod_paciente
        }
    })
    .then(
        (paciente)=>{
            res.status(200).send(paciente);
        }
    )
    .catch(
        (error)=>{
            res.status(500).json({"MSG":error});
        }
    );

    /** POR CHAVE PRIMÁRIA **/
    // SymbianModel.findByPk(cod_livro)
    // .then(
    //     (livro)=>{
    //         res.status(200).send(livro);
    //     }
    // )
    // .catch(
    //     (error)=>{
    //         res.status(500).json({"MSG":error});
    //     }
    // );

});

//ROTA DE CADASTRO DE pacientes
router.post('/cadastrar-paciente', (req, res)=>{
    //console.log(req.body);
    //res.send('ROTA DE CADASTRO DE pacientes');

    let { nome_paciente, telefone_paciente, celular_paciente, email_paciente, nome_responsavel, telefone_responsavel } = req.body;
    //console.log(req.body);
    SymbianModel.create({
        nome_paciente, 
        telefone_paciente,
        celular_paciente,
        email_paciente,
        nome_responsavel,
        telefone_responsavel
    }).then(
        ()=>{
            res.status(201).json({"MSG":"PACIENTE INSERIDO COM SUCESSO!"});
        }
    ).catch(
        (error)=>{
            res.status(500).json({"MSG":error});
        }
    );

});

//ROTA DE ALTERAÇÃO DE pacientes
router.put('/alterar-paciente', (req, res)=>{

    //res.send('ROTA DE EDIÇÃO DE pacientes');

    let {nome_paciente, telefone_paciente, celular_paciente, email_paciente, nome_responsavel, telefone_responsavel ,cod_paciente } = req.body;

    SymbianModel.update(
        {
        nome_paciente, 
        telefone_paciente,
        celular_paciente,
        email_paciente,
        nome_responsavel,
        telefone_responsavel
        },
        {where:{cod_paciente}}
    )
    .then(
        ()=>{
            res.status(200).json({"MSG":"DADOS DO PACIENTE ALTERADO COM SUCESSO."});
        }
    )
    .catch(
        (error)=>{
            res.status(500).json({"MSG":error});
        }
    );
});

//ROTA DE EXCLUSÃO DE pacientes
router.delete('/excluir-paciente/:cod_paciente', (req, res)=>{
    //res.send('ROTA DE EXCLUIR DE pacientes');
    let {cod_paciente} = req.params;

    SymbianModel.destroy({
        where:{cod_paciente}
    })
    .then(
        ()=>{
            res.status(200)
            .json({"MSG":"PACIENTE EXCLUÍDO COM SUCESSO."});
        }
    )
    .catch(
        (error)=>{
            res.status(500)
            .json({"MSG":error});
        }
    );
});

module.exports = router;