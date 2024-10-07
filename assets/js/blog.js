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
            language: post.title.startsWith('FR') ? 'FR' : 'ENG',
            project: post.description.match(/Project #(\d+)/) ? post.description.match(/Project #(\d+)/)[1] : 'N/A'
        }));
        
        displayPosts();
    } catch (error) {
        console.error('Erreur lors du chargement des articles:', error);
        document.getElementById('blog-posts').innerHTML = '<tr><td colspan="4">Erreur lors du chargement des articles. Veuillez réessayer plus tard.</td></tr>';
    }
}

// Fonction pour afficher les articles
function displayPosts() {
    const blogPostsContainer = document.querySelector('#blog-posts tbody');
    blogPostsContainer.innerHTML = '';
    
    const startIndex = currentPage * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToDisplay = allPosts.slice(startIndex, endIndex);
    
    postsToDisplay.forEach(post => {
        const row = document.createElement('tr');
        
        const dateStr = post.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        
        row.innerHTML = `
            <td>${dateStr}</td>
            <td><a href="${post.link}" target="_blank">${post.title}</a></td>
            <td>${post.language}</td>
            <td>${post.project}</td>
        `;
        
        blogPostsContainer.appendChild(row);
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
