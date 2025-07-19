// Dados de usuários válidos (agora com nome de exibição)
const validUsers = {
    "admin": {
        password: "proaqua123",
        displayName: "Administrador - Proaqua"
    },
    "usuario": {
        password: "acesso2023",
        displayName: "Usuário Padrão"
    },
    "cliente": {
        password: "ebook2023",
        displayName: "Cliente Premium"
    },
    "visitante": {
        password: "biblioteca",
        displayName: "Visitante"
    }
};

// Referências DOM
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const loginPage = document.getElementById('loginPage');
const ebookPage = document.getElementById('ebookPage');
const logoutBtn = document.getElementById('logoutBtn');
const downloadBtn = document.getElementById('downloadBtn');
const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');
const pages = document.querySelectorAll('.page');
// Adicione esta referência para o elemento que exibirá a saudação
const greetingElement = document.createElement('div');
greetingElement.className = 'user-greeting';

// Insira o elemento de saudação no header do ebookPage
const header = document.querySelector('.header');
header.insertBefore(greetingElement, logoutBtn);

let currentPage = 0;

// Evento de login
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (validUsers[username] && validUsers[username].password === password) {
        // Login bem-sucedido
        errorMessage.textContent = '';
        loginPage.style.display = 'none';
        ebookPage.style.display = 'block';

        // Exibe a mensagem de boas-vindas personalizada
        greetingElement.innerHTML = `<i class="fas fa-user"></i> Olá, ${validUsers[username].displayName}`;
        
        // Anima a entrada da página do ebook
        ebookPage.style.animation = 'fadeInUp 0.8s ease';
    } else {
        // Login falhou
        errorMessage.textContent = 'Usuário ou senha incorretos!';
        // Efeito de tremor no formulário
        loginForm.style.animation = 'shake 0.5s';
        setTimeout(() => {
            loginForm.style.animation = '';
        }, 500);
    }
});

// Evento de logout
logoutBtn.addEventListener('click', function () {
    ebookPage.style.display = 'none';
    loginPage.style.display = 'flex';

    // Limpa os campos de login
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';

    // Anima a entrada da página de login
    loginPage.style.animation = 'fadeInDown 0.8s ease';
});

// Evento de download - Solução para o problema do PDF
downloadBtn.addEventListener('click', function () {
    // Criar um link temporário para forçar o download
    const link = document.createElement('a');
    link.href = './ebook/MANUAL DO ALUNO.pdf';
    link.download = 'MANUAL_DO_ALUNO.pdf'; // Nome do arquivo para salvar
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Feedback visual para o usuário
    downloadBtn.innerHTML = '<i class="fas fa-check"></i> Download Iniciado!';
    downloadBtn.style.background = 'linear-gradient(135deg, #28a745, #218838)';

    setTimeout(() => {
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Baixar Ebook';
        downloadBtn.style.background = 'var(--gradient)';
    }, 3000);
});

// Navegação entre páginas do ebook
function showPage(index) {
    pages.forEach((page, i) => {
        page.style.display = i === index ? 'flex' : 'none';
    });
}

prevPage.addEventListener('click', function () {
    if (currentPage > 0) {
        currentPage--;
        showPage(currentPage);
    }
});

nextPage.addEventListener('click', function () {
    if (currentPage < pages.length - 1) {
        currentPage++;
        showPage(currentPage);
    }
});

// Inicializa mostrando a primeira página
showPage(0);

// Adiciona animação de shake para erros de login
const style = document.createElement('style');
style.innerHTML = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
                20%, 40%, 60%, 80% { transform: translateX(10px); }
            }
        `;
document.head.appendChild(style);