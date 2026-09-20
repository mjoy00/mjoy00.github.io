'use strict';

const projects = [
  {
    title: 'First website',
    category: 'Basic Web Development',
    description: 'This is my first website project where I first learned the basics of HTML in the first week of the class.',
    tags: ['HTML/CSS']
  },
  {
    title: 'Making a restaurant website',
    category: 'Basic Design',
    description: 'My second project in web development was to make a simple restaurant website for Thai Curbside.',
    tags: ['HTML/CSS', 'Design']
  },
  {
    title: 'Portfolio Website',
    category: 'Interactive Design',
    description: 'The third project in web development was to create a responsive portfolio website that showcases my skills and projects.',
    tags: ['JavaScript', 'Design']
  },
  {
    title: 'Interactive Project Gallery',
    category: 'Data-Driven JavaScript',
    description: 'This badge project turned my static project list into a searchable, filterable, sortable gallery built from an array of objects.',
    tags: ['JavaScript']
  }
];

const searchInput = document.querySelector('#project-search');
const sortSelect = document.querySelector('#project-sort');
const tagFilterBox = document.querySelector('#tag-filters');
const listEl = document.querySelector('#project-list');
const countEl = document.querySelector('#project-count');
const warningEl = document.querySelector('#gallery-warning');

let currentTag = 'All';
function getUniqueTags(list) {
  const tags = list.reduce(function (found, project) {
    for (const tag of project.tags) {
      if (!found.includes(tag)) found.push(tag);
    }
    return found;
  }, []);
  return ['All', ...tags];
}

function renderTagButtons(list) {
  const tags = getUniqueTags(list);
  let html = '';
  for (const tag of tags) {
    const active = tag === currentTag ? ' class="tag-btn active"' : ' class="tag-btn"';
    html += '<button type="button"' + active + ' data-tag="' + tag + '">' + tag + '</button>';
  }
  tagFilterBox.innerHTML = html;

  tagFilterBox.querySelectorAll('.tag-btn').forEach(function (button) {
    button.addEventListener('click', function () {
      currentTag = button.dataset.tag;
      updateGallery();
    });
  });
}

function filterProjects(list, searchTerm, tag) {
  if (!Array.isArray(list) || list.length === 0) return [];

  const term = searchTerm.trim().toLowerCase();

  return list.filter(function (project) {
    if (tag !== 'All' && !project.tags.includes(tag)) return false;
    if (term === '') return true;
    return project.title.toLowerCase().includes(term);
  });
}

function sortProjects(list, sortBy) {
  const copy = [...list];
  if (sortBy === 'title') {
    copy.sort(function (a, b) { return a.title.localeCompare(b.title); });
  } else if (sortBy === 'category') {
    copy.sort(function (a, b) { return a.category.localeCompare(b.category); });
  }
  return copy;
}

function renderProjects(list) {
  if (list.length === 0) {
    listEl.innerHTML = '<li>No projects match that search. Try a different word or filter.</li>';
    countEl.textContent = 'Showing 0 of ' + projects.length + ' projects.';
    return;
  }

  let html = '';
  for (const project of list) {
    html += '<li class="project-card">' +
      '<h3>' + project.title + '</h3>' +
      '<p class="project-category">' + project.category + '</p>' +
      '<p>' + project.description + '</p>' +
      '</li>';
  }

  listEl.innerHTML = html;
  countEl.textContent = 'Showing ' + list.length + ' of ' + projects.length + ' projects.';
}

function updateGallery() {
  try {
    warningEl.textContent = '';
    const filtered = filterProjects(projects, searchInput.value, currentTag);
    const sorted = sortProjects(filtered, sortSelect.value);
    renderProjects(sorted);
  } catch (error) {
    warningEl.textContent = 'Something went wrong updating the gallery. Try refreshing the page.';
    console.error(error);
  }
}

renderTagButtons(projects);
updateGallery();

searchInput.addEventListener('input', updateGallery);
sortSelect.addEventListener('change', updateGallery);
window.addEventListener('error', function (event) {
  console.error('Uncaught:', event.message);
  warningEl.textContent = 'Something went wrong on this page. Try reloading it.';
});
