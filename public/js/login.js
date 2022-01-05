const login = document.querySelector('#login-btn');

async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (username && password){
        const response = await fetch('/api/users/login',{
            method:'POST',
            body: JSON.stringify({
                username,
                password
                
            }),
            headers:{ 'Content-Type': 'application/json'}
        });
        
        if(response.ok){
           
            document.location.replace('/dashboard')
        } else {
            alert(response.statusText);
        }
    }
    
};

login.addEventListener('click', loginFormHandler);

