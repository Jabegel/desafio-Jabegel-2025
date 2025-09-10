class AbrigoAnimais {
  constructor() {
    this.animais = [
      { nome: "Rex", especie: "cão", brinquedos: ["RATO", "BOLA"] },
      { nome: "Mimi", especie: "gato", brinquedos: ["BOLA", "LASER"] },
      { nome: "Fofo", especie: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
      { nome: "Zero", especie: "gato", brinquedos: ["RATO", "BOLA"] },
      { nome: "Bola", especie: "cão", brinquedos: ["CAIXA", "NOVELO"] },
      { nome: "Bebe", especie: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
      { nome: "Loco", especie: "jabuti", brinquedos: ["SKATE", "RATO"] }
    ];

    this.brinquedosValidos = [
      "RATO", "BOLA", "LASER", "CAIXA", "NOVELO", "SKATE"
    ];
  }

  respeitaOrdem(brinquedosPessoa, brinquedosAnimal) {
    let i = 0;
    for (let b of brinquedosPessoa) {
      if (b === brinquedosAnimal[i]) i++;
      if (i === brinquedosAnimal.length) return true;
    }
    return i === brinquedosAnimal.length;
  }

 encontraPessoas(brinquedos1, brinquedos2, listaAnimais) {
    let pessoas = [
      brinquedos1.split(",").map(b => b.trim().toUpperCase()),
      brinquedos2.split(",").map(b => b.trim().toUpperCase())
    ];

    let nomesAnimais = listaAnimais.split(",").map(a => a.trim());
    let setAnimais = new Set(nomesAnimais);
    if (setAnimais.size !== nomesAnimais.length) return { erro: "Animal inválido" };
    for (let nome of nomesAnimais) {
      if (!this.animais.find(a => a.nome === nome)) return { erro: "Animal inválido" };
    }

    for (let pessoa of pessoas) {
      let setBrinquedos = new Set(pessoa);
      if (setBrinquedos.size !== pessoa.length) return { erro: "Brinquedo inválido" };
      for (let b of pessoa) {
        if (!this.brinquedosValidos.includes(b)) return { erro: "Brinquedo inválido" };
      }
    }

    let limitePorPessoa = { 0: 0, 1: 0 };
    let resultado = [];
    
    const temMultiplosAnimais = nomesAnimais.length > 1;

    for (let nome of nomesAnimais) {
      let animal = this.animais.find(a => a.nome === nome);
      let candidatos = [];

      pessoas.forEach((brinquedosPessoa, idx) => {
        if (animal.nome.toLowerCase() === "loco") {

          if (temMultiplosAnimais && limitePorPessoa[idx] < 3) {
            candidatos.push(idx);
          }
        } else if (animal.especie.toLowerCase() === "gato") {
          if (this.respeitaOrdem(brinquedosPessoa, animal.brinquedos)) candidatos.push(idx);
        } else {
          if (this.respeitaOrdem(brinquedosPessoa, animal.brinquedos)) candidatos.push(idx);
        }
      });

      if (candidatos.length === 1 && limitePorPessoa[candidatos[0]] < 3) {
        let adotante = candidatos[0];
        limitePorPessoa[adotante]++;
        resultado.push(`${animal.nome} - pessoa ${adotante + 1}`);
      } else if (animal.nome.toLowerCase() === "loco" && temMultiplosAnimais) {

        let adotante = 0; 
        if (limitePorPessoa[adotante] < 3) {
          limitePorPessoa[adotante]++;
          resultado.push(`${animal.nome} - pessoa ${adotante + 1}`);
        } else {
          resultado.push(`${animal.nome} - abrigo`);
        }
      } else {
        resultado.push(`${animal.nome} - abrigo`);
      }
    }

    resultado.sort();
    return { lista: resultado };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
