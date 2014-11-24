$(document).ready(function(){
    
    $('[id=iniciar_jogo]').on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        
        $(this).hide();
        $('.indicacao').show();
        iniciar_jogo();
    });
    
    $('#painel-computer td:not(.marcado)').on('click', function() {
        var id;
        
        if (!$(this).hasClass('marcado')) {
            if ($(this).hasClass('nav-2')) {
                id = $(this).attr('id');
                $('[id="'+id+'"]').addClass('marcado atacado');
                if (!$('#painel-computer .nav-2:not(.marcado)').size()) {
                    fim_jogo(1);
                } else {
                    joga_computador();
                }
            } else {
                $(this).addClass('marcado');
                joga_computador();
            }
        }
    });
    
});

function iniciar_jogo() {
    var navios = [5, 4, 3, 3, 2];
    posicionar_navios(navios);
}

function posicionar_navios(navios) {
    var $dialog, $dialogInfo, 
        tamanho = navios.splice(0, 1),
        navio = 5 - navios.length;
    
    
    $dialog = $(
        '<div id="dialog-navio" class="modal fade">' +
            '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                    '<div class="modal-header">' +
                        '<h4 class="modal-title">Insere o '+navio+'º navio</h4>' +
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
                        '<button type="button" class="btn btn-primary" id="btn_inserir_navio">Inserir</button>' +
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
                    $dialogInfo = $(
                        '<div class="modal fade">' +
                            '<div class="modal-dialog dialog-info">' +
                                '<div class="modal-content">' +
                                    '<div class="modal-header">' +
                                        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                                    '</div>' +
                                    '<div class="modal-body">' +
                                        '<div class="col-md-12 form-group">' +
                                            '<p class="description">Linha "'+linha+'" não existe !</p>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="modal-footer">' +
                                        '<button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>');
                    $dialogInfo.modal('show');
                    $dialogInfo.on('hidden.bs.modal', function(e) {
                        $(this).remove();
                    });
                } else {
                    coluna = $dialog.find('#pos_init_col').val();
                    orientacao = $dialog.find('.orientacao input:checked').val();
                    insere_navio(linha, coluna, orientacao, tamanho, navio, 'navio-teste', 1);
                }
            }
        });

        $(this).find('#pos_init_col').on('change', function() {
            coluna = parseInt($(this).val());

            if (coluna) {
                if ($.inArray(coluna, arr_coluna) < 0) {
                    $dialogInfo = $(
                        '<div class="modal fade">' +
                            '<div class="modal-dialog dialog-info">' +
                                '<div class="modal-content">' +
                                    '<div class="modal-header">' +
                                        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                                    '</div>' +
                                    '<div class="modal-body">' +
                                        '<div class="col-md-12 form-group">' +
                                            '<p class="description">Coluna "'+coluna+'" não existe !</p>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="modal-footer">' +
                                        '<button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>');
                    $dialogInfo.modal('show');
                    $dialogInfo.on('hidden.bs.modal', function(e) {
                        $(this).remove();
                    });
                } else {
                    linha = $dialog.find('#pos_init_line').val().toUpperCase();
                    orientacao = $dialog.find('.orientacao input:checked').val();
                    insere_navio(linha, coluna, orientacao, tamanho, navio, 'navio-teste', 1);
                }
            }
        });

        $(this).find('.orientacao input').on('change', function() {
            linha = $dialog.find('#pos_init_line').val().toUpperCase();
            coluna = $dialog.find('#pos_init_col').val();
            orientacao = $(this).val();
            insere_navio(linha, coluna, orientacao, tamanho, navio, 'navio-teste', 1);
        });

        $(this).find('[id=btn_inserir_navio]').on('click', function() {
            linha = $dialog.find('#pos_init_line').val().toUpperCase();
            coluna = $dialog.find('#pos_init_col').val();
            orientacao = $dialog.find('.orientacao input:checked').val();

            var data = insere_navio(linha, coluna, orientacao, tamanho, navio, '', 1);
            if (data.type == 'success') {
                $dialogInfo = $(
                    '<div class="modal fade">' +
                        '<div class="modal-dialog dialog-info">' +
                            '<div class="modal-content">' +
                                '<div class="modal-header">' +
                                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                                '</div>' +
                                '<div class="modal-body">' +
                                    '<div class="col-md-12 form-group">' +
                                        '<p class="description">'+data.message+'</p>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="modal-footer">' +
                                    '<button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>');
                $dialogInfo.modal('show');
                $dialogInfo.on('hidden.bs.modal', function(e) {
                    $(this).remove();
                    if (navios.length > 0) {
                        posicionar_navios(navios);
                    } else {
                        $('.indicacao').hide();
                        $('[id=painel-user]').removeClass('col-md-12').addClass('col-md-6');
                        $('[id=painel-computer]').show();
                        $('[id=placar]').show();
                        $('table td').height('50').width('50');
                        $('[id=painel-user]').find('h2').show();
                        navios = [5, 4, 3, 3, 2];
                        posicionar_navios_aleatoriamente(navios);
                    }
                });
                $dialog.modal('hide');
            } else {
                $dialogInfo = $(
                    '<div class="modal fade">' +
                        '<div class="modal-dialog dialog-info">' +
                            '<div class="modal-content">' +
                                '<div class="modal-header">' +
                                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                                '</div>' +
                                '<div class="modal-body">' +
                                    '<div class="col-md-12 form-group">' +
                                        '<p class="description">'+data.message+'</p>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="modal-footer">' +
                                    '<button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>');
                $dialogInfo.modal('show');
                $dialogInfo.on('hidden.bs.modal', function(e) {
                    $(this).remove();
                });
            }
        });
    });

    $dialog.on('hidden.bs.modal', function(e) {
        $(this).remove();
    });
}

function posicionar_navios_aleatoriamente(navios) {
    var arr_linha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
        arr_orientacao = ['H', 'V'],
        linha, coluna, orientacao, data, $dialogInfo,
        tamanho = navios.splice(0, 1),
        navio = 5 - navios.length;
    
    
    do {
        linha = Math.floor((Math.random() * 10));
        coluna = Math.floor((Math.random() * 10) + 1);
        orientacao = Math.floor((Math.random() * 2));

        data = insere_navio(arr_linha[linha], coluna, arr_orientacao[orientacao], tamanho, navio, 'navio-teste', 2);
    } while(data.type != 'success');
    data = insere_navio(arr_linha[linha], coluna, arr_orientacao[orientacao], tamanho, navio, '', 2);
    if (navios.length > 0) {
        posicionar_navios_aleatoriamente(navios);
    } else {
        $('[id=painel-navios]').show();
        $dialogInfo = $(
            '<div class="modal fade">' +
                '<div class="modal-dialog dialog-info">' +
                    '<div class="modal-content">' +
                        '<div class="modal-header">' +
                            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                        '</div>' +
                        '<div class="modal-body">' +
                            '<div class="col-md-12 form-group">' +
                                '<p class="description">Pronto ! Inicie o bombardeio !</p>' +
                            '</div>' +
                        '</div>' +
                        '<div class="modal-footer">' +
                            '<button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>');
        $dialogInfo.modal('show');
        $dialogInfo.on('hidden.bs.modal', function(e) {
            $(this).remove();
        });
    }
}

function insere_navio(linha, coluna, orientacao, tamanho, navio, preview, tabela) {
    var arr_linha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
        posicao, message = {type : 'success', message: 'Navio inserido com sucesso !'};
    
    if (preview.length) {
        $('.'+preview).removeClass(preview);
    } 
    if (linha && coluna && orientacao && tamanho) {
        switch (orientacao) {
            case 'H':
                posicao = coluna;
                for (var i = 0; i < tamanho; i++) {
                    if ($('[id='+linha+tabela+posicao+']').size()) {
                        if ($('[id='+linha+tabela+posicao+']').hasClass('nav-'+tabela)) {
                            message = {type : 'error', message : 'Posição inválida! Posição gera colisão com outro navio existente.'};
                            $('.tabela-'+tabela+' .navio-'+navio).removeClass('nav-'+tabela).removeClass('navio-'+navio);
                        } else {
                            if (preview.length) {
                                $('[id='+linha+tabela+posicao+']').addClass(preview);
                            } else {
                                $('.navio-teste').removeClass('navio-teste');
                                $('[id='+linha+tabela+posicao+']').addClass('nav-'+tabela+' navio-'+navio);
                                $('table.marcador-'+tabela+'-navio-'+navio+' td.p-'+i).attr('id', linha+tabela+posicao);
                            }
                            posicao++;
                        }
                    } else {
                        message = {type : 'error', message : 'Posição inválida! Posição não compatível com o tamanho do navio.'};
                        $('.tabela-'+tabela+' .navio-'+navio).removeClass('nav-'+tabela).removeClass('navio-'+navio);
                        break;
                    }
                }
                $('#pos_final_line').val(linha);
                $('#pos_final_col').val(posicao-1);
            break;
            case 'V':
                posicao = $.inArray(linha, arr_linha);
                for (var i = 0; i < tamanho; i++) {
                    if ($('[id='+arr_linha[posicao]+tabela+coluna+']').size()) {
                        if ($('[id='+arr_linha[posicao]+tabela+coluna+']').hasClass('nav-'+tabela)) {
                            message = {type : 'error', message : 'Posição inválida! Posição gera colisão com outro navio existente.'};
                            $('.tabela-'+tabela+' .navio-'+navio).removeClass('nav-'+tabela).removeClass('navio-'+navio);
                        } else {
                            if (preview.length) {
                                $('[id='+arr_linha[posicao]+tabela+coluna+']').addClass(preview);
                            } else {
                                $('.navio-teste').removeClass('navio-teste');
                                $('[id='+arr_linha[posicao]+tabela+coluna+']').addClass('nav-'+tabela+' navio-'+navio);
                                $('table.marcador-'+tabela+'-navio-'+navio+' td.p-'+i).attr('id', arr_linha[posicao]+tabela+coluna);
                            }
                            posicao++;
                        }
                    } else {
                        message = {type : 'error', message : 'Posição inválida! Posição não compatível com o tamanho do navio.'};
                        $('.tabela-'+tabela+' .navio-'+navio).removeClass('nav-'+tabela).removeClass('navio-'+navio);;
                        break;
                    }
                }
                $('#pos_final_line').val(arr_linha[posicao-1]);
                $('#pos_final_col').val(coluna);
            break;
        }
        return message;
    }
}

function joga_computador() {
    var arr_linha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
        linha, coluna;
    
    do {
        linha = Math.floor((Math.random() * 10));
        coluna = Math.floor((Math.random() * 10) + 1);
    } while($('[id='+arr_linha[linha]+'1'+coluna+']').hasClass('marcado'));
    
    if ($('[id='+arr_linha[linha]+'1'+coluna+']').hasClass('nav-1')) {
        $('[id='+arr_linha[linha]+'1'+coluna+']').addClass('marcado atacado');
    } else {
        $('[id='+arr_linha[linha]+'1'+coluna+']').addClass('marcado');
    }
    
    if (!$('#painel-user .nav-1:not(.marcado)').size()) {
        fim_jogo(2);
    }
}

function fim_jogo(ganhador) {
    var placar = parseInt($('[id="jogador-'+ganhador+'"]').find('span').text()), 
        message, $dialogInfo;
    
    $('[id="jogador-'+ganhador+'"]').find('span').text(placar+1);
    if (ganhador == 1) {
        message = 'Parabéns!! Vocês venceu!!   :)';
    } else {
        message = 'Você perdeu!!   :(';
    }
    $dialogInfo = $(
        '<div class="modal fade">' +
            '<div class="modal-dialog dialog-info">' +
                '<div class="modal-content">' +
                    '<div class="modal-header"></div>' +
                    '<div class="modal-body">' +
                        '<div class="col-md-12 form-group">' +
                            '<p class="description">'+message+'</p>' +
                        '</div>' +
                    '</div>' +
                    '<div class="modal-footer">' +
                        '<button type="button" class="btn btn-primary" id="jogar_novamente">Jogar novamente?</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>');
    $dialogInfo.modal({
        show: true,
        backdrop: false
    });
    $dialogInfo.on('hidden.bs.modal', function(e) {
        $(this).remove();
    });

    $dialogInfo.on('shown.bs.modal', function() {
        $(this).find('[id=jogar_novamente]').on('click', function() {
            $('.marcado').removeClass('marcado');
            $dialogInfo.modal('hide');
            $('.atacado').removeClass('atacado');
            $('#painel-user').find('.nav-1').removeClass();
            $('#painel-computer').find('.nav-2').removeClass();
            $('#painel-computer').hide();
            $('#placar').hide();
            $('#painel-navios td').removeAttr('id');
            $('#painel-navios td.atacado').removeClass('marcado atacado');
            $('#painel-navios').hide();
            $('#painel-user').find('td').removeAttr('style');
            $('#painel-user').find('h2').hide();
            $('#painel-user').removeClass('col-md-6').addClass('col-md-12');
            $('.indicacao ').show();
            iniciar_jogo();
        });
    });
}
