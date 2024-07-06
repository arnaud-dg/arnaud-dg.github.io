// Exemple de données de blog
const blogPosts = [
    { date: 'May 1, 2024', title: 'A Personal Take on Tech Debt', link: 'blog/article.md' },
    { date: 'Mar 17, 2024', title: 'The Rise Of Version Control Systems', link: 'blog/article.md' },
    { date: 'Mar 10, 2024', title: 'A Personal Take On Data Engineering', link: 'blog/article.md' },
    { date: 'Mar 1, 2024', title: 'There\'s Nothing Like Real Usage', link: 'blog/article.md' },
    { date: 'Feb 25, 2024', title: 'Datasets are never finished', link: 'blog/article.md' },
    { date: 'Feb 10, 2024', title: 'A Tooling Tidbit', link: 'blog/article.md' },
    { date: 'Jan 25, 2024', title: 'Another Blog Post', link: 'blog/article.md' },
    { date: 'Jan 10, 2024', title: 'Yet Another Blog Post', link: 'blog/article.md' }
];

let currentPage = 1;
const postsPerPage = 6;

function renderPosts() {
    const blogContainer = document.getElementById('blog-posts');
    blogContainer.innerHTML = '';
    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const currentPosts = blogPosts.slice(start, end);
    currentPosts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('blog-post');
        postDiv.innerHTML = `<p>${post.date}</p><a href="${post.link}">${post.title}</a>`;
        blogContainer.appendChild(postDiv);
    });
}

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderPosts();
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentPage * postsPerPage < blogPosts.length) {
        currentPage++;
        renderPosts();
    }
});

// Initial render
renderPosts();
