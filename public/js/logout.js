const logout = document.querySelector('#logout');

function popup1 () {
    const divEl = document.querySelector('.notice');
    const textEl2 = document.createElement('p');
    
    textEl2.textContent = "You are Logging Out!";
    divEl.append(textEl2);
    
    document.location.replace('/');
}

function popup2 () {
    const divEl = document.querySelector('.notice');
    const textEl = document.createElement('p');
    
    textEl.textContent = "You're Logged Out!";
    divEl.append(textEl);
    
    document.location.reload();
}

async function logoutUser() {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        popup1();
    } else {
        popup2();
    }   
}

 logout.addEventListener('click', logoutUser);