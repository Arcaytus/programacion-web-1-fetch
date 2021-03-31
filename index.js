const btn = document.getElementById('btn');
const result = document.getElementById('result');

const KEY =
  'BQDaGVxSMguLVk4PXwWvmkVh38me9pH4CZbpMLnbQ8Ew3QmoRSL17NtjF0Sg55O30EdKBjwMDKHRRVQuABzaZL4KS_o_rKinYoQ3mavWOguFeAx2w-OCQDogIHhWMwrYbtBLnjlQ1HCblA';

// https://developer.spotify.com/console/get-browse-categories/

function write(text) {
  result.innerHTML = text;
}

async function getApi(uri) {
  try {
    const res = await fetch(`https://api.spotify.com/v1${uri}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${KEY}`,
      },
    });

    if (res.ok) {
      const json = await res.json();
      return json;
    } else {
      console.info('Respuesta:', res);
      write('No se pudo traer los datos');
    }
  } catch (err) {
    write(`Error al acceder al servidor: ${err.message}`);
  }
}

async function getCategory(category_id) {
  const { icons } = await getApi(`/browse/categories/${category_id}`);
  const icon = icons[0];

  write(`<img src="${icon.url}" alt="${category_id}" />`);
}

btn.addEventListener('click', async () => {
  const json = await getApi('/browse/categories');

  const { items } = json.categories;
  const lista = [];

  items.forEach((item) => {
    lista.push(`<li onclick="getCategory('${item.id}')">${item.name}</li>`);
  });

  write(`<ul>${lista.join('')}</ul>`);
});
