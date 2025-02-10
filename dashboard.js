const apiKey = 'AIzaSyBJgblGCnEE0u5ZEKUwbXOLp8LtqZnbkQk';
const spreadsheetId = '1XA8ApaApFOwJgVfhHLBQkfK8fTA53KcnQbZKPF8gm8w';
const range = 'Sheet1!A:C';

document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) {
        alert('ユーザー名またはIDを入力してください。');
        return;
    }

    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const rows = data.values;
            const result = rows.find(row => row[0] === query || row[1] === query);

            if (result) {
                document.getElementById('userName').textContent = result[0];
                document.getElementById('userId').textContent = result[1];
                document.getElementById('userPoints').textContent = result[2];
                document.getElementById('result').hidden = false;
            } else {
                alert('ユーザーが見つかりませんでした。');
            }
        })
        .catch(error => {
            console.error('エラーが発生しました:', error);
            alert('データを取得できませんでした。');
        });
});
