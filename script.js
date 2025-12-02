// Função para formatar moeda
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

// Função para gerar preview do orçamento
function gerarPreviewOrcamento(cliente) {
    const calha = document.getElementById('totalCalha').value || 'R$ 0,00';
    const gessoLiso = document.getElementById('totalGessoLiso').value || 'R$ 0,00';
    const gessoTeto = document.getElementById('totalGessoTeto').value || 'R$ 0,00';
    const drywall = document.getElementById('totalDrywall').value || 'R$ 0,00';
    const maoObra = formatarMoeda(parseFloat(document.getElementById('maoObra').value) || 0);
    const observacoes = document.getElementById('observacoes').value || 'Nenhuma observação.';
    const totalGeral = document.getElementById('totalGeral').textContent;
    
    // Calcular materiais adicionais
    let materiaisAdic = 0;
    let materiaisAdicList = [];
    document.querySelectorAll('.material-adicional').forEach(material => {
        const desc = material.querySelector('.material-desc').value;
        const qtd = parseFloat(material.querySelector('.material-qtd').value) || 0;
        const valor = parseFloat(material.querySelector('.material-valor-unit').value) || 0;
        const total = qtd * valor;
        if (desc && total > 0) {
            materiaisAdic += total;
            materiaisAdicList.push({
                descricao: desc,
                quantidade: qtd,
                valorUnitario: valor,
                total: total
            });
        }
    });

    const dataAtual = new Date().toLocaleDateString('pt-BR');
    const horaAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    let html = `
        <div class="preview-orcamento">
            <div class="preview-header">
                <h2>ORÇAMENTO</h2>
                <p>Data: ${dataAtual} às ${horaAtual}</p>
            </div>

            <div class="preview-section">
                <h3>Dados do Cliente</h3>
                <div class="preview-item">
                    <span><strong>Nome:</strong></span>
                    <span>${cliente.nome}</span>
                </div>
                <div class="preview-item">
                    <span><strong>Telefone:</strong></span>
                    <span>${cliente.telefone}</span>
                </div>
                <div class="preview-item">
                    <span><strong>Endereço:</strong></span>
                    <span>${cliente.endereco}</span>
                </div>
                <div class="preview-item">
                    <span><strong>Cidade/Estado:</strong></span>
                    <span>${cliente.cidade} - ${cliente.estado}</span>
                </div>
            </div>

            <div class="preview-section">
                <h3>Serviços e Materiais</h3>
                <div class="preview-item">
                    <span>Calha:</span>
                    <span>${calha}</span>
                </div>
                <div class="preview-item">
                    <span>Gesso Liso:</span>
                    <span>${gessoLiso}</span>
                </div>
                <div class="preview-item">
                    <span>Gesso de Teto:</span>
                    <span>${gessoTeto}</span>
                </div>
                <div class="preview-item">
                    <span>Placas de Drywall:</span>
                    <span>${drywall}</span>
                </div>
                ${materiaisAdicList.length > 0 ? materiaisAdicList.map(m => `
                    <div class="preview-item">
                        <span>${m.descricao} (${m.quantidade} x ${formatarMoeda(m.valorUnitario)}):</span>
                        <span>${formatarMoeda(m.total)}</span>
                    </div>
                `).join('') : ''}
                <div class="preview-item">
                    <span>Mão de Obra:</span>
                    <span>${maoObra}</span>
                </div>
            </div>

            <div class="preview-section">
                <h3>Observações</h3>
                <p>${observacoes}</p>
            </div>

            <div class="preview-total">
                <div class="preview-item">
                    <span><strong>TOTAL:</strong></span>
                    <span><strong>${totalGeral}</strong></span>
                </div>
            </div>
        </div>
    `;

    return html;
}

// Função para gerar PDF
function gerarPDF(cliente) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Cores
    const primaryColor = [37, 99, 235];
    const textColor = [30, 41, 59];
    const secondaryColor = [100, 116, 139];
    
    // Cabeçalho
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('ORÇAMENTO', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    const horaAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    doc.text(`Data: ${dataAtual} às ${horaAtual}`, 105, 30, { align: 'center' });
    
    let y = 50;
    
    // Dados do Cliente
    doc.setTextColor(...textColor);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('DADOS DO CLIENTE', 20, y);
    y += 10;
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Nome: ${cliente.nome}`, 20, y);
    y += 7;
    doc.text(`Telefone: ${cliente.telefone}`, 20, y);
    y += 7;
    doc.text(`Endereço: ${cliente.endereco}`, 20, y);
    y += 7;
    doc.text(`Cidade/Estado: ${cliente.cidade} - ${cliente.estado}`, 20, y);
    y += 15;
    
    // Serviços e Materiais
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('SERVIÇOS E MATERIAIS', 20, y);
    y += 10;
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    const calha = document.getElementById('totalCalha').value || 'R$ 0,00';
    const gessoLiso = document.getElementById('totalGessoLiso').value || 'R$ 0,00';
    const gessoTeto = document.getElementById('totalGessoTeto').value || 'R$ 0,00';
    const drywall = document.getElementById('totalDrywall').value || 'R$ 0,00';
    const maoObra = formatarMoeda(parseFloat(document.getElementById('maoObra').value) || 0);
    
    doc.text(`Calha: ${calha}`, 20, y);
    y += 7;
    doc.text(`Gesso Liso: ${gessoLiso}`, 20, y);
    y += 7;
    doc.text(`Gesso de Teto: ${gessoTeto}`, 20, y);
    y += 7;
    doc.text(`Placas de Drywall: ${drywall}`, 20, y);
    y += 7;
    
    // Materiais Adicionais
    let materiaisAdic = 0;
    document.querySelectorAll('.material-adicional').forEach(material => {
        const desc = material.querySelector('.material-desc').value;
        const qtd = parseFloat(material.querySelector('.material-qtd').value) || 0;
        const valor = parseFloat(material.querySelector('.material-valor-unit').value) || 0;
        const total = qtd * valor;
        if (desc && total > 0) {
            materiaisAdic += total;
            const texto = `${desc} (${qtd} x ${formatarMoeda(valor)}): ${formatarMoeda(total)}`;
            if (y > 250) {
                doc.addPage();
                y = 20;
            }
            doc.text(texto, 20, y);
            y += 7;
        }
    });
    
    doc.text(`Mão de Obra: ${maoObra}`, 20, y);
    y += 15;
    
    // Observações
    const observacoes = document.getElementById('observacoes').value;
    if (observacoes) {
        if (y > 250) {
            doc.addPage();
            y = 20;
        }
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('OBSERVAÇÕES', 20, y);
        y += 10;
        
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        const lines = doc.splitTextToSize(observacoes, 170);
        doc.text(lines, 20, y);
        y += lines.length * 7 + 10;
    }
    
    // Total
    if (y > 250) {
        doc.addPage();
        y = 20;
    }
    
    doc.setFillColor(240, 240, 240);
    doc.rect(20, y, 170, 15, 'F');
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...primaryColor);
    const totalGeral = document.getElementById('totalGeral').textContent;
    doc.text('TOTAL:', 25, y + 10);
    doc.text(totalGeral, 175, y + 10, { align: 'right' });
    
    // Rodapé
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(...secondaryColor);
        doc.text(
            `Página ${i} de ${pageCount}`,
            105,
            285,
            { align: 'center' }
        );
    }
    
    return doc;
}

// Função para gerar PDF e enviar para WhatsApp
function gerarPDFEEnviar(cliente) {
    try {
        // Gerar PDF
        const doc = gerarPDF(cliente);
        
        // Salvar orçamento
        const orcamento = {
            id: Date.now(),
            clienteId: cliente.id,
            clienteNome: cliente.nome,
            clienteTelefone: cliente.telefone,
            data: new Date().toLocaleDateString('pt-BR'),
            hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            calha: document.getElementById('totalCalha').value || 'R$ 0,00',
            gessoLiso: document.getElementById('totalGessoLiso').value || 'R$ 0,00',
            gessoTeto: document.getElementById('totalGessoTeto').value || 'R$ 0,00',
            drywall: document.getElementById('totalDrywall').value || 'R$ 0,00',
            maoObra: formatarMoeda(parseFloat(document.getElementById('maoObra').value) || 0),
            total: parseFloat(document.getElementById('totalGeral').textContent.replace(/[^\d,]/g, '').replace(',', '.')) || 0,
            observacoes: document.getElementById('observacoes').value || ''
        };
        
        const orcamentos = JSON.parse(localStorage.getItem('orcamentos') || '[]');
        orcamentos.push(orcamento);
        localStorage.setItem('orcamentos', JSON.stringify(orcamentos));
        
        // Salvar PDF
        const nomeArquivo = `Orcamento_${cliente.nome.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
        doc.save(nomeArquivo);
        
        // Preparar número do WhatsApp (remover caracteres especiais)
        const telefone = cliente.telefone.replace(/\D/g, '');
        
        // Mensagem para WhatsApp
        const mensagem = encodeURIComponent(
            `Olá ${cliente.nome}!\n\n` +
            `Segue o orçamento solicitado:\n\n` +
            `*Serviços:*\n` +
            `Calha: ${orcamento.calha}\n` +
            `Gesso Liso: ${orcamento.gessoLiso}\n` +
            `Gesso de Teto: ${orcamento.gessoTeto}\n` +
            `Drywall: ${orcamento.drywall}\n` +
            `Mão de Obra: ${orcamento.maoObra}\n\n` +
            `*TOTAL: ${orcamento.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}*\n\n` +
            `O PDF completo foi gerado e está sendo enviado.`
        );
        
        // Abrir WhatsApp Web
        const urlWhatsApp = `https://wa.me/55${telefone}?text=${mensagem}`;
        
        // Abrir em nova aba
        window.open(urlWhatsApp, '_blank');
        
        // Mostrar mensagem de sucesso
        setTimeout(() => {
            alert('Orçamento gerado com sucesso!\n\nO PDF foi salvo e o WhatsApp foi aberto para envio.\n\nApós enviar a mensagem, você pode anexar o PDF que foi salvo.');
            
            // Limpar formulário
            if (confirm('Deseja limpar o formulário e criar um novo orçamento?')) {
                document.getElementById('formOrcamento').reset();
                document.getElementById('metragensAdicionadas').innerHTML = '';
                document.getElementById('materiaisAdicionais').innerHTML = '';
                metragensAdicionadas = [];
                materiaisAdicionais = [];
                materialCounter = 0;
                calcularTotalGeral();
            } else {
                window.location.href = 'index.html';
            }
        }, 500);
        
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        alert('Erro ao gerar o PDF. Verifique se todos os campos estão preenchidos corretamente.');
    }
}

// Função para calcular total geral (chamada externa)
function calcularTotalGeral() {
    const calha = parseFloat(document.getElementById('totalCalha').value.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    const gessoLiso = parseFloat(document.getElementById('totalGessoLiso').value.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    const gessoTeto = parseFloat(document.getElementById('totalGessoTeto').value.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    const drywall = parseFloat(document.getElementById('totalDrywall').value.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    const maoObra = parseFloat(document.getElementById('maoObra').value) || 0;
    
    // Calcular materiais adicionais
    let materiaisAdic = 0;
    document.querySelectorAll('.material-total').forEach(input => {
        const valor = parseFloat(input.value.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
        materiaisAdic += valor;
    });
    
    const total = calha + gessoLiso + gessoTeto + drywall + maoObra + materiaisAdic;
    
    // Atualizar resumo
    document.getElementById('resumoCalha').textContent = formatarMoeda(calha);
    document.getElementById('resumoGessoLiso').textContent = formatarMoeda(gessoLiso);
    document.getElementById('resumoGessoTeto').textContent = formatarMoeda(gessoTeto);
    document.getElementById('resumoDrywall').textContent = formatarMoeda(drywall);
    document.getElementById('resumoMateriaisAdicionais').textContent = formatarMoeda(materiaisAdic);
    document.getElementById('resumoMaoObra').textContent = formatarMoeda(maoObra);
    document.getElementById('totalGeral').textContent = formatarMoeda(total);
}

// Exportar funções globais
window.formatarMoeda = formatarMoeda;
window.gerarPreviewOrcamento = gerarPreviewOrcamento;
window.gerarPDFEEnviar = gerarPDFEEnviar;
window.calcularTotalGeral = calcularTotalGeral;

