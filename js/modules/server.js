// (function() {
//   'use strict';
    
//   const SERVER_DATA_URL = 'http://localhost:3000/menu';
//   const SERVER_URL = 'http://localhost:3000/requests';

//   async function postData(data) {
//     const res = await fetch(SERVER_URL, {
//       method: 'POST',
//       headers: {
//         'Content-type': 'application/json'
//       },
//       body: data
//     });

//     if (!res.ok) {
//       throw new Error(`Произошла ошибка ${res.status} - ${res.statusText}, попробуйте снова`);        
//     }
    
//     return await res.json(); 
//   }

//   async function getData() {
//     const res = await fetch(SERVER_DATA_URL);

//     if (!res.ok) {
//       throw new Error(`Произошла ошибка ${res.status} - ${res.statusText}, попробуйте снова`);        
//     }
    
//     return await res.json(); 
//   }
  
//   function upload(formData, onSuccess, onError) {
//     const json = JSON.stringify(Object.fromEntries(formData.entries()));

//     postData(json)
//     .then(data => {
//       onSuccess(data);
//     })
//     .catch( e => {
//       onError(e.message);
//     });
//   }

//   function download(onSuccess, onError) {
//     getData()
//     .then(data => onSuccess(data))
//     .catch( e => {
//       onError(e.message);
//     });
//   }


//   window.server = {
//     upload: upload,
//     download: download
//   };
// })();

'use strict';
    
const SERVER_DATA_URL = 'http://localhost:3000/menu';
const SERVER_URL = 'http://localhost:3000/requests';

async function postData(data) {
  const res = await fetch(SERVER_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });

  if (!res.ok) {
    throw new Error(`Произошла ошибка ${res.status} - ${res.statusText}, попробуйте снова`);        
  }
  
  return await res.json(); 
}

async function getData() {
  const res = await fetch(SERVER_DATA_URL);

  if (!res.ok) {
    throw new Error(`Произошла ошибка ${res.status} - ${res.statusText}, попробуйте снова`);        
  }
  
  return await res.json(); 
}

function upload(formData, onSuccess, onError) {
  const json = JSON.stringify(Object.fromEntries(formData.entries()));

  postData(json)
  .then(data => {
    onSuccess(data);
  })
  .catch( e => {
    onError(e.message);
  });
}

function download(onSuccess, onError) {
  getData()
  .then(data => onSuccess(data))
  .catch( e => {
    onError(e.message);
  });
}

export {upload, download};