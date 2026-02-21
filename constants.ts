import { Product, Review } from './types';

export const MOCK_REVIEWS: Record<string, Review[]> = {
  '207511508': [
    { id: 'r1', userName: 'Júlia Martins', rating: 5, date: 'há 2 dias', content: 'A estrutura coringa me salvou! Tirei 960 na última redação usando exatamente o modelo do material.' },
    { id: 'r2', userName: 'Lucas Pereira', rating: 5, date: 'há 1 semana', content: 'Simples e direto. Não precisa decorar mil coisas, só entender a lógica do esqueleto.' },
    { id: 'r3', userName: 'Fernanda Souza', rating: 5, date: 'há 2 semanas', content: 'Material excelente para quem tem branco na hora da prova.' },
  ],
  '207511509': [
    { id: 'r1', userName: 'Roberto Alves', rating: 5, date: 'há 3 dias', content: 'Muito bom, ajudou bastante nos estudos.' },
    { id: 'r2', userName: 'Carla Dias', rating: 5, date: 'há 5 dias', content: 'Gostei do material, bem completo.' },
    { id: 'r3', userName: 'Mariana Lima', rating: 5, date: 'há 1 semana', content: 'Chegou rápido no email, recomendo.' },
  ],
  '207511511': [
    { id: 'r1', userName: 'Pedro Henrique', rating: 5, date: 'há 1 dia', content: 'Valeu a pena, material muito bom.' },
    { id: 'r2', userName: 'Ana Clara', rating: 5, date: 'há 4 dias', content: 'Gostei dos exemplos, me ajudou a ter uma noção melhor.' },
    { id: 'r3', userName: 'João Silva', rating: 5, date: 'há 1 semana', content: 'Bom conteúdo.' },
  ],
  '207511510': [
    { id: 'r1', userName: 'Gustavo Mendes', rating: 5, date: 'há 2 dias', content: 'Argumentos fortes e bem embasados. Meu texto ficou muito mais crítico.' },
    { id: 'r2', userName: 'Beatriz Silva', rating: 5, date: 'há 1 semana', content: 'Material top. Ajuda a sair do óbvio.' },
    { id: 'r3', userName: 'Rafael Costa', rating: 5, date: 'há 2 semanas', content: 'Essencial para quem quer nota alta na competência 3.' },
  ],
  '207511512': [
    { id: 'r1', userName: 'Larissa Santos', rating: 5, date: 'há 3 dias', content: 'Minha letra era horrível, o caderno de caligrafia ajudou muito na legibilidade.' },
    { id: 'r2', userName: 'Thiago Oliveira', rating: 5, date: 'há 1 semana', content: 'Exercícios práticos e rápidos. Vale a pena.' },
  ]
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '207511508',
    title: 'Português para Concursos',
    description: `📘 O GUIA ESQUEMATIZADO DE PORTUGUÊS
👉 O material visual que transforma regras confusas em esquemas que você entende na hora.
🚀 Estude com clareza. Memorize com facilidade. Acerte mais questões.

Se você está cansado de:

❌ PDFs gigantes e cansativos
❌ explicações longas que não fixam
❌ perder tempo com conteúdo que quase não cai
❌ estudar muito… e lembrar pouco

👉 Este material foi criado exatamente para o seu perfil de concurseiro que precisa de resultado rápido.

💡 PARA QUEM ESSE GUIA É IDEAL?

✔️ Concurseiros iniciantes que se sentem perdidos no português
✔️ Quem já estuda há um tempo, mas erra por confusão de regra
✔️ Quem precisa revisar rápido antes da prova
✔️ Quem quer memorizar sem sofrer com textos longos

🔥 DESTAQUE DA OFERTA

💰 De R$ 49,00
👉 por apenas R$ 10
🎯 90% OFF

⚠️ ATENÇÃO

⚡ Acesso imediato no e-mail após a compra
🔐 Pagamento 100% seguro
🛡️ Garantia de 7 dias`,
    price: 10.00,
    rating: 4.9,
    reviews: 154,
    imageUrl: 'https://i.imgur.com/sBOOnqq.png',
    category: 'Estrutura',
  },
  {
    id: '207511509',
    title: 'Cards Ilustrados de Português',
    description: `👉 Domine Português em tempo recorde com 200+ Cards Ilustrados que literalmente desenham a gramática no seu cérebro.
🧠 Pare de sofrer com apostilas.

Comece a visualizar o português.

Você não precisa de mais um PDF gigante.
Você precisa de um material que:

✅ seja rápido
✅ seja visual
✅ seja direto ao ponto
✅ funcione na sua rotina real de estudos

📚 CARDS DE PORTUGUÊS ILUSTRADOS

⭐ Avaliação média: 4,9 / 5
👥 Mais de 12.000 alunos 🔥 DESTAQUE DA OFERTA

💰 De R$ 49,00
👉 Por apenas R$ 10,70

🟢 Acesso imediato
🟢 Garantia total de satisfação ou reembolso ⚡ ACESSO INSTANTÂNEO

📲 Conteúdo 100% digital
📥 liberado para baixar
💻 leve e otimizado para qualquer dispositivo

Você recebe o acesso imediatamente após a compra e já pode começar a estudar.

🔐 VANTAGENS EXTRAS

🕐 disponível 24 horas por dia
🔄 acesso a todas as atualizações
♾️ acesso vitalício liberado
📚 material seu para sempre`,
    price: 10.70,
    rating: 4.9,
    reviews: 91,
    imageUrl: 'https://i.imgur.com/7cXrUld.png',
    category: 'Repertório',
  },
  {
    id: '207511511',
    title: '100 Dicas Rápidas de Gramática',
    description: `⚡ 100 Dicas Rápidas de Gramática

Aprenda Português de forma direta, prática e sem enrolação com um material criado para quem precisa ganhar pontos na prova, mesmo com pouco tempo para estudar.

📌 São 100 dicas objetivas com as regras que mais aparecem em concursos, explicadas de forma simples e fácil de memorizar.

✅ Ideal para você que:

🚀 quer revisar rápido antes da prova
🧠 vive errando por detalhe de regra
⏱️ tem rotina corrida
📚 precisa de reforço em gramática sem ler PDFs enormes

🎯 O que você recebe:

✔️ 100 dicas práticas de gramática
✔️ foco total no que realmente cai
✔️ material perfeito para revisão rápida
✔️ aprendizado direto ao ponto

👉 Abra, leia e já aplique na próxima questão.`,
    price: 49.00,
    rating: 4.9,
    reviews: 73,
    imageUrl: 'https://i.imgur.com/8NJjBC8.png',
    category: 'Exemplos',
  },
  {
    id: '207511510',
    title: '1000 Questões de Português',
    description: `📝 1000 Questões de Português

Treine exatamente como cai na prova e transforme estudo em acerto real.

Um material feito para quem precisa praticar muito, identificar erros rapidamente e evoluir de forma objetiva em Português.

📌 São 1000 questões selecionadas para você dominar os principais tópicos cobrados em concursos.

✅ Ideal para você que:

🎯 quer ganhar segurança na resolução de provas
🧠 aprende melhor resolvendo questões
⏱️ tem pouco tempo e precisa de treino eficiente
📚 quer parar de errar sempre os mesmos conteúdos

🚀 O que você recebe:

✔️ 1000 questões de Português organizadas
✔️ treino focado no que mais cai
✔️ material perfeito para fixação e revisão
✔️ prática constante para aumentar seu índice de acertos

👉 Quanto mais você treina, mais perto da aprovação você fica.`,
    price: 49.00,
    rating: 4.9,
    reviews: 48,
    imageUrl: 'https://i.imgur.com/2X3R75m.png',
    category: 'Argumentação'
  },
  {
    id: '207511512',
    title: 'COMBO COMPLETO DE PORTUGUÊS',
    description: `🎯 COMBO COMPLETO DE PORTUGUÊS – 4 em 1
Tudo o que você precisa para aprender, revisar e treinar até a prova.

Um combo pensado para quem quer acelerar a aprovação sem perder tempo com materiais longos e confusos.

📦 Você recebe no combo:

✅ Cards de Português Ilustrados
→ Aprenda visualmente com esquemas que facilitam a memorização.

✅ Guia Esquematizado de Português
→ Regras organizadas em mapas e quadros-resumo para entender rápido.

✅ 100 Dicas Rápidas de Gramática
→ Revisões diretas para corrigir erros clássicos de prova.

✅ 1000 Questões de Português
→ Treino prático para transformar estudo em acerto.

🚀 Ideal para você que:

🎯 quer dominar português mesmo com pouco tempo
🧠 precisa revisar rápido e com clareza
📚 quer estudar + memorizar + praticar no mesmo pacote

💥 Valor promocional do combo

👉 De todos separados por muito mais…
🔥 Leve o combo completo por apenas R$ 27,00

📥 Acesso imediato
♾️ Conteúdos digitais para estudar quando e onde quiser

👉 Um único combo para aprender, revisar e treinar até a aprovação.`,
    price: 40.00,
    rating: 4.9,
    reviews: 57,
    imageUrl: 'https://i.imgur.com/8y3P1b5.png',
    category: 'Estética',
  }
];