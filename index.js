const { select, input, checkbox } = require('@inquirer/prompts')

let mensagem = "Bem vindo ao App de Metas";
let meta = { value: "tomar 2 litros de agua", checked:false}
let metas= [ meta]

const cadastrarMeta = async () =>{
  const meta = await input({ message: "Digite a meta: "})
  if(meta.lenght == 0 ){
    mensagem = "A meta não pode ser vazia."
    return /*cadastrarMeta() para retorno e redigitar a meta*/
  }
  metas.push({ value: meta, checked: false})

  mensagem = "Meta cadastrada com sucesso"
}
const listarMetas = async () =>{
  if(metas.length === 0){
    mensagem = "Nenhuma meta cadastrada!"
    return
  }

  const respostas = await checkbox({
    message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
    choices: [...metas],
    instructions: false,
  })

  metas.forEach((m)=>{
    m.checked =false
  })

  if(respostas.length == 0){
    mensagem = "Nenhuma meta selecionada!"
    return
  }

  respostas.forEach((resposta) => {
    const meta = metas.find((m)=>{
      return m.value == resposta
    })
    meta.checked = true
  });
  mensagem = "Meta(s) concluída(s)"
}
const metasRealizadas = async () =>{
  const realizadas = metas.filter((meta) =>{
    return meta.checked
  })
  if(realizadas.length == 0){
    mensagem = "Não existem metas realizadas"
    return
  }
  await select({
    message:"Metas Realizadas: " + realizadas.length,
    choices: [...realizadas]
  })
}

const metasAbertas = async () =>{
  const abertas = metas.filter((meta) =>{
    return !meta.checked /* != true */
  })

  if(abertas.length == 0){
    mensagem = "Não existem metas abertas! "
    return 
  }
  await select({
    message: "Metas Abertas: " + abertas.lenght,
    choices: [...abertas]
  })
}

const deletarMetas = async () =>{
  if (metas.length === 0) {
    mensagem = "Nenhuma meta disponível para deletar."
    return
  }
  const metasDesmarcadas = metas.map((meta)=>{
    return {value: meta.value, checked: false} 
  })
  const itensADeletar = await checkbox({
    message: "Selecione item para deletar",
    choices: [...metasDesmarcadas],
    instructions: false
  })
  if(itensADeletar.length == 0){
    mensagem = "Nenhum item para deletar. "
    return
  }

  itensADeletar.forEach((item) => {
    metas = metas.filter((meta) =>{
      return meta.value != item
    })
  })
  mensagem = "Meta(s) deletada(s) com sucesso! "
}

const mostrarMensagem = () =>{
  console.clear();
  if(mensagem != ""){
    console.log(mensagem,"\n")
    mensagem = ""
  }
}

const start = async () =>{
  while(true){
    mostrarMensagem()
    const opcao = await select({
      message: "Menu >",
      choices: [
        {
          name:"Cadastrar metas",
          value: "cadastrar"
        },
        {
          name:"Listar metas",
          value: "listar"
        },
        {
          name:"Metas realizadas",
          value: "realizadas"
        },
        {
          name:"Metas abertas",
          value: "abertas"
        },
        {
          name:"Deletar metas",
          value: "deletar"
        },
        {
          name:"Sair",
          value: "sair"
        }
      ]
    })
    switch(opcao){
      case "cadastrar":
        await cadastrarMeta()
        break
      case "listar":
        await listarMetas()
        break
      case "realizadas":
        await metasRealizadas()
        break
      case "abertas":
        await metasAbertas()
        break
      case "deletar":
        await deletarMetas()
        break
      case "sair":
        console.log("Até a proxima!") 
        return
      
    }
  }
}
start()

