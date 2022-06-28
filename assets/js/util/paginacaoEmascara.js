// JS botões exportar e paginação
var idioma=
        {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "Nenhum resultado encontrado",
            "sEmptyTable":     "Nenhum registro",
            "sInfo":           "Mostrando registros de _START_ até _END_ de um total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando registros de 0 até 0 de um total de 0 registros",
            "sInfoFiltered":   "(filtrado de um total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Pesquisar: ",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Carregando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Próximo",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Ativar para ordenar a coluna de maneira ascendente",
                "sSortDescending": ": Ativar para ordenar a coluna de maneira descendente"
            },
            "buttons": {
                "copyTitle": 'Informação copiada com sucesso !',
                "copyKeys": 'Use your keyboard or menu to select the copy command',
                "copySuccess": {
                    "_": '%d registros copiados',
                    "1": '1 registro copiado'
                },

                "pageLength": {
                "_": "Mostrar %d registros",
                "-1": "Mostrar Tudo"
                }
            }
        };
        $(document).ready(function() {
        var table = $('#table_compromissos').DataTable( {
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": true,
        "language": idioma,
        "lengthMenu": [[5,10,20, -1],[5,10,50,"Mostrar tudo"]],
        dom: 'Bfrt<"col-md-6 inline"i> <"col-md-6 inline"p>',
        buttons: {
        dom: {
        container:{
        tag:'div',
        className:'flexcontent'
        },
        buttonLiner: {
        tag: null
        }
        },
        buttons: [
                {
                    extend:    'copyHtml5',
                    text:      '<i class="fa fa-clipboard"></i>Copiar',
                    title:'Tabela de compromissos',
                    titleAttr: 'Copiar',
                    className: 'btn btn-app btn-sm export barras',
                    exportOptions: {
                        columns: [1, 2 , 3 , 4, 5]
                    }
                },

                {
                    extend:    'pdfHtml5',
                    text:      '<i class="fa fa-file-pdf-o"></i>PDF',
                    title:'Compromissos',
                    titleAttr: 'PDF',
                    className: 'btn btn-app btn-sm export pdf',
                    exportOptions: {
                        columns: [1, 2 , 3 , 4, 5 ]
                    },
                    customize:function(doc) {

                        doc.styles.title = {
                            color: '#000000',
                            fontSize: '25',
                            alignment: 'center'
                        }
                        doc.styles['td:nth-child(2)'] = { 
                            width: '400px'
                            
                        },
                        doc.styles.tableHeader = {
                            fillColor:'#000000',
                            color:'white',
                            alignment:'center'
                        },
                        doc.content[1].margin = [ 25, 0, 25, 0 ]
                    }
                },

                {
                    extend:    'excelHtml5',
                    text:      '<i class="fa fa-file-excel-o"></i>Excel',
                    title:'Cadastro de compromissos',
                    titleAttr: 'Excel',
                    className: 'btn btn-app btn-sm export excel',
                    exportOptions: {
                        columns: [1, 2 , 3 , 4, 5]
                    },
                },
               
                {
                    extend:    'pageLength',
                    titleAttr: 'Registros para mostrar',
                    className: 'selectTable'
                }
            ]
        }
        });
        } );

//Máscaras
function mascara(o,f){
    v_obj=o
    v_fun=f
    setTimeout("execmascara()",1)
}
function execmascara(){
    v_obj.value=v_fun(v_obj.value)
}
function mtel(v){
    v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    return v;
}
function id( el ){
	return document.getElementById( el );
}
window.onload = function(){
	id('telefone').onkeyup = function(){
		mascara( this, mtel );
	}
}





