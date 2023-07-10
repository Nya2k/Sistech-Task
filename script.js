const postList = document.querySelector('.blog-container');
const addPost = document.querySelector('.write-container');
const title = document.getElementById('title-value');
const content = document.getElementById('content-value');
const postButton = document.querySelector('.post-button');
let output = '';

// POST BLOG LIST
const renderPosts = (posts) => {
  posts.forEach(post => {
    output += `
      <div class="post-container" data-id=${post.id}>
          <div class="title-post-container">
            <label class="title-content">${post.title}</label>
          </div>
          <div class="container-line"><hr color="white"></div>
          <div class="content-post-container">
            <label class="post-content">${post.content}</label>
          </div>
          <input type="image" class="edit-icon" id="edit-id" src="assets/edit-icon.png" alt="edit icon"/> 
      </div>
    `;
  });
  postList.innerHTML = output;
}

fetch('https://sistech-api.vercel.app/blog/',{
  headers : { 
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'authorization': 'bearer 7c92efff-1057-485e-8bc0-875edefa565c'
  }
})
.then(res => res.json())
.then(data => renderPosts(data))


postList.addEventListener('click', (e) =>{
  e.preventDefault();
  let editButtonPressed = e.target.id == 'edit-id';
  let userid = e.target.parentElement.dataset.id;

  if(editButtonPressed){
    const parent = e.target.parentElement;
    let titleBlog = parent.querySelector('.title-content').textContent;
    let contentBlog = parent.querySelector('.post-content').textContent;
    
    title.value = titleBlog;
    content.value = contentBlog;
  }
  // update the post
  postButton.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('https://sistech-api.vercel.app/blog/', {
      method: 'PUT',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization': 'bearer 7c92efff-1057-485e-8bc0-875edefa565c'
      },
      body: JSON.stringify({
        title: title.value,
        content: content.value,
        id : userid
      })
    })
    .then(res => res.json())
    .then(() => location.reload())
  })
});

// POST CREATED BLOG
addPost.addEventListener('submit', (e) => {
  console.log('post')
  e.preventDefault();
  fetch('https://sistech-api.vercel.app/blog/', {
    method: 'POST',
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization': 'bearer 7c92efff-1057-485e-8bc0-875edefa565c'
    },
    body: JSON.stringify({
      title: title.value,
      content: content.value
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.title == "" || data.content == "") {
      alert("post field can't be empty");
    } else {
      const dataArr = [];
      dataArr.push(data);
      renderPosts(dataArr);
      console.log("post success")
    }
  })
  title.value = '';
  content.value = '';
})