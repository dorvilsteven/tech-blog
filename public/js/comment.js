const submit = document.querySelector('#submitBtn');

async function commentSection(){
    const commentText =document.querySelector('#textBox1').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    if (commentText){
        const response = await fetch('/api/comments/',{
            method:'POST',
            body:JSON.stringify({
                commentText,
                post_id
            }),
            headers:{ 'Content-Type':'application/json'}
        });
        if(response.ok){
            document.location.reload();
        } else{
            alert(response.statusText);
        }
    }
};

submit.addEventListener('click', commentSection);
