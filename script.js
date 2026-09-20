'use strict';

// --- Step 2: the data --------------------------------------------------
// The array is the truth. The page is a picture of it.
// Real content from Mary Joy's own course projects.
const myProjects = [
  {
    title: 'First website',
    description: 'My first website project, where I learned the basics of HTML in the first week of class.',
    tags: ['HTML/CSS'],
    url: '#'
  },
  {
    title: 'Making a restaurant website',
    description: 'A simple restaurant website built for Thai Curbside, focused on layout and basic design.',
    tags: ['HTML/CSS', 'Design'],
    url: '#'
  },
  {
    title: 'Portfolio Website',
    description: 'A responsive portfolio website that showcases my skills and projects.',
    tags: ['HTML/CSS', 'Design'],
    url: '#'
  },
  {
    title: 'Interactive Project Browser',
    description: 'This very search-and-filter feature, built with JavaScript to turn a static list into a live, data-driven section.',
    tags: ['JavaScript'],
    url: '#project-browser'
  }
];

// --- Step 3: the function that works something out ---------------------
// Takes the list and the user's input, RETURNS a new list.
// Never touches the page.
function findMatchingProjects(projects, searchTerm, tag) {
  const cleanSearch = searchTerm.trim().toLowerCase();
  const cleanTag = tag.trim().toLowerCase();

  return projects.filter(function (project) {
    const matchesTag =
      cleanTag === 'all' ||
      project.tags.some(function (t) {
        return t.toLowerCase() === cleanTag;
      });

    if (!matchesTag) {
      return false;
    }

    // Guard clause: empty search matches everything (that passed the tag filter).
    if (cleanSearch === '') {
      return true;
    }

    return (
      project.title.toLowerCase().includes(cleanSearch) ||
      project.description.toLowerCase().includes(cleanSearch)
    );
  });
}

// --- Step 4: the function that draws ------------------------------------
// The only place in this file that writes to the page.
function renderProjects(list) {
  const listEl = document.querySelector('#project-list');
  const countEl = document.querySelector('#project-count');

  if (!listEl || !countEl) {
    return;
  }

  // Guard: no matches -> a sentence, never a silent blank box.
  if (list.length === 0) {
    listEl.innerHTML = '';
    countEl.textContent = 'No projects match your search. Try a different word or filter.';
    return;
  }

  let html = '';
  for (const project of list) {
    html += `
      <li class="project-card">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <p class="project-tags">${project.tags.join(', ')}</p>
        <a class="btn" href="${project.url}">View</a>
      </li>
    `;
  }

  listEl.innerHTML = html;
  countEl.textContent = `Showing ${list.length} of ${myProjects.length} projects.`;
}

// --- Step 5: wire it up --------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.querySelector('#project-search');
  const filterSelect = document.querySelector('#project-filter');

  // Draw the full list once, before the user touches anything.
  renderProjects(myProjects);

  function updateView() {
    const term = searchInput ? searchInput.value : '';
    const tag = filterSelect ? filterSelect.value : 'all';
    const filtered = findMatchingProjects(myProjects, term, tag);
    renderProjects(filtered);
  }

  if (searchInput) {
    searchInput.addEventListener('input', updateView);
  }
  if (filterSelect) {
    filterSelect.addEventListener('change', updateView);
  }
});
