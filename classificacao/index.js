const express = require('express')
const axios = require ('axios')
const app = express()
app.use(express.json())

const palavraChave = 'importante'
const funcoes = {
  ObservacaoCriada: (observacao) => {
    observacao.status = observacao.texto.includes(palavraChave) ? 'importante' : 'comum'
    axios.post(
      'http://192.168.56.1:10000/eventos',
      {tipo: 'ObservacaoClassificada', dados: observacao}
    )
  }
}
app.post('/eventos', (req, res) => {
  try{
    funcoes[req.body.tipo](req.body.dados)
  }
  catch (e){}
  res.status(200).send({msg: 'ok'})
})


app.listen(
  7000,
  () => console.log(`Classificação. 7000`)
)