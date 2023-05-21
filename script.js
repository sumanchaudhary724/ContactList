// work flow

//1. fetch user from api
//2. store those user in global array
//3. disply user in the UI

let userList = [];

const apiEp = "https://randomuser.me/api?";
const countElm = document.getElementById("count");

const displayElm = document.getElementById("list");
const fetchUsers = async (path = "results=20") => {
  // Promise
  //   fetch(apiEp)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       userList = data.results;
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  // async/await
  try {
    const response = await fetch(apiEp + path);
    const data = await response.json();

    userList = data.results;
    console.log(data.results);
    displyUser(userList);
  } catch (error) {
    console.log(error);
  }
};

fetchUsers();

const displyUser = (displArg) => {
  let str = "";
  displArg.forEach((usr) => {
    str += `
    <div class="card" style="width: 18rem;">
  <img src="${usr?.picture?.large}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${usr?.name?.title} ${usr?.name?.first} ${usr?.name?.last}</h5>
    <div class="card-text">
    
    <div>
    <i class="fa-solid fa-envelope"></i>
    ${usr?.email}
    </div>
    <div>
    <i class="fa-solid fa-map"></i>
    ${usr?.location?.street?.number}  ${usr?.location?.street?.name} ${usr?.location?.city} ${usr?.location?.country}
    </div>
    </div>
    <a href="tel:${usr?.phone}"> 
    <div class="d-grid">    
    <button class="btn btn-primary">
    <i class="fa-solid fa-phone"></i>
    ${usr?.phone} </button>
  
    </div>
    </a>
  </div>
</div>`;
  });

  displayElm.innerHTML = str;
  countElm.innerText = displArg.length;
};

document.getElementById("select").addEventListener("change", (e) => {
  const { value } = e.target;
  const path = `results=20&gender=` + value;
  fetchUsers(path);
});

document.getElementById("search-input").addEventListener("keyup", (e) => {
  const { value } = e.target;
  //run filter method

  const filteredUser = userList.filter((item) => {
    console.log(item);
    const fullName = (item.name.first + " " + item.name.last).toLowerCase();

    return fullName.includes(value.toLowerCase());
  });

  displyUser(filteredUser);
  //dispy function
});
