import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Modal, TouchableOpacity, ActivityIndicator, TextInput} from 'react-native';
import { db } from '../src/firebaseConnection';
import { getDocs, collection } from 'firebase/firestore';
import OrcamentoList from '../src/OrcamentoList';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HistoryScreen({ navigation }) {
  const [orcamento, setOrcamento] = useState([]);
  const [abrirModal, setAbrirModal] = useState(false);
  const [pesquisa, setPesquisa] = useState();
  const [clientesFiltrados, setClientesFiltrados] = useState(orcamento)
  const [orcamentoSelecionado, setOrcamentoSelecionado] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  

  // Função para buscar os dados do Firestore
  useEffect(() => {
    async function getDados() {
      const orcamentosRef = collection(db, 'orcamentos');
      getDocs(orcamentosRef)
        .then((snapshot) => {
          let lista = [];
          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              cliente: doc.data().cliente,
              data: doc.data().data,
              produtos: doc.data().produto, // Acessa o array de produtos
              valortotal: doc.data().valortotal,
            });
          });

          setOrcamento(lista);
          setClientesFiltrados(lista)
        })
        .catch((err) => {
          console.log(err);
        });
    }



    getDados();
  }, []);


  useEffect(() => {
    const loadData = async () => {
      setTimeout(() => {
        setIsLoading(false); // Após 2 segundos, desativa a tela de carregamento
      }, 2000);
    };

    loadData();
  }, []);

  // Função para abrir o modal e setar o orçamento selecionado
  function abrirOrcamentoModal(item) {
    setOrcamentoSelecionado(item);
    setAbrirModal(true);
  }

  // Função para fechar o modal
  function fecharModal() {
    setAbrirModal(false);
    setOrcamentoSelecionado(null);
  }

  function pesquisarOrcamento() {
    if(!pesquisa){
      setClientesFiltrados(orcamento);
    }else{
      const resultado = orcamento.filter(orcamento => orcamento.cliente.toLowerCase().includes(pesquisa.toLowerCase()))
      setClientesFiltrados(resultado);
    }
  }


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
      <View style={styles.containerInfo}>
        <Text style={styles.textoinfo}>Histórico de Orçamentos</Text>
      </View>

      <View style={styles.containerPesquisa}>
        <Text style={styles.textoPesquisa}>Pesquisa</Text>
        <TextInput style={styles.metroInput} value={pesquisa} onChangeText={(textPesquisa) => setPesquisa(textPesquisa)} />
        <TouchableOpacity onPress={pesquisarOrcamento}>
          <Ionicons name='search-circle' size={40} />
        </TouchableOpacity>
      </View>

      <FlatList // exibir lista de orçamentos
        style={styles.list}
        data={clientesFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrcamentoList
            data={item}
            onEyePress={() => abrirOrcamentoModal(item)} // Passa a função ao ícone do olho
          />
        )}
      />

      {/* Modal para mostrar os produtos do orçamento selecionado */}
      <Modal animationType="slide" visible={abrirModal} transparent={true}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Produtos do Orçamento</Text>
          {orcamentoSelecionado && (
            <FlatList
              style={styles.listModal}
              data={orcamentoSelecionado.produtos} // Acessa o array de produtos
              keyExtractor={(item) => item.id} // Usa o campo `id` do produto como chave
              renderItem={({ item }) => (
                <View style={styles.productItem}>
                  <Text style={styles.productName}>
                    {item.nome} - R$ {item.preco.toFixed(2)}
                    {item.metro > 0 && ` - ${item.metro} Metros`}
                    {item.quantidade > 0 && ` - Quantidade: ${item.quantidade}`}
                  </Text>
                </View>
              )}
            />
          )}
          <TouchableOpacity onPress={fecharModal} style={styles.closeButton}>
            <Ionicons name='close-sharp' size={25} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  list: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  containerPesquisa: {
    flexDirection: 'row',
    gap: 10
  },
  textoPesquisa: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textoinfo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
  },
  containerInfo: {
    flexDirection: 'row',
    gap: 25,
    justifyContent: 'center',
    marginTop: 15,
  },
  modal: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  listModal: {
    width: '100%',
  },
  productItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  metroInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: 100,
    textAlign: 'center',
    marginBottom: 10,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#007BFF',
  },
});
