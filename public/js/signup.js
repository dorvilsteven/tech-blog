const signup = document.querySelector('#signup-btn');

async function signupHandler (event){
    event.preventDefault();
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/',{
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json'}
        });
        if(response.ok) {
            document.location.replace('/login');
            window.location.href = 'https://tech-blog-mvc-steven-dorvil.herokuapp.com/';
        } else {
            alert(response.statusText);
        }
    }


}
signup.addEventListener('click', signupHandler);