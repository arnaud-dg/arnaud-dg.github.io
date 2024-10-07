// Variables globales
let allPosts = [];
let currentPage = 0;
const postsPerPage = 10;

// Fonction pour charger les articles RSS
async function loadRSSFeed() {
    const response = await fetch('https://databoostindustry.substack.com/feed');
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "text/xml");
    const items = xmlDoc.getElementsByTagName("item");
    
    allPosts = Array.from(items).map(item => ({
        date: new Date(item.getElementsByTagName("pubDate")[0].textContent),
        title: item.getElementsByTagName("title")[0].textContent,
        link: item.getElementsByTagName("link")[0].textContent,
        description: item.getElementsByTagName("description")[0].textContent
    }));
    
    allPosts.sort((a, b) => b.date - a.date);
    displayPosts();
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
            <p>The Pharm'AI Company #${projectNumber}</p>
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
document.addEventListener('DOMContentLoaded', loadRSSFeed);
