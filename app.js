class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

    validarDados() {
        for (let i in this) {
            if (this[i] === undefined || this[i] === '' || this[i] === null) {
                return false;
            }
        }
        return true;
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id');

        if (id === null) {
            localStorage.setItem('id', 0);
        }
    }

    getProximoId() {
        let nextId = localStorage.getItem('id') //null
        return parseInt(nextId) + 1;
    }

    gravar(despesa) {
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(despesa))
        localStorage.setItem('id', id);
    }
}

let dataBase = new Bd();

function cadastrarDespesas() {

    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');

    let despesas = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value);

    let modal_titulo = document.getElementById('modal_titulo');
    let text_modal = document.getElementById('text_modal');
    let text_btnModal = document.getElementById('text_btnModal');
    let div_modal = document.getElementById('div_modal');

    if (despesas.validarDados()) {
        //gravando no localStorage
        dataBase.gravar(despesas);
        //modal sucesso
        modal_titulo.innerHTML = 'Cadastro efetuado com sucesso';
        text_modal.innerHTML = 'Sua despesa foi cadastrada com sucesso!';
        text_btnModal.innerHTML = 'Voltar';
        text_btnModal.className = 'btn  bg-success text-light';
        div_modal.className = 'modal-header bg-success text-light';

        $('#registraDespesa').modal('show');
    } else {
        // modal de erro
        modal_titulo.innerHTML = 'Falha ao cadastrar despesa';
        text_modal.innerHTML = 'Não foi possivel cadastrar, verifique se todos os campos foram preenchidos corretamente!';
        text_btnModal.innerHTML = 'Voltar e corrigir';
        text_btnModal.className = 'btn  bg-danger text-light';
        div_modal.className = 'modal-header bg-danger text-light';

        $('#registraDespesa').modal('show');
    }
}