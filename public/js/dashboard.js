const updateBtn = document.querySelector('#updateBtn');
const deleteBtn = document.querySelector('#deleteBtn');

async function updatePost () {
    const title = document.querySelector('#textBox1').value.trim();
    const text = document.querySelector('#textBox2').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    if (title && text) {
        const response = await fetch (`/api/posts/${id}`, {
            method:'PUT',
            body:JSON.stringify({
                title,
                text
            }),
            headers:{'Content-Type': 'application/json'}
        });
        if(response.ok){
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

async function deletePost() {
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    confirm("Are you sure you want to delete this Post?")
    
    if (confirm) {
        await fetch (`/api/posts/${id}`, {
            method:'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        document.location.replace('/dashboard');
    }
};

document.querySelector('#updateBtn').addEventListener('click', updatePost);
document.querySelector('#deleteBtn').addEventListener('click', deletePost);
