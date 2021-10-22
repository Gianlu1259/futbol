var Cancha=require('../models/cancha');

//registro
function save_cancha(req,res){
    var params=req.body;
    var cancha=new Cancha();
    if(params.nombre && params.direccion && params.precio && params.cantMax){
        cancha.nombre=params.nombre;
        cancha.direccion=params.direccion;
        cancha.precio=params.precio;
        cancha.cantMax=params.cantMax;
    }
    Cancha.estimatedDocumentCount().exec((err,count)=>{
        if(count==0){
            cancha.save((err,CanchaStore)=>{
                if(err) return res.status(500).send({message:"error al guardar la cancha"});
                if(CanchaStore){
                    res.status(200).send({cancha:CanchaStore});
                }
                else{
                    res.status(404).send({message:'no se ah registrado la cancha'});
                }
            })
        }
        else{
            res.send({message:"ya existe registrada una cancha, eliminela antes de crear una nueva"});
        }
    })      
}

function get_cancha(req,res){
    Cancha.findOne().exec((err,cancha)=>{
        if(err) return res.status(500).send({message:"error al devolver la cancha"});
        if(cancha){
            res.status(200).send({cancha:cancha});
        }
        else{
            res.status(404).send({message:'no se ah encontrado ninguna cancha'});
        }
    })
}

function delete_cancha(req,res){
    Cancha.deleteOne({}).exec((err,result)=>{
        if(err) res.status(500).send("error al eliminar la cancha");
        if(result) res.status(200).send("se ah eliminado la cancha con exito!");
        else{res.status(404).send("no se ah logrado eliminar");}
    })
}

module.exports={
    save_cancha,
    get_cancha,
    delete_cancha
}