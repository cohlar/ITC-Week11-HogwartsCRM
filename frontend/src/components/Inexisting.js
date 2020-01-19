import React from 'react';

function Inexisting() {
    return (
        <main>
            Sorry, this page does not exist... you shouldn't mess with the URLs! :)
            <br />
            <br />
            <img src={require('../img/inexistent.jpg')} alt='Inexisting page' />
        </main>
    );
}

export default Inexisting;
