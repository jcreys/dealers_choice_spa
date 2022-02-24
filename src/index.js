console.log('hello world');
const ul = document.querySelector('ul');
ul.addEventListener('click', async (ev) => {
    if(ev.target.tagName === 'LI') {
        const id = ev.target.getAttribute('data-id');
        await axios.delete(`/api/artists/${id}`);
        // init();
    }
});
const init = async()=>{
    const response = await axios.get('/api/artists');
    console.log(response);
    const artists = response.data;
    const html = artists.map( artist => {
        return `
            <li data-id='${artist.id}'>${artist.name}</li>
        
        `;
    }).join('');
    ul.innerHTML = html;
};

init();
