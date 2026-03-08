const signUp = document.getElementById('login-btn')
const user_id = document.getElementById('user_Id')
const user_password = document.getElementById('user_password')
const rememberMe = document.getElementById('remember-me')
const cards = document.getElementById('cards')
const issueCount = document.getElementById('issue')
const all = document.getElementById('all')
const open = document.getElementById('open')
const closed = document.getElementById('closed')
const filterContainer = document.getElementById('filter-container')
const searchBtn = document.getElementById('search-btn')
const searchInput = document.querySelector('#search-parent input')
let currentStatus = 'all'

if (signUp) {
  window.onload = () => {
    const savedId = localStorage.getItem('saveId')
    const savePassword = localStorage.getItem('savePassword')
    if (savedId && savePassword) {
      user_id.value = savedId
      user_password.value = savePassword
      rememberMe.checked = true
    }
  }
  signUp.addEventListener('click', () => {
    // Error decetor
    const id = user_id.value
    const password = user_password.value

    if (password.length > 9) {
      alert('Password cannot be more than 9 characters')
      user_password.value = ''
      return
    }
    //Sucess code
    if (id === 'admin' && password === 'admin123') {
      my_modal_3.showModal()
      if (rememberMe && rememberMe.checked) {
        localStorage.setItem('saveId', id)
        localStorage.setItem('savePassword', password)
      }
      setTimeout(() => {
        window.location.assign('./home.html')
      }, 1000)
    } else {
      alert('Login Failed: Wrong ID or Password')
      user_password.value = ''
      return
    }
  })
}

// Login form

// Total Counts of issues
const manageSpinner = (status) => {
  const spinner = document.getElementById('spiner')
  if (status) {
    spinner.classList.remove('hidden')
  } else {
    spinner.classList.add('hidden')
  }
}

const setTotal = () => {
  let count = cards.children.length
  issueCount.innerText = count
}

// Button Toggles
const toggle = (id) => {
  manageSpinner(true)
  //toggle button classlist add
  all.classList.remove('bg-blue-700', 'text-white')
  all.classList.add('bg-white', 'text-[#64748B]')
  open.classList.remove('bg-blue-700', 'text-white')
  open.classList.add('bg-white', 'text-[#64748B]')
  closed.classList.remove('bg-blue-700', 'text-white')
  closed.classList.add('bg-white', 'text-[#64748B]')
  //selected button class list add
  const selectdBtn = document.getElementById(id)
  currentStatus = id
  selectdBtn.classList.remove('bg-white', 'text-[#64748B]')
  selectdBtn.classList.add('bg-blue-700', 'text-white')

  const filteredData = allIssues.filter((issue) => {
    if (id === 'all') return true
    return issue.status.toLowerCase() === id.toLowerCase()
  })

  displaydata(filteredData)
  setTimeout(() => {
    displaydata(filteredData)
    manageSpinner(false)
  }, 300)
}
setTotal()

// sobar age kaj data ke fetch kora
let allIssues = []
const allLoadData = () => {
  manageSpinner(true)
  let url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues'
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      allIssues = json.data
      displaydata(allIssues)
      manageSpinner(false)
    })
}
allLoadData()
//all tab dispaly data

const labelsItem = (array) => {
  return array
    .map((label) => {
      const lowerLabel = label.toLowerCase()
      let labelStyle = ''
      let icon = ''
      if (lowerLabel === 'bug') {
        labelStyle = 'bg-red-50 text-red-500 border-red-200 cursor-pointer'
        icon = '<i class="fa-solid fa-bug"></i>'
      } else if (lowerLabel === 'help wanted') {
        labelStyle =
          'bg-yellow-50 text-yellow-600 border-yellow-200 cursor-pointer'
        icon = '<i class="fa-solid fa-handshake-angle"></i>'
      } else if (lowerLabel === 'enhancement') {
        labelStyle = 'bg-blue-50 text-green-600 border-blue-200 cursor-pointer'
        icon = '<i class="fa-solid fa-wand-magic-sparkles"></i>'
      } else if (lowerLabel === 'documentation') {
        labelStyle = 'bg-pink-50 text-pink-600 border-pink-200 cursor-pointer'
        icon = '<i class="fa-solid fa-file-lines"></i>'
      } else {
        labelStyle = 'bg-gray-50 text-gray-500 border-gray-200'
        icon = '<i class="fa-solid fa-tag"></i>'
      }
      return `
      <button class="px-2 py-1 rounded-lg border ${labelStyle} flex items-center gap-1 text-[10px] font-bold  transition-all hover:opacity-80">
        ${icon} ${label.toUpperCase()}
      </button>
    `
    })
    .join('')
}

const displaydata = (data) => {
  cards.innerHTML = ''
  // loop for data
  data.forEach((ele) => {
    // style variable
    let borderColor
    if (ele.status === 'open') {
      borderColor = 'border-t-green-500'
    } else {
      borderColor = 'border-t-purple-500'
    }
    const priority = ele.priority.toLowerCase()
    let priorityItem = ''
    if (ele.priority === 'high') {
      priorityItem = 'bg-red-200 text-red-500'
    } else if (ele.priority === 'medium') {
      priorityItem = 'bg-yellow-100 text-yellow-500'
    } else if (ele.priority === 'low') {
      priorityItem = 'bg-gray-200 text-gray-500'
    }
    const labelsHtml = labelsItem(ele.labels)
    const date = new Date(ele.createdAt)
    const formatdDate = date.toDateString()
    // creating element
    let card = document.createElement('div')
    card.innerHTML = `
     <div
          id="card" onclick = "showDetails(${ele.id})"
          class="rounded-2xl cursor-pointer border-t-6 h-full  ${borderColor} p-4 space-y-3 shadow-lg"
        >
          <div class="flex items-center justify-between">
          <span class="${ele.status === 'open' ? 'text-green-500' : 'text-purple-500'} cursor-pointer">
             <i class="fa-regular ${ele.status === 'open' ? 'fa-circle-dot' : 'fa-circle-check'}"></i>
          </span>
          <button class="px-3 py-1 rounded-full font-bold text-[10px] uppercase cursor-pointer ${priorityItem} ">${ele.priority}
           
          </button>
        </div>
          <div class="space-y-1">
          <h1 class="text-[15px] font-bold text-gray-800 leading-tight">${ele.title}</h1>
          <p class="text-[12px] text-gray-400 line-clamp-2">${ele.description}</p>
        </div>
          <div
            class="space-x-3 flex items-center justify-start text-[12px]   font-medium border-b-1 border-gray-200 pb-4"
          >
            <!-- Bug Div -->
              ${labelsHtml}
           
          </div>
          <div
            class="flex flex-col p-1 text-[16px] text-gray-500 font-medium space-y-2"
          >
            <h1>#${ele.id} by ${ele.author}</h1>
            <p class="mt-1">${formatdDate}</p>
          </div>
        </div>
    `
    cards.appendChild(card)
  })

  setTotal()
}

const showDetails = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
  const response = await fetch(url)
  const details = await response.json()

  modalDetails(details.data)
}
const modalDetails = (data) => {
  const priority = data.priority.toLowerCase()
  let priorityItem = ''
  if (data.priority === 'high') {
    priorityItem = 'bg-red-200 text-red-500'
  } else if (data.priority === 'medium') {
    priorityItem = 'bg-yellow-100 text-yellow-500'
  } else if (data.priority === 'low') {
    priorityItem = 'bg-gray-200 text-gray-500'
  }
  const labelsHtml = labelsItem(data.labels)
  const date = new Date(data.createdAt)
  const formatdDate = date.toDateString()

  const showModalBox = document.getElementById('modal_container')
  showModalBox.innerHTML = 
        
`
<div class="p-4 sm:p-8 space-y-4 sm:space-y-6 bg-white rounded-2xl">
  <h1 id="modal_title" class="text-xl sm:text-3xl font-extrabold text-[#111827] leading-snug">
    ${data.title}
  </h1>

  <div class="flex flex-wrap items-center gap-2 text-[10px] sm:text-sm font-medium text-gray-500">
    <span id="modal_status" class="px-2 py-0.5 sm:px-3 sm:py-1 text-center rounded-full ${data.status === 'open' ? 'bg-green-500 text-white' : 'bg-purple-500 text-white'}">
      ${data.status}
    </span>
    <span class="text-gray-400">•</span>
    <span>Opened by <span id="modal_author" class="font-semibold text-gray-700">${data.author}</span></span>
    <span class="text-gray-400 hidden sm:inline">•</span>
    <span id="modal_date" class="w-full sm:w-auto mt-1 sm:mt-0 block sm:inline">${formatdDate}</span>
  </div>

  <div id="modal_labels" class="flex flex-wrap gap-2 pt-1">
    ${labelsHtml}
  </div>

  <div class="py-2 text-[#4B5563] text-sm sm:text-base leading-relaxed">
    <p id="modal_description">
      ${data.description}
    </p>
  </div>

  <div class="bg-gray-50 rounded-xl p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-100">
    <div class="space-y-1">
      <h4 class="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-tight">Assignee:</h4>
      <div id="modal_assignee" class="text-base sm:text-lg font-bold text-[#111827]">
        ${data.assignee}
      </div>
    </div>
    <div class="space-y-1">
      <h4 class="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-tight">Priority:</h4>
      <span id="modal_priority" class="px-3 py-1 bg-red-500 text-white rounded-full text-[10px] font-bold uppercase tracking-wider inline-block ${priorityItem}">
        ${data.priority}
      </span>
    </div>
  </div>

  <div class="pt-4 flex justify-end">
    <form method="dialog" class="w-full sm:w-auto">
      <button class="w-full sm:w-auto px-8 py-3 bg-[#5000F0] text-white rounded-xl font-bold cursor-pointer text-sm transition hover:bg-[#4100C8] active:scale-95">
        Close
      </button>
    </form>
  </div>
</div>
`
  document.getElementById('my_modal_5').showModal()
}


const handleSearch = () => {
  const searchText = searchInput.value;

  manageSpinner(true);
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`;

  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      if (json.data) {
        allIssues = json.data;
        displaydata(allIssues);
      }
     
      manageSpinner(false);
    });
};


if (searchBtn) {
  searchBtn.addEventListener('click', () => {
    handleSearch();
  });
}


if (searchInput) {
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  });

  searchInput.addEventListener('input', (e) => {
    if (e.target.value === '') {
      allLoadData();
    }
  });
}