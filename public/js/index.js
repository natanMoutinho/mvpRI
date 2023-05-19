

document.addEventListener("DOMContentLoaded",async ()=>{
})
document.getElementById("btnListarRegistros").addEventListener("click",async ()=>{
    // clearTable();
    await loadTable();
});
// document.addEventListener("btnListarRegistros",async ()=>{
//     await loadTable()
// })

async function loadTable() {
    const table = document.getElementById('tBody');
    console.log(table);
    
    if (table.childElementCount > 0) {
        
        const child = table.firstElementChild;
        table.removeChild(child);
    }
    const list = await searchListRegister();


    console.log( list)
    let cont = 1;
    list.forEach(info => {
        const tr = document.createElement('tr');
        const {title,authors,publishedAt} = info;
        const doc = info['document'];
        console.log(doc)
        const [tdTit,tdAuth,tdDataC,tdDoc] = loadInfo(title,authors,publishedAt,doc);
        const num = document.createElement('td');
        num.innerHTML = cont;
        cont +=1;
        tr.appendChild(num);
        tr.appendChild(tdTit);
        tr.appendChild(tdAuth);
        tr.appendChild(tdDataC);
        tr.appendChild(tdDoc);

        table.appendChild(tr)
    });
  }

async function searchListRegister(){
    return fetch('http://localhost:3000/registers')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => console.error(error));
}


function loadInfo(title, authors, dataCriacao, documet) {
    const tit = document.createElement('td');
    tit.innerHTML = title;

    const auth = document.createElement('td');
    auth.innerHTML = authors;

    const dataC = document.createElement('td');
    dataC.innerHTML = dataCriacao;

    const documento = createButtonDoc(documet);

    return [tit, auth, dataC, documento];
}

function createButtonDoc(doc){
        let botao = document.createElement("button");
        // Define os atributos do botão
		botao.innerHTML = "Abrir documento";
		// botao.id = "meuBotao";
		// Adiciona um evento de clique ao botão
		botao.addEventListener("click", function() {
			window.open(`http://localhost:3000/down/${doc}`, '_blank');
		});
        return botao
}