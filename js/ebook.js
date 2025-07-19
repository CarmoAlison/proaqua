// Dados de usuários válidos (com nome de exibição)
const validUsers = {
    "admin": {
        password: "senha123",
        displayName: "Administrador"
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

// Cria elemento para exibir o nome do usuário
const greetingElement = document.createElement('div');
greetingElement.className = 'user-greeting';
document.querySelector('.header').insertBefore(greetingElement, logoutBtn);

let currentPage = 0;

// Evento de login
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (validUsers[username] && validUsers[username].password === password) {
        // Login bem-sucedido
        errorMessage.textContent = '';
        loginPage.style.display = 'none';
        ebookPage.style.display = 'block';

        // Exibe mensagem personalizada
        greetingElement.innerHTML = `<i class="fas fa-user"></i> Olá, ${validUsers[username].displayName}`;
        ebookPage.style.animation = 'fadeInUp 0.8s ease';
    } else {
        // Login falhou
        errorMessage.textContent = 'Usuário ou senha incorretos!';
        loginForm.style.animation = 'shake 0.5s';
        setTimeout(() => loginForm.style.animation = '', 500);
    }
});

// Evento de logout
logoutBtn.addEventListener('click', function() {
    ebookPage.style.display = 'none';
    loginPage.style.display = 'flex';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    loginPage.style.animation = 'fadeInDown 0.8s ease';
});

// Evento de download otimizado para mobile
downloadBtn.addEventListener('click', function() {
    // Feedback visual
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparando...';
    downloadBtn.style.background = 'linear-gradient(135deg, #6c757d, #495057)';
    
    // Solução para iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        window.open('./ebook/MANUAL DO ALUNO.pdf', '_blank');
        downloadCompleteFeedback();
    } 
    // Solução para outros dispositivos
    else {
        const link = document.createElement('a');
        link.href = './ebook/MANUAL DO ALUNO.pdf';
        link.download = 'MANUAL_DO_ALUNO.pdf';
        document.body.appendChild(link);
        
        // Dispara o click de duas formas para maior compatibilidade
        link.dispatchEvent(new MouseEvent('click'));
        link.click();
        
        setTimeout(() => {
            document.body.removeChild(link);
            downloadCompleteFeedback();
        }, 100);
    }
});

// Feedback de download concluído
function downloadCompleteFeedback() {
    downloadBtn.innerHTML = '<i class="fas fa-check"></i> Download iniciado!';
    downloadBtn.style.background = 'linear-gradient(135deg, #28a745, #218838)';
    
    setTimeout(() => {
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Baixar Ebook';
        downloadBtn.style.background = 'var(--gradient)';
    }, 3000);
}

// Navegação entre páginas
function showPage(index) {
    pages.forEach((page, i) => page.style.display = i === index ? 'flex' : 'none');
}

prevPage.addEventListener('click', function() {
    if (currentPage > 0) showPage(--currentPage);
});

nextPage.addEventListener('click', function() {
    if (currentPage < pages.length - 1) showPage(++currentPage);
});

// Inicialização
showPage(0);

// Animação de shake para erros
document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
            20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
    </style>
`);