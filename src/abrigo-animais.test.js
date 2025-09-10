import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {
  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
    expect(resultado.lista).toContain('Fofo - abrigo');
    expect(resultado.lista).toContain('Rex - pessoa 1');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER', 'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');
    expect(resultado.lista).toContain('Bola - abrigo');
    expect(resultado.lista).toContain('Fofo - abrigo');
    expect(resultado.lista).toContain('Mimi - pessoa 1');
    expect(resultado.lista).toContain('Rex - abrigo');
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve rejeitar brinquedo inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,ABACAXI', 'BOLA', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar brinquedo duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,RATO,BOLA', 'BOLA', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Gato não divide brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER', 'BOLA,LASER', 'Mimi');
    expect(resultado.lista[0]).toBe('Mimi - abrigo');
  });

  test('Ambas pessoas aptas => animal fica no abrigo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'RATO,BOLA', 'Rex');
    expect(resultado.lista[0]).toBe('Rex - abrigo');
  });

  test('Pessoa não pode adotar mais de 3 animais', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA,LASER,CAIXA,NOVELO,SKATE', 'RATO,BOLA', 'Rex,Mimi,Fofo,Zero,Bola,Bebe');
    const adotadosP1 = resultado.lista.filter(item => item.includes('pessoa 1'));
    expect(adotadosP1.length).toBeLessThanOrEqual(3);
  });

  test('Loco sozinho vai para o abrigo', () => {
    const sozinho = new AbrigoAnimais().encontraPessoas('SKATE,RATO', 'SKATE', 'Loco');
    expect(sozinho.lista[0]).toBe('Loco - abrigo');
  });

  test('Loco só adota se tiver companhia', () => {
    const acompanhado = new AbrigoAnimais().encontraPessoas('RATO,BOLA,SKATE', 'BOLA', 'Rex,Loco');
    expect(acompanhado.lista).toContain('Rex - pessoa 1');
    expect(acompanhado.lista).toContain('Loco - pessoa 1');
  });

  test('Deve validar animais duplicados na lista', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'RATO,BOLA', 'Rex,Rex');
    expect(resultado.erro).toBe('Animal inválido');
  });

  test('Deve lidar com lista vazia de animais', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'RATO,BOLA', '');
    expect(resultado.lista).toEqual([]);
  });

  test('Cão com brinquedos na ordem correta', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'BOLA', 'Rex');
    expect(resultado.lista[0]).toBe('Rex - pessoa 1');
  });

  test('Cão com brinquedos na ordem incorreta', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,RATO', 'BOLA', 'Rex');
    expect(resultado.lista[0]).toBe('Rex - abrigo');
  });

  test('Gato exige ordem exata e consecutiva', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER', 'LASER,BOLA', 'Mimi');
    expect(resultado.lista[0]).toBe('Mimi - pessoa 1');
  });

  test('Gato não aceita ordem intercalada', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,RATO,LASER', 'BOLA,LASER', 'Mimi');
    expect(resultado.lista[0]).toBe('Mimi - pessoa 2');
  });

  test('Loco com companhia de outro animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('SKATE,RATO', 'BOLA', 'Rex,Loco');
    expect(resultado.lista).toContain('Loco - abrigo');
    expect(resultado.lista).toContain('Rex - abrigo');
  });

  test('Limite máximo de 3 animais por pessoa', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,LASER,CAIXA,NOVELO,SKATE', 
      'BOLA', 
      'Rex,Mimi,Fofo,Zero,Bola'
    );
    
    const adotadosP1 = resultado.lista.filter(item => item.includes('pessoa 1'));
    expect(adotadosP1.length).toBeLessThanOrEqual(3);
  });
});