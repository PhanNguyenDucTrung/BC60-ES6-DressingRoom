import Api from '../utils/callData.js';
import ListChosen from '../models/ListChosen.js';
import ChosenItem from '../models/ChoseItem.js';

const listChosen = new ListChosen();

const handleItemClick = type => {
    api.get()
        .then(data => {
            const filteredTabPanes = data.tabPanes.filter(item => item.type === type);
            document.querySelector('.tab-content').innerHTML = renderTabPanes(filteredTabPanes);
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
};

const renderNav = data => {
    let content = '';

    data.forEach(item => {
        content += `
      <li class="nav-item">
        <a href="#" class="nav-link" data-type="${item.type}">${item.showName}</a>
      </li>`;
    });

    document.querySelector('.nav-pills').innerHTML = content;
    document.querySelectorAll('.nav-link').forEach(navLink => {
        navLink.addEventListener('click', () => handleItemClick(navLink.dataset.type));
    });
};

const renderTabPanes = data => {
    console.log(data);
    return data
        .map(
            item => `
        <div class="card col-md-4">
          <img src="${item.imgSrc_jpg}" alt="" />
          <h4>${item.name}</h4>
          <button>Thử đồ</button>
        </div>
      `
        )
        .join('');
};
const api = new Api();
api.get()
    .then(data => {
        console.log('Data:', data);

        renderNav(data.navPills);

        const defaultType = 'topclothes';
        const initialTabPanes = data.tabPanes.filter(item => item.type === defaultType);
        document.querySelector('.tab-content').innerHTML = renderTabPanes(initialTabPanes);
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
