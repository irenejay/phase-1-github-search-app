document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('github-form');
  const userList = document.getElementById('user-list');
  const reposList = document.getElementById('repos-list');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const searchTerm = document.getElementById('search').value.trim();

    // Make a request to GitHub API for user search
    const userSearchEndpoint = `https://api.github.com/search/users?q=${searchTerm}`;
    try {
      const response = await fetch(userSearchEndpoint, {
        headers: {
          Accept: 'application/vnd.github.v3+json'
        }
      });

      const data = await response.json();
      displayUsers(data.items);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  });

  function displayUsers(users) {
    userList.innerHTML = '';
    
    users.forEach(user => {
      const li = document.createElement('li');
      li.textContent = user.login;
      li.addEventListener('click', () => {
        // Fetch repositories for the selected GitHub user
        getUserRepos(user.login);
      });
      userList.appendChild(li);
    });
  }

  async function getUserRepos(username) {
    const userReposEndpoint = `https://api.github.com/users/${username}/repos`;
    try {
      const response = await fetch(userReposEndpoint, {
        headers: {
          Accept: 'application/vnd.github.v3+json'
        }
      });
    
      const data = await response.json();
      displayRepos(data);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
  }
    
  function displayRepos(repos) {
    reposList.innerHTML = '';
    
    repos.forEach(repo => {
      const li = document.createElement('li');
      li.textContent = repo.name;
      reposList.appendChild(li);
    });
  }
});
