const githubUsername = 'arnaud-dg';
const repoName = 'arnaud-dg.github.io';

async function fetchBlogPosts() {
    const response = await fetch(`https://api.github.com/repos/${githubUsername}/${repoName}/blog`);
    const files = await response.json();
    const blogPosts = files.map(file => {
        const [date, title] = file.name.replace('.md', '').split(' - ');
        return { date, title, link: `blog/${file.name}` };
    });

    return blogPosts;
}

function renderPosts(blogPosts) {
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
        fetchBlogPosts().then(renderPosts);
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentPage * postsPerPage < blogPosts.length) {
        currentPage++;
        fetchBlogPosts().then(renderPosts);
    }
});

// Initial render
fetchBlogPosts().then(renderPosts);
