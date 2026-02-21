import { CartItem } from "../types";

/**
 * Gera a URL de checkout dinâmica para o Cartpanda.
 * Padrão solicitado: https://ism-digital.mycartpanda.com/checkout/ID:1&ID:1&hide-selector=ID,ID?utm_source=...
 * O hide-selector faz parte da string de produtos (separado por &) e as UTMs entram como query params (iniciando com ?).
 */
export const gerarCheckoutURL = (carrinho: CartItem[]): string | null => {
  if (carrinho.length === 0) {
    return null;
  }

  const baseURL = "https://ism-digital.mycartpanda.com/checkout/";

  // Mapeamento de IDs internos para IDs de checkout solicitados
  const ID_MAPPING: Record<string, string> = {
    '207511508': '207842761', // Português para Concursos
    '207511509': '207843398', // Cards Ilustrados de Português
    '207511511': '207843506', // 100 Dicas Rápidas de Gramática
    '207511510': '207843647', // 1000 Questões de Português
    '207511512': '207511512', // Combo (mantém o original se não especificado)
  };

  // 1. Formatar IDs do carrinho (Padrão: ID:1&ID:1) usando o mapeamento
  const produtosPath = carrinho.map(item => {
    const checkoutId = ID_MAPPING[item.id] || item.id;
    return `${checkoutId}:1`;
  }).join('&');

  // 2. Criar parâmetro hide-selector usando os IDs mapeados
  const idsList = carrinho.map(item => ID_MAPPING[item.id] || item.id).join(',');
  const hideSelectorPart = `&hide-selector=${idsList}`;

  // 3. Montar a URL Base (Produtos + Hide Selector)
  let finalURL = `${baseURL}${produtosPath}${hideSelectorPart}`;

  // 4. Capturar UTMs e outros parâmetros da URL atual
  // window.location.search já retorna a string começando com '?' se houver parâmetros (ex: ?utm_source=fb)
  const currentParams = window.location.search;

  // 5. Adicionar UTMs se existirem
  if (currentParams) {
    finalURL += currentParams;
  }

  return finalURL;
};