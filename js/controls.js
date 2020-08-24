var KEYS = {};

function onkeydown_handler(e)
{
    KEYS[e.code] = true;
}


function onkeyup_handler(e)
{

    KEYS[e.code] = false;
}