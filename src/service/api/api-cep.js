
const fetchData = async () => {
    try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    setEndereco(data);
    } catch (error) {
    console.error(error);   

    }
};

export default api-cep
