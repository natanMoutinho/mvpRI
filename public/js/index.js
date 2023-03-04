

document.addEventListener("DOMContentLoaded",async ()=>{
    await loadTable()
})


async function  loadTable(){
    const table = document.getElementById('tabelaIndex');
    console.log(table);

    const childTest = document.createElement('tr')
    console.log(loadInfo('um autor qualquer','data de agr', 'documento de teste'))
    const list = loadInfo('um autor qualquer','data de agr', 'documento de teste');
    // childTest.appendChild(loadInfo('um autor qualquer','data de agr', 'documento de teste'))
    
    // const dados = await fetch('http://localhost:3000/registers').then(
    //     date => {
    //         console.log(date.json)
    //         return date.json;
    //     }
    // )
    // console.log(dados);

    console.log(await searchListRegister());
    
    // console.log(teste)

    // console.log(retorno[0])


    // list.forEach(element =>  childTest.appendChild(element) )
    


    // for(element in list){
    //     console.log(element);
    //     console.log(typeof element)
    //     childTest.appendChild(element);
    // }
    // console.log(childTest)
    // table.appendChild(childTest);
}


async function searchListRegister(){
    let list;
    fetch('http://localhost:3000/registers')
        .then(response => response.json())
        .then(data=>{
            list = data;
        });
    return list;
}


function loadInfo(authors,dataCriacao,documet){
    const auth = document.createElement('td');
    auth.innerHTML = authors;

    const  dataC = document.createElement('td');
    dataC.innerHTML = dataCriacao

    const documento = document.createElement('td');
    documento.innerHTML = documet;

    return [auth,dataC,documento]

}