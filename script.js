class Cliente{
    constructor(nome,cpf,senha,saldo=0){
      this.nome = nome;
      this.cpf = cpf;
      this.senha = senha;
      this.saldo = saldo;
      this.extrato = [];
    }
  }

  class Banco{
    constructor(){
      this.clientes = [];
    }
    cadastro(cliente){
      this.clientes.push(cliente);
    }
    verificarLogin(nome,senha){
      let cliente;
      this.clientes.forEach((c) =>{
        if(c.nome === nome && c.senha === senha){
          cliente = c;
        }
      });
    return cliente;
    }
    verificarDuplicata(cpf){
      let resultado;
      this.clientes.forEach((c) =>{
        if(c.cpf === cpf){
          resultado = true;
        }
      });
      return resultado;
    }
    buscaPeloCpf(cpf){
      let cliente;
      this.clientes.forEach((c) =>{
        if(c.cpf === cpf){
          cliente = c;
        }
      });
      return cliente;
    }
    excluirConta(cliente){

    }
    salvarMovimentacao(novaMovimentacao){
        this.extrato.push(novaMovimentacao);
    }
    exibirMovimentacao(pessoaLogada){

    }
  }




  const banco = new Banco();

  const nome = document.getElementById("nomeCad");
  const cpf = document.getElementById("cpfCad");
  const senha = document.getElementById("senhaCad");
  const btnCadastrar = document.getElementById("btnCadastrar");
  const respRegistro = document.getElementById("respRegistro");

  btnCadastrar.addEventListener("click", () =>{
    const verificarDuplicata = banco.verificarDuplicata(cpf.value);
    if(verificarDuplicata){
      respRegistro.innerHTML = "CPF já cadastrado";
      respRegistro.style.color = "orangered";
    }else{
      if(nome.value === "" || cpf.value === "" || senha.value === ""){
        respRegistro.innerText = "Preencha os campos corretamente";
        respRegistro.style.color = "orangered"
        respRegistro.style.marginTop = "10px";
        setTimeout(() =>{
          respRegistro.innerText = "";
        },4000);
      }else{
        const cliente = new Cliente(nomeCad.value, cpfCad.value, senhaCad.value);
        banco.cadastro(cliente);
        nomeCad.value = "";
        cpfCad.value = "";
        senhaCad.value = "";
        respRegistro.innerText = "Cliente cadastrado com sucesso";
        respRegistro.style.color = "green";
        respRegistro.style.marginTop = "10px";
        setTimeout(() =>{
          respRegistro.innerText = "";
        },3000);
      }
    }
  });

  const irParaLogin = document.getElementById("irParaLogin");
  const areaRegistro = document.getElementById("areaRegistro");
  const areaLogin = document.getElementById("areaLogin");

  irParaLogin.addEventListener("click", () =>{
    areaRegistro.style.display = "none";
    areaLogin.style.display = "block";
  });

  const nomeLogin = document.getElementById("nomeLogin");
  const senhaLogin = document.getElementById("senhaLogin");
  const btnLogin = document.getElementById("btnLogin");
  const telaPrincipal = document.getElementById("telaPrincipal");
  const exibNome = document.getElementById("exibNome");
  const exibSaldo = document.getElementById("exibSaldo");
  const titulo = document.getElementById("titulo");
  const respLogin = document.getElementById("respLogin");
  let pessoaLogada;

  btnLogin.addEventListener("click", () =>{
    const usuario = banco.verificarLogin(nomeLogin.value, senhaLogin.value);
    if(usuario){
      app.style.display = "block";  
      titulo.innerText = "GnezyBank";
      areaLogin.style.display = "none";
      telaPrincipal.style.display = "block";
      exibNome.innerText = `Nome: ${usuario.nome}`;
      exibSaldo.innerText = `Saldo: ${usuario.saldo}`;
      pessoaLogada = usuario;
    }else{
      respLogin.innerText = "Usuário ou senha incorretos";
      respLogin.style.color = "orangered";
      respLogin.style.marginTop = "10px";
    }
  });

  const areaExtrato = document.getElementById("areaExtrato");
  const irParaExtrato = document.getElementById("irParaExtrato");
  const msgInicial = document.getElementById("msgInicial");
  const movimentacao = document.getElementById("movimentacao");
  const btnVoltar_4 = document.getElementById("btnVoltar_4");
  irParaExtrato.addEventListener("click", () =>{
    telaPrincipal.style.display = "none";
    areaExtrato.style.display = "block";
    pessoaLogada.extrato.forEach((e) =>{
    const exibExtrato = document.createElement("p");
    exibExtrato.innerText = e;
    movimentacao.appendChild(exibExtrato);
    });
  });
  btnVoltar_4.addEventListener("click", () =>{
    areaExtrato.style.display = "none";
    telaPrincipal.style.display = "block";
    movimentacao.innerHTML = "";
  });

  const areaDeposito = document.getElementById("areaDeposito");
  const irParaDeposito = document.getElementById("irParaDeposito");

  irParaDeposito.addEventListener("click", () =>{
    telaPrincipal.style.display = "none";
    areaDeposito.style.display = "block";
  });

  const valorDeposito = document.getElementById("valorDeposito");
  const respDeposito = document.getElementById("respDeposito");
  const btnConfDeposito = document.getElementById("btnConfDeposito");
  const btnVoltar_1 = document.getElementById("btnVoltar_1");

  btnConfDeposito.addEventListener("click", () =>{
    if(valorDeposito.value === "" || +valorDeposito.value < 1){
      respDeposito.innerText = "Preencha o campo corretamente";
      respDeposito.style.color = "orangered";
      respDeposito.style.marginTop = "10px";
      setTimeout(() =>{
        respDeposito.innerText = "";
      },4000);
    }else{
      pessoaLogada.saldo += +valorDeposito.value;
      exibSaldo.innerText = `Saldo: ${pessoaLogada.saldo}`;
      respDeposito.innerText = "Depósito realizado com sucesso";
      respDeposito.style.color = "green";
      respDeposito.style.marginTop = "10px";
      const novaMovimentacao = `Deposito de R$ ${valorDeposito.value}`;
      pessoaLogada.extrato.push(novaMovimentacao);
      valorDeposito.value = "";
      msgInicial.innerText = "";
      setTimeout(() =>{
        respDeposito.innerText = "";
      },3000);
    }
  });
  btnVoltar_1.addEventListener("click", () =>{
    areaDeposito.style.display = "none";
    telaPrincipal.style.display = "block";
    valorDeposito.value = "";
  });

  const areaTransferencia = document.getElementById("areaTransferencia");
  const irParaTransferir = document.getElementById("irParaTransferir");

  irParaTransferir.addEventListener("click", () =>{
    telaPrincipal.style.display = "none";
    areaTransferencia.style.display = "block";
  });

  const cpfFavorecido = document.getElementById("favorecido");
  const respTransferencia = document.getElementById("respTransferencia");
  const btnContinuar = document.getElementById("btnContinuar"); 
  const btnVoltar_2 = document.getElementById("btnVoltar_2");
  const btnVoltar_3 = document.getElementById("btnVoltar_3");
  const confTransferencia = document.getElementById("confTransferencia");
  const trasnfParte_1 = document.getElementById("trasnfParte_1");
  const trasnfParte_2 = document.getElementById("trasnfParte_2");
  const infoFav = document.getElementById("infoFav");
  const valorTransferencia = document.getElementById("valorTransferencia");
  let pessoaFavorecida;

  btnContinuar.addEventListener("click", () =>{
    pessoaFavorecida = banco.buscaPeloCpf(cpfFavorecido.value);
    if(pessoaFavorecida){
      infoFav.style.display = "block";
      infoFav.innerText = `Nome: ${pessoaFavorecida.nome}\nCPF: ${pessoaFavorecida.cpf}`;
      trasnfParte_1.style.display = "none";
      trasnfParte_2.style.display = "block";
      respTransferencia.innerText = "";
    }else{
      respTransferencia.innerText = "Usuário não encontrado"
      respTransferencia.style.color = "orangered";
      respTransferencia.style.marginTop = "10px";
    }
  });
  btnVoltar_2.addEventListener("click", () =>{
    areaTransferencia.style.display = "none";
    telaPrincipal.style.display = "block";
    cpfFavorecido.value = "";
    respTransferencia.innerText = "";
  });
  confTransferencia.addEventListener("click", () =>{
    if(valorTransferencia.value === "" || +valorTransferencia.value < 1){
      respTransferencia.innerText = "Preencha o campo corretamente";
      respTransferencia.style.color = "orangered";
      respTransferencia.style.marginTop = "10px";
    }else{
      if(pessoaLogada.saldo >= +valorTransferencia.value){
          pessoaLogada.saldo -= +valorTransferencia.value;
          pessoaFavorecida.saldo += +valorTransferencia.value;
          exibSaldo.innerText = `Saldo: ${pessoaLogada.saldo}`;
          respTransferencia.innerText = "Transferência realizada com sucesso";
          respTransferencia.style.color = "green";
          respTransferencia.style.marginTop = "10px";
          const novaMovimentacao = `Fez transferencia de R$ ${valorTransferencia.value}`;
          const recebeuTransferencia = `Recebeu transferencia de R$ ${valorTransferencia.value}`;
          pessoaFavorecida.extrato.push(recebeuTransferencia)
          pessoaLogada.extrato.push(novaMovimentacao);
          valorTransferencia.value = "";
          msgInicial.innerText = "";
          setTimeout(() =>{
            respTransferencia.innerText = "";
          },3000);
        }else{
          respTransferencia.innerText = "Saldo insuficiente";
          respTransferencia.style.color = "orangered";
          respTransferencia.style.marginTop = "10px";
        }
      }
  });
  btnVoltar_3.addEventListener("click", () =>{
    areaTransferencia.style.display = "none";
    telaPrincipal.style.display = "block";
    valorTransferencia.value = "";
    respTransferencia.innerText = "";
    cpfFavorecido.value = "";
    infoFav.style.display = "none";
    trasnfParte_1.style.display = "block";
    trasnfParte_2.style.display = "none";
  });

  const irParaExcluirConta = document.getElementById("irParaExcluirConta");
  irParaExcluirConta.addEventListener("click", () =>{
    telaPrincipal.style.display = "none";
    areaExcluir.style.display = "block";
  });

  const confExclusao = document.getElementById("confExclusao");
  const respExclusao = document.getElementById("respExclusao");
  const btnVoltar_5 = document.getElementById("btnVoltar_5");
  confExclusao.addEventListener("click", () =>{
    if(pessoaLogada.saldo > 0){
      respExclusao.innerText = "Você não pode excluir sua conta pois ainda tem saldo";
      respExclusao.style.color = "orangered";
      respExclusao.style.marginTop = "10px";
    }else{
      banco.excluirConta(pessoaLogada);
    }
  });


  const app = document.getElementById("app")
  const sair = document.getElementById("sair");
  sair.addEventListener("click", () =>{
    app.style.display = "none";
    nomeLogin.value = "";
    senhaLogin.value = "";
    areaLogin.style.display = "block";
  });

  const irParaCadastro = document.getElementById("irParaCadastro");
  irParaCadastro.addEventListener("click", () =>{
    areaRegistro.style.display = "block";
    areaLogin.style.display = "none";
  });







// Ponto onde o codigo ainda funciona normalmente
