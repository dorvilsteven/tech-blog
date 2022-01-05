const submitBtn = document.querySelector('#submitBtn');

async function createPost(){
    const title = document.querySelector('#textBox1').value.trim();
    const text = document.querySelector('#textBox2').value.trim();

    if (title && text) {
        const response = await fetch('/api/posts/', {
            method: 'POST',
            body: JSON.stringify({
                title,
                text
            }),
            headers: {'Content-Type': 'application/json'}

        });
        if(response.ok) {
            document.location.replace('/dashboard');
        } else{
            alert(response.statusText);
        }
    } 
};

submitBtn.addEventListener('click', createPost);

