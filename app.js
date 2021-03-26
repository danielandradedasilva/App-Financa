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

    recuperaTodosRegistros() {

        //array de despesas
        let despesas = Array();

        let id = localStorage.getItem('id');
        //recupera todas as despesas cadastradas em localStorage
        for (let i = 1; i <= id; i++) {
            //recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i));
            //existe a possibilidade de haver índices que foram removidas/pulados
            //neste caso vamos pular esses índices
            if (despesa === null) {
                continue;
            }
            despesas.push(despesa);
        }
        return despesas;
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

function carregaListaDespesas() {
    let despesas = Array();
    despesas = dataBase.recuperaTodosRegistros();
    //selecionando o elememto tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas');

    /*
      <tr>
         <td>15/03/2018</td>
        <td>Alimentação</td>
        <td>Compras do mês</td>
        <td>444.50</td>
      </tr>
    */

    //percorrer o array despesas, listando cada despesa de forma dinânica
    despesas.forEach((des) => {

        console.log(des)
            //criando a linha (tr)
        let linha = listaDespesas.insertRow()

        //criar as colunas (td)
        linha.insertCell(0).innerHTML = `${des.dia}/${des.mes}/${des.ano}`;

        //ajustar o tipo
        switch (des.tipo) {
            case '1':
                des.tipo = 'Alimentação'
                break;
            case '2':
                des.tipo = 'Educação'
                break;
            case '3':
                des.tipo = 'Lazer'
                break;
            case '4':
                des.tipo = 'Saúde'
                break;
            case '5':
                des.tipo = 'Transporte'
                break;
        }
        linha.insertCell(1).innerHTML = des.tipo;
        linha.insertCell(2).innerHTML = des.descricao;
        linha.insertCell(3).innerHTML = des.valor;
    })
}