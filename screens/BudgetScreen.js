import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Modal, Button, TextInput, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { db } from '../src/firebaseConnection';
import { collection, addDoc } from 'firebase/firestore';

// Array de produtos
const produtos = [
  {id:	1,	nome:	'ELETRODUTO PVC 1/2 POLEGADA'	,	preco:	22.52	,	quantidade: 	0	,	metro:	0	,	hasMetro:	true	,	img:require('../src/images/eletroduto pvc 12.jpg')	},
{id:	2,	nome:	'ELETRODUTO PVC 3/4 PT'	,	preco:	4.94	,	quantidade: 	0	,	metro:	0	,	hasMetro:	true	,	img:require('../src/images/eletroduto pvc 34.jpg')	},
{id:	3,	nome:	'ELETRODUTO GALVANIZADO 1 LEVE'	,	preco:	14.55	,	quantidade: 	0	,	metro:	0	,	hasMetro:	true	,	img:require('../src/images/ELETRODUTO GALVANIZADO 1 LEVE.jpg')	},
{id:	4,	nome:	'ELETRODUTO GALVANIZADO 1/2 LEVE'	,	preco:	7.11	,	quantidade: 	0	,	metro:	0	,	hasMetro:	true	,	img:require('../src/images/eletroduto galvanizado leve 12.jpeg')	},
{id:	5,	nome:	'ELETRODUTO GALVANIZADO 3/4 LEVE'	,	preco:	9.71	,	quantidade: 	0	,	metro:	0	,	hasMetro:	true	,	img:require('../src/images/eletroduto galvanizado 34 leve.jpeg')	},
{id:	6,	nome:	'ADAPTADOR 1 P/ CONDULETE PRATICO'	,	preco:	3.77	,	quantidade: 	0	,	metro:	0	,	hasMetro:	false	,	img:require('../src/images/adaptador 1.jpg')	},
{id:	7,	nome:	'UNIDUT MULT C/ RED 3/4 P/ 1/2 (ADAPTADOR SAIDA 1/2)'	,	preco:	5.28	,	quantidade: 	0	,	metro:	0	,	hasMetro:	false	,	img:require('../src/images/adaptador 12.jpg')	},
{id:	8,	nome:	'UNIDUT MULT 3/4  (ADAPTADOR SAIDA 3/4)'	,	preco:	3.95	,	quantidade: 	0	,	metro:	0	,	hasMetro:	false	,	img:require('../src/images/adaptador 34.jpg')	},
{id:	9,	nome:	'CONDULETE TIPO X 1 PRATICO SEM TAMPA'	,	preco:	20.82	,	quantidade: 	0	,	metro:	0	,	hasMetro:	false	,	img:require('../src/images/condulete 1.jpg')	},
{id:	10,	nome:	'CONDULETE TIPO X 1/2 E 3/4 PRATICO SEM TAMPA'	,	preco:	12.71	,	quantidade: 	0	,	metro:	0	,	hasMetro:	false	,	img:require('../src/images/condulete 34.jpg')	},
{id:	11,	nome:	'PLACA CEGA P/CONDULETE 1/2 - 3/4'	,	preco:	5.18	,	quantidade: 	0	,	metro:	0	,	hasMetro:	false	,	img:require('../src/images/placa cega.jpg')	},
{id:	12,	nome:	'PLACA CEGA P/CONDULETE 1POL'	,	preco:	7.82	,	quantidade: 	0	,	metro:	0	,	hasMetro:	false	,	img:require('../src/images/placa cega 1.jpg')	},
{id:	13,	nome:	'TAMPAO PVC 1'	,	preco:	1.08	,	quantidade: 	0	,	metro:	0	,	hasMetro:	false	,	img:require('../src/images/tampao 1.jpeg')	},
{id:	14,	nome:	'TAMPAO PVC 3/4'	,	preco:	0.94	,	quantidade: 	0	,	metro:	0	,	hasMetro:	true	,	img:require('../src/images/tampao 34.jpg')	},
{id:	15,	nome:	'CANALETA PLASTICA 30X30 CINZA ABERTA'	,	preco:	21.01	,	quantidade: 	0	,	metro:	0	,	hasMetro:	true	,	img:require('../src/images/canaleta 30.jpeg')	},
{id:	16,	nome:	'CANALETA SISTEMA 20X10'	,	preco:	5.38	,	quantidade: 	0	,	metro:	0	,	hasMetro:	true	,	img:require('../src/images/canaleta 2010.png')	},
{id:	17,	nome:	'MATA JUNTA COTOVELO 90 GRAUS'	,	preco:	1.99	,	quantidade: 	0	,	metro:	0	,	hasMetro:	false	,	img:require('../src/images/MATAJUNTA.jpeg')	},
{id:	18,	nome:	'MATA JUNTA COTOVELO EXTERNO'	,	preco:	1.02	,	quantidade: 	0	,	metro:	0	,	hasMetro:	false	,	img:require('../src/images/matajunta ex.jpeg')	},
{id:	19,	nome:	'MATA JUNTA COTOVELO INTERNO'	,	preco:	1.00	,	quantidade: 	0	,	metro:	0	,	hasMetro:	false	,	img:require('../src/images/matajunta in.jpeg')	},
{id:	20,	nome:	'MATA JUNTA EM T'	,	preco:	1.21	,	quantidade: 	0	,	metro:	0	,	hasMetro:	false	,	img:require('../src/images/matajunta t.jpeg')	},
{id:	21,	nome:	'MATA JUNTA LUVA'	,	preco:	1.62	,	quantidade: 	0	,	metro:	0	,	hasMetro:	true	,	img:require('../src/images/matajunta luva.jpg')	},
{id:	22,	nome:	'TUBO/DUTO CORRUGADO EXTERNO 3/4 POL PEAD (KANAFLEX)'	,	preco:	5.49	,	quantidade: 	0	,	metro:	0	,	hasMetro:	true	,	img:require('../src/images/corrugado ex 34.jpeg')	},
{id:	23,	nome:	'TUBO/DUTO CORRUGADO EXTERNO 1 POL PEAD (KANAFLEX)'	,	preco:	2.33	,	quantidade: 	0	,	metro:	0	,	hasMetro:	true	,	img:require('../src/images/corrugado 1.jpeg')	},
{id:	24,	nome:	'CONDUITE EMBORRACHADO 1/2'	,	preco:	5.09	,	quantidade: 	0	,	metro:	0	,	hasMetro:	true	,	img:require('../src/images/CONDUITE EMBORRACHADO 1_2.jpg')	},
{id:	25,	nome:	'CONDUITE EMBORRACHADO 3/4'	,	preco:	6.10	,	quantidade: 	0	,	metro:	0	,	hasMetro:	true	,	img:require('../src/images/conduite 34.jpeg')	},
{id:	26,	nome:	'CONDUITE CORRUGADO 1/2 PRETO'	,	preco:	4.79	,	quantidade: 	0	,	metro:	0	,	hasMetro:	true	,	img:require('../src/images/CONDUITE CORRUGADO 1_2 PRETO.jpg')	},
{id:	27,	nome:	'CONDUITE CORRUGADO AMARELO 1/2'	,	preco:	5.06	,	quantidade: 	0	,	metro:	0	,	hasMetro:	true	,	img:require('../src/images/amarelo 34.jpg')	},
{id:	28,	nome:	'CONDUITE CORRUGADO AMARELO 3/4'	,	preco:	6.12	,	quantidade: 	0	,	metro:	0	,	hasMetro:	true	,	img:require('../src/images/amarelo 34.jpg')	},
{id:	29,	nome:	'ROLDANA PARA POSTE'	,	preco:	7.00	,	quantidade: 	0	,	metro:	0	,	hasMetro:	false	,	img:require('../src/images/roldana.jpg')	},
{id:	30,	nome:	'ABRACADEIRA/FITA AJUSTAVEL PARA POSTE'	,	preco:	4.11	,	quantidade: 	0	,	metro:	0	,	hasMetro:	false	,	img:require('../src/images/abracadeira poste.jpeg')	},
{id: 31, nome: 'CABO CAT5E U/UTP – CAPA SIMPLES', preco: 2.76, quantidade:0, metro:0, hasMetro:true, img:require('../src/images/utp.jpeg')},
{id: 32, nome: 'ABRAÇADEIRA TIPO D C/ CUNHA 1/2', preco: 1.06, quantidade:0, metro:0, hasMetro:false, img:require('../src/images/abracadeira 12.jpeg')},
{id: 33, nome: 'ABRAÇADEIRA TIPO D C/ CUNHA 3/4', preco: 1.06, quantidade:0, metro:0, hasMetro:false, img:require('../src/images/abracadeira 34.jpg')}
];

export default function OrcamentoScreen() {
  const [orcamento, setOrcamento] = useState([]);
  const [contador, setContador] = useState(0); // Contador para gerar chaves únicas
  const [valorTotal, setValorTotal] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleCliente, setModalVisibleCliente] = useState(true);
  const [metros, setMetros] = useState(0); 
  const [quantidade, setQuantidade] = useState(0); 
  const [produtoSelecionado, setProdutoSelecionado] = useState(null); // Estado para armazenar o produto selecionado para adicionar metros
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento
  const [cliente, setCliente] = useState();
  const [pesquisa, setPesquisa] = useState();
  const [produtosFiltrados, setProdutosFiltrados] = useState(produtos)
  const [modalQuantidadeVisible, setModalQuantidadeVisible] = useState(false);
  const [produtoSelecionadoQuantidade, setProdutoSelecionadoQuantidade] = useState(null);




  useEffect(() => {
    const loadData = async () => {
      setTimeout(() => {
        setIsLoading(false); // Após 2 segundos, desativa a tela de carregamento
      }, 2000);
    };

    loadData();
  }, []);

  // Função para calcular o valor total do orçamento
  useEffect(() => {
    const total = orcamento.reduce((acc, item) => acc + item.preco * (item.metro || 1), 0); // multiplica o valor do metro com valor do produto e soma com outros produtos
    setValorTotal(total);
  }, [orcamento]);

  function abrirModal() {
    setModalVisible(true);
  }

  function fecharModal() {
    setModalVisible(false);
  }

  function fecharModalCliente() {
    setModalVisibleCliente(false);
  }

  function abrirModalQuantidade(produto) {
    setProdutoSelecionadoQuantidade(produto);
    setModalQuantidadeVisible(true);
  }

  // função para adicionar quantidade do produto
  function confirmarAdicionarQuantidade() {
    const novoProduto = {
      ...produtoSelecionadoQuantidade,
      orcamentoId: `${produtoSelecionadoQuantidade.id}-${contador}`,
      quantidade: quantidade // Adiciona a quantidade selecionada ao produto
    };
    setOrcamento([...orcamento, novoProduto]);
    setContador(contador + 1); // Incrementa o contador
    setQuantidade(0); // Reseta a quantidade
    setProdutoSelecionadoQuantidade(null); // Reseta o produto selecionado
    setModalQuantidadeVisible(false); // Fecha o modal de quantidade
  }

  // função para abrir modal ou de Metro ou Quantidade do produto
  function adicionarAoOrcamento(produto) {
    if (produto.hasMetro) {
      setProdutoSelecionado(produto); // Abre o modal de metros
    } else {
      abrirModalQuantidade(produto); // Abre o modal de quantidade
    }
  }

  // Adiciona quantidade ou metro e adiciona o produto ao orçamento
  function confirmarAdicionarProduto() {
    const novoProduto = {
      ...produtoSelecionado,
      orcamentoId: `${produtoSelecionado.id}-${contador}`,
      metro: metros // Adiciona a quantidade de metros ao produto
    };
    setOrcamento([...orcamento, novoProduto]);
    setContador(contador + 1); // aumenta numero de produtos no orçamento
    setMetros(0); // Reseta o valor de metros
    setProdutoSelecionado(null); // Reseta o produto selecionado
  }

  // função para remover item do orçamento
  function removerDoOrcamento(orcamentoId) {
    setOrcamento(orcamento.filter(produto => produto.orcamentoId !== orcamentoId));
  }

  // função para pesquisar produto na lista
  function pesquisar() {
    const resultado = produtos.filter(produtos => produtos.nome.toLowerCase().includes(pesquisa.toLowerCase())); // pesquisar produtos
    setProdutosFiltrados(resultado);
  }

  //função para enviar orçamento ao banco de dados {firebase} 
  async function enviarOrcamento() {
    try {
      const docRef = await addDoc(collection(db, "orcamentos"), {
        cliente: cliente,
        produto: orcamento,
        valortotal: valorTotal,
        data: new Date(),
      });
      console.log("Documento escrito com o ID: ", docRef.id);
      alert('Orçamento enviado com sucesso!');
      setOrcamento([]);
      setModalVisible(false);
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e)
    }
  }

  const renderProduto = ({ item }) => ( // renderiza a visualização de um produto no card
    <View style={styles.produto}>
      <View style={styles.containerProdutos}>
        <Image
          style={styles.imagem}
          source={item.img}
        />
      </View>
      <View style={styles.produtoInfo}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        style={styles.buttonAdicionar}
        onPress={() => adicionarAoOrcamento(item)}
      >
        <Ionicons name='add-circle' size={20} />
      </TouchableOpacity>
    </View>
  );

  const renderOrcamentoItem = ({ item }) => ( // renderiza a visualização do orçamento
    <View style={styles.orcamentoItem}>
      <Text style={styles.orcamentoItemText}>{item.nome} - R$ {item.preco.toFixed(2)}</Text>
      {item.metro > 0 && <Text style={styles.orcamentoItemText}> {item.metro} Metros </Text>}
      {item.quantidade > 0 && <Text style={styles.orcamentoItemText}>Quantidade: {item.quantidade}</Text>}
      <TouchableOpacity
        style={styles.buttonRemover}
        onPress={() => removerDoOrcamento(item.orcamentoId)}
      >
        <Ionicons name='trash-outline' size={20} />
      </TouchableOpacity>
    </View>
  );

  // Exibe a tela de carregamento enquanto `isLoading` for verdadeiro
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Modal animationType='slide' transparent={false} visible={modalVisibleCliente}>
        <View style={styles.modalCliente}>
          <Text style={styles.title}>Insira o nome do Cliente</Text>
          <TextInput
            style={styles.input}
            placeholder="Cliente"
            placeholderTextColor="#aaa"
            value={cliente}
            onChangeText={(texto) => setCliente(texto)}
          />
          <TouchableOpacity style={styles.buttonAdicionar} onPress={fecharModalCliente}>
            <Ionicons name='arrow-redo-circle' size={20} />
          </TouchableOpacity>
        </View>
      </Modal>
      <Text style={styles.title}>Produtos Disponíveis</Text>

      <View style={styles.containerPesquisa}>
        <Text style={styles.textoPesquisa}>Pesquisa</Text>
        <TextInput style={styles.metroInput} value={pesquisa} onChangeText={(textPesquisa) => setPesquisa(textPesquisa)} />
        <TouchableOpacity onPress={pesquisar}>
          <Ionicons name='search-circle' size={40} />
        </TouchableOpacity>
      </View>

      <FlatList //exibe a lista de produtos
        data={produtosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderProduto}
      />

      {produtoSelecionadoQuantidade && (
          <View style={styles.metroInputContainer}>
            <Text>Quantas unidades para {produtoSelecionadoQuantidade.nome}?</Text>
            <TextInput
              style={styles.metroInput}
              keyboardType="numeric"
              value={quantidade.toString()}
              onChangeText={(text) => setQuantidade(Number(text))}
            />
            <Button title="Confirmar" onPress={confirmarAdicionarQuantidade} />
          </View>
      )}



      {produtoSelecionado && (
        <View style={styles.metroInputContainer}>
          <Text>Quantos metros para {produtoSelecionado.nome}?</Text>
          <TextInput
            style={styles.metroInput}
            keyboardType="numeric"
            value={metros.toString()}
            onChangeText={(text) => setMetros(Number(text))}
          />
          <Button title="Confirmar" onPress={confirmarAdicionarProduto} />
        </View>
      )}

      <Button title='Exibir orçamento' onPress={abrirModal} />

      <Modal transparent={true} animationType='slide' visible={modalVisible}>
        <View style={styles.modal}>
          <Text style={styles.orcamentoTitle}>Cliente: {cliente} </Text>
          <Text style={styles.orcamentoTitle}>Total: R${valorTotal.toFixed(2)}</Text>
          <FlatList
            data={orcamento}
            keyExtractor={(item) => item.orcamentoId} // Usa a chave única para o orçamento
            renderItem={renderOrcamentoItem}
          />
          <View style={styles.modalButton}>
            <Button style={styles.buttonAdicionar} title='Fechar' onPress={fecharModal} />
            <Button style={styles.buttonAdicionar} title='Enviar' onPress={enviarOrcamento} />
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  produto: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    gap: 20
  },
  produtoImagem: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  produtoInfo: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: 315,
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    color: '#333',
  },
  text: {
    fontSize: 14,
    marginLeft: 10,
    marginTop: 5,
  },
  preco: {
    fontSize: 18,
    color: '#007BFF',
    textAlign: 'center'
  },
  buttonAdicionar: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonRemover: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  orcamentoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#FFF'
  },
  orcamentoItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    gap: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  orcamentoItemText: {
    fontSize: 18,
  },
  containerProdutos: {
    flexDirection: 'column'
  },
  imagem: {
    width: 150,
    height: 150,
  },
  modal: {
    width: 350,
    padding: 5,
    marginTop: 420,
    margin: 20,
    backgroundColor: '#7D8C9B',
    height: 350,
    gap: 10,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'center',
  },
  modalCliente: {
    width: 350,
    padding: 5,
    marginTop: 300,
    margin: 20,
    backgroundColor: '#7D8C9B',
    height: 200,
    gap: 10,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalButton: {
    flexDirection: 'row',
    gap: 15,
  },
  metroInputContainer: {
    margin: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
  },
  metroInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: 100,
    textAlign: 'center',
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#007BFF',
  },
  containerPesquisa: {
    flexDirection: 'row',
    gap: 10
  },
  textoPesquisa: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  }
});
