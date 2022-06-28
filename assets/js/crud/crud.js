//Adicionar compromisso
$('#add_compromisso').submit(function(event){
    swal("Cadastro realizado !", 'Compromisso cadastrado com sucesso !',
        'success');
});

//Editar/atualizar compromisso
$("#update_compromisso").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    var request = {
        "url" : `http://localhost:3000/api/compromissos/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        swal("Cadastro atualizado !", 'Compromisso atualizado com sucesso !',
        'success');
    })

})

// Excluir compromisso
if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete-compromisso");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/compromissos/${id}`,
            "method" : "DELETE"
        }


        swal({
            title: "Você realmente deseja excluir este registro?",
            text: "Esta ação não poderá ser revertida!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                $.ajax(request).done(function(response){
                    swal("Registro excluído com sucesso!", {
                        icon: "success",});
                })
                
                location.reload();
            } else {
              swal("Okay, o registro não foi deletado :)");
            }
          });
          
    })

}