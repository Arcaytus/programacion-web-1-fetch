const btn = document.getElementById('btn');
const result = document.getElementById('result');

const KEY =
  'BQDaGVxSMguLVk4PXwWvmkVh38me9pH4CZbpMLnbQ8Ew3QmoRSL17NtjF0Sg55O30EdKBjwMDKHRRVQuABzaZL4KS_o_rKinYoQ3mavWOguFeAx2w-OCQDogIHhWMwrYbtBLnjlQ1HCblA';

// https://developer.spotify.com/console/get-browse-categories/

function write(text) {
  result.innerHTML = text;
}

btn.addEventListener('click', () => {
  fetch('https://api.spotify.com/v1/browse/categories', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${KEY}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        res.json().then((json) => {
          const { items } = json.categories;
          const lista = [];

          items.forEach((item) => {
            lista.push(`<li>${item.name}</li>`);
          });

          write(`<ul>${lista.join('')}</ul>`);
        });
      } else {
        console.info('Respuesta:', res);
        write('No se pudo traer los datos');
      }
    })
    .catch((err) => {
      write(`Error al acceder al servidor: ${err.message}`);
    });
});
