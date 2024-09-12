const { select, input } = require('@inquirer/prompts')

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
        console.log("vamos listar")
        break
      case "sair":
        console.log("Até a proxima!")
        return
      
    }
  }
}
start()

