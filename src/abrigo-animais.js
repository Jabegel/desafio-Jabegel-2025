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

    this.brinquedosValidos = ["RATO", "BOLA", "LASER", "CAIXA", "NOVELO", "SKATE"];
  }

  respeitaOrdem(brinquedosPessoa, brinquedosAnimal, isGato = false) {
    if (isGato) {
      for (let i = 0; i <= brinquedosPessoa.length - brinquedosAnimal.length; i++) {
        let match = true;
        for (let j = 0; j < brinquedosAnimal.length; j++) {
          if (brinquedosPessoa[i + j] !== brinquedosAnimal[j]) {
            match = false;
            break;
          }
        }
        if (match) return true;
      }
      return false;
    } else {
      let i = 0;
      for (let b of brinquedosPessoa) {
        if (b === brinquedosAnimal[i]) i++;
        if (i === brinquedosAnimal.length) return true;
      }
      return i === brinquedosAnimal.length;
    }
  }

  encontraPessoas(brinquedos1, brinquedos2, listaAnimais) {
    try {
      let pessoas = [
        brinquedos1.split(",").map(b => b.trim().toUpperCase()),
        brinquedos2.split(",").map(b => b.trim().toUpperCase())
      ];

      let nomesAnimais = listaAnimais.split(",").map(a => a.trim());
      
      if (nomesAnimais.length === 1 && nomesAnimais[0] === '') {
        return { lista: [] };
      }
      
      const setAnimais = new Set(nomesAnimais);
      if (setAnimais.size !== nomesAnimais.length) {
        return { erro: "Animal inválido" };
      }
      
      for (let nome of nomesAnimais) {
        if (!this.animais.find(a => a.nome === nome)) {
          return { erro: "Animal inválido" };
        }
      }

      for (let i = 0; i < pessoas.length; i++) {
        const pessoa = pessoas[i];
        const setBrinquedos = new Set(pessoa);
        if (setBrinquedos.size !== pessoa.length) {
          return { erro: "Brinquedo inválido" };
        }
        for (let b of pessoa) {
          if (!this.brinquedosValidos.includes(b)) {
            return { erro: "Brinquedo inválido" };
          }
        }
      }

      let animaisAdotados = { 0: [], 1: [] };
      let resultado = [];
      
      const temMultiplosAnimais = nomesAnimais.length > 1;

      for (let nome of nomesAnimais) {
        let animal = this.animais.find(a => a.nome === nome);
        let candidatos = [];

        for (let idx = 0; idx < pessoas.length; idx++) {
          const brinquedosPessoa = pessoas[idx];
          
          if (animaisAdotados[idx].length >= 3) {
            continue; 
          }

          if (animal.nome === "Loco") {
            const totalAnimaisAdotados = animaisAdotados[0].length + animaisAdotados[1].length;
            if (temMultiplosAnimais && totalAnimaisAdotados > 0) {
              candidatos.push(idx);
            }
          } else if (animal.especie === "gato") {
            if (this.respeitaOrdem(brinquedosPessoa, animal.brinquedos, true)) {
              candidatos.push(idx);
            }
          } else {
            if (this.respeitaOrdem(brinquedosPessoa, animal.brinquedos, false)) {
              candidatos.push(idx);
            }
          }
        }

        if (candidatos.length === 1) {
          const adotante = candidatos[0];
          animaisAdotados[adotante].push(animal.nome);
          resultado.push(`${animal.nome} - pessoa ${adotante + 1}`);
        } else if (candidatos.length > 1) {
          resultado.push(`${animal.nome} - abrigo`);
        } else {
          resultado.push(`${animal.nome} - abrigo`);
        }
      }

      resultado.sort();
      return { lista: resultado };
    } catch (error) {
      return { erro: "Erro inesperado" };
    }
  }
}

export { AbrigoAnimais as AbrigoAnimais };