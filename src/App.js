import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import api from './services/api'
import './styles.css'

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})
  //useState('') diz com que valor vai começar

  async function handleSearch(){
    if (input === ''){
      alert("Preencha algum CEP")
      return
    }

    try{

      const response = await api.get(`${input}/json`)
      //get vai receber informações do cep informado
      //[ input ] é onde está armazenado o cep em que o usuário digitou
      //json faz parte da url

      setCep(response.data)
      //setando a variavel com a resposta da API

      console.log(response.data)
      //[ .data ] puxar os dados do response (ele gera correto porém com sujeito, por isso usa-se .data)
      setInput('')
    }catch{
      alert("Erro no cep informado")
      setInput('')//setar campo pra vazio
    } 

  }

  return (
    <div className="container">
      <h1 className="title">BUSCADOR DE CEP</h1>

      <div className="containerInput">
        <input 
          type="text" 
          placeholder="Digite seu CEP..."
          value={input}
          onChange={ (e) => setInput(e.target.value) }
        />
        
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff"/>
        </button>
      </div>


      {Object.keys(cep).length > 0 && (
        <main className='main'>
         
          <h2>CEP: <strong>{cep.cep}</strong></h2>
          
          <span>RUA: <strong>{cep.logradouro}</strong></span>
          <span>COMPLEMENTO: <strong>{cep.complemento}</strong></span>
          <span>BAIRRO: <strong>{cep.bairro}</strong></span>
          <span>CIDADE: <strong>{cep.localidade +' - '+ cep.uf}</strong></span>

        </main>
      )}
      
      

    </div>
  );
} 

export default App;

//value recebe o valor digitado e o onChange guarda esse valor

//[ async ] vai executai mais de um bloco na função na mesma hora, foi usada pq demora pra pesquisar o cep 
//[ await ] so pode ser colocada no código depois do async, ela assegura que o bloco não vai ser 
//excutado enquanto o async não terminar
//[ {Object.keys(cep).length > 0} ] se não tiver nada dentro desse objeto, não mostre o "main"