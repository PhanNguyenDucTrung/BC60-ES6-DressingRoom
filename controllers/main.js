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
          <button class="wear-button" data-id="${item.id}">Thử đồ</button>
        </div>
      `
        )
        .join('');
};

const handleWearButtonClick = itemId => {
    api.get()
        .then(data => {
            const chosenItemData = data.tabPanes.find(item => item.id === itemId);

            const chosenItem = new ChosenItem(chosenItemData.type, chosenItemData.name, chosenItemData.imgSrc_png);
            listChosen.addItem(chosenItem);

            renderClothes(listChosen.chosenItems);
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
};

const renderClothes = list => {
    const clothesContainer = document.querySelector('.chosen-clothes-container');

    // Clear existing content
    clothesContainer.innerHTML = `
        <div class="body"></div>
        <div class="model"></div>
        <div class="hairstyle"></div>
        <div class="necklace"></div>
        <div class="bikinitop"></div>
        <div class="bikinibottom"></div>
        <div class="handbag"></div>
        <div class="feet"></div>
        <div class="background"></div>
    `;

    list.forEach(item => {
        switch (item.type) {
            case 'topclothes':
                clothesContainer.querySelector('.bikinitop').innerHTML = `<img src="${item.imgSrc}" alt="" />`;
                clothesContainer.querySelector('.bikinitop img').style.width = '250px';
                break;
            case 'botclothes':
                clothesContainer.querySelector('.bikinibottom').innerHTML = `<img src="${item.imgSrc}" alt="" />`;
                clothesContainer.querySelector('.bikinibottom img').style.width = '250px';
                break;
            case 'shoes':
                clothesContainer.querySelector('.feet').style.backgroundImage = `url(${item.imgSrc})`;
                break;
            case 'handbags':
                clothesContainer.querySelector('.handbag').style.backgroundImage = `url(${item.imgSrc})`;
                break;
            case 'necklaces':
                clothesContainer.querySelector('.necklace').style.backgroundImage = `url(${item.imgSrc})`;
                break;
            case 'hairstyle':
                clothesContainer.querySelector('.hairstyle').style.backgroundImage = `url(${item.imgSrc})`;
                break;
            case 'background':
                clothesContainer.querySelector('.background').style.backgroundImage = `url(${item.imgSrc})`;
                break;
            // Add cases for other types as needed
        }
    });
};
const api = new Api();
api.get()
    .then(data => {
        console.log('Data:', data);

        renderNav(data.navPills);

        const defaultType = 'topclothes';
        const initialTabPanes = data.tabPanes.filter(item => item.type === defaultType);
        document.querySelector('.tab-content').innerHTML = renderTabPanes(initialTabPanes);

        document.querySelector('.tab-content').addEventListener('click', event => {
            if (event.target.classList.contains('wear-button')) {
                const itemId = event.target.dataset.id;
                handleWearButtonClick(itemId);
            }
        });
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
