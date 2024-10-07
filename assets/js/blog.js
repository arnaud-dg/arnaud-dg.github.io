// Variables globales
let allPosts = [];
let currentPage = 0;
const postsPerPage = 10;

// Fonction pour charger les articles depuis le fichier JSON local
async function loadLocalPosts() {
    try {
        console.log('Tentative de chargement des articles depuis le fichier JSON local...');
        const response = await fetch('/blog-posts.json');
        const data = await response.json();
        console.log('Données reçues:', data);

        allPosts = data.map(post => ({
            date: new Date(post.date),
            title: post.title,
            link: post.link,
            description: post.description
        }));
        
        displayPosts();
    } catch (error) {
        console.error('Erreur lors du chargement des articles:', error);
        document.getElementById('blog-posts').innerHTML = '<p>Erreur lors du chargement des articles. Veuillez réessayer plus tard.</p>';
    }
}

// Fonction pour afficher les articles
function displayPosts() {
    const blogPostsContainer = document.getElementById('blog-posts');
    blogPostsContainer.innerHTML = '';
    
    const startIndex = currentPage * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToDisplay = allPosts.slice(startIndex, endIndex);
    
    postsToDisplay.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-post';
        
        const dateStr = post.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        const language = post.title.startsWith('FR') ? 'FR' : 'ENG';
        const projectNumber = post.description.match(/#(\d+)/)?.[1] || '';
        
        postElement.innerHTML = `
            <p>${dateStr}</p>
            <h3><a href="${post.link}">${post.title}</a></h3>
            <p>Language: ${language}</p>
            <p>${post.description}</p>
        `;
        
        blogPostsContainer.appendChild(postElement);
    });
    
    updatePaginationButtons();
}

// Fonction pour mettre à jour l'état des boutons de pagination
function updatePaginationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = (currentPage + 1) * postsPerPage >= allPosts.length;
}

// Gestionnaires d'événements pour les boutons de pagination
document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        displayPosts();
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if ((currentPage + 1) * postsPerPage < allPosts.length) {
        currentPage++;
        displayPosts();
    }
});

// Charger les articles au chargement de la page
document.addEventListener('DOMContentLoaded', loadLocalPosts);
