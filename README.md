# Sistema de Orçamento - Calha, Gesso e Drywall

Sistema completo de orçamento e medição de materiais para serviços de calha, gesso liso, gesso de teto e placas de drywall.

## 🚀 Funcionalidades

### ✨ Principais Recursos

- **Cadastro de Clientes**: Formulário completo com nome, telefone, endereço e observações
- **Cálculo de Metragens**: Calculadora de área para espaços (largura x comprimento x altura)
- **Orçamento Detalhado**: Sistema completo para:
  - Calha (metragem linear)
  - Gesso Liso (área em m²)
  - Gesso de Teto (área em m²)
  - Placas de Drywall (área em m²)
  - Materiais Adicionais (quantidade e valor unitário)
  - Mão de Obra
- **Cálculo Automático**: Total calculado automaticamente conforme os valores são inseridos
- **Geração de PDF**: Orçamento profissional em PDF
- **Envio para WhatsApp**: Integração direta com WhatsApp para envio do orçamento
- **Interface Moderna**: Design responsivo e intuitivo
- **PWA (Progressive Web App)**: Funciona como app nativo no celular
- **Funcionamento Offline**: Sistema funciona completamente sem internet após primeira carga
- **Backup e Restauração**: Exporte e importe seus dados em formato JSON
- **Reset do Sistema**: Opção segura para resetar todos os dados (com backup automático)
- **Armazenamento Persistente**: Dados salvos localmente, mesmo após desligar o dispositivo

## 📋 Como Usar

### 1. Cadastrar Cliente

1. Acesse "Cadastrar Cliente" no menu
2. Preencha os dados do cliente:
   - Nome completo (obrigatório)
   - Telefone/WhatsApp (obrigatório)
   - E-mail (opcional)
   - Endereço completo (obrigatório)
   - Cidade e Estado (obrigatório)
   - Observações (opcional)
3. Clique em "Salvar Cliente"

### 2. Criar Orçamento

1. Acesse "Novo Orçamento" no menu
2. Selecione o cliente
3. **Calcular Metragens** (opcional):
   - Informe largura, comprimento e altura (se necessário)
   - Clique em "Adicionar Metragem" para usar o valor calculado
4. **Preencher Serviços**:
   - Para cada serviço (Calha, Gesso Liso, Gesso de Teto, Drywall):
     - Informe a metragem (m ou m²)
     - Informe o valor por metro/m²
     - O total será calculado automaticamente
5. **Materiais Adicionais** (opcional):
   - Clique em "Adicionar Material"
   - Informe descrição, quantidade e valor unitário
6. **Mão de Obra**: Informe o valor da mão de obra
7. **Observações**: Adicione observações sobre o orçamento (opcional)
8. Visualize o resumo total no final da página
9. Clique em "Gerar PDF e Enviar"

### 3. Visualizar Clientes

- Acesse "Clientes" no menu
- Veja todos os clientes cadastrados
- Use a busca para encontrar clientes específicos
- Crie orçamento diretamente para um cliente
- Exclua clientes se necessário

## 📱 Envio para WhatsApp

Ao gerar o orçamento:

1. O PDF é gerado e salvo automaticamente
2. O WhatsApp Web é aberto com:
   - Mensagem pré-formatada com resumo do orçamento
   - Link direto para o número do cliente
3. Você pode anexar o PDF salvo na conversa do WhatsApp

## 💾 Armazenamento e Segurança

Todos os dados são salvos localmente no navegador usando **LocalStorage**:
- Clientes cadastrados
- Histórico de orçamentos
- Dados persistem mesmo após fechar o navegador ou desligar o dispositivo
- **Segurança**: Os dados ficam apenas no seu dispositivo, não são enviados para servidores externos
- **Backup**: Faça backup dos seus dados a qualquer momento na página de Configurações
- **Restauração**: Restaure um backup anterior quando necessário
- **Reset**: Opção segura para resetar o sistema (com backup automático antes de resetar)

## 🎨 Design

- Interface moderna e responsiva
- Cores profissionais e gradientes
- Ícones Font Awesome
- Fonte Poppins (Google Fonts)
- Layout adaptável para mobile e desktop

## 📦 Tecnologias Utilizadas

- **HTML5**: Estrutura
- **CSS3**: Estilização moderna com gradientes e animações
- **JavaScript (Vanilla)**: Lógica e funcionalidades
- **jsPDF**: Geração de PDFs
- **LocalStorage**: Armazenamento local persistente
- **Service Worker**: Funcionamento offline e cache
- **PWA Manifest**: Configuração de Progressive Web App
- **Font Awesome**: Ícones
- **Google Fonts**: Tipografia

## 🔧 Requisitos

- Navegador moderno (Chrome, Firefox, Edge, Safari)
- Conexão com internet apenas na primeira carga (após isso funciona offline)
- JavaScript habilitado
- Para PWA: Navegador compatível com Service Workers

## ⚙️ Configurações

Acesse a página **Configurações** para:

### Backup e Restauração
- **Fazer Backup**: Exporte todos os dados (clientes e orçamentos) para um arquivo JSON
- **Restaurar Backup**: Importe um arquivo de backup para restaurar seus dados
- **Último Backup**: Veja quando foi feito o último backup

### Estatísticas
- Visualize estatísticas do sistema:
  - Total de clientes cadastrados
  - Total de orçamentos gerados
  - Valor total dos orçamentos
  - Tamanho dos dados armazenados

### Instalar como App (PWA)
- Instruções para instalar no Android (Chrome)
- Instruções para instalar no iPhone/iPad (Safari)
- Botão de instalação automática (quando disponível)

### Reset do Sistema
- **Atenção**: Esta ação apaga TODOS os dados
- Requer confirmação tripla para segurança
- Faz backup automático antes de resetar
- Use apenas quando realmente necessário

## 📱 Instalação como App (PWA)

### Android (Chrome)
1. Abra o sistema no Chrome
2. Toque no menu (três pontos)
3. Selecione "Adicionar à tela inicial" ou "Instalar app"
4. Confirme a instalação
5. O app aparecerá na tela inicial e funcionará offline

### iPhone/iPad (Safari)
1. Abra o sistema no Safari
2. Toque no botão de compartilhar (quadrado com seta)
3. Role para baixo e selecione "Adicionar à Tela de Início"
4. Toque em "Adicionar"
5. O app aparecerá na tela inicial e funcionará offline

## 📝 Notas Importantes

- **Armazenamento Local**: Os dados são armazenados apenas no navegador/dispositivo
- **Backup Recomendado**: Faça backups regulares na página de Configurações
- **Funcionamento Offline**: Após a primeira carga, o sistema funciona completamente offline
- **Segurança**: Dados não são enviados para servidores externos
- **PDF**: O PDF é gerado e salvo automaticamente
- **WhatsApp**: Abre em nova aba para envio do orçamento
- **Ícones PWA**: Veja o arquivo `ICONES_PWA.md` para instruções sobre criar os ícones

## 🚀 Iniciar o Sistema

1. Abra o arquivo `index.html` no navegador
2. Na primeira vez, aguarde o carregamento completo (para cache offline)
3. Comece cadastrando seus clientes
4. Crie seus orçamentos
5. Gere PDFs e envie para os clientes!
6. **Opcional**: Instale como app no celular para acesso rápido

## 🔒 Segurança dos Dados

- Todos os dados são salvos **localmente** no seu dispositivo
- Nenhum dado é enviado para servidores externos
- Os dados persistem mesmo após:
  - Fechar o navegador
  - Desligar o dispositivo
  - Limpar cache do navegador (se não limpar dados do site)
- **Importante**: Se você limpar os dados do site no navegador, os dados serão perdidos
- **Recomendação**: Faça backups regulares na página de Configurações

## 📞 Suporte

Para dúvidas ou sugestões, verifique o código-fonte que está bem documentado e organizado.

---

**Desenvolvido com ❤️ para profissionais de construção civil**

