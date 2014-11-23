$(document).ready(function(){
    
    $('[id=iniciar_jogo]').on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        
        $(this).attr('disabled', 'disabled');
        iniciar_jogo();
    });
    
});

function iniciar_jogo() {
    limpar_tabelas();
    posicionar_navios();
}

function limpar_tabelas() {
//    alert('Tabelas limpas');
}

function posicionar_navios() {
    var navios = [5, 4, 3, 3, 2], $dialog;
    
    //$.each(navios, function(i, tamanho) {
        $dialog = $(
            '<div id="dialog-navio" class="modal fade">' +
                '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                        '<div class="modal-header">' +
                            '<h4 class="modal-title">Inserir navio</h4>' +
                        '</div>' +
                        '<div class="modal-body">' +
                            '<form class="form-horizontal" role="form">' +
                                '<div class="form-group">' +
                                    '<label class="col-md-3 control-label">Posição Inicial</label>' +
                                    '<div class="col-md-4">' +
                                        '<input type="text" class="form-control" id="pos_init_line" placeholder="Linha"  maxlength="1">' +
                                    '</div>' +
                                    '<div class="col-md-4">' +
                                        '<input type="number" class="form-control" id="pos_init_col" placeholder="Coluna" min="1" max="10">' +
                                    '</div>' +
                                '</div>' +
                                '<div class="form-group">' +
                                    '<label class="col-md-3 control-label">Posição Final</label>' +
                                    '<div class="col-md-4">' +
                                        '<input type="text" class="form-control" id="pos_final_line" placeholder="Linha"  maxlength="1" readonly>' +
                                    '</div>' +
                                    '<div class="col-md-4">' +
                                        '<input type="number" class="form-control" id="pos_final_col" placeholder="Coluna" min="1" max="10" readonly>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="form-group orientacao">' +
                                    '<label class="col-md-3 control-label">Orientação</label>' +
                                    '<div class=" col-md-2">' +
                                        '<div class="radio">' +
                                            '<label>' +
                                                '<input type="radio" name="orientacao" value="H" checked>Horizontal' +
                                            '</label>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="col-md-7">' +
                                        '<div class="radio">' +
                                            '<label>' +
                                                '<input type="radio" name="orientacao" value="V">Vertical' +
                                            '</label>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</form>' +
                        '</div>' +
                        '<div class="modal-footer">' +
                            '<button type="button" class="btn btn-primary">Inserir</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>');
            $dialog.modal({
                show: true,
                backdrop: false
            });
            $dialog.on('shown.bs.modal', function(event) {
                var arr_linha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
                    arr_coluna = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    linha, coluna, orientacao;
                
                $(this).find('.modal-dialog').draggable({
                    handle: ".modal-header"
                });
                
                $(this).find('#pos_init_line').on('change', function() {
                    linha = $(this).val().toUpperCase();
                    if (linha) {
                        if ($.inArray(linha, arr_linha) < 0) {
                            console.log(linha+' é um valor inválido');
                        } else {
                            coluna = $dialog.find('#pos_init_col').val();
                            orientacao = $dialog.find('.orientacao input:checked').val();
                            insere_navio(linha, coluna, orientacao, 5);
                        }
                    }
                });
                
                $(this).find('#pos_init_col').on('change', function() {
                    coluna = parseInt($(this).val());
                    
                    if (coluna) {
                        if ($.inArray(coluna, arr_coluna) < 0) {
                            console.log(coluna+' é um valor inválido');
                        } else {
                            linha = $dialog.find('#pos_init_line').val().toUpperCase();
                            orientacao = $dialog.find('.orientacao input:checked').val();
                            insere_navio(linha, coluna, orientacao, 5);
                        }
                    }
                });
                
                $(this).find('.orientacao input').on('change', function() {
                    linha = $dialog.find('#pos_init_line').val().toUpperCase();
                    coluna = $dialog.find('#pos_init_col').val();
                    orientacao = $(this).val();
                    insere_navio(linha, coluna, orientacao, 5);
                });
                
//                    $(this).on('click', '#confirma-excluir-item', function() {
//                            event.preventDefault();
//                            event.stopImmediatePropagation();
//
//                            callback($dialog);
//                            $dialog.modal('hide');
//                    });
            });

            $dialog.on('hidden.bs.modal', function(e) {
                $(this).remove();
            });
    //});
}

function insere_navio(linha, coluna, orientacao, tamanho) {
    var arr_linha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
        posicao;
    
    $('.navio').removeClass('navio');
    if (linha && coluna && orientacao && tamanho) {
        console.log(orientacao);
        switch (orientacao) {
            case 'H':
                posicao = coluna;
                for (var i = 0; i < tamanho; i++) {
                    if ($('[id='+linha+'1'+posicao+']').size()) {
                        if ($('[id='+linha+'1'+posicao+']').hasClass('navio')) {
                            console.log('Não é possível inserir navio, pois nesta posição ele colide com outro navio.');
                            $('.navio').removeClass('navio');
                        } else {
                            $('[id='+linha+'1'+posicao+']').addClass('navio');
                            posicao++;
                        }
                    } else {
                        console.log('Não é possível inserir navio, posição inválida para o tamanho do navio.');
                        $('.navio').removeClass('navio');
                        break;
                    }
                }
                $('#pos_final_line').val(linha);
                $('#pos_final_col').val(posicao-1);
            break;
            case 'V':
                posicao = $.inArray(linha, arr_linha);
                for (var i = 0; i < tamanho; i++) {
                    if ($('[id='+linha+'1'+posicao+']').size()) {
                        if ($('[id='+arr_linha[posicao]+'1'+coluna+']').hasClass('navio')) {
                            console.log('Não é possível inserir navio, pois nesta posição ele colide com outro navio.');
                            $('.navio').removeClass('navio');
                        } else {
                            $('[id='+arr_linha[posicao]+'1'+coluna+']').addClass('navio');
                            posicao++;
                        }
                    } else {
                        console.log('Não é possível inserir navio, posição inválida para o tamanho do navio.');
                        $('.navio').removeClass('navio');
                        break;
                    }
                }
                $('#pos_final_line').val(arr_linha[posicao-1]);
                $('#pos_final_col').val(coluna);
            break;
        }
    }
}
