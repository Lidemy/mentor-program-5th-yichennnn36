import $ from 'jquery';

export function getComments(apiUrl, siteKey, cursor, callback) {
  let url = `${apiUrl}/api_comments.php?site_key=${siteKey}`;
  if (cursor) {
    url += `&cursor=${cursor}`;
  }
  $.ajax({
    type: 'GET',
    url,
    success: (response) => {
      if (!response.ok) {
        alert(response.error_message);
        return;
      }
      callback(response);
    }
  });
}

export function addComments(apiUrl, data, callback) {
  $.ajax({
    type: 'POST',
    url: `${apiUrl}/api_add_comments.php`,
    data,
    success: (response) => {
      if (!response.ok) {
        alert(response.error_message);
        return;
      }
      callback(response);
    }
  });
}
