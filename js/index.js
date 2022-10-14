//criando Elementos de Botões
const textoOperacaoAnterior = document.querySelector("#operacaoAnterior");
const textoOperacaoAtual = document.querySelector("#operacaoAtual");
const buttons = document.querySelectorAll("#containerBotoes button");



//criando display de tela
class Calculator {
    constructor(textoOperacaoAnterior, textoOperacaoAtual) {
        this.textoOperacaoAnterior = textoOperacaoAnterior;
        this.textoOperacaoAtual = textoOperacaoAtual;
        this.operacaoAtual = "";
    }

    // adiconar o digito Da calculador na tela
    addDigit(digit) {
        console.log(digit)

        //verificar se o valor só tem um ponto
        if (digit === '.' && this.textoOperacaoAtual.innerText.includes('.')) {
            return;
        }

        this.operacaoAtual = digit;
        this.updateScreen()
    }

    //processar de calcular  todas as  operacoes    
    processoOperacao(operacao) {
        // verificar mundancas de operacoes
        if (this.textoOperacaoAtual.innerText === '' && operacao !== "C" ) {
            //mudar operacao

            if (this.textoOperacaoAnterior.innerText !== '') {
                this.mudarOperacao(operacao)

            } return
        }
        // Indicar as Operacoes anteriores e atuais
        let valorOperacao;
        const anterior = +textoOperacaoAnterior.innerText.split(" ")[0];
        const atual = +textoOperacaoAtual.innerText;

        //operacoes
        switch (operacao) {
            case '+':
                valorOperacao = anterior + atual;
                this.updateScreen(valorOperacao, operacao, atual, anterior)
                break;
            case '-':
                valorOperacao = anterior - atual;
                this.updateScreen(valorOperacao, operacao, atual, anterior)
                break;
            case '*':
                valorOperacao = anterior * atual;
                this.updateScreen(valorOperacao, operacao, atual, anterior)
                break;
            case '/':
                valorOperacao = anterior / atual;
                this.updateScreen(valorOperacao, operacao, atual, anterior)
                break;
            case 'DEL':
                this.processoBotaoDel()
                break;
            case 'CE':
                this.processoBotaoCE()
                break;
            case 'C':
                this.botaoC()
                break;
                case '=':
                this.botaoIgual()
                break;
            default:
                return;
        }
    }

    //alterar os valores da tela na calculadora
    updateScreen(valorOperacao = null, operacao = null, atual = null, anterior = null) {

        console.log(valorOperacao, operacao, anterior, atual)

        if (valorOperacao === null) {
            this.textoOperacaoAtual.innerText += this.operacaoAtual;
        } else {
            // checar se o valor for 0, se for atual adiconar valor atual
            if (anterior === 0) {
                valorOperacao = atual
            }

            //jogar  o valor de baixo para cima
            this.textoOperacaoAnterior.innerText = `${valorOperacao} ${operacao}`;
            this.textoOperacaoAtual.innerText = "";
        }

    }

    //mudar operacoes matematicas
    mudarOperacao(operacao) {
        const todasOPeracoes = ['+', '-', '/', '*']
        if (!todasOPeracoes.includes(operacao)) {
            return
        }

        this.textoOperacaoAnterior.innerText = this.textoOperacaoAnterior.innerText.slice(0, -1) + operacao
    }
// Apagar o ultimo Digito Del
    processoBotaoDel(){
        this.textoOperacaoAtual.innerText = this.textoOperacaoAtual.innerText.slice(0 ,-1)

    }

//Botao limpar C
processoBotaoCE(){
    this.textoOperacaoAtual.innerText = ""
}

//botao C
botaoC(){
    this.textoOperacaoAnterior.innerText = "" ;
    this.textoOperacaoAtual.innerText = "" ;
}
botaoIgual(){
    const operacao = textoOperacaoAnterior.innerText.split(' ')[1];

    this.processoOperacao(operacao);

}
}
const calc = new Calculator(textoOperacaoAnterior, textoOperacaoAtual)

//identificando os Botões 
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const valor = e.target.innerText;

        if (+valor >= 0 || valor === '.') {
            calc.addDigit(valor)
        } else {
            calc.processoOperacao(valor);
        }


    })
})