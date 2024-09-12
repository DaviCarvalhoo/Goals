const { select, input, checkbox } = require('@inquirer/prompts')

let meta = { value: "tomar 2 litros de agua", checked:false}
let metas= [ meta]

const cadastrarMeta = async () =>{
  const meta = await input({ message: "Digite a meta: "})
  if(meta.lenght == 0 ){
    console.log("A meta não pode ser vazia.")
    return /*cadastrarMeta() para retorno e redigitar a meta*/
  }
  metas.push({ value: meta, checked: false})
}
const listarMetas = async () =>{
  const respostas = await checkbox({
    message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
    choices:[...metas],
    instructions: false,
  })
  if(respostas.lenght == 0){
    console.log("Nenhuma meta selecionada!")
    return
  }

  metas.forEach((m)=>{
    m.checked =false
  })

  respostas.forEach((resposta) => {
    const meta= metas.find((m)=>{
      return m.value == resposta
    })
    meta.checked = true
  });
  console.log("Meta(s) concluída(s)")
}

const start = async () =>{
  while(true){
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
          name:"Sair",
          value: "sair"
        }
      ]
    })
    switch(opcao){
      case "cadastrar":
        await cadastrarMeta()
        console.log(metas)
        break
      case "listar":
        await listarMetas()
        break
      case "sair":
        console.log("Até a proxima!")
        return
      
    }
  }
}
start()

