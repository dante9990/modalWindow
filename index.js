let fruits = [
    { id: 1, title: 'Яблоки', price: 20, img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348' },
    { id: 2, title: 'Апельсины', price: 30, img: 'https://befreshcorp.net/wp-content/uploads/2017/07/product-packshot-Orange.jpg' },
    { id: 3, title: 'Манго', price: 40, img: 'https://sbermarket.ru/spree/products/34090/preview/43507.jpg?1576746810' },
]

const toHTML = fruit => `
<div class="col">
    <div class="card">
        <img class="card-img-top" src="${fruit.img}" alt="${fruit.title}"/>
        <div class="card-body">
            <h5 class="card-title">${fruit.title}</h5>
            <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
            <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
        </div>
    </div>
</div>
`;

function render() {
    const html = fruits.map(toHTML).join('');
    document.querySelector('#fruits').innerHTML = html;
}

render()

// const myModal = $.modal({
//     title: 'my modal',
//     closable: true,
//     content: `
//     <p>Modal is working</p>
//     <p>Lorem ipsum dolor sit.</p>
//     `,
//     width: '400px',
//     footerButtons: [
//         {
//             text: 'Ok', type: 'primary', handler() {
//                 console.log('Primary btn clicked');
//                 myModal.close();
//             }
//         },
//         {
//             text: 'Cancel', type: 'danger', handler() {
//                 console.log('Danger btn clicked');
//                 myModal.close();
//             }
//         }
//     ]
// })

const myModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '400px',
    footerButtons: [
        {
            text: 'Закрыть', type: 'primary', handler() {
                myModal.close();
            }
        }
    ]
})


document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn;
    const id = +event.target.dataset.id;
    const fruit = fruits.find(f => f.id === id);


    if (btnType == 'price') {
        

        myModal.setContent(`
        <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>`)
        myModal.open();

        console.log(fruit);
    } else if (btnType == 'remove') {
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Вы удаляете <strong>${fruit.title}</strong></p>`
        }).then(()=>{
            fruits = fruits.filter(f => f.id !== id);
            render()
        }).catch(()=>{
            console.log(('cancel'));
        })
    }
})