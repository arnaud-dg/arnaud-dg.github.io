const githubUsername = 'arnaud-dg';
const repoName = 'arnaud-dg.github.io';

console.log("blog.js chargé");

let currentPage = 1;
const postsPerPage = 6; // Nombre d'articles par page

// Fonction pour récupérer les articles de blog depuis l'API GitHub
async function fetchBlogPosts() {
    try {
        console.log("Fetching blog posts...");
        const apiUrl = 'https://api.github.com/repos/arnaud-dg/arnaud-dg.github.io/contents/blog';
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Erreur de réseau : ${response.statusText}`);
        }
        const files = await response.json();
        console.log("Fichiers récupérés :", files);

        const blogPosts = files
            .filter(file => file.name.endsWith('.md'))
            .map(file => {
                const [datePart, ...titleParts] = file.name.replace('.md', '').split(' - ');
                const [day, month, year] = datePart.split('_');
                const date = `${day}/${month}/${year}`;
                const title = titleParts.join(' - ');
                return { date, title, link: `blog/${file.name}` };
            });

        console.log("Articles de blog :", blogPosts);
        return blogPosts;
    } catch (error) {
        console.error("Erreur lors de la récupération des articles :", error);
        return [];
    }
}

// Fonction pour afficher les articles de blog
function renderPosts(blogPosts) {
    console.log("Rendering posts...");
    const blogContainer = document.getElementById('blog-posts'); // Sélection de l'élément HTML où les articles seront insérés
    if (!blogContainer) {
        console.error("Element #blog-posts not found!");
        return;
    }
    blogContainer.innerHTML = ''; // Réinitialiser le contenu de l'élément
    const start = (currentPage - 1) * postsPerPage; // Calcul du premier article à afficher pour la page actuelle
    const end = start + postsPerPage; // Calcul du dernier article à afficher pour la page actuelle
    const currentPosts = blogPosts.slice(start, end); // Sélection des articles à afficher pour la page actuelle
    currentPosts.forEach(post => { // Pour chaque article sélectionné...
        const postDiv = document.createElement('div'); // Création d'un nouvel élément div pour l'article
        postDiv.classList.add('blog-post'); // Ajout de la classe CSS 'blog-post'
        postDiv.innerHTML = `<p>${post.date}</p><a href="${post.link}">${post.title}</a>`; // Ajout du contenu HTML pour l'article
        blogContainer.appendChild(postDiv); // Insertion de l'élément div dans le conteneur blogContainer
    });
}

document.getElementById('prevBtn').addEventListener('click', () => {
    console.log("Previous button clicked");
    if (currentPage > 1) {
        currentPage--;
        fetchBlogPosts().then(renderPosts);
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    console.log("Next button clicked");
    fetchBlogPosts().then(blogPosts => {
        if (currentPage * postsPerPage < blogPosts.length) {
            currentPage++;
            renderPosts(blogPosts); // Récupérer les articles de blog et les afficher
        }
    });
});

// Rendu initial des articles de blog
fetchBlogPosts().then(blogPosts => {
    console.log("Initial render");
    renderPosts(blogPosts); // Récupérer les articles de blog et les afficher
});
